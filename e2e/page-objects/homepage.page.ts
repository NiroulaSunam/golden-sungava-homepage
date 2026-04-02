import { type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class HomepagePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.navigateTo('/');
  }

  async expectNewsVisible(title: string) {
    const newsSection = this.page.locator('section:has-text("News"), [data-section="news"]');
    await expect(newsSection.getByText(title)).toBeVisible();
  }

  async expectNewsNotVisible(title: string) {
    const newsSection = this.page.locator('section:has-text("News"), [data-section="news"]');
    await expect(newsSection.getByText(title)).not.toBeVisible();
  }

  async expectFacilityVisible(name: string) {
    const facilitiesSection = this.page.locator(
      'section:has-text("Facilities"), [data-section="facilities"]',
    );
    await expect(facilitiesSection.getByText(name)).toBeVisible();
  }

  async expectHeroSlideVisible(heading: string) {
    const heroSection = this.page.locator(
      'section:has-text("Hero"), [data-section="hero"], .hero, [class*="hero"]',
    );
    await expect(heroSection.getByText(heading)).toBeVisible();
  }
}
