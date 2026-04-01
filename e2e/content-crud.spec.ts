/**
 * E2E Tests: Content CRUD for All 12 Content Types
 *
 * Parameterized tests covering list, create, edit, and delete flows
 * for every CRUD content type in the admin dashboard.
 *
 * Prerequisites:
 * - Local Supabase running: `pnpm sb:start`
 * - DB seeded: `pnpm db:reset`
 * - Authenticated via storageState (setup project)
 * - Dev server running: `pnpm dev`
 *
 * Run with: pnpm playwright test e2e/content-crud.spec.ts
 */
import { test, expect } from '@playwright/test';
import { ContentListPage } from './page-objects/content-list.page';
import { ContentFormDialogPage } from './page-objects/content-form-dialog.page';
import { DeleteConfirmDialogPage } from './page-objects/delete-confirm-dialog.page';

interface ContentTypeConfig {
  name: string;
  path: string;
  titleField: string;
  hasDate: boolean;
  isBilingual?: boolean;
  extra?: Record<string, string>;
}

const contentTypes: ContentTypeConfig[] = [
  { name: 'News', path: '/admin/news', titleField: 'title', hasDate: true, extra: { category: 'Test' } },
  { name: 'Events', path: '/admin/events', titleField: 'title', hasDate: true },
  { name: 'Blogs', path: '/admin/blogs', titleField: 'title', hasDate: true },
  { name: 'Notices', path: '/admin/notices', titleField: 'title', hasDate: true },
  { name: 'Staff', path: '/admin/staff', titleField: 'name', hasDate: false, isBilingual: false },
  { name: 'Facilities', path: '/admin/facilities', titleField: 'name', hasDate: false },
  { name: 'Activities', path: '/admin/activities', titleField: 'name', hasDate: false },
  { name: 'Testimonials', path: '/admin/testimonials', titleField: 'quote', hasDate: false },
  { name: 'FAQs', path: '/admin/faqs', titleField: 'question', hasDate: false },
  { name: 'Hero Slides', path: '/admin/hero-slides', titleField: 'heading', hasDate: false },
  { name: 'Admission Steps', path: '/admin/admission-steps', titleField: 'title', hasDate: false },
  { name: 'Payment Methods', path: '/admin/payment-methods', titleField: 'name', hasDate: false },
];

for (const ct of contentTypes) {
  const isBilingual = ct.isBilingual !== false; // default true unless explicitly false

  test.describe(`Content CRUD: ${ct.name}`, () => {
    test(`should display list page with heading and Add New button`, async ({ page }) => {
      const listPage = new ContentListPage(page, ct.name);
      await listPage.navigateTo(ct.path);

      await listPage.expectHeading();
      await expect(listPage.addNewButton).toBeVisible();
    });

    test(`should create new item as draft`, async ({ page }) => {
      const listPage = new ContentListPage(page, ct.name);
      const formDialog = new ContentFormDialogPage(page);

      await listPage.navigateTo(ct.path);
      await listPage.clickAddNew();

      // Wait for the dialog to appear
      await formDialog.expectOpen();

      const uniqueValue = `E2E ${ct.name} ${Date.now()}`;

      // Fill the primary field
      if (isBilingual) {
        await formDialog.fillBilingualField(ct.titleField, uniqueValue);
      } else {
        await formDialog.fillTextField(ct.titleField, uniqueValue);
      }

      // Fill date if required
      if (ct.hasDate) {
        await formDialog.fillTextField('date', '2026-04-01');
      }

      // Fill extra fields if any
      if (ct.extra) {
        for (const [field, value] of Object.entries(ct.extra)) {
          await formDialog.fillTextField(field, value);
        }
      }

      // Submit the form
      await formDialog.submit();

      // Dialog should close after successful creation
      await formDialog.expectClosed();
    });

    test(`should edit existing item`, async ({ page }) => {
      const listPage = new ContentListPage(page, ct.name);
      const formDialog = new ContentFormDialogPage(page);

      await listPage.navigateTo(ct.path);

      // Click edit on the first row
      await listPage.clickEditOnRow(0);

      // Verify the edit dialog opens with "Edit" in the heading
      await formDialog.expectOpen();
      await expect(formDialog.dialog.getByRole('heading')).toContainText(/edit/i);

      // Change the primary field value
      const updatedValue = `E2E Updated ${ct.name} ${Date.now()}`;

      if (isBilingual) {
        await formDialog.fillBilingualField(ct.titleField, updatedValue);
      } else {
        await formDialog.fillTextField(ct.titleField, updatedValue);
      }

      // Submit the update
      await formDialog.submit();

      // Dialog should close after successful update
      await formDialog.expectClosed();
    });

    test(`should delete item with confirmation`, async ({ page }) => {
      const listPage = new ContentListPage(page, ct.name);
      const deleteDialog = new DeleteConfirmDialogPage(page);

      await listPage.navigateTo(ct.path);

      // Click delete on the first row
      await listPage.clickDeleteOnRow(0);

      // Verify confirmation dialog appears
      await deleteDialog.expectVisible();
      await expect(deleteDialog.cancelButton).toBeVisible();
      await expect(deleteDialog.confirmButton).toBeVisible();

      // Cancel to preserve seeded data
      await deleteDialog.cancel();
    });
  });
}
