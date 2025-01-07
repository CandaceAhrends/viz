import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://www.stockmarketviz.com/');
  await page.getByLabel('Previous Month').click();
  await page.getByLabel('Previous Month').click();
  await page
    .getByRole('heading', { name: 'Historical Market Scanner' })
    .click();
  await page.getByText('SPY').click();
  await page.getByText('QQQ').click();
  await page.getByRole('button', { name: 'Latest' }).click();
  await page.locator('.group > li:nth-child(2)').click();
  await page.getByRole('navigation').getByRole('link').nth(1).click();
  await page.getByRole('navigation').getByRole('link').first().click();
  await page.getByText('Current').click();
  await page.getByRole('navigation').getByRole('link').nth(4).click();
});
