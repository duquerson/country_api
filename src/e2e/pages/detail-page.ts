import type { Page, Locator } from '@playwright/test';

export class DetailPage {
  readonly page: Page;
  readonly backButton: Locator;
  readonly countryName: Locator;
  readonly bordersSection: Locator;
  readonly borderButtons: Locator;
  readonly skeleton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backButton = page.locator('button').filter({ hasText: /^Back$/ }).first();
    this.countryName = page.locator('h2').first();
    this.bordersSection = page.locator('section:has(h3:has-text("Border"))');
    this.borderButtons = page.locator('a[href^="/detail/"]');
    this.skeleton = page.locator('[class*="animate-pulse"]').first();
  }

  async goto(countryCode: string) {
    await this.page.goto(`/detail/${countryCode}`);
  }

  async waitForContentLoaded() {
    await this.countryName.waitFor({ state: 'visible', timeout: 15000 });
  }

  async goBack() {
    await this.backButton.click();
  }

  async clickFirstBorder() {
    await this.borderButtons.first().click();
  }

  async getCountryCode(): Promise<string> {
    const url = this.page.url();
    const match = url.match(/\/detail\/(\w+)/);
    return match ? match[1] : '';
  }

  async getPopulation(): Promise<string> {
    const items = await this.page.locator('.flex.items-baseline.gap-2.text-\\[15px\\]').allTextContents();
    return items[0] || '';
  }
}
