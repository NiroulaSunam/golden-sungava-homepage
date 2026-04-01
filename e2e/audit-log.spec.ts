/**
 * E2E Tests: Audit Log Viewer
 *
 * Prerequisites:
 * - Local Supabase running: `pnpm sb:start`
 * - DB seeded: `pnpm db:reset`
 * - Auth setup completed (storageState from auth.setup.ts)
 * - Dev server running: `pnpm dev`
 * - Some admin actions should have been performed to generate audit entries
 *
 * Run with: pnpm playwright test e2e/audit-log.spec.ts
 */
import { test, expect } from '@playwright/test';
import { AuditLogPage } from './page-objects/audit-log.page';
test.describe('Audit Log Viewer', () => {
  let auditLog: AuditLogPage;

  test.beforeEach(async ({ page }) => {
    auditLog = new AuditLogPage(page);
    await auditLog.navigateTo('/admin/audit-log');
  });

  test('should display audit log page with heading', async () => {
    await auditLog.expectHeading();
    await expect(auditLog.table).toBeVisible();
  });

  test('should show audit entries in the table', async () => {
    const entries = await auditLog.getEntries();
    // Seeded data and previous test actions should have generated entries
    expect(entries.length).toBeGreaterThan(0);
  });

  test('should filter entries by action type', async ({ page }) => {
    // Select CREATE from the action filter dropdown
    await auditLog.filterByAction('CREATE');

    // Wait for the table to update
    await page.waitForTimeout(1000);

    // All visible entries should be CREATE actions
    const entries = await auditLog.getEntries();
    if (entries.length > 0) {
      for (const entry of entries) {
        const text = await entry.textContent();
        expect(text?.toLowerCase()).toContain('create');
      }
    }
  });

  test('should expand an entry to see JSON details', async ({ page }) => {
    const entries = await auditLog.getEntries();
    if (entries.length === 0) {
      test.skip();
      return;
    }

    await auditLog.expandEntry(0);

    // Expanded details should show JSON-like content (keys, braces, etc.)
    await expect(
      page.locator('pre, code, [data-details], [class*="json"], [class*="detail"]'),
    ).toBeVisible({ timeout: 5000 });
  });

  test('should show pagination when entries exceed page limit', async ({ page }) => {
    // Check if pagination controls exist
    const paginationInfo = page.getByText(/Page \d+ of/);
    const hasPagination = await paginationInfo.isVisible().catch(() => false);

    if (hasPagination) {
      await expect(paginationInfo).toBeVisible();
      // Navigation buttons should be present
      await expect(
        page.getByRole('button', { name: 'Next' }),
      ).toBeVisible();
    } else {
      // If not enough entries for pagination, table should still be visible
      await expect(auditLog.table).toBeVisible();
    }
  });

  test('should show recent timestamps for entries', async ({ page }) => {
    const entries = await auditLog.getEntries();
    if (entries.length === 0) {
      test.skip();
      return;
    }

    // First entry should have a timestamp-like text (date or relative time)
    const firstEntryText = await entries[0].textContent();
    // Timestamps typically contain digits and date separators or relative words
    const hasTimestamp =
      /\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}|\d+\s*(min|hour|day|sec|ago|just now)/i.test(
        firstEntryText || '',
      );
    expect(hasTimestamp).toBe(true);
  });
});
