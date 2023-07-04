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

test('Select Resident', async () => {
await page.getByRole('button', { name: /Facility Playwright Updated .*/ }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForTimeout(10000);
    //await page.getByRole('button', { name: 'Residents' }).click();
    await page.getByRole('checkbox', { name: /Playwright Automation .*/ }).click({force:true});
    await page.waitForTimeout(8000);
});

test('Regular Prescription', async () => {
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'PRN Prescriptions' }).click();
    await page.waitForTimeout(10000);
    await page.getByRole('button', { name: 'ADD PRESCRIPTION' }).click();
    await page.getByPlaceholder('Search Medication').click();
    await page.getByRole('option', { name: 'perampanel 6 mg tablet' }).click();
    await page.getByLabel('Commenced *').fill('2023-01-01');
    await page.getByLabel('Comment').click();
    await page.getByLabel('Comment').fill('This is a comment from playwright automation');
    await page.getByRole('button', { name: 'ADD' }).click();
    await page.getByText('This is a comment from playwright automation').first().isVisible();
    await page.locator('#fade-button').click();
    await page.getByRole('menuitem', { name: 'Update' }).click();
    await page.getByLabel('Commenced *').press('ArrowLeft');
    await page.getByLabel('Commenced *').fill('2023-03-01');
    await page.getByLabel('Comment').click();
    await page.getByLabel('Comment').clear();
    await page.getByLabel('Comment').fill('Automation PRN Prescription updated');
    await page.getByRole('button', { name: 'UPDATE' }).click();
    await page.getByText('Automation PRN Prescription updated').first().isVisible();
    await page.locator('#fade-button').click();
    await page.getByRole('menuitem', { name: 'Cease' }).click();
    await page.getByLabel('Cease At *').fill('2023-04-01');
    await page.getByRole('button', { name: 'CEASE' }).click();
    await page.getByText('Successfully ceased prescription.').isVisible();
    await page.getByRole('heading', { name: 'No available records' }).isVisible();
    await page.getByRole('tab', { name: 'Ceased' }).click();
    await page.getByText('Automation PRN Prescription updated').first().isVisible();
    await page.locator('#fade-button').click();
    await page.getByRole('menuitem', { name: 'Uncease' }).click();
    await page.getByRole('heading', { name: 'Undo ceasing error?' }).isVisible();
    await page.getByText('Do not uncease if this is a new prescription.').isVisible();
    await page.getByRole('button', { name: 'CANCEL' }).click();
    await page.locator('#fade-button').click();
    await page.getByRole('menuitem', { name: 'Uncease' }).click();
    await page.getByText('Do not uncease if this is a new prescription.').isVisible();
    await page.getByRole('button', { name: 'UNCEASE' }).click();
    await page.getByText('Successfully unceased prescription.').isVisible();
    await page.getByRole('heading', { name: 'No available records' }).isVisible();
    await page.getByRole('tab', { name: 'Active' }).click();
    await page.getByText('perampanel 6 mg tablet').first().isVisible();
    await page.locator('#fade-button').click();
    await page.getByRole('menuitem', { name: 'Delete' }).click();
    await page.getByRole('heading', { name: 'Delete PRN Prescription' }).isVisible();
    await page.getByRole('button', { name: 'CANCEL' }).click();
    await page.locator('#fade-button').click();
    await page.getByRole('menuitem', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByText('Successfully deleted prescription.').isVisible();
    await page.getByRole('heading', { name: 'No available records' }).isVisible();
});