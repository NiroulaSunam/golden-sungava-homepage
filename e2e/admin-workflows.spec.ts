/**
 * E2E Tests: Admin Page Navigation Smoke Tests
 *
 * Verifies that all admin pages load correctly.
 * Auth, CRUD, publish, and mobile tests are in dedicated spec files.
 *
 * Prerequisites:
 * - Local Supabase running: `pnpm sb:start`
 * - DB seeded: `pnpm db:reset`
 * - Auth setup completed (storageState from auth.setup.ts)
 * - Dev server running: `pnpm dev`
 *
 * Run with: pnpm playwright test e2e/admin-workflows.spec.ts
 */
import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard', () => {
  test('should display sidebar with all content sections', async ({ page }) => {
    await page.goto('/admin');

    const navItems = [
      'Dashboard', 'News', 'Events', 'Blogs', 'Notices', 'Staff',
      'Facilities', 'Activities', 'Testimonials', 'FAQs', 'Gallery',
      'Hero Slides', 'Navigation', 'Admission Steps', 'Payment Methods',
      'Principal Message', 'Site Config',
    ];

    for (const item of navItems) {
      await expect(page.getByRole('link', { name: item })).toBeVisible();
    }
  });

  test('should display content section cards on dashboard', async ({ page }) => {
    await page.goto('/admin');
    await expect(page.getByText('News')).toBeVisible();
    await expect(page.getByText('Events')).toBeVisible();
    await expect(page.getByText('Gallery')).toBeVisible();
  });

  test('should show publish button in topbar', async ({ page }) => {
    await page.goto('/admin');
    await expect(page.getByRole('button', { name: /Publish/ })).toBeVisible();
  });

  test('should show user menu with sign out option', async ({ page }) => {
    await page.goto('/admin');
    await page.getByRole('button', { name: 'User menu' }).click();
    await expect(page.getByText('Sign Out')).toBeVisible();
  });
});

test.describe('Admin Page Navigation', () => {
  test('should navigate to facilities page', async ({ page }) => {
    await page.goto('/admin');
    await page.getByRole('link', { name: 'Facilities' }).click();
    await expect(page.getByRole('heading', { name: 'Facilities' })).toBeVisible();
  });

  test('should navigate to site config editor', async ({ page }) => {
    await page.goto('/admin');
    await page.getByRole('link', { name: 'Site Config' }).click();
    await expect(page.getByRole('heading', { name: 'Site Configuration' })).toBeVisible();
    await expect(page.getByText('School Name')).toBeVisible();
  });

  test('should navigate to principal message editor', async ({ page }) => {
    await page.goto('/admin');
    await page.getByRole('link', { name: 'Principal Message' }).click();
    await expect(page.getByRole('heading', { name: "Principal's Message" })).toBeVisible();
    await expect(page.getByText('Principal Name')).toBeVisible();
  });

  test('should navigate to gallery with media management', async ({ page }) => {
    await page.goto('/admin');
    await page.getByRole('link', { name: 'Gallery' }).click();
    await expect(page.getByRole('heading', { name: 'Gallery Events' })).toBeVisible();
  });

  test('should navigate to navigation tree editor', async ({ page }) => {
    await page.goto('/admin');
    await page.getByRole('link', { name: 'Navigation' }).click();
    await expect(page.getByRole('heading', { name: 'Navigation' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Item' })).toBeVisible();
  });
});
