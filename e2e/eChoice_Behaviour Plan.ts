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
    await page.getByRole('button', { name: 'Residents' }).click();
    await page.getByRole('checkbox', { name: /Behaviour Plan .*/ }).click({force:true});
    await page.waitForTimeout(8000);
});

test('Behaviour Plan', async () => {
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Behaviour Plan' }).click();
  await page.getByText('If a resident receives multiple behaviour plans, keep the date of the original behaviour plan in place and optionally \
  update the notes section. Changing this date will affect any existing psychotropic self-assessment \'behaviour plan\' information.');
  await page.getByLabel('Date *').press('ArrowLeft');
  await page.getByLabel('Date *').fill('2023-01-05');
  await page.getByLabel('Notes').click();
  await page.getByLabel('Notes').fill('Behaviour Plan using Playwright Automation');
  await page.getByLabel('Notes').click();
  await page.getByLabel('Notes').press('Meta+a');
  await page.getByRole('button', { name: 'CANCEL' }).click();
  await page.getByLabel('Notes').click();
  await page.getByLabel('Notes').fill('Behaviour Plan using Playwright Automation');
  await page.getByLabel('Notes').click();
  await page.getByLabel('Notes').press('Meta+a');
  await page.getByRole('button', { name: 'ADD' }).click();
  await page.getByText('This is a required field.').isVisible();
  await page.getByLabel('Date *').press('ArrowLeft');
  await page.getByLabel('Date *').fill('2023-01-05');
  await page.getByRole('button', { name: 'ADD' }).click();
  await page.getByText('Successfully created Behaviour plan.').isVisible();
  await page.getByRole('button', { name: 'Update' }).click();
  await page.getByLabel('Date *').fill('2023-04-30');
  await page.getByLabel('Notes').click();
  await page.getByLabel('Notes').press('Meta+Shift+ArrowLeft');
  await page.getByLabel('Notes').fill('Updated behaviour plan');
  await page.getByRole('button', { name: 'Update' }).click();
  await page.getByRole('heading', { name: 'Update Behaviour Plan?' }).isVisible();
  await page.getByText('This behaviour plan has valuable information of the resident. Do you wish to con').isVisible();
  await page.getByRole('button', { name: 'CANCEL' }).click();
  await page.getByRole('button', { name: 'Update' }).click();
  await page.getByRole('button', { name: 'UPDATE' }).click();
  await page.getByRole('button', { name: 'UPDATE' }).click();
  await page.waitForTimeout(10000);
  await page.getByText('Successfully updated Behaviour plan.').isVisible();
});
