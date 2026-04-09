import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home-page';
import { DetailPage } from './pages/detail-page';

test.describe('Country API', () => {
  test('home page loads with correct title', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await expect(page).toHaveTitle(/Where in the world/);
  });

  test('home page has country cards', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await expect(homePage.countryCards.first()).toBeVisible({ timeout: 15000 });
    const cardCount = await homePage.getCardCount();
    expect(cardCount).toBeGreaterThan(0);
  });

  test('search filters countries by name', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await expect(homePage.countryCards.first()).toBeVisible({ timeout: 15000 });
    await homePage.search('brazil');
    await page.waitForTimeout(1000);
    await expect(page.getByText('Brazil', { exact: false })).toBeVisible({ timeout: 15000 });
    const names = await homePage.getCountryNames();
    expect(names.some(n => n.toLowerCase().includes('brazil'))).toBe(true);
  });

  test('filter by region', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await expect(homePage.countryCards.first()).toBeVisible({ timeout: 15000 });
    await homePage.filterByRegion('Europe');
    await page.waitForTimeout(1000);
    const names = await homePage.getCountryNames();
    expect(names.length).toBeGreaterThan(0);
  });

  test('search and filter work together', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await expect(homePage.countryCards.first()).toBeVisible({ timeout: 15000 });
    
    // First filter by region
    await homePage.filterByRegion('Europe');
    await page.waitForTimeout(1000);
    const europeanNames = await homePage.getCountryNames();
    expect(europeanNames.length).toBeGreaterThan(0);
    
    // Then search within that region
    await homePage.search('germany');
    await page.waitForTimeout(1000);
    await expect(page.getByText('Germany', { exact: false })).toBeVisible({ timeout: 15000 });
    const filteredNames = await homePage.getCountryNames();
    expect(filteredNames.some(n => n.toLowerCase().includes('germany'))).toBe(true);
    // Should have fewer results than just the Europe filter
    expect(filteredNames.length).toBeLessThanOrEqual(europeanNames.length);
  });

  test('click country card navigates to detail', async ({ page }) => {
    const homePage = new HomePage(page);
    const detailPage = new DetailPage(page);
    await homePage.goto();
    await expect(homePage.countryCards.first()).toBeVisible({ timeout: 15000 });
    await homePage.clickFirstCard();
    await expect(detailPage.backButton).toBeVisible({ timeout: 15000 });
  });

  test('detail page shows country info', async ({ page }) => {
    const detailPage = new DetailPage(page);
    await detailPage.goto('bra');
    await detailPage.waitForContentLoaded();
    const code = await detailPage.getCountryCode();
    expect(code).toBeTruthy();
  });

  test('navigate to detail and back to home', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('a[href^="/detail/"]').first()).toBeVisible({ timeout: 15000 });
    await page.locator('a[href^="/detail/"]').first().click();
    await page.waitForURL(/\/detail\//);
    await expect(page.locator('h2').first()).toBeVisible({ timeout: 15000 });
    await page.goto('/');
    await expect(page.locator('header').first()).toBeVisible({ timeout: 10000 });
  });

  test('theme toggle works', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    const initialDark = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );
    await homePage.toggleTheme();
    await page.waitForTimeout(300);
    const afterToggleDark = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );
    expect(afterToggleDark).not.toBe(initialDark);
  });

  test('404 page on invalid route', async ({ page }) => {
    await page.goto('/nonexistent');
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible({ timeout: 10000 });
  });
});
