import { type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class AdminLayoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get sidebar() {
    return this.page.locator('aside');
  }

  get topbar() {
    return this.page.locator('header');
  }

  get publishButton() {
    return this.page.getByRole('button', { name: /Publish/ });
  }

  get userMenuButton() {
    return this.page.getByRole('button', { name: 'User menu' });
  }

  get hamburgerButton() {
    return this.page.getByRole('button', { name: 'Toggle menu' });
  }

  async navigateToSection(name: string) {
    await this.page.getByRole('link', { name }).click();
  }

  async openUserMenu() {
    await this.userMenuButton.click();
  }

  async signOut() {
    await this.openUserMenu();
    await this.page.getByText('Sign Out').click();
  }

  async openMobileMenu() {
    await this.hamburgerButton.click();
  }
}
