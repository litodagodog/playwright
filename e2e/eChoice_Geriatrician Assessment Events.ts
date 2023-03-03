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
  await page.goto('/login');
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

test('Select Resident', async () => {
    await page.getByRole('button', { name: 'Residents' }).click();
    await page.getByRole('checkbox', { name: /Playwright Automation .*/ }).click({force:true});
    await page.waitForTimeout(8000);
});

test('Geriatrician Assessment Events', async () => {
  //ADD Geriatrician Assessment Event
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Geriatrician Assessment Events' }).click();
  await page.getByRole('button', { name: 'ADD ASSESSMENT' }).click();
  await page.getByRole('heading', { name: 'Add Geriatrician Assessment Event' }).isVisible();
  await page.getByLabel('Date *').fill('2023-02-01');
  await page.getByLabel('Notes').click();
  await page.getByLabel('Notes').fill('Add Geriatrician Assessment Event using playwright automation');
  await page.waitForTimeout(8000);
  await page.getByRole('button', { name: 'ADD' }).click();
  await page.getByText('Successfully created geriatrician asssessment event.').isVisible();
  await page.waitForTimeout(8000);
  await page.getByRole('cell', { name: 'Add Geriatrician Assessment Event using playwright automation' }).first().isVisible();
  //UPDATE Geriatrician Assessment Event
  await page.getByRole('row', { name: 'Add Geriatrician Assessment Event using playwright automation' }).first().locator('#fade-button').click();
  await page.getByRole('menuitem', { name: 'Update' }).click();
  await page.getByRole('heading', { name: 'Update Geriatrician Assessment Event' }).isVisible();
  await page.getByLabel('Date *').fill('2023-02-06');
  await page.getByLabel('Notes').click();
  await page.getByLabel('Notes').press('Meta+a');
  await page.getByLabel('Notes').fill('Update Geriatrician Assessment Event using playwright automation');
  await page.getByRole('button', { name: 'UPDATE' }).click();
  await page.getByText('Successfully updated geriatrician assessment event.').isVisible();
  await page.waitForTimeout(8000);
  await page.getByRole('cell', { name: 'Update Geriatrician Assessment Event using playwright automation' }).first().isVisible();
  //DELETE Geriatrician Assessment Event
  await page.getByRole('row', { name: 'Update Geriatrician Assessment Event using playwright automation' }).first().locator('#fade-button').click();
  await page.getByText('Delete').click();
  await page.getByRole('heading', { name: 'Delete Geriatrician Assessment Event' }).isVisible();
  await page.getByRole('button', { name: 'DELETE' }).click();
  await page.getByText('Successfully deleted geriatrician assessment event.').isVisible();
  await page.getByRole('cell', { name: 'Update Geriatrician Assessment Event using playwright automation' }).first().isHidden();
});