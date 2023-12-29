import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demoqa.com/elements');
});

test.describe('Demo QA - elements page', () => {
  test('has title "DEMOQA" and proper body message', async ({ page }) => {
    await expect(page).toHaveTitle("DEMOQA");
    await expect(page.getByText('Please select an item from left to start practice.')).toBeVisible();
  });

  test('opens Text Box', async ({ page }) => {
    const textBox = page.getByText("Text Box");

    await expect(page.getByText('Elements').nth(1)).toBeVisible();
    await expect(textBox).toHaveText("Text Box");
    await textBox.click();
    await expect(page.locator('#userName-wrapper')).toHaveText('Full Name')
  });

  test('opens Check Box', async ({ page }) => {
    const checkBox = page.getByText("Check Box");

    await expect(checkBox).toHaveText("Check Box");
    await checkBox.click();
  });

  test('opens Radio Button', async ({ page }) => {
    const radioButton = page.getByText("Radio Button");

    await expect(radioButton).toHaveText("Radio Button");
    await radioButton.click();
  });

  test('opens Web Tables', async ({ page }) => {
    const webTables = page.getByText("Web Tables");

    await expect(webTables).toHaveText("Web Tables");
    await webTables.click();
  });

  test('opens Buttons', async ({ page }) => {
    const buttons = page.getByText("Buttons");

    await expect(buttons).toHaveText("Buttons");
    await buttons.click();
  });

  test('opens Links', async ({ page }) => {
    const links = page.getByText("Links", { exact: true });

    await expect(links).toHaveText("Links");
    await links.click();
  });

  test('opens Broken Links', async ({ page }) => {
    const brokenLinks = page.getByText("Broken Links - Images");

    await expect(brokenLinks).toHaveText("Broken Links - Images");
    await brokenLinks.click();
  });

  test('opens Upload and Download', async ({ page }) => {
    const uploadNDownload = page.getByText("Upload and Download");

    await expect(uploadNDownload).toHaveText("Upload and Download");
    await uploadNDownload.click();
  });

  test('opens Dynamic Properties', async ({ page }) => {
    const dynamicProperties = page.getByText("Dynamic Properties");

    await expect(dynamicProperties).toHaveText("Dynamic Properties");
    await dynamicProperties.click();
  });
});