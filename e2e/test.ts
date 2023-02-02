import { test, Page , expect} from '@playwright/test';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {
  // Create page once and sign in.
  page = await browser.newPage();
  await page.goto('https://9471-2001-4453-618-c700-b412-99bc-1f3b-abeb.ngrok.io/login');
  await page.getByRole('button', { name: 'Visit Site' }).click();
  await page.waitForLoadState();
  await page.getByLabel('Username *').click();
  await page.getByLabel('Username *').fill('diane57122');
  await page.getByLabel('Username *').press('Tab');
  await page.getByLabel('Password *').fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForLoadState();
});

test.afterAll(async () => {
  await page.close();
});

test('Check User Details', async () => {
    //Check user
    await expect(page.getByText('Diane Curtis')).toHaveText('Diane Curtis');
    await expect(page.getByText('Pharmacist')).toHaveText('Pharmacist');
});

test('REGULAR PRESCRIPTION', async () => {
    //ADD
    await page.getByRole('button', { name: 'Residents' }).click();
    await page.getByRole('checkbox', { name: 'Adam Sandler 43 King-Smith Facility 01/01/2023 Diane Curtis 01/26/2023' }).click();
    await page.getByRole('button', { name: 'ADD PRESCRIPTION' }).click();
    await page.getByPlaceholder('Search Medication').click();
    await page.getByRole('option', { name: 'olanzapine 20 mg tablet' }).click();
    await page.getByLabel('Commenced *').fill('2023-02-01');
    await page.getByPlaceholder('Search Route').click();
    await page.getByRole('option', { name: 'Intravenous peripheral route' }).click();
    await page.getByLabel('Doses *').click();
    await page.getByLabel('Doses *').fill('10');
    await page.getByPlaceholder('Search Direction').click();
    await page.getByRole('option', { name: 'Every 4 days' }).click();
    await page.getByLabel('Comment').click();
    await page.getByLabel('Comment').fill('This is a comment from playwright automation');
    await page.getByRole('button', { name: 'ADD' }).click();
    await page.getByText('olanzapine 20 mg tablet').first().isVisible();
    await page.getByText('This is a comment from playwright automation').first().isVisible();
    //UPDATE
});



import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://9471-2001-4453-618-c700-b412-99bc-1f3b-abeb.ngrok.io/login');
  await page.getByRole('button', { name: 'Visit Site' }).click();
  await page.getByLabel('Username *').click();
  await page.getByLabel('Username *').fill('diane57122');
  await page.getByLabel('Username *').press('Tab');
  await page.getByLabel('Password *').fill('password');
  await page.getByLabel('Password *').press('Enter');
  await page.getByRole('button', { name: 'Residents' }).click();
  await page.getByRole('checkbox', { name: 'Adam Sandler 43 King-Smith Facility 01/01/2023 Diane Curtis 01/26/2023' }).click();
  await page.getByRole('checkbox', { name: 'select all desserts 215 0 olanzapine 20 mg tablet 01/02/2023 Intravenous peripheral route 10 Every 4 days This is a comment from playwright automation' }).locator('#fade-button').click();
  await page.getByRole('menuitem', { name: 'View Logs' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('checkbox', { name: 'select all desserts 215 0 olanzapine 20 mg tablet 01/02/2023 Intravenous peripheral route 10 Every 4 days This is a comment from playwright automation' }).locator('#fade-button').click();
  await page.getByRole('menuitem', { name: 'Update' }).click();
  await page.getByLabel('Doses *').click();
  await page.getByLabel('Doses *').fill('8');
  await page.getByRole('button', { name: 'UPDATE' }).click();
  await page.getByRole('checkbox', { name: 'select all desserts 216 1 olanzapine 20 mg tablet 01/02/2023 Intravenous peripheral route 8 Every 4 days This is a comment from playwright automation' }).locator('#fade-button').click();
  await page.getByRole('menuitem', { name: 'View Logs' }).click();
  await page.getByRole('cell', { name: 'Intravenous peripheral route' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
});