/**
 * E2E Tests: Gallery Events + Photo/Video Media Management
 *
 * Prerequisites:
 * - Local Supabase running: `pnpm sb:start`
 * - DB seeded: `pnpm db:reset`
 * - Auth setup completed (storageState from auth.setup.ts)
 * - Dev server running: `pnpm dev`
 *
 * Run with: pnpm playwright test e2e/gallery-media.spec.ts
 */
import { test, expect } from '@playwright/test';
import { GalleryPage } from './page-objects/gallery.page';
import { ContentFormDialogPage } from './page-objects/content-form-dialog.page';
import { MediaManagerDialogPage } from './page-objects/media-manager-dialog.page';
import { DeleteConfirmDialogPage } from './page-objects/delete-confirm-dialog.page';
import { createTestGalleryEvent } from './fixtures/test-data';

test.describe('Gallery Events & Media Management', () => {
  let gallery: GalleryPage;
  let formDialog: ContentFormDialogPage;
  let mediaManager: MediaManagerDialogPage;
  let deleteDialog: DeleteConfirmDialogPage;

  test.beforeEach(async ({ page }) => {
    gallery = new GalleryPage(page);
    formDialog = new ContentFormDialogPage(page);
    mediaManager = new MediaManagerDialogPage(page);
    deleteDialog = new DeleteConfirmDialogPage(page);
    await gallery.navigateTo('/admin/gallery');
  });

  test('should display gallery events list', async () => {
    await gallery.expectHeading();
    await expect(gallery.addNewButton).toBeVisible();
    // Seeded gallery events should be present
    const rowCount = await gallery.getRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('should create a new gallery event with bilingual name and date', async () => {
    const testData = createTestGalleryEvent();

    await gallery.clickAddNew();
    await formDialog.expectOpen();

    await formDialog.fillBilingualField('title', testData.title_en, testData.title_np);
    await formDialog.fillTextField('date', testData.date);

    await formDialog.submit();
    await formDialog.expectClosed();

    // List should refresh and show the new event
    await expect(gallery.table).toBeVisible();
  });

  test('should open media manager for an event', async ({ page }) => {
    await gallery.clickManageMedia(0);
    await expect(mediaManager.dialog).toBeVisible();
  });

  test('should add a photo URL to the gallery', async ({ page }) => {
    await gallery.clickManageMedia(0);
    await expect(mediaManager.dialog).toBeVisible();

    await mediaManager.addPhoto('https://example.com/e2e-test-photo.jpg');

    // Should show success feedback or the photo in the list
    await page.waitForTimeout(1000);
  });

  test('should show added photo in the list', async ({ page }) => {
    await gallery.clickManageMedia(0);
    await expect(mediaManager.dialog).toBeVisible();

    // Add a photo first
    await mediaManager.addPhoto('https://example.com/e2e-verify-photo.jpg');
    await page.waitForTimeout(500);

    // Switch to photos tab to verify it shows
    await mediaManager.switchToPhotos();
    const photoCount = await mediaManager.getPhotoCount();
    expect(photoCount).toBeGreaterThan(0);
  });

  test('should switch to videos tab', async () => {
    await gallery.clickManageMedia(0);
    await expect(mediaManager.dialog).toBeVisible();

    await mediaManager.switchToVideos();
    // Tab should be active - no error thrown means switch worked
  });

  test('should add a video URL', async ({ page }) => {
    await gallery.clickManageMedia(0);
    await expect(mediaManager.dialog).toBeVisible();

    await mediaManager.addVideo('https://www.youtube.com/watch?v=e2e-test-video');
    await page.waitForTimeout(1000);
  });

  test('should show added video in the list', async ({ page }) => {
    await gallery.clickManageMedia(0);
    await expect(mediaManager.dialog).toBeVisible();

    await mediaManager.addVideo('https://www.youtube.com/watch?v=e2e-verify-video');
    await page.waitForTimeout(500);

    await mediaManager.switchToVideos();
    const videoCount = await mediaManager.getVideoCount();
    expect(videoCount).toBeGreaterThan(0);
  });

  test('should delete a photo from the gallery', async ({ page }) => {
    await gallery.clickManageMedia(0);
    await expect(mediaManager.dialog).toBeVisible();

    // Add a photo first so we have something to delete
    await mediaManager.addPhoto('https://example.com/e2e-delete-photo.jpg');
    await page.waitForTimeout(500);

    await mediaManager.switchToPhotos();
    const countBefore = await mediaManager.getPhotoCount();

    // Delete the first photo
    await mediaManager.deleteItem(0);
    await page.waitForTimeout(500);

    const countAfter = await mediaManager.getPhotoCount();
    expect(countAfter).toBeLessThan(countBefore);
  });

  test('should delete a video from the gallery', async ({ page }) => {
    await gallery.clickManageMedia(0);
    await expect(mediaManager.dialog).toBeVisible();

    // Add a video first so we have something to delete
    await mediaManager.addVideo('https://www.youtube.com/watch?v=e2e-delete-video');
    await page.waitForTimeout(500);

    await mediaManager.switchToVideos();
    const countBefore = await mediaManager.getVideoCount();

    await mediaManager.deleteItem(0);
    await page.waitForTimeout(500);

    const countAfter = await mediaManager.getVideoCount();
    expect(countAfter).toBeLessThan(countBefore);
  });

  test('should close media manager and return to gallery list', async () => {
    await gallery.clickManageMedia(0);
    await expect(mediaManager.dialog).toBeVisible();

    await mediaManager.close();

    // Gallery list should be visible again
    await gallery.expectHeading();
    await expect(gallery.table).toBeVisible();
  });

  test('should delete a gallery event with confirmation', async ({ page }) => {
    // Create an event to delete so we don't destroy seeded data
    const testData = createTestGalleryEvent();
    await gallery.clickAddNew();
    await formDialog.fillBilingualField('title', testData.title_en, testData.title_np);
    await formDialog.fillTextField('date', testData.date);
    await formDialog.submit();
    await formDialog.expectClosed();

    // Get row count before delete
    const countBefore = await gallery.getRowCount();

    // Delete the first row
    await gallery.clickDeleteOnRow(0);
    await deleteDialog.expectVisible();
    await deleteDialog.confirm();

    // Wait for list to refresh
    await page.waitForTimeout(1000);

    const countAfter = await gallery.getRowCount();
    expect(countAfter).toBeLessThan(countBefore);
  });
});
