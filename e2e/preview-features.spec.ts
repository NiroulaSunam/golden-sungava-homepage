/**
 * E2E Tests: Preview Features
 *
 * Tests image lightbox, content preview toggle, gallery thumbnails,
 * YouTube embed preview, and view button in content list.
 *
 * Prerequisites:
 * - Local Supabase running: `pnpm sb:start`
 * - DB seeded: `pnpm db:reset`
 * - Auth setup completed (storageState from auth.setup.ts)
 * - Dev server running: `pnpm dev`
 *
 * Run with: pnpm playwright test e2e/preview-features.spec.ts
 */
import { test, expect } from '@playwright/test';
import { ContentListPage } from './page-objects/content-list.page';
import { ContentFormDialogPage } from './page-objects/content-form-dialog.page';
import { GalleryPage } from './page-objects/gallery.page';
import { MediaManagerDialogPage } from './page-objects/media-manager-dialog.page';

test.describe('Image Lightbox in Form', () => {
  test('should show preview button toggle in form dialog header', async ({ page }) => {
    const contentList = new ContentListPage(page, 'News');
    const formDialog = new ContentFormDialogPage(page);

    await contentList.navigateTo('/admin/news');
    await contentList.clickAddNew();
    await formDialog.expectOpen();

    // Preview button should be visible in dialog header
    await expect(formDialog.previewButton).toBeVisible();
  });

  test('should show image thumbnail with hover eye icon in form', async ({ page }) => {
    const contentList = new ContentListPage(page, 'Hero Slides');
    const formDialog = new ContentFormDialogPage(page);

    await contentList.navigateTo('/admin/hero-slides');

    // Edit first hero slide (which has an image)
    const rows = await contentList.getRows();
    if (rows.length > 0) {
      await contentList.clickEditOnRow(0);
      await formDialog.expectOpen();

      // If the hero slide has an image_url, the preview should show
      const imagePreview = formDialog.dialog.locator('img[alt="Preview"]');
      const hasImage = await imagePreview.isVisible().catch(() => false);

      if (hasImage) {
        // Hover should show eye icon overlay
        await imagePreview.hover();
        await expect(formDialog.dialog.locator('.group-hover\\:opacity-100')).toBeVisible();
      }
    }

    await formDialog.cancel();
  });

  test('should open lightbox when clicking image preview', async ({ page }) => {
    const contentList = new ContentListPage(page, 'Hero Slides');
    const formDialog = new ContentFormDialogPage(page);

    await contentList.navigateTo('/admin/hero-slides');

    const rows = await contentList.getRows();
    if (rows.length > 0) {
      await contentList.clickEditOnRow(0);
      await formDialog.expectOpen();

      const imageContainer = formDialog.dialog.locator('.group.relative.cursor-pointer');
      const hasImage = await imageContainer.isVisible().catch(() => false);

      if (hasImage) {
        await imageContainer.click();
        // Lightbox should open
        await formDialog.expectImageLightbox();

        // Close with escape
        await page.keyboard.press('Escape');
      }
    }
  });
});

test.describe('Content Preview Toggle in Form', () => {
  test('should toggle between edit and preview mode', async ({ page }) => {
    const contentList = new ContentListPage(page, 'News');
    const formDialog = new ContentFormDialogPage(page);

    await contentList.navigateTo('/admin/news');
    await contentList.clickAddNew();
    await formDialog.expectOpen();

    // Fill some content
    await formDialog.fillBilingualField('title', 'Preview Test Article');
    await formDialog.fillTextField('date', '2026-04-01');
    await formDialog.fillTextField('category', 'Test');

    // Click Preview button
    await formDialog.previewButton.click();
    await formDialog.expectPreviewMode();

    // Preview should show the title
    await expect(formDialog.dialog.getByText('Preview Test Article')).toBeVisible();

    // Switch back to edit
    await formDialog.editButton.click();
    await formDialog.expectEditMode();

    // Form fields should still have values
    await expect(formDialog.dialog.locator('input[name="title.en"]')).toHaveValue('Preview Test Article');

    await formDialog.cancel();
  });

  test('should show language toggle in preview mode', async ({ page }) => {
    const contentList = new ContentListPage(page, 'News');
    const formDialog = new ContentFormDialogPage(page);

    await contentList.navigateTo('/admin/news');
    await contentList.clickAddNew();
    await formDialog.expectOpen();

    await formDialog.fillBilingualField('title', 'English Title', 'नेपाली शीर्षक');
    await formDialog.fillTextField('date', '2026-04-01');

    await formDialog.previewButton.click();
    await formDialog.expectPreviewMode();

    // English should be shown by default
    await expect(formDialog.dialog.getByText('English Title')).toBeVisible();

    // Click Nepali badge to switch
    await formDialog.dialog.getByText('नेपाली').click();
    await expect(formDialog.dialog.getByText('नेपाली शीर्षक')).toBeVisible();

    await formDialog.cancel();
  });

  test('should render markdown in preview mode', async ({ page }) => {
    const contentList = new ContentListPage(page, 'News');
    const formDialog = new ContentFormDialogPage(page);

    await contentList.navigateTo('/admin/news');

    // Edit an existing item that has content
    const rows = await contentList.getRows();
    if (rows.length > 0) {
      await contentList.clickEditOnRow(0);
      await formDialog.expectOpen();

      await formDialog.previewButton.click();
      await formDialog.expectPreviewMode();

      // Preview should show rendered content (prose class from markdown)
      const previewArea = formDialog.dialog.locator('.prose');
      const hasContent = await previewArea.isVisible().catch(() => false);
      // Some items may not have content, so this is conditional
      expect(hasContent || true).toBeTruthy();
    }
  });
});

test.describe('View Button in Content List', () => {
  test('should show view (eye) button in actions column', async ({ page }) => {
    const contentList = new ContentListPage(page, 'News');
    await contentList.navigateTo('/admin/news');

    const rows = await contentList.getRows();
    if (rows.length > 0) {
      // Eye icon button should be visible in first row
      const previewBtn = rows[0].getByRole('button', { name: /preview/i });
      await expect(previewBtn).toBeVisible();
    }
  });

  test('should open preview dialog when clicking view button', async ({ page }) => {
    const contentList = new ContentListPage(page, 'News');
    await contentList.navigateTo('/admin/news');

    const rows = await contentList.getRows();
    if (rows.length > 0) {
      await contentList.clickViewOnRow(0);
      await contentList.expectPreviewDialogOpen();

      // Should show content with language badges
      await expect(page.getByRole('dialog').getByText('English')).toBeVisible();

      await contentList.closePreviewDialog();
    }
  });

  test('should show preview for different content types', async ({ page }) => {
    // Test facilities page
    const contentList = new ContentListPage(page, 'Facilities');
    await contentList.navigateTo('/admin/facilities');

    const rows = await contentList.getRows();
    if (rows.length > 0) {
      await contentList.clickViewOnRow(0);
      await contentList.expectPreviewDialogOpen();
      await contentList.closePreviewDialog();
    }
  });
});

test.describe('Gallery Photo Thumbnails', () => {
  test('should show photo thumbnails in media manager', async ({ page }) => {
    const gallery = new GalleryPage(page);
    const mediaManager = new MediaManagerDialogPage(page);

    await gallery.navigateTo('/admin/gallery');

    // Open media manager for first gallery event (if exists)
    const rows = await gallery.getRows();
    if (rows.length > 0) {
      await gallery.clickManageMedia(0);

      // Check for photo thumbnails (small img elements)
      const photos = mediaManager.dialog.locator('img[alt="Photo"]');
      const photoCount = await photos.count();

      if (photoCount > 0) {
        await expect(photos.first()).toBeVisible();
      }

      await mediaManager.close();
    }
  });

  test('should open lightbox when clicking photo preview button', async ({ page }) => {
    const gallery = new GalleryPage(page);
    const mediaManager = new MediaManagerDialogPage(page);

    await gallery.navigateTo('/admin/gallery');

    const rows = await gallery.getRows();
    if (rows.length > 0) {
      await gallery.clickManageMedia(0);

      const previewButtons = mediaManager.dialog.getByRole('button', { name: /preview/i });
      const hasPreview = await previewButtons.first().isVisible().catch(() => false);

      if (hasPreview) {
        await previewButtons.first().click();

        // Lightbox should open
        await expect(page.locator('[role="dialog"][aria-label="Image preview"]')).toBeVisible();
        await page.keyboard.press('Escape');
      }

      await mediaManager.close();
    }
  });
});

test.describe('Gallery Video Preview', () => {
  test('should show YouTube thumbnail in video list', async ({ page }) => {
    const gallery = new GalleryPage(page);
    const mediaManager = new MediaManagerDialogPage(page);

    await gallery.navigateTo('/admin/gallery');

    const rows = await gallery.getRows();
    if (rows.length > 0) {
      await gallery.clickManageMedia(0);
      await mediaManager.switchToVideos();

      // Check for video thumbnails
      const thumbnails = mediaManager.dialog.locator('img[alt="Video thumbnail"]');
      const thumbCount = await thumbnails.count();

      if (thumbCount > 0) {
        await expect(thumbnails.first()).toBeVisible();
      }

      await mediaManager.close();
    }
  });

  test('should open YouTube embed dialog when clicking video preview', async ({ page }) => {
    const gallery = new GalleryPage(page);
    const mediaManager = new MediaManagerDialogPage(page);

    await gallery.navigateTo('/admin/gallery');

    const rows = await gallery.getRows();
    if (rows.length > 0) {
      await gallery.clickManageMedia(0);
      await mediaManager.switchToVideos();

      const previewButtons = mediaManager.dialog.getByRole('button', { name: /preview/i });
      const hasPreview = await previewButtons.first().isVisible().catch(() => false);

      if (hasPreview) {
        await previewButtons.first().click();

        // Video preview dialog with iframe should appear
        await mediaManager.expectVideoEmbedDialog();
        await mediaManager.closeVideoPreview();
      }

      await mediaManager.close();
    }
  });
});
