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

test('RMMR Events', async () => {
  //ADD RMMR Event
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'RMMR Events' }).click();
  await page.getByRole('button', { name: 'ADD RMMR' }).click();
  await page.getByRole('heading', { name: 'Add RMMR Event' }).isVisible();
  await page.getByLabel('Date *').fill('2023-02-01');
  await page.getByLabel('Notes').click();
  await page.getByLabel('Notes').fill('Add RMMR Event using playwright automation');
  await page.waitForTimeout(8000);
  await page.getByRole('button', { name: 'ADD' }).click();
  await page.getByText('Successfully created RMMR event.').isVisible();
  await page.waitForTimeout(8000);
  await page.getByRole('cell', { name: 'Add RMMR Event using playwright automation' }).first().isVisible();
  //UPDATE RMMR Event
  await page.getByRole('row', { name: 'Add RMMR Event using playwright automation' }).first().locator('#fade-button').click();
  await page.getByRole('menuitem', { name: 'Update' }).click();
  await page.getByRole('heading', { name: 'Update RMMR Event' }).isVisible();
  await page.getByLabel('Date *').fill('2023-02-06');
  await page.getByLabel('Notes').click();
  await page.getByLabel('Notes').press('Meta+a');
  await page.getByLabel('Notes').fill('Updated RMMR Event using playwright automation');
  await page.getByRole('button', { name: 'UPDATE' }).click();
  await page.getByText('Successfully updated RMMR event.').isVisible();
  await page.waitForTimeout(8000);
  await page.getByRole('cell', { name: 'Updated RMMR Event using playwright automation' }).first().isVisible();
  //DELETE RMMR Event
  await page.getByRole('row', { name: 'Updated RMMR Event using playwright automation' }).first().locator('#fade-button').click();
  await page.getByText('Delete').click();
  await page.getByRole('heading', { name: 'Delete RMMR Event' }).isVisible();
  await page.getByRole('button', { name: 'DELETE' }).click();
  await page.getByText('Successfully deleted RMMR Event.').isVisible();
  await page.getByRole('cell', { name: 'Updated RMMR Event using playwright automation' }).first().isHidden();
});