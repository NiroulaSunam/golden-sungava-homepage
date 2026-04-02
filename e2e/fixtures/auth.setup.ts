import { test as setup, expect } from '@playwright/test';

const TEST_ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL || 'admin@test.com';
const TEST_ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD || 'testpassword123';
const ADMIN_AUTH_FILE = 'e2e/.auth/admin.json';

setup('authenticate as admin', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Email' }).fill(TEST_ADMIN_EMAIL);
  await page.getByRole('textbox', { name: 'Password' }).fill(TEST_ADMIN_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL('/admin');
  await page.context().storageState({ path: ADMIN_AUTH_FILE });
});
