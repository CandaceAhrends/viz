import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://www.stockmarketviz.com/');
  await page.getByLabel('Choose Monday, January 6th,').click();
  await page.getByRole('navigation').getByRole('link').nth(2).click();
  await page.getByRole('button', { name: 'NEXT ▶' }).click();
  await page.getByRole('button', { name: '◀ PREV' }).click();
  await page.locator('.lg-icon > a').click();
  await page.getByRole('navigation').getByRole('link').first().click();
  await page.getByRole('button').nth(1).click();
  await page.getByRole('button').nth(2).click();
  await page.getByLabel('Lower thumb').click();
  await page.getByLabel('Lower thumb').click();
  await page.locator('.horizontal-slider > div:nth-child(2)').click();
  await page.getByRole('banner').getByRole('listitem').nth(2).click();
  await page.getByRole('list').nth(2).click();
});
