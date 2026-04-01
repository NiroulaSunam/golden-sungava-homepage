import { type Page, type Locator, expect } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async navigateTo(path: string) {
    await this.page.goto(path);
  }

  async expectToast(text: string) {
    await expect(
      this.page.getByText(text, { exact: false }),
    ).toBeVisible({ timeout: 10_000 });
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({
      path: `e2e/screenshots/${name}.png`,
      fullPage: true,
    });
  }

  /**
   * Fill a bilingual field within a given scope (dialog or page).
   * Switches tabs and fills input[name="fieldName.en"] / input[name="fieldName.np"].
   */
  protected async fillBilingualFieldIn(
    scope: Locator | Page,
    fieldName: string,
    en: string,
    np?: string,
  ) {
    await scope.getByRole('tab', { name: 'English' }).first().click();
    await scope.locator(`input[name="${fieldName}.en"]`).fill(en);

    if (np) {
      await scope.getByRole('tab', { name: 'नेपाली' }).first().click();
      await scope.locator(`input[name="${fieldName}.np"]`).fill(np);
    }
  }
}
