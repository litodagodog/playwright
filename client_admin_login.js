const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false

  });
  const context = await browser.newContext(
    {    recordVideo: {
        dir : 'videos'
        }
    } 
    );

  const page = await context.newPage();
  await page.goto('https://management.staging.rbfeedback.com/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('lito+superadmin@lanexus.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Test123!');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Account Management' }).getByText('Account Management').click();
  // ---------------------
  /*await context.close();
  await browser.close(); */
})();