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
  await page.getByPlaceholder('Email, phone, or Skype').fill('pharmacist2@ddamasiggmail.onmicrosoft.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('aApu689By5j^5^');
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

test('Diagnoses', async () => {
    //Open Add Diagnosis modal
    await page.getByRole('button', { name: 'Open' }).click();
    await page.getByRole('option', { name: 'Diagnoses' }).click();
    await page.waitForTimeout(10000);
    await page.getByRole('button', { name: 'ADD DIAGNOSIS' }).click();
    await page.getByRole('heading', { name: 'Add Diagnosis' }).isVisible();
    await page.getByPlaceholder('Search Diagnosis').click();
    await page.getByRole('option', { name: 'Percutaneous aspiration of renal pelvis' }).click();
    await page.waitForTimeout(9000);
    //Check for Duplicate Entry and Delete it
    const duplicateEntry = await page.getByText('Duplicate Diagnosis').isVisible();
    if ((duplicateEntry == true )){
      await page.getByRole('button', { name: 'CANCEL' }).click();
      await page.getByRole('row', { name: /Percutaneous aspiration of renal pelvis .*/ }).locator('#fade-button').click();
      await page.getByRole('menuitem', { name: 'Delete' }).click();
      await page.getByRole('button', { name: 'DELETE' }).click();
      await page.waitForLoadState();
    }
    else {
      //Add Diagnosis
      await page.getByRole('button', { name: 'ADD' }).isEnabled();
      await page.getByRole('button', { name: 'ADD' }).click({timeout:10000});
      await page.getByRole('cell', { name: 'Percutaneous aspiration of renal pelvis' }).isVisible();
      await page.getByRole('cell', { name: 'This note is from playwright automation' }).isVisible();
      //Update Diagnosis
      await page.getByRole('row', { name: /Percutaneous aspiration of renal pelvis .*/ }).locator('#fade-button').click();
      await page.getByRole('menuitem', { name: 'Update' }).click();
      await page.getByRole('heading', { name: 'Update Diagnosis' }).isVisible();
      await page.getByPlaceholder('Search Diagnosis').click();
      await page.getByRole('option', { name: 'Sycosis' }).click({timeout:10000});;
      await page.getByRole('heading', { name: 'Update Diagnosis' }).click();
      await page.getByLabel('Notes').click();
      await page.getByLabel('Notes').fill('Updated Notes using playwright');
      await page.getByRole('button', { name: 'UPDATE' }).click();
      await page.getByText('Successfully updated Diagnosis.').isVisible();
      await page.getByRole('cell', { name: 'Sycosis' }).isVisible();
      await page.getByRole('cell', { name: 'Updated Notes using playwright' }).isVisible();
      //Cease Diagnosis
      await page.locator('#fade-button').click();
      await page.getByRole('menuitem', { name: 'Cease' }).click();
      await page.getByRole('heading', { name: 'Cease Diagnosis?' }).click();
      await page.getByRole('button', { name: 'CEASE' }).click({force:true});
      await page.getByText('Successfully ceased Diagnosis.').isVisible();
      await page.getByRole('tab', { name: 'Ceased' }).click();
      //Uncease Diagnosis
      await page.locator('#fade-button').click();
      await expect(page.locator('.MuiTableBody-root > tr').first()).toBeEnabled({timeout:10000});
      await page.getByRole('cell', { name: 'Sycosis' }).isVisible();
      await page.getByRole('menuitem', { name: 'Uncease' }).click();
      await page.getByRole('heading', { name: 'Uncease Diagnosis?' }).click();
      await page.getByRole('button', { name: 'UNCEASE' }).click();
      await page.getByText('Succesfully unceased Diagnosis.').isVisible({timeout:10000});
      //Delete Diagnosis
      await page.getByRole('tab', { name: 'Active' }).click();
      await expect(page.locator('.MuiTableBody-root > tr').first()).toBeEnabled({timeout:10000});
      await page.getByRole('cell', { name: 'Sycosis' }).isVisible();
      await page.waitForLoadState('networkidle');
      await page.locator('#fade-button').click({force:true});
      await page.getByText('Delete').click({force:true});
      await page.getByRole('heading', { name: 'Delete Diagnosis?' }).isVisible();
      await page.getByRole('button', { name: 'DELETE' }).click({force:true});
      await page.waitForLoadState('networkidle');
      await page.getByRole('cell', { name: 'Sycosis' }).isHidden();
      await page.getByRole('tab', { name: 'Ceased' }).click();
      await page.getByRole('cell', { name: 'Sycosis' }).isHidden();
    }
});