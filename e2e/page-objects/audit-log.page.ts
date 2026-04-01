import { type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class AuditLogPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading() {
    return this.page.getByRole('heading', { name: 'Audit Log' });
  }

  get actionFilter() {
    return this.page.getByRole('combobox', { name: /action/i });
  }

  get table() {
    return this.page.locator('table');
  }

  async getEntries() {
    return this.table.locator('tbody tr').all();
  }

  async filterByAction(action: string) {
    await this.actionFilter.selectOption(action);
  }

  async expandEntry(index: number) {
    const entries = await this.getEntries();
    await entries[index]
      .getByRole('button', { name: /expand|details|view/i })
      .click();
  }

  async expectHeading() {
    await expect(this.heading).toBeVisible();
  }
}
