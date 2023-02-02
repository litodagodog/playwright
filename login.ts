import { Page } from '@playwright/test';

async function login(
  page: Page,
  username: string,
  password: string,
): Promise<void> {
  await page.goto('https://a6f8-2001-4453-618-c700-cc65-c972-1368-75.ngrok.io/login');
  await page.getByRole('button', { name: 'Visit Site' }).click();
  await page.getByLabel('Username *').click();
  await page.getByLabel('Username *').fill(username);
  await page.getByLabel('Password *').click();
  await page.getByLabel('Password *').fill(password);

  await Promise.all([
    page.waitForNavigation(),
    page.getByRole('button', { name: 'Sign in' }).click()
  ]);
}

export default login;