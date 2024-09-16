import { test, expect } from '@playwright/test';

test('Successful Login', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByPlaceholder('Username').first()).toBeVisible();
  await page.getByPlaceholder('Username').first().fill('qauser_loh1');
  await page.getByPlaceholder('Password').first().fill('ptfs1234!');
  await page.getByRole('button', { name: 'Login' }).first().click();
  await expect(page.getByRole('img', { name: 'Knowvation logo' }).nth(1)).toBeVisible();
  //await page.getByRole('img', { name: 'Knowvation logo' }).nth(1).isVisible();
  await page.getByText('Welcome, qa');
  await page.getByRole('button', { name: 'User Options' }).click();
  await page.getByText('Log Out').click();
  await page.close();
});

test('Failed Log in using incorrect username', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByPlaceholder('Username').first()).toBeVisible();
  await page.getByPlaceholder('Username').first().fill('qauser_loh11');
  await page.getByPlaceholder('Password').first().fill('ptfs1234!');
  await page.getByRole('button', { name: 'Login' }).first().click();
  await page.getByText('The specified user could not be found.');
  await page.close();
});

test('Failed Log in using incorrect password', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByPlaceholder('Username').first()).toBeVisible();
  await page.getByPlaceholder('Username').first().fill('qauser_loh1');
  await page.getByPlaceholder('Password').first().fill('ptfs1234!11');
  await page.getByRole('button', { name: 'Login' }).first().click();
  await page.getByText('The login credentials are invalid.');
  await page.close();
});


