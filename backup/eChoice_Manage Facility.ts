import { test, Page , expect} from '@playwright/test';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.use({
  viewport:{
    height: 2680,
    width : 1800
  }
});
test.beforeAll(async ({ browser }) => {
  // Create page once and sign in.
  page = await browser.newPage();
  /**await page.goto('/login');
  await page.waitForLoadState();
  await page.getByLabel('Username *').click();
  await page.getByLabel('Username *').fill('dean');
  await page.getByLabel('Username *').press('Tab');
  await page.getByLabel('Password *').fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForLoadState(); **/
  await page.goto('/');
  await page.getByRole('button', { name: 'Sign in with Azure Active Directory' }).click();
  await page.getByPlaceholder('Email, phone, or Skype').click();
  await page.getByPlaceholder('Email, phone, or Skype').fill('admin@ddamasiggmail.onmicrosoft.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('ozaNa7jXH3Y$6w');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('listitem', { name: 'Account settings' }).getByText('Dean Damasig').isVisible();
  await page.waitForLoadState();
});

test.afterAll(async () => {
  await page.close();
});

test('Manage Facilities', async () => {
  // OPEN FACILITY
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByRole('menuitem', { name: 'Manage Facilities' }).click();
    await page.getByRole('button', { name: 'Create New Facility' }).click();
    await page.getByLabel('Name *').click();
    await page.getByLabel('Name *').fill('Facility Playwright');
    await page.getByLabel('Name *').press('Meta+a');
    await page.getByLabel('Name *').press('Meta+c');
    await page.getByLabel('Name *').press('Meta+c');
    await page.getByLabel('Name *').press('Meta+c');
    await page.getByLabel('Legal Name').click();
    await page.getByLabel('Legal Name').fill('Facility Playwright');
    await page.getByLabel('Address *').click();
    await page.getByLabel('Address *').fill('Facility Playwright');
    await page.getByPlaceholder('Search Organisation').click();
    await page.getByRole('option', { name: 'Ortiz-Wilson' }).click();
    await page.getByLabel('Beds *').click();
    await page.getByLabel('Beds *').fill('500');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByText('Successfully created facility.').click();
    await page.waitForTimeout(10000);
    await page.getByLabel('Search facility').click();
    await page.getByLabel('Search facility').type('Playwright');
    await page.waitForTimeout(10000);
    await page.getByText('Facility Playwright').isVisible();
    await page.getByText('500').isVisible();
    await page.locator('#fade-button').click();
    await page.getByRole('menuitem', { name: 'Update' }).click();
    await page.getByLabel('Name *').click();
    await page.getByLabel('Name *').fill('Facility Playwright Updated');
    await page.getByLabel('Name *').press('Meta+a');
    await page.getByLabel('Name *').press('Meta+c');
    await page.getByLabel('Name *').press('Meta+c');
    await page.getByLabel('Name *').press('Tab');
    await page.getByLabel('Legal Name').fill('Facility Playwright Updated');
    await page.getByLabel('Legal Name').press('Tab');
    await page.getByLabel('Address *').fill('Facility Playwright Updated');
    await page.getByLabel('Beds *').click();
    await page.getByLabel('Beds *').fill('1000');
    await page.getByLabel('RACID').click();
    await page.getByLabel('RACID').fill('ABC');
    await page.getByLabel('RACID').press('Tab');
    await page.getByLabel('ABN').fill('DEF');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByText('Facility Playwright Updated').isVisible();
    await page.getByText('1000').isVisible();
    await page.locator('#fade-button').click();
    await page.getByText('Delete').click();
    await page.getByText('Successfully deleted facility.').click();
    await page.getByLabel('Search facility').type('Playwright');
    await expect(page.getByText('Facility Playwright Updated')).toBeHidden();
});