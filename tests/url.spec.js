import { test, expect } from '@playwright/test';

//intial test to see if a shortened url will generate
test('get started link', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}`);

  await page.getByRole('textbox').fill('google.com')

  await page.getByRole('button', { name: 'Shorten URL' }).click();

  await expect(page.getByText('Nothing Yet')).not.toBeVisible()

  const shortUrl = await page.getByTestId('short-url').textContent()
  
  await page.goto(shortUrl)

  await expect(page).toHaveTitle(/Google/);
});

//test to see if an incorrect input into url shortener will return proper error
test('get started link', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}`);

  await page.getByRole('textbox').fill('this is not a url')

  await page.getByRole('button', { name: 'Shorten URL' }).click();

  await expect(page.getByText('Nothing Yet')).not.toBeVisible()

  const shortUrl = await page.getByTestId('short-url').textContent()
  
  await page.goto(shortUrl)

  await expect(page).toHaveTitle(/Google/);
});