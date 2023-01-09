import { test, expect } from '@playwright/test';

test('Menu Testing', async ({ page }) => {
  const URL = 'https://playwright.dev/docs/intro';
  await page.goto(URL);
  const response = await page.request.get(URL);
  expect(response.status()).toBe(200);
  await expect(page).toHaveTitle(/Playwright/);
  await page.getByRole('link', { name: 'Installation' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toHaveText('Installation');
  await expect(page.getByRole('heading', { name: 'Installing Playwright#'})).toHaveText('Installing Playwright');
  await page.getByRole('link', { name: 'Writing Tests' }).nth(0).click();
  await expect(page.getByRole('heading', { name: 'Writing Tests' })).toHaveText('Writing Tests');
  await page.getByRole('link', { name: 'Running Tests' }).nth(0).click();
  await expect(page.getByRole('heading', { name: 'Running Tests' })).toHaveText('Running Tests');
  await page.getByRole('link', { name: 'Test Generator' }).nth(0).click();
  await expect(page.getByRole('heading', { name: 'Test Generator' })).toHaveText('Test Generator');
});
test.skip('Assersions', async ({ page }) => {
    const URL = 'https://playwright.dev/docs/test-assertions';
    await page.goto(URL);
    const response = await page.request.get(URL);
    expect(response.status()).toBe(200);
    await page.locator('h1').click();
    await expect(page.getByRole('heading', { name: 'List of assertions#​' })).toHaveText('List of assertions');
    await expect(page.getByRole('heading', { name: 'Negating Matchers#​' })).toHaveText('Negating Matchers');
    await expect(page.getByRole('heading', { name: 'Custom Expect Message#​' })).toHaveText('Custom Expect Message');
    await expect(page.getByRole('heading', { name: 'Polling#​' })).toHaveText('Polling');
    await expect(page.getByRole('heading', { name: 'Retrying#​' })).toHaveText('Retrying');
  });