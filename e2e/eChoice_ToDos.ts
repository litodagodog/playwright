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

test('ToDos', async () => {
  //Create ToDos
  await page.getByRole('button', { name: 'Todos' }).click();
  await page.getByRole('button', { name: 'Create New Todo' }).click();
  await page.getByLabel('Title *').click();
  await page.getByLabel('Title *').fill('ToDo Automation');
  await page.getByLabel('Description').click();
  await page.getByLabel('Description').fill('Description Automation');
  await page.getByPlaceholder('Search Resident').click();
  await page.getByRole('option', { name: 'Playwright Automation' }).click();
  await page.getByLabel('Due at').click();
  await page.getByLabel('Due at').click();
  await page.getByLabel('Due at').press('Tab');
  await page.getByLabel('Due at').fill('2023-01-01T01:01');
  await page.getByLabel('Due at').click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Successfully created todo item.').isVisible();
  await page.getByRole('rowheader', { name: 'Playwright Automation' }).isVisible();
  await page.getByRole('cell', { name: 'ToDo Automation' }).isVisible();
  await page.getByRole('cell', { name: 'Description Automation' }).isVisible();
  await page.locator('#fade-button').click();
  await page.getByRole('menuitem', { name: 'Update' }).click();
  await page.getByLabel('Title *').click();
  await page.getByLabel('Title *').fill('ToDo Updated');
  await page.getByLabel('Description').click();
  await page.getByLabel('Description').fill('Description Updated');
  await page.getByLabel('Due at').click();
  await page.getByLabel('Due at').fill('2023-02-01T01:01');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('rowheader', { name: 'Playwright Automation' }).isVisible();
  await page.getByRole('cell', { name: 'ToDo Automation' }).isVisible();
  await page.getByRole('cell', { name: 'Description Automation' }).isVisible();
  await page.locator('#fade-button').click();
  await page.getByRole('menuitem', { name: 'Update' }).click();
  await page.getByLabel('Title *').click();
  await page.getByLabel('Title *').fill('ToDo Updated');
  await page.getByLabel('Description').dblclick();
  await page.getByLabel('Description').fill('Description Updated');
  await page.getByLabel('Due at').click();
  await page.getByLabel('Due at').fill('2023-03-01T01:01');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('cell', { name: 'ToDo Updated' }).first().isVisible();
  await page.getByRole('cell', { name: 'Description Updated' }).nth(1).isVisible();
  await page.locator('#fade-button').click();
  await page.getByRole('menuitem', { name: 'Complete' }).click();
  await page.getByRole('heading', { name: 'Mark as Complete' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#fade-button').click();
  await page.getByRole('menuitem', { name: 'Complete' }).click();
  await page.getByRole('heading', { name: 'Mark as Complete' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Successfully completed todo item.').isVisible();
  await page.locator('#tab-2').click();
  await page.getByRole('rowheader', { name: 'Playwright Automation' }).isVisible();
  await page.locator('#fade-button').click();
  await page.getByRole('menuitem', { name: 'Incomplete' }).click();
  await page.getByRole('heading', { name: 'Mark as Incomplete' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('tab', { name: 'Incomplete' }).click();
  await page.locator('#fade-button').click();
  await page.getByRole('menuitem', { name: 'Discard' }).click();
  await page.getByRole('heading', { name: 'Discard Todo' }).isVisible();
  await page.getByLabel('Reason *').click();
  await page.getByLabel('Reason *').fill('discarded');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('rowheader', { name: 'Playwright Automation' }).click();
  await page.locator('#fade-button').click();
  await page.getByRole('menuitem', { name: 'Discard' }).click();
  await page.getByLabel('Reason *').click();
  await page.getByLabel('Reason *').fill('Discard');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Successfully discarded todo item.').isVisible();
  await page.getByRole('tab', { name: 'Discarded' }).click();
  await page.getByRole('cell', { name: 'Discard' }).nth(0).isVisible();
  await page.locator('#fade-button').nth(0).click();
  await page.getByRole('menuitem', { name: 'Incomplete' }).click();
  await page.getByRole('heading', { name: 'Mark as Incomplete' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('tab', { name: 'Incomplete' }).click();
  await page.getByRole('rowheader', { name: 'Playwright Automation' }).isVisible();
  //Disregard ToDos
  await page.locator('#fade-button').click();
  await page.getByRole('menuitem', { name: 'Discard' }).click();
  await page.getByRole('heading', { name: 'Discard Todo' }).click();
  await page.getByLabel('Reason *').click();
  await page.getByLabel('Reason *').fill('Discarded');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Successfully discarded todo item.').isVisible();
});