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
  await page.close();
});

test('Select Resident', async () => {
    await page.getByRole('button', { name: 'Residents' }).click();
    await page.getByRole('checkbox', { name: 'Adam Sandler 43 King-Smith Facility 01/01/2023 Diane Curtis 01/26/2023' }).click();
    await page.waitForTimeout(8000);
});

test('Catheterisations', async () => {
    //Open Add Catheterisations modal
    await page.getByRole('button', { name: 'Open' }).click();
    await page.getByRole('option', { name: 'Catheterisations' }).click();
    await page.waitForTimeout(10000);
    await page.getByRole('button', { name: 'ADD CATHETERISATION' }).click();
    await page.getByRole('heading', { name: 'Add Catheterisation' }).isVisible();
    await page.getByLabel('Start Date *').fill('2023-02-01');
    await page.getByLabel('Notes').click();
    await page.getByLabel('Notes').fill('Add Catheterisation using playwright automation');
    await page.waitForTimeout(9000);
    //Check for Duplicate Entry(duplicate entry can be possible)
    const duplicateEntry = await page.getByText('Duplicate Diagnosis').isVisible();
    if ((duplicateEntry == true )){
      //Add Catheterisation even if duplicate is TRUE
      await page.getByRole('button', { name: 'ADD' }).isEnabled();
      await page.getByRole('button', { name: 'ADD' }).click();
      await page.waitForTimeout(8000);
      await page.getByRole('cell', { name: 'Add Catheterisation using playwright automation' }).isVisible();
      await page.getByRole('cell', { name: /.* Diane Curtis/ }).isVisible();
      await page.waitForLoadState();
    }
    else {
      //Add Catheterisation 
      await page.getByRole('button', { name: 'ADD' }).isEnabled();
      await page.getByRole('button', { name: 'ADD' }).click();
      await page.waitForTimeout(9000);
      await page.getByRole('cell', { name: 'Add Catheterisation using playwright automation' }).first().isVisible();
      await page.getByRole('cell', { name: /.* Diane Curtis/ }).first().isVisible();
      //UPDATE 
      await page.getByRole('row', { name: / .* Catheterisation using playwright automation .*/ }).first().locator('#fade-button').click();
      await page.getByRole('menuitem', { name: 'Update' }).click();
      await page.getByLabel('Notes').click();
      await page.getByLabel('Notes').press('Meta+a');
      await page.getByLabel('Notes').fill('Updated Notes using playwright');
      //await page.getByLabel('Start Date *').fill('2023-01-01');
      //await page.waitForTimeout(20000);
      await expect(page.getByRole('button', { name: 'UPDATE' })).toBeEnabled();
      await page.getByRole('button', { name: 'UPDATE' }).click({force:true});
      await page.getByText('Successfully updated catheterisation.').isVisible();
      await page.waitForTimeout(8000);
      //await page.getByRole('cell', { name: '01/03/2023' }).isVisible();
      await page.getByRole('cell', { name: 'Updated Notes using playwright' }).isVisible();
    }
      // //Cease Catheterisations
      // await page.getByRole('row', { name: /Adult osteochondritis of spine .*/ }).locator('#fade-button').click();
      // await page.getByRole('menuitem', { name: 'Cease' }).click();
      // await page.getByRole('heading', { name: 'Cease Diagnosis?' }).click();
      // await page.getByRole('button', { name: 'CEASE' }).click();
      // await page.getByText('Successfully ceased Diagnosis.').isVisible();
      // await page.waitForTimeout(8000);
      // await page.getByRole('tab', { name: 'Ceased' }).click();
      // await page.getByRole('cell', { name: 'Adult osteochondritis of spine' }).isVisible();
      // //Uncease Catheterisations
      // await page.getByRole('row', { name: /Adult osteochondritis of spine .*/ }).locator('#fade-button').click();
      // await page.getByRole('menuitem', { name: 'Uncease' }).click();
      // await page.getByRole('heading', { name: 'Uncease Diagnosis?' }).click();
      // await page.getByRole('button', { name: 'UNCEASE' }).click();
      // await page.getByText('Succesfully unceased Diagnosis.').isVisible();
      // await page.waitForTimeout(8000);
      // //Delete Catheterisations
      // await page.getByRole('tab', { name: 'Active' }).click();
      // await page.getByRole('cell', { name: 'Adult osteochondritis of spine' }).isVisible();
      // await page.getByRole('row', { name: 'Adult osteochondritis of spine 03/02/2023 Updated Notes using playwright 03/02/2023 08:48 AM Diane Curtis' }).locator('#fade-button').click();
      // await page.getByText('Delete').click();
      // await page.getByRole('heading', { name: 'Delete Diagnosis?' }).isVisible();
      // await page.getByRole('button', { name: 'DELETE' }).click();
      // await page.waitForTimeout(8000);
      // await page.getByRole('cell', { name: 'Adult osteochondritis of spine' }).isHidden();
      // await page.getByRole('tab', { name: 'Ceased' }).click();
      // await page.waitForTimeout(8000);
      // await page.getByRole('cell', { name: 'Adult osteochondritis of spine' }).isHidden();


});