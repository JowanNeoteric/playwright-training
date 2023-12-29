import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demoqa.com/elements');


  const checkBox = page.getByText("Check Box");
  const radioButton = page.getByText("Radio Button");
  const webTables = page.getByText("Web Tables");
  const buttons = page.getByText("Buttons");
  const links = page.getByText("Links");
  const brokenLinks = page.getByText("Broken Links");
  const uploadNDownload = page.getByText("Upload and Download");
  const dynamicProperties = page.getByText("Dynamic Properties");

});

test.describe('Demo QA - elements page', () => {
  test('has title "DEMOQA" and proper body message', async ({ page }) => {
    await expect(page).toHaveTitle("DEMOQA");
    await expect(page.getByText('Please select an item from left to start practice.')).toBeVisible();
  });

  test('opens elements Text Box', async ({ page }) => {
    const textBox = page.getByText("Text Box");

    await expect(page.getByText('Elements').nth(1)).toBeVisible();
    await expect(textBox).toHaveText("Text Box");
    await textBox.click();
  });
});