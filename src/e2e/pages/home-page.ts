import type { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly continentFilter: Locator;
  readonly countryCards: Locator;
  readonly header: Locator;
  readonly themeToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[type="search"]');
    this.continentFilter = page.locator('button', { hasText: 'Filter by Region' });
    this.countryCards = page.locator('a[href^="/detail/"]');
    this.header = page.locator('header');
    this.themeToggle = page.locator('button[aria-label*="mode"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async search(query: string) {
    await this.searchInput.fill(query);
  }

  async openFilterDropdown() {
    await this.continentFilter.click();
  }

  async filterByRegion(region: string) {
    await this.continentFilter.click();
    await this.page.waitForTimeout(500);
    await this.page.locator('li[role="option"]', { hasText: region }).click();
  }

  async clickFirstCard() {
    await this.countryCards.first().click();
  }

  async getCountryNames(): Promise<string[]> {
    return this.countryCards.locator('h2').allTextContents();
  }

  async getCardCount(): Promise<number> {
    return this.countryCards.count();
  }

  async toggleTheme() {
    await this.themeToggle.click();
  }

  async getFirstCardName(): Promise<string> {
    const text = await this.countryCards.first().locator('h2').textContent();
    return text ?? '';
  }
}
