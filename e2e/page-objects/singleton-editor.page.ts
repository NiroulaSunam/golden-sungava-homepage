import { type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class SingletonEditorPage extends BasePage {
  constructor(
    page: Page,
    private readonly configName: string,
  ) {
    super(page);
  }

  get heading() {
    return this.page.getByRole('heading', { name: this.configName });
  }

  get saveButton() {
    return this.page.getByRole('button', { name: 'Save' });
  }

  async fillBilingualField(fieldName: string, en: string, np?: string) {
    await this.fillBilingualFieldIn(this.page, fieldName, en, np);
  }

  async fillField(fieldName: string, value: string) {
    await this.page.locator(`input[name="${fieldName}"]`).fill(value);
  }

  async save() {
    await this.saveButton.click();
  }

  async expectHeading() {
    await expect(this.heading).toBeVisible();
  }

  async expectSaved() {
    await this.expectToast('Saved');
  }
}
