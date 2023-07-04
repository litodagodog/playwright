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
  await page.getByRole('button', { name: 'Facility Playwright UpdatedMorgan LLC Facility Playwright Updated' }).nth(1).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForTimeout(10000);
    //await page.getByRole('button', { name: 'Residents' }).click();
    await page.getByRole('checkbox', { name: /Playwright Automation .*/ }).click({force:true});
    await page.waitForTimeout(8000);
});

test('Unexplained Weight Loss', async () => {
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Unexplained Weight Loss' }).click();
    await page.getByText('Playwright Automation did not have an unexpected weight loss in the previous quarter.').isVisible();
    await page.getByRole('button', { name: 'ADD WEIGHT LOSS' }).click();
    await page.getByRole('heading', { name: 'Add Weight Loss Record' }).isVisible();
    await page.getByPlaceholder('Search Year').click();
    await page.getByRole('option', { name: '2021' }).click();
    await page.getByPlaceholder('Search Quarter').click();
    await page.getByRole('option', { name: 'Q4' }).click();
    await page.getByLabel('Notes').click();
    await page.getByLabel('Notes').fill('Add Unexplained Weight Loss using playwright automation');
    await page.getByRole('button', { name: 'ADD' }).click();
    await page.getByText('Successfully created Unexplained Weight Loss').click()
    await page.waitForTimeout(8000);
    await page.getByRole('cell', { name: '2021 Q4' }).first().isVisible();
    await page.getByRole('cell', { name: 'Add Unexplained Weight Loss using playwright automation' }).first().isVisible();
    await page.getByText('Playwright Automation has unexplained weight loss in the previous quarter.').isHidden();
    //UPDATE WEIGHT LOSS
    await page.getByRole('row', { name: 'Add Unexplained Weight Loss using playwright automation' }).first().locator('#fade-button').click();
    await page.getByRole('menuitem', { name: 'Update' }).click();
    await page.getByRole('heading', { name: 'Update Weight Loss Record' }).isVisible();
    await page.getByPlaceholder('Search Year').click();
    await page.getByRole('option', { name: '2022' }).click();
    await page.getByPlaceholder('Search Quarter').click();
    await page.getByRole('option', { name: 'Q4' }).click();
    await page.getByLabel('Notes').click();
    await page.getByLabel('Notes').press('Meta+a');
    await page.getByLabel('Notes').fill('Update Unexplained Weight Loss using playwright automation');
    await page.getByRole('button', { name: 'UPDATE' }).click();
    await page.getByText('Successfully updated Unexplained Weight Loss').isVisible();
    await page.waitForTimeout(8000);
    await page.getByRole('cell', { name: '2022 Q4' }).first().isVisible();
    await page.getByRole('cell', { name: 'Update Unexplained Weight Loss using playwright automation' }).first().isVisible();
    await page.getByText('Playwright Automation has unexplained weight loss in the previous quarter.').isVisible();
    //DELETE WEIGHT LOSS
    await page.getByRole('row', { name: 'Update Unexplained Weight Loss using playwright automation' }).first().locator('#fade-button').click();
    await page.getByText('Delete').click();
    await page.getByRole('heading', { name: 'Delete Weight Loss Record?' }).isVisible();
    await page.getByRole('button', { name: 'DELETE' }).click();
    await page.getByText('Successfully deleted Unexplained Weight Loss.').isVisible();
    await page.getByRole('heading', { name: 'No available records' }).isVisible();
});