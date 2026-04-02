/**
 * E2E Tests: Mobile Responsiveness
 *
 * These tests run with the 'mobile' Playwright project config (iPhone 13)
 * and also set viewport explicitly as fallback for running individually.
 *
 * Prerequisites:
 * - Local Supabase running: `pnpm sb:start`
 * - DB seeded: `pnpm db:reset`
 * - Auth setup completed (storageState from auth.setup.ts)
 * - Dev server running: `pnpm dev`
 *
 * Run with: pnpm playwright test e2e/mobile.spec.ts --project=mobile
 */
import { test, expect } from '@playwright/test';
import { LoginPage } from './page-objects/login.page';
import { AdminLayoutPage } from './page-objects/admin-layout.page';
import { ContentListPage } from './page-objects/content-list.page';
import { ContentFormDialogPage } from './page-objects/content-form-dialog.page';
import { BasePage } from './page-objects/base.page';

test.use({ viewport: { width: 375, height: 667 } });

test.describe('Mobile Responsiveness', () => {
  let layout: AdminLayoutPage;
  let base: BasePage;

  test.beforeEach(async ({ page }) => {
    layout = new AdminLayoutPage(page);
    base = new BasePage(page);
    await layout.navigateTo('/admin');
  });

  test('should hide sidebar on mobile', async () => {
    await expect(layout.sidebar).not.toBeVisible();
  });

  test('should show hamburger menu button', async () => {
    await expect(layout.hamburgerButton).toBeVisible();
  });

  test('should open sidebar sheet on hamburger click', async ({ page }) => {
    await layout.openMobileMenu();

    // Sheet should be visible with admin navigation
    await expect(page.getByText('Admin Panel').first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  });

  test('should display nav links in mobile sidebar', async ({ page }) => {
    await layout.openMobileMenu();

    const expectedLinks = ['Dashboard', 'News', 'Events', 'Blogs', 'Gallery', 'Staff'];
    for (const linkName of expectedLinks) {
      await expect(page.getByRole('link', { name: linkName })).toBeVisible();
    }
  });

  test('should navigate via mobile sidebar and close sheet', async ({ page }) => {
    await layout.openMobileMenu();
    await page.getByRole('link', { name: 'News' }).click();

    // Should navigate to news page
    await expect(page.getByRole('heading', { name: 'News' })).toBeVisible();

    // Sheet should be closed after navigation
    await expect(page.locator('[data-state="open"]')).not.toBeVisible();
  });

  test('should display content list table on mobile', async ({ page }) => {
    const contentList = new ContentListPage(page, 'News');
    await contentList.navigateTo('/admin/news');

    await contentList.expectHeading();
    await expect(contentList.table).toBeVisible();
    // Table should be scrollable/visible even on narrow viewport
    const rowCount = await contentList.getRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('should open form dialog on mobile', async ({ page }) => {
    const contentList = new ContentListPage(page, 'News');
    const formDialog = new ContentFormDialogPage(page);
    await contentList.navigateTo('/admin/news');

    await contentList.clickAddNew();
    await formDialog.expectOpen();

    // Dialog should be usable - check that key fields are visible
    await expect(formDialog.dialog).toBeVisible();
    const { createBtn } = formDialog.submitButton;
    await expect(createBtn).toBeVisible();

    await formDialog.cancel();
  });

  test('should show publish button on mobile topbar', async () => {
    await expect(layout.publishButton).toBeVisible();
  });

  test('should render login page correctly on mobile', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // Navigate to login without auth
    await page.context().clearCookies();
    await loginPage.navigateTo('/login');

    await loginPage.expectLoginPage();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });

  test('should render dashboard cards in single column on mobile', async ({ page }) => {
    // Dashboard cards should stack vertically on mobile
    const cards = page.locator('[class*="card"], [data-card], .card');
    const cardCount = await cards.count();

    if (cardCount >= 2) {
      // Get bounding boxes of first two cards
      const firstBox = await cards.nth(0).boundingBox();
      const secondBox = await cards.nth(1).boundingBox();

      if (firstBox && secondBox) {
        // In single-column layout, cards should stack vertically
        // Second card's top should be below first card's bottom (or roughly same X position)
        expect(secondBox.y).toBeGreaterThanOrEqual(firstBox.y + firstBox.height - 10);
      }
    }
  });
});
