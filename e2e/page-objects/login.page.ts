import { type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get emailInput() {
    return this.page.getByRole('textbox', { name: 'Email' });
  }

  get passwordInput() {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get signInButton() {
    return this.page.getByRole('button', { name: 'Sign In' });
  }

  get heading() {
    return this.page.getByRole('heading', { name: 'Admin Login' });
  }

  get errorMessage() {
    return this.page.getByText('Invalid login credentials');
  }

  async login(email: string, password: string) {
    await this.navigateTo('/login');
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async expectLoginPage() {
    await expect(this.heading).toBeVisible();
  }

  async expectError() {
    await expect(this.errorMessage).toBeVisible();
  }
}
