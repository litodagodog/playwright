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
  //await page.close();
});

test('Select Resident', async () => {
    await page.getByRole('button', { name: 'Residents' }).click();
    await page.getByRole('checkbox', { name: 'Adam Sandler 43 King-Smith Facility 01/01/2023 Diane Curtis 01/26/2023' }).click();
    await page.waitForTimeout(8000);
});

test('Diagnoses', async () => {
    //ADD
    await page.getByRole('button', { name: 'Open' }).click();
    await page.getByRole('option', { name: /Diagnoses .*/ }).click();
    await page.waitForTimeout(10000);
    const diagTrue = await page.getByText('Percutaneous aspiration of renal pelvis').isVisible();
    if ((diagTrue == true)){
      //Delete Diagnosis if exists
      await page.locator('//*[@id="fade-button"]/svg').click();
      await page.getByRole('menuitem', { name: 'Delete' }).click();
      await page.getByRole('button', { name: 'DELETE' }).click();
      await page.waitForLoadState();
    }
    else {
      await page.getByRole('button', { name: 'ADD DIAGNOSIS' }).click();
      await page.waitForTimeout(8000);
      await page.getByRole('heading', { name: 'Add Diagnosis' }).isVisible();
      await page.getByPlaceholder('Search Diagnosis').click();
      await page.getByRole('option', { name: 'Percutaneous aspiration of renal pelvis' }).click();
      await page.getByLabel('Notes').click();
      await page.getByLabel('Notes').fill('This note is from playwright automation');
      await page.waitForTimeout(8000);
      await page.getByRole('button', { name: 'ADD' }).click();
      await page.getByRole('cell', { name: 'Percutaneous aspiration of renal pelvis' }).isVisible();
      await page.getByRole('cell', { name: 'This note is from playwright automation' }).isVisible();
    }
    //DELETE 

});