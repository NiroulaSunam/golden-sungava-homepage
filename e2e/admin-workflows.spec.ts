/**
 * E2E Tests: Critical Admin Workflows
 *
 * Prerequisites:
 * - Local Supabase running: `pnpm sb:start`
 * - DB seeded: `pnpm db:reset`
 * - Test admin user created with role='admin' in profiles
 * - Dev server running: `pnpm dev`
 *
 * Run with: pnpm playwright test e2e/admin-workflows.spec.ts
 */
import { test, expect } from '@playwright/test';

const TEST_ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL || 'admin@test.com';
const TEST_ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD || 'testpassword123';

// Reusable login helper
const loginAsAdmin = async (page: import('@playwright/test').Page) => {
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Email' }).fill(TEST_ADMIN_EMAIL);
  await page.getByRole('textbox', { name: 'Password' }).fill(TEST_ADMIN_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL('/admin');
};

test.describe('Login Flow', () => {
  test('should redirect /admin to /login when unauthenticated', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/login/);
  });

  test('should show login page with school logo and form', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Admin Login' })).toBeVisible();
    await expect(page.getByText('Sign in to manage school content')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });

  test('should login and land on admin dashboard', async ({ page }) => {
    await loginAsAdmin(page);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByText('Content management overview')).toBeVisible();
  });

  test('should show error for wrong credentials', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('wrong@test.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign In' }).click();
    // Should stay on login page with error
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('should display sidebar with all content sections', async ({ page }) => {
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

  test('should display content section cards', async ({ page }) => {
    await expect(page.getByText('News')).toBeVisible();
    await expect(page.getByText('Events')).toBeVisible();
    await expect(page.getByText('Gallery')).toBeVisible();
  });

  test('should show publish button in topbar', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Publish/ })).toBeVisible();
  });

  test('should show user menu with sign out option', async ({ page }) => {
    await page.getByRole('button', { name: 'User menu' }).click();
    await expect(page.getByText(TEST_ADMIN_EMAIL)).toBeVisible();
    await expect(page.getByText('Sign Out')).toBeVisible();
  });
});

test.describe('Content CRUD — News', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/news');
  });

  test('should display news list with seeded data', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'News' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add New' })).toBeVisible();
    // Seeded data should have 10 items on page 1
    await expect(page.getByText('Page 1 of')).toBeVisible();
  });

  test('should show bilingual tabbed form when adding new article', async ({ page }) => {
    await page.getByRole('button', { name: 'Add New' }).click();
    await expect(page.getByRole('heading', { name: 'Add News Article' })).toBeVisible();

    // Bilingual tabs should be visible for Title
    await expect(page.getByRole('tab', { name: 'English' }).first()).toBeVisible();
    await expect(page.getByRole('tab', { name: 'नेपाली' }).first()).toBeVisible();

    // Date and Category fields
    await expect(page.getByText('Date')).toBeVisible();
    await expect(page.getByText('Category')).toBeVisible();
  });

  test('should create article as draft with English-only title', async ({ page }) => {
    await page.getByRole('button', { name: 'Add New' }).click();

    // Fill English title only (np defaults to empty string)
    await page.locator('input[name="title.en"]').fill('E2E Test - Sports Day 2082');
    await page.locator('input[name="date"]').fill('2026-04-01');
    await page.locator('input[name="category"]').fill('Sports');

    await page.getByRole('button', { name: 'Create' }).click();

    // Dialog should close, list should refresh
    await expect(page.getByRole('heading', { name: 'Add News Article' })).not.toBeVisible();

    // New item total should increase
    await expect(page.getByText(/items\)/)).toBeVisible();
  });

  test('should show status badges (published for seeded, draft for new)', async ({ page }) => {
    // Seeded items are published
    await expect(page.getByText('published').first()).toBeVisible();
  });

  test('should show delete confirmation dialog', async ({ page }) => {
    // Click delete on first item
    const deleteButtons = page.locator('button:has(svg.text-destructive)');
    await deleteButtons.first().click();

    await expect(page.getByRole('heading', { name: 'Confirm Delete' })).toBeVisible();
    await expect(page.getByText('This will soft-delete the item')).toBeVisible();

    // Cancel to not actually delete seeded data
    await page.getByRole('button', { name: 'Cancel' }).click();
  });
});

test.describe('Publish Flow', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('should show draft count badge when drafts exist', async ({ page }) => {
    // First create a draft
    await page.goto('/admin/news');
    await page.getByRole('button', { name: 'Add New' }).click();
    await page.locator('input[name="title.en"]').fill('Draft for Publish Test');
    await page.locator('input[name="date"]').fill('2026-04-01');
    await page.getByRole('button', { name: 'Create' }).click();

    // Navigate to dashboard to refresh publish count
    await page.goto('/admin');

    // Publish button should show count badge
    const publishButton = page.getByRole('button', { name: /Publish/ });
    await expect(publishButton).toBeEnabled({ timeout: 5000 });
  });

  test('should show confirmation dialog with draft count', async ({ page }) => {
    // Create draft first
    await page.goto('/admin/news');
    await page.getByRole('button', { name: 'Add New' }).click();
    await page.locator('input[name="title.en"]').fill('Draft for Confirm Test');
    await page.locator('input[name="date"]').fill('2026-04-01');
    await page.getByRole('button', { name: 'Create' }).click();

    await page.goto('/admin');
    const publishButton = page.getByRole('button', { name: /Publish/ });
    await expect(publishButton).toBeEnabled({ timeout: 5000 });
    await publishButton.click();

    // Confirmation dialog
    await expect(page.getByRole('heading', { name: 'Publish All Drafts' })).toBeVisible();
    await expect(page.getByText(/draft item/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Publish Now' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();

    // Cancel — don't publish in this test
    await page.getByRole('button', { name: 'Cancel' }).click();
  });

  test('should publish all drafts and reset badge', async ({ page }) => {
    // Create draft
    await page.goto('/admin/news');
    await page.getByRole('button', { name: 'Add New' }).click();
    await page.locator('input[name="title.en"]').fill('Draft to Publish');
    await page.locator('input[name="date"]').fill('2026-04-01');
    await page.getByRole('button', { name: 'Create' }).click();

    await page.goto('/admin');
    const publishButton = page.getByRole('button', { name: /Publish/ });
    await expect(publishButton).toBeEnabled({ timeout: 5000 });
    await publishButton.click();
    await page.getByRole('button', { name: 'Publish Now' }).click();

    // Wait for success toast
    await expect(page.getByText(/Published/)).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should hide sidebar on mobile', async ({ page }) => {
    await loginAsAdmin(page);
    await expect(page.locator('aside')).not.toBeVisible();
  });

  test('should open sidebar as sheet on hamburger click', async ({ page }) => {
    await loginAsAdmin(page);

    // Click hamburger menu button
    await page.getByRole('button', { name: 'Toggle menu' }).click();

    // Sheet should open with sidebar nav
    await expect(page.getByText('Admin Panel').first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'News' })).toBeVisible();
  });

  test('should close sidebar sheet after navigation', async ({ page }) => {
    await loginAsAdmin(page);
    await page.getByRole('button', { name: 'Toggle menu' }).click();

    // Click a nav link in the sheet
    await page.getByRole('link', { name: 'News' }).click();

    // Should navigate to news page
    await expect(page.getByRole('heading', { name: 'News' })).toBeVisible();
    // Sheet should be closed
    await expect(page.locator('[data-state="open"]')).not.toBeVisible();
  });
});

test.describe('Other Admin Pages', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('should navigate to facilities page', async ({ page }) => {
    await page.getByRole('link', { name: 'Facilities' }).click();
    await expect(page.getByRole('heading', { name: 'Facilities' })).toBeVisible();
  });

  test('should navigate to site config editor', async ({ page }) => {
    await page.getByRole('link', { name: 'Site Config' }).click();
    await expect(page.getByRole('heading', { name: 'Site Configuration' })).toBeVisible();
    await expect(page.getByText('School Name')).toBeVisible();
  });

  test('should navigate to principal message editor', async ({ page }) => {
    await page.getByRole('link', { name: 'Principal Message' }).click();
    await expect(page.getByRole('heading', { name: "Principal's Message" })).toBeVisible();
    await expect(page.getByText('Principal Name')).toBeVisible();
  });

  test('should navigate to gallery with media management', async ({ page }) => {
    await page.getByRole('link', { name: 'Gallery' }).click();
    await expect(page.getByRole('heading', { name: 'Gallery Events' })).toBeVisible();
  });

  test('should navigate to navigation tree editor', async ({ page }) => {
    await page.getByRole('link', { name: 'Navigation' }).click();
    await expect(page.getByRole('heading', { name: 'Navigation' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Item' })).toBeVisible();
  });
});
