const { chromium } = require('@playwright/test');
const { expect } = require('@playwright/test');
const { matchers } = require('expect-playwright');
expect.extend(matchers);

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 1024 }
  });
  
  const page = await context.newPage();
  await page.goto('https://management.rbfeedback.com/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('lito+prodsubs@lanexus.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Test123!');
  await page.getByPlaceholder('Password').press('Enter');
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page.$('.mr-2')).toHaveText('Dashboard');
  await expect(page).toHaveURL('https://management.rbfeedback.com/dashboard')
  await page.getByRole('link', { name: 'Reviews' }).click({timeout: 5000});
  await expect(page).toHaveURL('https://management.rbfeedback.com/reviews#reviews', {timeout: 5000})
  await page.getByRole('link', { name: 'Appointments' }).click();
  await expect(page).toHaveURL('https://management.rbfeedback.com/appointments', {timeout: 5000})
  await page.getByRole('link', { name: 'Surveys' }).click();
  await expect(page).toHaveURL('https://management.rbfeedback.com/surveys', {timeout: 5000})
  await page.getByRole('link', { name: 'Messages' }).click();
  await expect(page).toHaveURL('https://management.rbfeedback.com/messages#requests_v2', {timeout: 5000})
  await page.getByRole('link', { name: 'Transactions' }).click();
  await expect(page).toHaveURL('https://management.rbfeedback.com/transactions', {timeout: 5000})
  await page.getByRole('link', { name: 'Confirm' }).click();
  await page.getByRole('link', { name: 'KPIs' }).click();
  await expect(page).toHaveURL('https://management.rbfeedback.com/kpis', {timeout: 5000})
  await page.getByRole('link', { name: 'Leaderboard' }).click();
  await expect(page).toHaveURL('https://management.rbfeedback.com/leaderboard', {timeout: 5000})
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'BuzzMaps' }).click()
  ]);
  await page1.locator('#buzz-map-header-container').getByText('ReviewBuzz(Lito Test Account)').click();
  await expect(page1).toHaveURL('https://www.rbfeedback.com/profile/reviewbuzzlito-test-account/map', {timeout: 5000})
  await page1.close();
  await page.getByRole('link', { name: 'Locations' }).click();
  await expect(page).toHaveURL('https://management.rbfeedback.com/locations', {timeout: 5000})
  await page.getByRole('link', { name: 'Employees' }).click();
  await expect(page).toHaveURL('https://management.rbfeedback.com/employees', {timeout: 5000})
  await page.getByRole('link', { name: 'Rewards' }).click();
  await expect(page).toHaveURL('https://management.rbfeedback.com/rewards', {timeout: 5000})
  await page.getByRole('link', { name: 'Integrations' }).click();
  await expect(page).toHaveURL('https://management.rbfeedback.com/integrations', {timeout: 5000})
  await page.getByRole('link', { name: 'Toolkit' }).click();
  await expect(page).toHaveURL('https://management.rbfeedback.com/toolkit', {timeout: 5000})
  await page.getByRole('link', { name: 'Settings' }).click();
  await expect(page).toHaveURL('https://management.rbfeedback.com/settings#company-info', {timeout: 5000})
  // ---------------------
  await context.close();
  await browser.close();
})();