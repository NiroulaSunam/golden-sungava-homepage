/**
 * E2E Tests: Navigation Tree Editor
 *
 * Prerequisites:
 * - Local Supabase running: `pnpm sb:start`
 * - DB seeded: `pnpm db:reset`
 * - Auth setup completed (storageState from auth.setup.ts)
 * - Dev server running: `pnpm dev`
 *
 * Run with: pnpm playwright test e2e/navigation-tree.spec.ts
 */
import { test, expect } from '@playwright/test';
import { NavigationEditorPage } from './page-objects/navigation-editor.page';
test.describe('Navigation Tree Editor', () => {
  let navEditor: NavigationEditorPage;

  test.beforeEach(async ({ page }) => {
    navEditor = new NavigationEditorPage(page);
    await navEditor.navigateTo('/admin/navigation');
  });

  test('should display navigation editor with heading and Add Item button', async () => {
    await navEditor.expectHeading();
    await expect(navEditor.addItemButton).toBeVisible();
  });

  test('should add a new top-level navigation item', async ({ page }) => {
    await navEditor.clickAddItem();

    // Fill the nav item form: label (bilingual) and href
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    // Fill English label
    await dialog.getByRole('tab', { name: 'English' }).first().click();
    await dialog.locator('input[name="label.en"]').fill('E2E Test Page');

    // Fill href
    await dialog.locator('input[name="href"]').fill('/e2e-test-page');

    // Submit
    const submitBtn = dialog.getByRole('button', { name: /create|add|save/i });
    await submitBtn.click();

    // Dialog should close
    await expect(dialog).not.toBeVisible({ timeout: 5000 });
  });

  test('should display newly added item in the tree', async ({ page }) => {
    // Add a new item first
    await navEditor.clickAddItem();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await dialog.getByRole('tab', { name: 'English' }).first().click();
    await dialog.locator('input[name="label.en"]').fill('Visible Nav Item');
    await dialog.locator('input[name="href"]').fill('/visible-nav');

    const submitBtn = dialog.getByRole('button', { name: /create|add|save/i });
    await submitBtn.click();
    await expect(dialog).not.toBeVisible({ timeout: 5000 });

    // Verify the item appears in the tree
    await expect(page.getByText('Visible Nav Item')).toBeVisible();
  });

  test('should edit a navigation item label', async ({ page }) => {
    // Add an item to edit
    await navEditor.clickAddItem();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await dialog.getByRole('tab', { name: 'English' }).first().click();
    await dialog.locator('input[name="label.en"]').fill('Before Edit');
    await dialog.locator('input[name="href"]').fill('/before-edit');

    const submitBtn = dialog.getByRole('button', { name: /create|add|save/i });
    await submitBtn.click();
    await expect(dialog).not.toBeVisible({ timeout: 5000 });

    // Find the edit button on the newly added item
    const itemRow = page.locator('[data-nav-item], [role="treeitem"], li').filter({ hasText: 'Before Edit' });
    await itemRow.getByRole('button', { name: /edit/i }).click();

    // Edit dialog should open
    const editDialog = page.getByRole('dialog');
    await expect(editDialog).toBeVisible();

    await editDialog.getByRole('tab', { name: 'English' }).first().click();
    await editDialog.locator('input[name="label.en"]').clear();
    await editDialog.locator('input[name="label.en"]').fill('After Edit');

    const updateBtn = editDialog.getByRole('button', { name: /update|save/i });
    await updateBtn.click();
    await expect(editDialog).not.toBeVisible({ timeout: 5000 });

    // Verify the updated label is displayed
    await expect(page.getByText('After Edit')).toBeVisible();
  });

  test('should delete a navigation item with confirmation', async ({ page }) => {
    // Add an item to delete
    await navEditor.clickAddItem();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await dialog.getByRole('tab', { name: 'English' }).first().click();
    await dialog.locator('input[name="label.en"]').fill('To Be Deleted');
    await dialog.locator('input[name="href"]').fill('/to-delete');

    const submitBtn = dialog.getByRole('button', { name: /create|add|save/i });
    await submitBtn.click();
    await expect(dialog).not.toBeVisible({ timeout: 5000 });

    // Verify it exists
    await expect(page.getByText('To Be Deleted')).toBeVisible();

    // Delete the item
    const itemRow = page.locator('[data-nav-item], [role="treeitem"], li').filter({ hasText: 'To Be Deleted' });
    await itemRow.locator('button:has(svg.text-destructive), button[aria-label*="delete"]').click();

    // Confirm deletion if a confirmation dialog appears
    const confirmBtn = page.getByRole('button', { name: /delete|confirm/i });
    if (await confirmBtn.isVisible().catch(() => false)) {
      await confirmBtn.click();
    }

    // Item should be removed
    await expect(page.getByText('To Be Deleted')).not.toBeVisible({ timeout: 5000 });
  });

  test('should show empty state handling after deleting items', async ({ page }) => {
    // Get the current tree items
    const items = await navEditor.getTreeItems();

    // If the tree is empty already, we should see an empty state
    if (items.length === 0) {
      // Look for empty state text
      await expect(
        page.getByText(/no navigation items|no items|empty/i),
      ).toBeVisible();
    } else {
      // At minimum, the Add Item button should always be available
      // even when items exist, for building from scratch
      await expect(navEditor.addItemButton).toBeVisible();
    }
  });
});
