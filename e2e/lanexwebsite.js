import { test, expect } from '@playwright/test';

test('LanexWebsite', async ({ page }) => {
  await page.goto('https://lanexus.com/');
  await page.getByRole('heading', { name: 'Your business needs, tailor-made' }).click();
  await page.locator('#menu-item-1675').getByRole('link', { name: 'Inside LANEXUS' }).click();
  await page.goto('https://lanexus.com/our-services/');
  await page.goto('https://lanexus.com/our-works/');
  await page.goto('https://lanexus.com/careers/');
  await page.goto('https://lanexus.com/blog/');
});


import { test, expect } from '@playwright/test';

test('Menu Testing', async ({ page }) => {
  const URL = 'https://57fb-2001-4453-601-1000-65ea-d18c-6944-c889.ngrok.io/login';
  await page.goto(URL);
  const response = await page.request.get(URL);
  //expect(response.status()).toBe(200);
  await page.getByRole('button', { name: 'Visit Site' }).click();
  await page.getByLabel('Username *').click();
  await page.getByLabel('Username *').fill('diane57122');
  await page.getByLabel('Username *').press('Tab');
  await page.getByLabel('Password *').fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Manage Residents' }).click();
  await page.getByRole('checkbox', { name: 'Scarlett Johansson 42 King-Smith Facility 01/10/2023 Diane Curtis 01/10/2023' }).click();
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByRole('option', { name: 'RMMR Events (2) Updated 01/10/2023' }).click();
  await page.getByRole('button', { name: 'ADD RMMR Event' }).click();
  /*await page.getByLabel('Date *').fill('2023-01-01');
  await page.getByLabel('Notes').click();
  await page.getByLabel('Notes').fill('RMMR Events 003');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Successfully created RMMR event.').click();
  await page.getByRole('cell', { name: 'RMMR Events 003' }).click();
  await page.getByRole('button', { name: 'Open' }).click(); 
  await page.getByRole('option', { name: 'RMMR Events (3) Updated 01/10/2023' }).getByText('Updated 01/10/2023').click(); */
});