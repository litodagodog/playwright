import { test, Page , expect} from '@playwright/test';

test.describe.configure({ mode: 'serial' });

let page: Page;
const rando = Math.floor((Math.random()*100) + 1).toString();
const rUsername = (Math.random() + 1).toString(36).substring(7);

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
  await page.getByPlaceholder('Email, phone, or Skype').fill(process.env.ADMIN);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(process.env.ADMINPASS);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  //await page.getByRole('listitem', { name: 'Account settings' }).getByText('Dean Damasig').isVisible();
  await page.waitForLoadState();
});

test.afterAll(async () => {
  await page.close();
});

test('Manage Pharmacists', async () => {
  await page.getByRole('button', { name: 'Settings' }).click();
  await page.getByRole('menuitem', { name: 'Manage Pharmacists' }).click();
  await page.getByRole('button', { name: 'Create New Pharmacist' }).click();
  await page.getByLabel('Username *').click();
  await page.getByLabel('Username *').fill(rUsername);
  await page.getByLabel('Username *').press('Tab');
  await page.getByLabel('Password *').fill('Test12345!?');
  await page.getByLabel('Password *').press('Tab');
  await page.getByLabel('Given Name *').fill('Playwright');
  await page.getByLabel('Given Name *').press('Tab');
  await page.getByLabel('Surname *').fill('Pharma');
  await page.getByRole('button', { name: 'Accreditation False' }).click();
  await page.getByRole('option', { name: 'True' }).click();
  await page.getByLabel('Accreditation Expiry *').fill('2024-01-01');
  await page.getByLabel('AHPRA NUM *').click();
  await page.getByLabel('AHPRA NUM *').fill(rando);
  await page.getByLabel('AHPRA Expiry *').fill('2024-01-01');
  await page.getByLabel('AACP Num *').click();
  await page.getByLabel('AACP Num *').fill(rando);
  await page.getByLabel('AACP Start *').fill('2022-01-01');
  await page.getByLabel('AACP Expiry *').fill('2024-01-01');
  await page.getByLabel('Police Check Expiry').fill('2024-01-02');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(5000);
  await page.getByText('Successfully created pharmacist.').isVisible();
  await page.getByText('Playwright Pharma').isVisible;
  await page.locator('//*[@id="fade-button"]').nth(0).click({force:true});
  await page.getByRole('menuitem', { name: 'Update' }).click();
  await page.getByLabel('Username *').click();
  await page.getByLabel('Username *').fill('playwright ');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('Playwright Pharma').isVisible;
  await page.locator('//*[@id="fade-button"]').nth(0).click({force:true});
  await page.getByRole('menuitem', { name: 'Update' }).click();
  await page.getByLabel('Username *').click();
  await page.getByLabel('Username *').fill('playwright updated');
  await page.getByLabel('Username *').press('Meta+a');
  await page.getByLabel('Username *').press('Meta+c');
  await page.getByLabel('Username *').press('Tab');
  await page.getByLabel('Given Name *').fill('updated name');
  await page.getByRole('button', { name: 'Accreditation * True' }).click();
  await page.getByRole('option', { name: 'False' }).click();
  await page.getByLabel('Accreditation Expiry *').fill('2025-01-01');
  await page.getByLabel('AHPRA Expiry *').fill('2024-01-01');
  await page.getByRole('heading', { name: 'Facility Associations' }).isVisible();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Successfully updated pharmacist.').isVisible();
  await page.getByText('updated name Pharma').isVisible;
  await page.locator('//*[@id="fade-button"]').nth(0).click({force:true});
  await page.getByRole('menuitem', { name: 'Delete' }).click();
  await page.getByRole('heading', { name: 'Delete Pharmacist' }).isVisible();
  await page.getByText('Deleting this pharmacist (updated name Pharma ) will also delete any associated ').isVisible();
  await page.getByRole('button', { name: 'No' }).click();
  await page.getByText('updated name Pharma').isVisible;
  await page.locator('//*[@id="fade-button"]').nth(0).click({force:true});
  await page.getByRole('menuitem', { name: 'Delete' }).click();
  await page.getByRole('heading', { name: 'Delete Pharmacist' }).isVisible();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByText('Successfully deleted pharmacist.').isVisible();
});