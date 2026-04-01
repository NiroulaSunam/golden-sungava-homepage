/**
 * E2E Tests: Singleton Editor Pages (Site Config & Principal Message)
 *
 * Tests for single-instance configuration pages that use inline forms
 * rather than CRUD list+dialog patterns.
 *
 * Prerequisites:
 * - Local Supabase running: `pnpm sb:start`
 * - DB seeded: `pnpm db:reset`
 * - Authenticated via storageState (setup project)
 * - Dev server running: `pnpm dev`
 *
 * Run with: pnpm playwright test e2e/singleton-editors.spec.ts
 */
import { test, expect } from '@playwright/test';
import { SingletonEditorPage } from './page-objects/singleton-editor.page';
import { BasePage } from './page-objects/base.page';

test.describe('Site Configuration', () => {
  test('should display site config form with heading', async ({ page }) => {
    const editor = new SingletonEditorPage(page, 'Site Configuration');
    await editor.navigateTo('/admin/site-config');

    await editor.expectHeading();
    await expect(page.getByText('School Name')).toBeVisible();
    await expect(editor.saveButton).toBeVisible();
  });

  test('should edit school name (bilingual) and save', async ({ page }) => {
    const editor = new SingletonEditorPage(page, 'Site Configuration');
    await editor.navigateTo('/admin/site-config');

    const uniqueName = `Golden Sungava ${Date.now()}`;
    await editor.fillBilingualField('school_name', uniqueName, `गोल्डेन सुनगाभा ${Date.now()}`);
    await editor.save();

    await editor.expectSaved();
  });

  test('should persist changes after reload', async ({ page }) => {
    const editor = new SingletonEditorPage(page, 'Site Configuration');
    await editor.navigateTo('/admin/site-config');

    const uniqueName = `Persist Test ${Date.now()}`;
    await editor.fillBilingualField('school_name', uniqueName);
    await editor.save();
    await editor.expectSaved();

    // Reload the page and verify the value persisted
    await page.reload();
    await editor.expectHeading();

    const schoolNameInput = page.locator('input[name="school_name.en"]');
    await expect(schoolNameInput).toHaveValue(uniqueName);
  });

  test('should show success toast on save', async ({ page }) => {
    const editor = new SingletonEditorPage(page, 'Site Configuration');
    const basePage = new BasePage(page);
    await editor.navigateTo('/admin/site-config');

    await editor.save();
    await basePage.expectToast('Saved');
  });
});

test.describe('Principal Message', () => {
  test('should display principal message form with heading', async ({ page }) => {
    const editor = new SingletonEditorPage(page, "Principal's Message");
    await editor.navigateTo('/admin/principal-message');

    await editor.expectHeading();
    await expect(page.getByText('Principal Name')).toBeVisible();
    await expect(editor.saveButton).toBeVisible();
  });

  test('should edit principal name and message', async ({ page }) => {
    const editor = new SingletonEditorPage(page, "Principal's Message");
    await editor.navigateTo('/admin/principal-message');

    const uniqueName = `Principal ${Date.now()}`;
    await editor.fillBilingualField('name', uniqueName);
    await editor.save();

    await editor.expectSaved();
  });

  test('should show bilingual tabs for fields', async ({ page }) => {
    await page.goto('/admin/principal-message');

    // Bilingual tabs should be present for message fields
    await expect(page.getByRole('tab', { name: 'English' }).first()).toBeVisible();
    await expect(page.getByRole('tab', { name: 'नेपाली' }).first()).toBeVisible();
  });

  test('should save and persist changes', async ({ page }) => {
    const editor = new SingletonEditorPage(page, "Principal's Message");
    await editor.navigateTo('/admin/principal-message');

    const uniqueName = `Principal Persist ${Date.now()}`;
    await editor.fillBilingualField('name', uniqueName);
    await editor.save();
    await editor.expectSaved();

    // Reload and verify persistence
    await page.reload();
    await editor.expectHeading();

    const nameInput = page.locator('input[name="name.en"]');
    await expect(nameInput).toHaveValue(uniqueName);
  });
});
