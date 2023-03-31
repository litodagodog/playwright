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
  // await page.goto('/login');
  // await page.waitForLoadState();
  // await page.getByLabel('Username *').click();
  // await page.getByLabel('Username *').fill('dean');
  // await page.getByLabel('Username *').press('Tab');
  // await page.getByLabel('Password *').fill('password');
  // await page.getByRole('button', { name: 'Sign in' }).click();
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
    //OPEN ORGANIZATION PAGE
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByRole('menuitem', { name: 'Manage Organisation' }).click();
    //CREATE ORGANIZATION
    await page.getByRole('button', { name: 'Create New Organisation' }).click();
    await page.getByLabel('Name *').click();
    await page.getByLabel('Name *').fill('Playwright Organization');
    await page.getByLabel('Name *').press('Meta+a');
    await page.getByLabel('Name *').press('Meta+c');
    await page.getByLabel('Name *').press('Meta+c');
    await page.getByLabel('Name *').press('Tab');
    await page.getByLabel('Legal name').fill('Playwright Organization');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByLabel('ABN *').click();
    await page.getByText('This is a required field.').isVisible();
    await page.getByLabel('ABN *').click();
    await page.getByLabel('ABN *').fill('123456');
    await page.getByLabel('Notes').click();
    await page.getByLabel('Notes').fill('Playwright notes');
    await page.getByRole('button', { name: 'Submit' }).click();
    //CHECK IF NEW ORGANIZATION IS CREATED and DISPLAYED in the list
    await page.getByText('Playwright Organization').isVisible();
    //UPDATE ORGANIZATION
    await page.getByRole('checkbox', { name: /Playwright Organization .*/ }).locator('#fade-button').click();
    await page.getByRole('menuitem', { name: 'Update' }).click();
    await page.getByLabel('Name *').click();
    await page.getByLabel('Name *').fill('Playwright Organization Updated');
    await page.getByLabel('Name *').press('Meta+a');
    await page.getByLabel('Name *').press('Meta+c');
    await page.getByLabel('Name *').press('Tab');
    await page.getByLabel('Legal Name').fill('Playwright Organization Updated');
    await page.getByLabel('Abn *').click();
    await page.getByLabel('Abn *').fill('123');
    await page.getByLabel('Notes').click();
    await page.getByLabel('Notes').fill('Playwright notes updated');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByLabel('Search organisation').click();
    await page.getByLabel('Search organisation').type('playwright');
    await page.getByText('Playwright Organization Updated').isVisible();
    await page.locator('#fade-button').click();
    await page.getByText('Delete').click();
    await page.getByRole('heading', { name: 'Delete Organisation' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.getByText('Successfully deleted organisation.').click();
    await page.getByText('Playwright Organization Updated').nth(0).isHidden();
});