import { type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ContentListPage extends BasePage {
  constructor(
    page: Page,
    private readonly contentName: string,
  ) {
    super(page);
  }

  get heading() {
    return this.page.getByRole('heading', { name: this.contentName });
  }

  get addNewButton() {
    return this.page.getByRole('button', { name: 'Add New' });
  }

  get searchInput() {
    return this.page.getByPlaceholder('Search');
  }

  get table() {
    return this.page.locator('table');
  }

  get pageInfo() {
    return this.page.getByText(/Page \d+ of/);
  }

  get prevButton() {
    return this.page.getByRole('button', { name: 'Previous' });
  }

  get nextButton() {
    return this.page.getByRole('button', { name: 'Next' });
  }

  async getRows() {
    return this.table.locator('tbody tr').all();
  }

  async getRowCount() {
    return this.table.locator('tbody tr').count();
  }

  async clickAddNew() {
    await this.addNewButton.click();
  }

  async clickEditOnRow(index: number) {
    const rows = await this.getRows();
    await rows[index].getByRole('button', { name: /edit/i }).click();
  }

  async clickDeleteOnRow(index: number) {
    const rows = await this.getRows();
    await rows[index].locator('button:has(svg.text-destructive)').click();
  }

  async search(term: string) {
    await this.searchInput.fill(term);
  }

  async getStatusBadges() {
    const badges = this.page.locator('[data-status], .badge, [class*="badge"]');
    return badges.allTextContents();
  }

  async expectHeading() {
    await expect(this.heading).toBeVisible();
  }

  // Preview features

  async clickViewOnRow(index: number) {
    const rows = await this.getRows();
    await rows[index].getByRole('button', { name: /preview/i }).click();
  }

  async expectPreviewDialogOpen() {
    await expect(this.page.getByRole('dialog').getByRole('heading', { name: 'Preview' })).toBeVisible();
  }

  async closePreviewDialog() {
    await this.page.getByRole('dialog').getByRole('button', { name: 'Close' }).click();
  }
}
