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
    await page.getByRole('checkbox', { name: /Playwright Automation .*/ }).click({force:true});
    await page.waitForTimeout(8000);
});

test('Catheterisations', async () => {
    //Open Add Catheterisations modal
    await page.getByRole('button', { name: 'Open' }).click();
    await page.getByRole('option', { name: 'Catheterisations' }).click();
    await page.waitForTimeout(7000);
    await page.getByRole('button', { name: 'ADD CATHETERISATION' }).click();
    await page.getByRole('heading', { name: 'Add Catheterisation' }).isVisible();
    await page.getByLabel('Start Date *').fill('2023-02-01');
    await page.getByLabel('Notes').click();
    await page.getByLabel('Notes').fill('Add Catheterisation using playwright automation');
    await page.waitForTimeout(9000);
    //Check for Duplicate Entry(duplicate entry can be possible)
    const duplicateEntry = await page.getByText('Duplicate Catheterisation').isVisible();
    if ((duplicateEntry == true )){
      //ADD Catheterisation even if duplicate is TRUE
      await page.getByRole('button', { name: 'ADD' }).isEnabled();
      await page.getByRole('button', { name: 'ADD' }).click();
      await page.waitForTimeout(8000);
      await page.getByRole('cell', { name: 'Add Catheterisation using playwright automation' }).first().isVisible();
      await page.getByRole('cell', { name: /.* Diane Curtis/ }).first().isVisible();
      await page.waitForLoadState();
    }
    else{
      //ADD Catheterisations
      await page.getByRole('button', { name: 'ADD' }).isEnabled();
      await page.getByRole('button', { name: 'ADD' }).click();
      await page.waitForTimeout(8000);
      await page.getByRole('cell', { name: 'Add Catheterisation using playwright automation' }).first().isVisible();
      await page.getByRole('cell', { name: /.* Diane Curtis/ }).first().isVisible();
      await page.waitForLoadState();
    }
    //UPDATE Catheterisations 
    await page.locator('#fade-button').first().click();
    await page.getByRole('menuitem', { name: 'Update' }).click();
    await page.getByLabel('Notes').click();
    await page.getByLabel('Notes').press('Meta+a');
    await page.getByLabel('Notes').fill('Update Catheterisation using playwright automation');
    await expect(page.getByRole('button', { name: 'UPDATE' })).toBeEnabled();
    await page.getByRole('button', { name: 'UPDATE' }).click({force:true});
    await page.getByText('Successfully updated catheterisation.').isVisible();
    await page.getByRole('cell', { name: 'Update Catheterisation using playwright automation' }).first().isVisible();
    //CEASE Catheterisations
    await page.getByRole('row', { name: / .* Catheterisation using playwright automation .*/ }).first().locator('#fade-button').click();
    await page.getByRole('menuitem', { name: 'Cease' }).click({force:true});
    await page.getByRole('heading', { name: 'Cease Catheterisation?' }).isVisible();
    await page.getByRole('button', { name: 'CEASE' }).click({force:true});
    await page.getByText('Successfully ceased catheterisation.').isVisible();
    //UNCEASE Catheterisations
    await page.locator('xpath=//*[@id="tab-2"]').click({force:true});
    await page.getByRole('row', { name: / .* Catheterisation using playwright automation .*/ }).first().isVisible();
    await page.locator('[id="__next"] div').filter({ hasText: /.* Update Catheterisation using playwright automation .*/ }).nth(4).isVisible();
    await page.getByRole('tab', { name: 'Ceased' }).click();
    await page.locator('td:nth-child(2)').first().isVisible();
    await page.locator('.MuiTableBody-root > tr').first().isVisible();
    await page.locator('#fade-button').first().click();
    await page.getByRole('menuitem', { name: 'Uncease' }).click();
    await page.getByRole('button', { name: 'UNCEASE' }).click();
    await page.getByText('Succesfully unceased catheterisation.').isVisible();
    //DELETE Catheterisations
    await page.locator('xpath=//*[@id="tab-1"]').click({force:true});
    await page.waitForLoadState('networkidle');
    await page.locator('xpath=//*[@id="__next"]/div/main/div[2]/div/div[5]/div[2]/table/tbody/tr/td[2]').getByText('Update Catheterisation using playwright automation');
    //await page.locator('[id="__next"] div').filter({ hasText: /.* Update Catheterisation using playwright automation .*/ }).nth(4).isVisible();
    //await page.locator('td:nth-child(2)').first().isVisible();
    //await expect(page.locator('.MuiTableBody-root > tr').first()).toBeVisible({timeout:10000});
    await page.locator('#fade-button').first().click({force:true});
    await page.getByText('Delete').click({force:true});
    await page.locator('xpath=/html/body/div[3]/div[3]/div').isEnabled();
    await page.getByRole('heading', { name: 'Delete Catheterisation?' }).isVisible();
    await page.getByText('* Only delete if this was entered by mistake.').isVisible();
    await page.getByText('DELETE').nth(3).isVisible();
    await page.getByRole('button', { name: 'DELETE' }).click({force:true});
    await page.getByText('Successfully deleted catheterisation.').isVisible();
});