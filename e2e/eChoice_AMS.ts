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
    //Check user
    await expect(page.getByText('Diane Curtis')).toHaveText('Diane Curtis');
    await expect(page.getByText('Pharmacist')).toHaveText('Pharmacist');
    //OPEN RESIDENTS
    await page.getByRole('button', { name: 'Residents' }).click();
    await page.getByRole('checkbox', { name: /AMStesting Playwright .*/ }).click({force:true});
    await page.waitForTimeout(8000);
});

test('Anti-Microbial Stewarship', async () => {
    //ADD
    await page.getByRole('button', { name: 'ADD PRESCRIPTION' }).click();
    await page.getByPlaceholder('Search Medication').click();
    await page.getByRole('option', { name: 'dactinomycin (actinomycin D) 500 microgram injection, vial' }). click();
    await page.getByText('This is an Antimicrobial Medication.').click();
    await page.getByLabel('Commenced *').fill('2023-03-01');
    await page.getByPlaceholder('Search Route').click();
    await page.getByRole('option', { name: 'Intravenous peripheral route' }).click();
    await page.getByLabel('Doses *').click();
    await page.getByLabel('Doses *').fill('10');
    await page.getByPlaceholder('Search Direction').click();
    await page.getByRole('option', { name: 'Every 4 days' }).click();
    await page.getByLabel('Comment').click();
    await page.getByLabel('Comment').fill('This is a comment from playwright automation');
    await page.getByRole('button', { name: 'ADD' }).click();
    await page.getByText('dactinomycin (actinomycin D) 500 microgram injection, vial').first().isVisible();
    await page.getByText('This is a comment from playwright automation').first().isVisible();
    await page.waitForTimeout(10000);
    //OPEN ANTI-MICROBIAL STEWARDSHIP
    await page.getByRole('button', { name: 'Open' }).click();
    await page.getByRole('option', { name: 'Anti-microbial Stewardship' }).click();
    await expect(page.getByText('Intravenous peripheral route')).toBeVisible();
    await page.locator('//*[@id="__next"]/div/main/div[2]/div/div[5]/div[1]/table/tbody/tr/td[1]').filter({ hasText: /.* dactinomycin (actinomycin D) 500 microgram injection .*/ }).isVisible();
    await page.locator('//*[@id="__next"]/div/main/div[2]/div/div[5]/div[1]/table/tbody/tr/td[10]/button').click({force:true});
    await page.getByLabel('Site *').click();
    await page.getByRole('option', { name: 'Site 1' }).click();
    await page.getByLabel('Indication *').click();
    await page.getByRole('option', { name: 'Indication A' }).click();
    await page.getByPlaceholder('Signs/Symptoms').click();
    await page.getByPlaceholder('Signs/Symptoms').fill('Signs and symptoms');
    await page.getByLabel('Pathology Requested').check();
    await page.getByLabel('Stop/review date listed').check();
    await page.getByRole('button', { name: 'UPDATE' }).click();
    await expect(page.getByText('Site 1')).toBeVisible();
    await expect(page.getByText('Indication A')).toBeVisible();
    await page.locator('//*[@id="__next"]/div/main/div[2]/div/div[5]/div[1]/table/tbody/tr/td[10]/button').click({force:true});
    await page.getByLabel('Site *').click();
    await page.getByRole('option', { name: 'Site 3' }).click();
    await page.getByLabel('Indication *').click();
    await page.getByRole('option', { name: 'Indication C' }).click();
    await page.getByRole('button', { name: 'UPDATE' }).click();
    await expect(page.getByText('Site 3')).toBeVisible();
    await expect(page.getByText('Indication C')).toBeVisible();
    //UPDATE REGULAR PRESCRIPTION
    await page.getByRole('button', { name: 'Open' }).click();
    await page.getByRole('option', { name: 'Regular Prescription' }).click();
    await page.locator('#fade-button').first().click();
    await page.getByRole('menuitem', { name: 'Update' }).click();
    await page.getByLabel('Doses *').click();
    await page.getByLabel('Doses *').fill('8');
    await page.getByLabel('Comment').click();
    await page.getByLabel('Comment').fill('Playwright Update');
    await page.getByRole('button', { name: 'UPDATE' }).click({force:true});
    await expect(page.locator('//*[@id="__next"]/div/main/div[2]/div/div[5]/div[3]/table/tbody/tr/td[2]/div/span')).toHaveText('1');
    await expect(page.locator('//*[@id="__next"]/div/main/div[2]/div/div[5]/div[3]/table/tbody/tr/td[5]/li')).toHaveText('8 Dose Every 4 days');
    //await expect(page.locator('//*[@id="__next"]/div/main/div[2]/div/div[5]/div[3]/table/tbody/tr/td[6]')).toHaveText('Playwright Update');
    //await page.waitForTimeout(5000);
    //CHECK AMS AGAIN - no changes
    await page.getByRole('button', { name: 'Open' }).click();
    await page.getByRole('option', { name: 'Anti-microbial Stewardship' }).click();
    await expect(page.getByText('Intravenous peripheral route')).toBeVisible();
    await expect(page.getByText('Site 3')).toBeVisible();
    await expect(page.getByText('Indication C')).toBeVisible();
    //DELETE 1st Regular Prescription
    await page.getByRole('button', { name: 'Open' }).click();
    await page.getByRole('option', { name: 'Regular Prescription' }).click();
    await page.locator('#fade-button').first().click();
    await page.getByText('Delete').click();
    await page.getByRole('heading', { name: 'Delete prescription' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByText('Successfully deleted prescription.').isVisible();
    await page.reload();
    //DELETE 2nd Regular Prescription
    await page.locator('#fade-button').first().click();
    await page.getByText('Delete').click();
    await page.getByRole('heading', { name: 'Delete prescription' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByText('Successfully deleted prescription.').isVisible();
    await page.getByRole('button', { name: 'Open' }).click();
    await page.getByRole('option', { name: 'Anti-microbial Stewardship' }).click();
    await expect(page.getByText('Intravenous peripheral route')).toBeVisible();
});