import { type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class DeleteConfirmDialogPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get dialog() {
    return this.page.getByRole('dialog');
  }

  get confirmButton() {
    return this.dialog.getByRole('button', { name: /delete|confirm/i });
  }

  get cancelButton() {
    return this.dialog.getByRole('button', { name: 'Cancel' });
  }

  async confirm() {
    await this.confirmButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async expectVisible() {
    await expect(
      this.page.getByRole('heading', { name: 'Confirm Delete' }),
    ).toBeVisible();
  }
}
