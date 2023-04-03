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
    await page.getByRole('checkbox', { name: /Playwright Automation .*/ }).click({force:true});
    await page.waitForTimeout(8000);
});

test('Delerium or Acute Confusion Events', async () => {
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Delerium or Acute Confusion Events' }).click();
    await page.getByRole('button', { name: 'ADD DELERIUM' }).click();
    await page.getByRole('heading', { name: 'Add Confusion Event' }).isVisible();
    await page.getByLabel('Notes').click();
    await page.getByLabel('Notes').fill('Add Delerium using playwright automation');
    await page.waitForTimeout(8000);
    await page.getByRole('button', { name: 'ADD' }).click();
    await page.getByText('Successfully created Confusion event.').isVisible();
    await page.getByRole('cell', { name: 'Add Delerium using playwright automation' }).isVisible();
    await page.waitForTimeout(8000);
    await page.getByRole('row', { name: 'Add Delerium using playwright automation' }).first().locator('#fade-button').click();
    await page.getByRole('menuitem', { name: 'Update' }).click();
    await page.getByLabel('Date *').fill('2023-02-01');
    await page.getByLabel('Notes').click();
    await page.getByLabel('Notes').press('Meta+a');
    await page.getByLabel('Notes').fill('Updated Delerium notes using playwright automation');
    await page.getByRole('button', { name: 'UPDATE' }).click();
    await page.waitForTimeout(8000);
    await page.getByRole('row', { name: 'Updated Delerium notes using playwright automation' }).first().locator('#fade-button').click();
    await page.getByText('Delete').click();
    await page.getByRole('heading', { name: 'Delete Confusion Event' }).isVisible();
    await page.getByRole('button', { name: 'DELETE' }).click();
    await page.getByText('Successfully deleted Confusion event.').isVisible();

});