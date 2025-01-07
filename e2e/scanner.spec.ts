import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://www.stockmarketviz.com/');
  await page.getByRole('navigation').getByRole('link').first().click();
  await page.getByPlaceholder(' ').first().click();
  await page.getByRole('button').nth(1).click();
  await page.getByRole('button').nth(1).click();
  await page.getByPlaceholder(' ').nth(1).click();
  await page.getByPlaceholder(' ').nth(1).fill('300');
  await page.getByRole('button').nth(2).click();
  await page.getByPlaceholder(' ').first().click();
  await page.getByPlaceholder(' ').nth(1).click();
  await page.getByLabel('Lower thumb').click();
  await page.locator('.horizontal-slider > div:nth-child(2)').click();
  const price = page.getByPlaceholder(' ').first().getAttribute('value');
  expect(price).toBe('2');
  const change = await page.getByPlaceholder(' ').nth(1).getAttribute('value');
  expect(change).toBe('299');
});
