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
    //await expect(page.getByText('Diane Curtis')).toHaveText('Diane Curtis');
    await expect(page.getByText('Pharmacist')).toHaveText('Pharmacist');
    //OPEN RESIDENTS
    await page.getByRole('button', { name: 'Residents' }).click();
    await page.getByRole('checkbox', { name: /Playwright Automation .*/ }).click({force:true});
    await page.waitForTimeout(8000);
});

test('Regular Prescription', async () => {
    //ADD
    await page.getByRole('button', { name: 'ADD PRESCRIPTION' }).click();
    await page.getByPlaceholder('Search Medication').click();
    await page.getByRole('option', { name: 'olanzapine 20 mg tablet' }).click();
    await page.getByLabel('Commenced *').fill('2023-02-01');
    await page.getByPlaceholder('Search Route').click();
    await page.getByRole('option', { name: 'Intravenous peripheral route' }).click();
    await page.getByLabel('Doses *').click();
    await page.getByLabel('Doses *').fill('10');
    await page.getByPlaceholder('Search Direction').click();
    await page.getByRole('option', { name: 'Every 4 days' }).click();
    await page.getByLabel('Comment').click();
    await page.getByLabel('Comment').fill('This is a comment from playwright automation');
    await page.getByRole('button', { name: 'ADD' }).click();
    await page.getByText('olanzapine 20 mg tablet').first().isVisible();
    await page.getByText('This is a comment from playwright automation').first().isVisible();
    //UPDATE
    await page.locator('#fade-button').first().click();
    await page.getByRole('menuitem', { name: 'Update' }).click();
    await page.getByLabel('Doses *').click();
    await page.getByLabel('Doses *').fill('8');
    await page.getByLabel('Comment').click();
    await page.getByLabel('Comment').fill('Playwright Update');
    await page.getByRole('button', { name: 'UPDATE' }).click();
    await expect(page.locator('//*[@id="__next"]/div/main/div[2]/div/div[5]/div[3]/table/tbody/tr/td[2]/div/span')).toHaveText('1');
    await expect(page.locator('//*[@id="__next"]/div/main/div[2]/div/div[5]/div[3]/table/tbody/tr/td[5]/li')).toHaveText('8 Dose Every 4 days');
    await expect(page.locator('//*[@id="__next"]/div/main/div[2]/div/div[5]/div[3]/table/tbody/tr/td[6]')).toHaveText('Playwright Update');
    await page.locator('#fade-button').first().click();
    await page.getByRole('menuitem', { name: 'View Logs' }).click();
    await page.getByRole('cell', { name: 'Intravenous peripheral route' }).isVisible();
    await page.locator('xpath=/html/body/div[3]/div[3]/div/div[1]/div[1]/table/tbody/tr/td[3]/li/text()').getByText('10 Dose Every 4 days');
    await page.getByRole('button', { name: 'Close' }).click({force:true});
    //SINGLE CEASE
    await page.locator('#fade-button').first().click();
    await page.getByRole('menuitem', { name: 'Cease' }).click();
    await page.getByLabel('Cease At *').fill('2023-02-01');
    await page.getByRole('button', { name: 'CEASE' }).click();
    await page.getByRole('tab', { name: 'Ceased' }).click();
    await expect(page.locator('//*[@id="__next"]/div/main/div[2]/div/div[5]/div[3]/table/tbody/tr/td[2]/div/span')).toHaveText('1');
    await expect(page.locator('//*[@id="__next"]/div/main/div[2]/div/div[5]/div[3]/table/tbody/tr/td[5]/li')).toHaveText('8 Dose Every 4 days');
    await expect(page.locator('//*[@id="__next"]/div/main/div[2]/div/div[5]/div[3]/table/tbody/tr/td[6]')).toHaveText('Playwright Update');
    //SINGLE UNCEASE
    await page.locator('#fade-button').first().click();
    await page.getByRole('menuitem', { name: 'Uncease' }).click();
    await page.getByRole('button', { name: 'UNCEASE' }).click();
    //BULK CEASE
    await page.getByRole('tab', { name: 'Active' }).click();
    await expect(page.locator('//*[@id="__next"]/div/main/div[2]/div/div[5]/div[3]/table/tbody/tr[1]/td[2]')).toHaveText('1olanzapine 20 mg tablet');
    await page.locator('//*[@id="__next"]/div/main/div[2]/div/div[5]/div[3]/table/thead/tr/th[1]/span/input').click();
    await page.waitForLoadState();
    await page.getByRole('button', { name: 'Cease Prescription' }).click();
    await page.getByLabel('Cease At *').fill('2023-02-01');
    await page.getByRole('button', { name: 'CEASE' }).click();
    await page.getByText('Successfully ceased 1 prescription.').click();
    await page.getByRole('tab', { name: 'Ceased' }).click();
    await page.waitForLoadState();
    await expect(page.locator('//*[@id="__next"]/div/main/div[2]/div/div[5]/div[3]/table/tbody/tr[1]/td[2]')).toHaveText('1olanzapine 20 mg tablet');
    //BULK UNCEASE
    await page.locator('//*[@id="__next"]/div/main/div[2]/div/div[5]/div[3]/table/thead/tr/th[1]/span/input').click();
    await page.waitForLoadState();
    await page.getByRole('button', { name: 'Uncease Prescription' }).click();
    await page.getByRole('heading', { name: 'Bulk Uncease Prescription' }).isVisible();
    await page.getByText('Do not uncease if this is a new prescription.').isVisible();
    await page.getByRole('button', { name: 'UNCEASE' }).click();
    await page.getByRole('tab', { name: 'Active' }).click();
    await page.waitForLoadState('networkidle');
    await page.locator('//*[@id="__next"]/div/main/div[2]/div/div[5]/div[3]/table/tbody/tr[1]/td[2]').getByText('1olanzapine 20 mg tablet');
    //DELETE 1st Prescription
    await page.locator('#fade-button').first().click();
    await page.getByText('Delete').click();
    await page.getByRole('heading', { name: 'Delete prescription' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByText('Successfully deleted prescription.').isVisible();
    await page.reload();
    //DELETE 2nd Prescription
    await page.locator('#fade-button').first().click();
    await page.getByText('Delete').click();
    await page.getByRole('heading', { name: 'Delete prescription' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByText('Successfully deleted prescription.').isVisible();
});