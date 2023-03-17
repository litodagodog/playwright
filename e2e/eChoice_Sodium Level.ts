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

test('Sodium Levels', async () => {
  //Generate Random Date
  function randomDate(date1, date2){
    function randomValueBetween(min, max) {
      return Math.random() * (max - min) + min;
    }
    var date1 = date1 || '01-01-2000'
    var date2 = date2 || new Date().toLocaleDateString()
    date1 = new Date(date1).getTime()
    date2 = new Date(date2).getTime()
    if( date1>date2){
        return new Date(randomValueBetween(date2,date1)).toLocaleDateString()   
    } else{
        return new Date(randomValueBetween(date1, date2)).toLocaleDateString()  

    }
  }
  //Format the date to YYYY-MM-DD
  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Sodium Levels' }).click();
    await page.getByRole('button', { name: 'ADD SODIUM LEVEL' }).click();
    await page.getByRole('heading', { name: 'Add Sodium Level' }).isVisible();
    await page.getByLabel('Date *').fill(formatDate(randomDate('2023-01-01', '2023-01-29')));
    await page.getByLabel('Sodium Level (mmol) *').click();
    await page.getByLabel('Sodium Level (mmol) *').fill('1');
    await page.getByLabel('Notes').click();
    await page.getByLabel('Notes').fill('Add Sodium Level using playwright automation');
    await page.waitForTimeout(8000);
    await page.getByRole('button', { name: 'ADD' }).click();
    await page.getByText('Successfully created Sodium Level').isVisible();
    await page.waitForTimeout(8000);
    await page.getByRole('cell', { name: 'Add Sodium Level using playwright automation' }).first().isVisible();
    await page.getByRole('cell', { name: '1' }).first().isVisible();
    //UPDATE SODIUM LEVEL(500)
    await page.getByRole('row', { name: 'Add Sodium Level using playwright automation' }).first().locator('#fade-button').click();
    await page.getByRole('menuitem', { name: 'Update' }).click();
    await page.getByRole('heading', { name: 'Update Sodium Level' }).isVisible();
    await page.getByLabel('Date *').fill('2023-02-01');
    await page.getByLabel('Sodium Level (mmol) *').click();
    await page.getByLabel('Sodium Level (mmol) *').fill('');
    await page.getByLabel('Sodium Level (mmol) *').fill('500');
    await page.getByLabel('Notes').click();
    await page.getByLabel('Notes').press('Meta+a');
    await page.getByLabel('Notes').fill('Update Sodium notes using playwright automation');
    await page.getByRole('button', { name: 'UPDATE' }).click();
    await page.getByText('Successfully updated Sodium Level').isVisible();
    await page.waitForTimeout(8000);
    await page.getByRole('cell', { name: '500' }).first().isVisible();
    await page.getByTestId('ErrorIcon').isHidden();
    await page.getByRole('cell', { name: 'Update Sodium notes using playwright automation' }).first().isVisible();
    //UPDATE SODIUM LEVEL(more than 500)
    await page.getByRole('row', { name: 'Update Sodium notes using playwright automation' }).first().locator('#fade-button').click();
    await page.getByRole('menuitem', { name: 'Update' }).click();
    await page.getByRole('heading', { name: 'Update Sodium Level' }).isVisible();
    await page.getByLabel('Date *').fill('2023-02-03');
    await page.getByLabel('Sodium Level (mmol) *').click();
    await page.getByLabel('Sodium Level (mmol) *').fill('');
    await page.getByLabel('Sodium Level (mmol) *').fill('501');
    await page.getByRole('button', { name: 'UPDATE' }).click();
    await page.getByText('Successfully updated Sodium Level').isVisible({timeout:10000});
    await page.waitForLoadState('networkidle');
    await page.waitForSelector("text=501", {state: "visible"});
    await page.getByRole('cell', { name: '501' }).first().isVisible();
    await page.getByTestId('ErrorIcon').locator('path').isVisible();
    //DELETE SODIUM LEVEL
    await page.locator('#fade-button').first().click({force:true});
    await page.getByText('Delete').click({force:true});
    await page.getByRole('heading', { name: 'Delete Sodium Level?' }).isVisible();
    await page.getByRole('button', { name: 'DELETE' }).click({timeout:10000});
    //await page.waitForSelector("text=Successfully deleted falls event.", {state: "visible"});
    await page.waitForLoadState('networkidle');
    await page.getByRole('cell', { name: 'Update Sodium notes using playwright automation' }).first().isHidden();
    await page.getByText('501').first().isHidden();
    await page.getByTestId('ErrorIcon').isHidden();

});