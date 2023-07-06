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
  await page.goto('/');
  await page.getByRole('button', { name: 'Sign in with Azure Active Directory' }).click();
  await page.getByPlaceholder('Email, phone, or Skype').click();
  await page.getByPlaceholder('Email, phone, or Skype').fill(process.env.PHARMA);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(process.env.PHARMAPASS);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.waitForLoadState();
});

test.afterAll(async () => {
  await page.close();
});

test('Create Resident', async () => {
  await page.getByRole('button', { name: /Facility Playwright .*/ }).first().click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Create New Resident' }).click();
  await page.getByLabel('Given Name *').click();
  await page.getByLabel('Given Name *').fill('Playwright');
  await page.getByLabel('Given Name *').press('Tab');
  await page.getByLabel('Surname *').fill('Automation');
  await page.getByLabel('Medicare Number *').click();
  await page.getByLabel('Medicare Number *').fill('12345');
  await page.getByLabel('Date of Birth *').fill('1970-01-01');
  await page.getByLabel('Admission Date *').press('ArrowLeft');
  await page.getByLabel('Admission Date *').press('ArrowLeft');
  await page.getByLabel('Admission Date *').press('ArrowLeft');
  await page.getByLabel('Admission Date *').press('ArrowLeft');
  await page.getByLabel('Admission Date *').fill('2023-01-06');
  await page.getByLabel('Room Number').click();
  await page.getByLabel('Room Number').fill('12345');
  await page.getByRole('button', { name: 'Submit' }).click();
});