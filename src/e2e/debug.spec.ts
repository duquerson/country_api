import { test } from '@playwright/test';

test('debug detail page', async ({ page }) => {
  page.on('console', msg => {
    console.log(`[BROWSER ${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', error => {
    console.log(`[BROWSER ERROR] ${error.message}`);
  });

  page.on('requestfailed', request => {
    console.log(`[REQUEST FAILED] ${request.url()} - ${request.failure()?.errorText}`);
  });

  await page.goto('/detail/bra');
  await page.waitForTimeout(10000);
  
  const bodyText = await page.locator('body').innerText();
  console.log('[PAGE CONTENT SNIPPET]', bodyText.substring(0, 500));
});
