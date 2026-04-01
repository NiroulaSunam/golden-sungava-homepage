import { type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class PublishDialogPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get publishButton() {
    return this.page.getByRole('button', { name: /Publish/ });
  }

  async getDraftCount() {
    const badge = this.publishButton.locator('span, [data-badge]');
    return badge.textContent();
  }

  async openPublishDialog() {
    await this.publishButton.click();
  }

  async publish() {
    await this.page.getByRole('button', { name: 'Publish Now' }).click();
  }

  async cancel() {
    await this.page.getByRole('button', { name: 'Cancel' }).click();
  }

  async expectEnabled() {
    await expect(this.publishButton).toBeEnabled();
  }

  async expectDisabled() {
    await expect(this.publishButton).toBeDisabled();
  }
}
