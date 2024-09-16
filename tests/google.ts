import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByLabel('Search', { exact: true }).click();
  await page.getByLabel('Search', { exact: true }).fill('testing');
  await page.getByRole('link', { name: 'Testing Definition & Meaning' }).isVisible();
  await page.getByPlaceholder('Search Dictionary').fill('testing');
  await page.getByPlaceholder('Search Dictionary').click();
});