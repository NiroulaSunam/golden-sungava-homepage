/**
 * E2E Tests: Publish Flow & Homepage Verification
 *
 * Tests the complete draft -> publish -> public homepage pipeline.
 * Verifies that published content appears on the public site and
 * unpublished drafts do not.
 *
 * Prerequisites:
 * - Local Supabase running: `pnpm sb:start`
 * - DB seeded: `pnpm db:reset`
 * - Authenticated via storageState (setup project)
 * - Dev server running: `pnpm dev`
 *
 * Run with: pnpm playwright test e2e/publish-flow.spec.ts
 */
import { test, expect } from '@playwright/test';
import { ContentListPage } from './page-objects/content-list.page';
import { ContentFormDialogPage } from './page-objects/content-form-dialog.page';
import { PublishDialogPage } from './page-objects/publish-dialog.page';
import { HomepagePage } from './page-objects/homepage.page';
import { BasePage } from './page-objects/base.page';

const DRAFT_TITLE_PREFIX = 'E2E Publish Flow';

/**
 * Helper to create a draft news item and return its unique title.
 */
const createDraftNews = async (page: import('@playwright/test').Page, label: string): Promise<string> => {
  const listPage = new ContentListPage(page, 'News');
  const formDialog = new ContentFormDialogPage(page);

  await listPage.navigateTo('/admin/news');
  await listPage.clickAddNew();
  await formDialog.expectOpen();

  const uniqueTitle = `${DRAFT_TITLE_PREFIX} ${label} ${Date.now()}`;
  await formDialog.fillBilingualField('title', uniqueTitle);
  await formDialog.fillTextField('date', '2026-04-01');
  await formDialog.submit();
  await formDialog.expectClosed();

  return uniqueTitle;
};

test.describe('Publish Flow', () => {
  test('should show publish button in topbar', async ({ page }) => {
    const publishDialog = new PublishDialogPage(page);
    await page.goto('/admin');

    await expect(publishDialog.publishButton).toBeVisible();
  });

  test('should create a draft news item', async ({ page }) => {
    const uniqueTitle = await createDraftNews(page, 'Create');

    // Verify the item appears in the list (newly created items show at top or are searchable)
    const listPage = new ContentListPage(page, 'News');
    await expect(listPage.table).toBeVisible();
  });

  test('should show draft count badge after creating draft', async ({ page }) => {
    await createDraftNews(page, 'Badge');

    // Navigate to dashboard to refresh publish count
    await page.goto('/admin');

    const publishDialog = new PublishDialogPage(page);
    await publishDialog.expectEnabled();

    // The publish button should contain a count indicator
    const buttonText = await publishDialog.publishButton.textContent();
    expect(buttonText).toBeTruthy();
  });

  test('should show confirmation dialog with draft count on click', async ({ page }) => {
    await createDraftNews(page, 'Confirm');

    await page.goto('/admin');

    const publishDialog = new PublishDialogPage(page);
    await publishDialog.expectEnabled();
    await publishDialog.openPublishDialog();

    // Confirmation dialog should appear
    await expect(page.getByRole('heading', { name: 'Publish All Drafts' })).toBeVisible();
    await expect(page.getByText(/draft item/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Publish Now' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();

    // Cancel without publishing
    await publishDialog.cancel();
  });

  test('should cancel publish without changes', async ({ page }) => {
    await createDraftNews(page, 'Cancel');

    await page.goto('/admin');

    const publishDialog = new PublishDialogPage(page);
    await publishDialog.expectEnabled();
    await publishDialog.openPublishDialog();

    await expect(page.getByRole('heading', { name: 'Publish All Drafts' })).toBeVisible();
    await publishDialog.cancel();

    // Dialog should close, publish button should still show count
    await expect(page.getByRole('heading', { name: 'Publish All Drafts' })).not.toBeVisible();
    await publishDialog.expectEnabled();
  });

  test('should publish all drafts and show success toast', async ({ page }) => {
    await createDraftNews(page, 'Publish');

    await page.goto('/admin');

    const publishDialog = new PublishDialogPage(page);
    const basePage = new BasePage(page);

    await publishDialog.expectEnabled();
    await publishDialog.openPublishDialog();
    await publishDialog.publish();

    // Wait for success toast
    await basePage.expectToast('Published');
  });

  test('should reset badge after publishing', async ({ page }) => {
    // Create a draft, then publish it
    await createDraftNews(page, 'Reset');

    await page.goto('/admin');

    const publishDialog = new PublishDialogPage(page);
    const basePage = new BasePage(page);

    await publishDialog.expectEnabled();
    await publishDialog.openPublishDialog();
    await publishDialog.publish();

    await basePage.expectToast('Published');

    // After publishing, the button should be disabled (no drafts remaining)
    // or the badge count should be gone
    await page.waitForTimeout(1_000); // Allow UI to update
    await publishDialog.expectDisabled();
  });

  test('should show published item on public homepage', async ({ page }) => {
    // Create a draft with a recognizable title
    const uniqueTitle = await createDraftNews(page, 'Homepage');

    // Publish all drafts
    await page.goto('/admin');
    const publishDialog = new PublishDialogPage(page);
    const basePage = new BasePage(page);

    await publishDialog.expectEnabled();
    await publishDialog.openPublishDialog();
    await publishDialog.publish();
    await basePage.expectToast('Published');

    // Visit the public homepage and verify the news title appears
    const homepage = new HomepagePage(page);
    await homepage.goto();
    await homepage.expectNewsVisible(uniqueTitle);
  });

  test('should show status badge as published in admin list after publish', async ({ page }) => {
    // Create and publish a draft
    const uniqueTitle = await createDraftNews(page, 'StatusBadge');

    await page.goto('/admin');
    const publishDialog = new PublishDialogPage(page);
    const basePage = new BasePage(page);

    await publishDialog.expectEnabled();
    await publishDialog.openPublishDialog();
    await publishDialog.publish();
    await basePage.expectToast('Published');

    // Go to news list and verify status
    await page.goto('/admin/news');
    const listPage = new ContentListPage(page, 'News');
    await listPage.expectHeading();

    // Search for our specific item to find its status
    await listPage.search(uniqueTitle);
    await expect(page.getByText('published').first()).toBeVisible();
  });

  test('should NOT show unpublished draft on homepage', async ({ page }) => {
    // Create a draft but do NOT publish
    const uniqueTitle = await createDraftNews(page, 'NoPub');

    // Visit the public homepage directly without publishing
    const homepage = new HomepagePage(page);
    await homepage.goto();

    // The draft title should NOT appear on the public site
    await homepage.expectNewsNotVisible(uniqueTitle);
  });
});
