/**
 * E2E Tests: Authentication Flow
 *
 * Tests login, logout, session persistence, and redirect behavior.
 * These tests start unauthenticated (no storageState).
 *
 * Prerequisites:
 * - Local Supabase running: `pnpm sb:start`
 * - DB seeded: `pnpm db:reset`
 * - Test admin user created with role='admin' in profiles
 * - Dev server running: `pnpm dev`
 *
 * Run with: pnpm playwright test e2e/auth.spec.ts
 */
import { test, expect } from '@playwright/test';
import { LoginPage } from './page-objects/login.page';
import { BasePage } from './page-objects/base.page';

const TEST_ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL || 'admin@test.com';
const TEST_ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD || 'testpassword123';

// Override storage state for auth tests -- start unauthenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Authentication Flow', () => {
  test('should redirect /admin to /login when unauthenticated', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/login/);
  });

  test('should render login page with heading and form', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('/login');

    await loginPage.expectLoginPage();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
    await expect(page.getByText('Sign in to manage school content')).toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(TEST_ADMIN_EMAIL, TEST_ADMIN_PASSWORD);

    await expect(page).toHaveURL('/admin');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('invalid@example.com', 'wrongpassword');

    await expect(page).toHaveURL(/\/login/);
    await loginPage.expectError();
  });

  test('should show error for empty email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('/login');

    // Attempt to submit without filling any fields
    await loginPage.signInButton.click();

    // Should remain on login page (HTML5 validation or form-level error)
    await expect(page).toHaveURL(/\/login/);
  });

  test('should persist session after navigation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(TEST_ADMIN_EMAIL, TEST_ADMIN_PASSWORD);
    await expect(page).toHaveURL('/admin');

    // Navigate to a content page
    await page.goto('/admin/news');
    await expect(page.getByRole('heading', { name: 'News' })).toBeVisible();

    // Navigate back to dashboard
    await page.goto('/admin');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should sign out and redirect to login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(TEST_ADMIN_EMAIL, TEST_ADMIN_PASSWORD);
    await expect(page).toHaveURL('/admin');

    // Open user menu and sign out
    await page.getByRole('button', { name: 'User menu' }).click();
    await page.getByText('Sign Out').click();

    await expect(page).toHaveURL(/\/login/);
  });

  test('should redirect to login after signing out when accessing /admin', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(TEST_ADMIN_EMAIL, TEST_ADMIN_PASSWORD);
    await expect(page).toHaveURL('/admin');

    // Sign out
    await page.getByRole('button', { name: 'User menu' }).click();
    await page.getByText('Sign Out').click();
    await expect(page).toHaveURL(/\/login/);

    // Try to access admin again
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/login/);
  });
});
