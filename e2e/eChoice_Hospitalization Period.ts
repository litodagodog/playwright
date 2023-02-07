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
    await page.getByRole('checkbox', { name: /Adam Sandler .*/ }).click();
    await page.waitForTimeout(8000);
});

test('Hospitalization Periods', async () => {
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
    await page.getByRole('option', { name: 'Hospitalisation Periods' }).click();
    await page.waitForTimeout(10000);
    const checkEnable = await page.getByRole('button', { name: 'ADD HOSPITALISATION PERIOD' }).isVisible();
    if ((checkEnable == true))
    {
      const dupHos =   await page.getByRole('cell', { name: '01/01/2000' }).isVisible();
      if ((dupHos == true))
      {
        await page.getByRole('button', { name: 'ADD HOSPITALISATION PERIOD' }).click();
        await page.getByRole('heading', { name: 'Add Hospitalisation Period' }).isVisible();
        await page.waitForTimeout(8000);
        await page.getByLabel('Date *').fill(formatDate(randomDate('2022-01-01', '2022-12-31')));
      }
      await page.getByLabel('Notes').click();
      await page.getByLabel('Notes').fill('Add Hospitalization Period using playwright automation');
      await page.getByRole('button', { name: 'ADD' }).click();
      await page.getByRole('cell', { name: 'Add Hospitalization Period using playwright automation' }).isVisible();
      await page.waitForTimeout(8000);
    }
    else {
      await page.getByRole('button', { name: 'RETURN FROM HOSPITALISATION' }).click();
      await page.getByLabel('Ceased At *').fill(formatDate(randomDate('2022-12-31', '2023-02-01')));
      await page.getByRole('button', { name: 'CEASE' }).click();
      await page.getByText('Successfully ceased hospitalisation period.').isVisible();
      await page.getByRole('cell', { name: / .* Diane Curtis/ }).isVisible();

    }

    // await page.getByRole('row', { name:'Add Hospitalization Period using playwright automation' }).first().locator('#fade-button').click();
    // await page.getByRole('menuitem', { name: 'Update' }).click();
    // await page.getByRole('heading', { name: 'Update Hospitalisaton Period' }).click();
    // await page.getByLabel('Date *').fill('2023-02-02');
    // await page.getByLabel('Notes').click();
    // await page.getByLabel('Notes').press('Meta+a');
    // await page.getByLabel('Notes').fill('Update Hospitalization Period using playwright automation');
    // await page.getByRole('button', { name: 'UPDATE' }).click();
    // await page.getByRole('cell', { name: 'Update Hospitalization Period using playwright automation' }).click();
});