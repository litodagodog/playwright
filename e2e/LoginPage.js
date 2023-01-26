import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://e0d1-2001-4453-601-1000-bd4a-2118-d7c4-da72.ngrok.io/login');
});