import { type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ContentFormDialogPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get dialog() {
    return this.page.getByRole('dialog');
  }

  get submitButton() {
    const createBtn = this.dialog.getByRole('button', { name: 'Create' });
    const updateBtn = this.dialog.getByRole('button', { name: 'Update' });
    return { createBtn, updateBtn };
  }

  get cancelButton() {
    return this.dialog.getByRole('button', { name: 'Cancel' });
  }

  async fillBilingualField(fieldName: string, en: string, np?: string) {
    await this.fillBilingualFieldIn(this.dialog, fieldName, en, np);
  }

  async fillTextField(fieldName: string, value: string) {
    await this.dialog.locator(`input[name="${fieldName}"]`).fill(value);
  }

  async submit() {
    const { createBtn, updateBtn } = this.submitButton;

    if (await createBtn.isVisible().catch(() => false)) {
      await createBtn.click();
    } else {
      await updateBtn.click();
    }
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async expectOpen(title?: string) {
    await expect(this.dialog).toBeVisible();
    if (title) {
      await expect(
        this.dialog.getByRole('heading', { name: title }),
      ).toBeVisible();
    }
  }

  async expectClosed() {
    await expect(this.dialog).not.toBeVisible();
  }

  // Preview features

  get previewButton() {
    return this.dialog.getByRole('button', { name: 'Preview' });
  }

  get editButton() {
    return this.dialog.getByRole('button', { name: 'Edit' });
  }

  async togglePreview() {
    const previewBtn = this.previewButton;
    if (await previewBtn.isVisible().catch(() => false)) {
      await previewBtn.click();
    } else {
      await this.editButton.click();
    }
  }

  async expectPreviewMode() {
    await expect(this.editButton).toBeVisible();
  }

  async expectEditMode() {
    await expect(this.previewButton).toBeVisible();
  }

  async expectImageLightbox() {
    await expect(this.page.locator('[role="dialog"][aria-label="Image preview"]')).toBeVisible();
  }

  async closeLightbox() {
    await this.page.locator('[aria-label="Close"]').click();
  }
}
