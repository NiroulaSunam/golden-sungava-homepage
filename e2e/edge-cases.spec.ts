/**
 * E2E Tests: Edge Cases & Error Handling
 *
 * Prerequisites:
 * - Local Supabase running: `pnpm sb:start`
 * - DB seeded: `pnpm db:reset`
 * - Auth setup completed (storageState from auth.setup.ts)
 * - Dev server running: `pnpm dev`
 *
 * Run with: pnpm playwright test e2e/edge-cases.spec.ts
 */
import { test, expect } from '@playwright/test';
import { ContentListPage } from './page-objects/content-list.page';
import { ContentFormDialogPage } from './page-objects/content-form-dialog.page';
import { PublishDialogPage } from './page-objects/publish-dialog.page';
test.describe('Edge Cases & Error Handling', () => {
  let contentList: ContentListPage;
  let formDialog: ContentFormDialogPage;
  let publishDialog: PublishDialogPage;

  test.beforeEach(async ({ page }) => {
    contentList = new ContentListPage(page, 'News');
    formDialog = new ContentFormDialogPage(page);
    publishDialog = new PublishDialogPage(page);
  });

  test('should show validation error for empty bilingual title', async ({ page }) => {
    await contentList.navigateTo('/admin/news');
    await contentList.clickAddNew();
    await formDialog.expectOpen();

    // Try to create without filling title.en
    await formDialog.fillTextField('date', '2026-04-01');
    await formDialog.submit();

    // Should show validation error - dialog stays open
    await expect(formDialog.dialog).toBeVisible();
    // Look for validation error message near the title field
    await expect(
      formDialog.dialog.getByText(/required|title is required|cannot be empty/i),
    ).toBeVisible();
  });

  test('should show validation error for missing required date field', async ({ page }) => {
    await contentList.navigateTo('/admin/news');
    await contentList.clickAddNew();
    await formDialog.expectOpen();

    // Fill title but not date
    await formDialog.fillBilingualField('title', 'News Without Date');
    await formDialog.submit();

    // Dialog should stay open with validation error
    await expect(formDialog.dialog).toBeVisible();
  });

  test('should handle empty form submission gracefully', async ({ page }) => {
    await contentList.navigateTo('/admin/news');
    await contentList.clickAddNew();
    await formDialog.expectOpen();

    // Submit completely empty form
    await formDialog.submit();

    // Should not crash - dialog should stay open with validation errors
    await expect(formDialog.dialog).toBeVisible();
  });

  test('should accept very long title text', async ({ page }) => {
    await contentList.navigateTo('/admin/news');
    await contentList.clickAddNew();
    await formDialog.expectOpen();

    // Generate a 200+ character title
    const longTitle = 'E2E Long Title Test '.repeat(12).trim();
    expect(longTitle.length).toBeGreaterThan(200);

    await formDialog.fillBilingualField('title', longTitle);
    await formDialog.fillTextField('date', '2026-04-01');
    await formDialog.fillTextField('category', 'Test');
    await formDialog.submit();

    // Should succeed - dialog should close
    await formDialog.expectClosed();
  });

  test('should handle Nepali unicode characters in bilingual fields', async ({ page }) => {
    await contentList.navigateTo('/admin/news');
    await contentList.clickAddNew();
    await formDialog.expectOpen();

    const nepaliTitle = 'गोल्डेन सुनगाभा विद्यालयको समाचार';
    await formDialog.fillBilingualField('title', 'Unicode Test', nepaliTitle);
    await formDialog.fillTextField('date', '2026-04-01');
    await formDialog.fillTextField('category', 'Test');
    await formDialog.submit();

    // Should succeed without encoding issues
    await formDialog.expectClosed();
  });

  test('should handle special characters in text fields', async ({ page }) => {
    await contentList.navigateTo('/admin/news');
    await contentList.clickAddNew();
    await formDialog.expectOpen();

    const specialTitle = 'Test & <Special> "Characters" \'Quotes\' @#$%^&*()';
    await formDialog.fillBilingualField('title', specialTitle);
    await formDialog.fillTextField('date', '2026-04-01');
    await formDialog.fillTextField('category', 'Test');
    await formDialog.submit();

    // Should handle special chars without XSS or SQL injection issues
    await formDialog.expectClosed();
  });

  test('should not create duplicate on rapid double-click of Create button', async ({ page }) => {
    await contentList.navigateTo('/admin/news');
    const countBefore = await contentList.getRowCount();

    await contentList.clickAddNew();
    await formDialog.expectOpen();

    await formDialog.fillBilingualField('title', 'Double Click Test');
    await formDialog.fillTextField('date', '2026-04-01');
    await formDialog.fillTextField('category', 'Test');

    // Rapid double-click on Create
    const { createBtn } = formDialog.submitButton;
    await createBtn.dblclick();

    await formDialog.expectClosed();

    // Navigate back to ensure fresh state
    await contentList.navigateTo('/admin/news');
    const countAfter = await contentList.getRowCount();

    // Should only have created one item (not two)
    expect(countAfter).toBe(countBefore + 1);
  });

  test('should show publish button disabled when no drafts exist', async ({ page }) => {
    // After db:reset, all seeded data is published (no drafts)
    // First publish any existing drafts
    await publishDialog.navigateTo('/admin');

    // If publish button is disabled, that means no drafts
    const isDisabled = await publishDialog.publishButton.isDisabled().catch(() => false);
    if (isDisabled) {
      await publishDialog.expectDisabled();
    } else {
      // Publish all drafts first, then check
      await publishDialog.openPublishDialog();
      await publishDialog.publish();
      await page.waitForResponse((resp) => resp.url().includes('/api/admin/publish'));
      await publishDialog.navigateTo('/admin');
      await publishDialog.expectDisabled();
    }
  });

  test('should handle browser back button after creating content', async ({ page }) => {
    await contentList.navigateTo('/admin/news');
    await contentList.clickAddNew();
    await formDialog.expectOpen();

    await formDialog.fillBilingualField('title', 'Back Button Test');
    await formDialog.fillTextField('date', '2026-04-01');
    await formDialog.fillTextField('category', 'Test');
    await formDialog.submit();
    await formDialog.expectClosed();

    // Press browser back
    await page.goBack();

    // Should not crash - page should still be functional
    await expect(page.locator('body')).toBeVisible();
  });

  test('should navigate to last page with pagination', async ({ page }) => {
    await contentList.navigateTo('/admin/news');

    // Check if pagination exists
    const pageInfo = contentList.pageInfo;
    const hasPages = await pageInfo.isVisible().catch(() => false);

    if (hasPages) {
      const pageText = await pageInfo.textContent();
      const match = pageText?.match(/Page \d+ of (\d+)/);
      const totalPages = match ? parseInt(match[1], 10) : 1;

      if (totalPages > 1) {
        // Click Next until we reach the last page
        for (let i = 1; i < totalPages; i++) {
          await contentList.nextButton.click();
          await expect(contentList.pageInfo).toContainText(`Page ${i + 1}`);
        }

        // Should be on the last page
        await expect(pageInfo).toContainText(`Page ${totalPages} of ${totalPages}`);
        // Next button should be disabled on last page
        await expect(contentList.nextButton).toBeDisabled();
      }
    }
  });

  test('should handle search with no results gracefully', async ({ page }) => {
    await contentList.navigateTo('/admin/news');

    // Search for something that definitely doesn't exist
    await contentList.search('zzz_nonexistent_xyz_12345');
    await expect(page.getByText(/no results|no items|nothing found|no news|Page 0 of 0/i)).toBeVisible({ timeout: 5000 }).catch(() => {});

    // Should show empty state or zero results, not crash
    const rowCount = await contentList.getRowCount();
    expect(rowCount).toBe(0);

    // Should show some "no results" indication
    await expect(
      page.getByText(/no results|no items|nothing found|no news/i),
    ).toBeVisible();
  });

  test('should clear search and show all results again', async ({ page }) => {
    await contentList.navigateTo('/admin/news');

    // Get initial count
    const initialCount = await contentList.getRowCount();

    // Search for nonexistent term
    await contentList.search('zzz_nonexistent_xyz_12345');
    await expect(page.getByText(/no results|no items|nothing found|no news|Page 0 of 0/i)).toBeVisible({ timeout: 5000 }).catch(() => {});

    const filteredCount = await contentList.getRowCount();
    expect(filteredCount).toBe(0);

    // Clear search
    await contentList.search('');

    // Should show all results again — wait for rows to reappear
    const restoredCount = await contentList.getRowCount();
    expect(restoredCount).toBeGreaterThan(0);
    expect(restoredCount).toBe(initialCount);
  });
});
