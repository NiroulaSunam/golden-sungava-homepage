/**
 * E2E Tests: Visual Verification Screenshots
 *
 * These tests capture full-page screenshots for manual visual review.
 * They always pass - the screenshots are artifacts saved to e2e/screenshots/.
 *
 * Prerequisites:
 * - Local Supabase running: `pnpm sb:start`
 * - DB seeded: `pnpm db:reset`
 * - Auth setup completed (storageState from auth.setup.ts)
 * - Dev server running: `pnpm dev`
 *
 * Run with: pnpm playwright test e2e/visual-verification.spec.ts
 */
import { test } from '@playwright/test';
import { BasePage } from './page-objects/base.page';

test.describe('Visual Verification Screenshots', () => {
  // These tests capture screenshots for manual visual verification.
  // They always pass - the screenshots are artifacts for review.

  test('capture dashboard overview', async ({ page }) => {
    const base = new BasePage(page);
    await base.navigateTo('/admin');
    // Wait for dashboard content to load
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'e2e/screenshots/dashboard-overview.png', fullPage: true });
  });

  test('capture news list page', async ({ page }) => {
    const base = new BasePage(page);
    await base.navigateTo('/admin/news');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'e2e/screenshots/news-list.png', fullPage: true });
  });

  test('capture form dialog', async ({ page }) => {
    const base = new BasePage(page);
    await base.navigateTo('/admin/news');
    await page.waitForLoadState('networkidle');

    // Open Add New dialog
    await page.getByRole('button', { name: 'Add New' }).click();
    await page.getByRole('dialog').waitFor({ state: 'visible' });

    await page.screenshot({ path: 'e2e/screenshots/form-dialog.png', fullPage: true });
  });

  test('capture site config editor', async ({ page }) => {
    const base = new BasePage(page);
    await base.navigateTo('/admin/site-config');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'e2e/screenshots/site-config-editor.png', fullPage: true });
  });

  test('capture gallery page', async ({ page }) => {
    const base = new BasePage(page);
    await base.navigateTo('/admin/gallery');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'e2e/screenshots/gallery-page.png', fullPage: true });
  });

  test('capture audit log page', async ({ page }) => {
    const base = new BasePage(page);
    await base.navigateTo('/admin/audit-log');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'e2e/screenshots/audit-log.png', fullPage: true });
  });

  test('capture login page', async ({ page, context }) => {
    // Use unauthenticated state for login page screenshot
    await context.clearCookies();
    const base = new BasePage(page);
    await base.navigateTo('/login');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'e2e/screenshots/login-page.png', fullPage: true });
  });

  test('capture public homepage', async ({ page }) => {
    const base = new BasePage(page);
    await base.navigateTo('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'e2e/screenshots/public-homepage.png', fullPage: true });
  });
});
