import { type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class MediaManagerDialogPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get dialog() {
    return this.page.getByRole('dialog');
  }

  async switchToPhotos() {
    await this.dialog.getByRole('tab', { name: /photo/i }).click();
  }

  async switchToVideos() {
    await this.dialog.getByRole('tab', { name: /video/i }).click();
  }

  async addPhoto(url: string) {
    await this.switchToPhotos();
    await this.dialog.getByPlaceholder(/url/i).fill(url);
    await this.dialog.getByRole('button', { name: /add/i }).click();
  }

  async addVideo(url: string) {
    await this.switchToVideos();
    await this.dialog.getByPlaceholder(/url/i).fill(url);
    await this.dialog.getByRole('button', { name: /add/i }).click();
  }

  async deleteItem(index: number) {
    const deleteButtons = this.dialog.locator(
      'button:has(svg.text-destructive), button[aria-label*="delete"], button[aria-label*="remove"]',
    );
    await deleteButtons.nth(index).click();
  }

  async getPhotoCount() {
    await this.switchToPhotos();
    const items = this.dialog.locator('[data-photo], img, [class*="photo"]');
    return items.count();
  }

  async getVideoCount() {
    await this.switchToVideos();
    const items = this.dialog.locator('[data-video], iframe, [class*="video"]');
    return items.count();
  }

  async close() {
    const closeBtn = this.dialog.getByRole('button', { name: /close/i });
    if (await closeBtn.isVisible().catch(() => false)) {
      await closeBtn.click();
    } else {
      await this.page.keyboard.press('Escape');
    }
    await expect(this.dialog).not.toBeVisible();
  }

  // Preview features

  async expectPhotoThumbnails() {
    await this.switchToPhotos();
    const images = this.dialog.locator('img[alt="Photo"]');
    await expect(images.first()).toBeVisible();
  }

  async expectVideoThumbnails() {
    await this.switchToVideos();
    const thumbnails = this.dialog.locator('img[alt="Video thumbnail"]');
    await expect(thumbnails.first()).toBeVisible();
  }

  async clickPhotoPreview(index: number) {
    await this.switchToPhotos();
    const previewButtons = this.dialog.getByRole('button', { name: /preview/i });
    await previewButtons.nth(index).click();
  }

  async clickVideoPreview(index: number) {
    await this.switchToVideos();
    const previewButtons = this.dialog.getByRole('button', { name: /preview/i });
    await previewButtons.nth(index).click();
  }

  async expectVideoEmbedDialog() {
    const dialog = this.page.getByRole('dialog').filter({ hasText: 'Video Preview' });
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('iframe')).toBeVisible();
  }

  async closeVideoPreview() {
    await this.page.getByRole('dialog').filter({ hasText: 'Video Preview' }).getByRole('button', { name: 'Close' }).click();
  }
}
