import { type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class NavigationEditorPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading() {
    return this.page.getByRole('heading', { name: 'Navigation' });
  }

  get addItemButton() {
    return this.page.getByRole('button', { name: 'Add Item' });
  }

  async getTreeItems() {
    return this.page.locator('[data-nav-item], [role="treeitem"], li').all();
  }

  async clickAddItem() {
    await this.addItemButton.click();
  }

  async deleteItem(index: number) {
    const items = await this.getTreeItems();
    await items[index]
      .locator('button:has(svg.text-destructive), button[aria-label*="delete"]')
      .click();
  }

  async expectHeading() {
    await expect(this.heading).toBeVisible();
  }
}
