import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demoqa.com/elements");
});

test.describe("Demo QA - elements page", () => {
  test('has title "DEMOQA" and proper body message', async ({ page }) => {
    await expect(page).toHaveTitle("DEMOQA");
    await expect(
      page.getByText("Please select an item from left to start practice.")
    ).toBeVisible();
  });

  test("opens Text Box and verifies elements", async ({ page }) => {
    const textBox = page.getByText("Text Box");

    await expect(page.getByText("Elements").nth(1)).toBeVisible();
    await expect(textBox).toHaveText("Text Box");
    await textBox.click();
    await expect(page.locator("#userName-wrapper")).toHaveText("Full Name");
    await expect(page.locator("#userName-wrapper div").nth(1)).toHaveAttribute(
      "id",
      "userName"
    );
    await expect(page.locator("#userEmail-wrapper")).toHaveText("Email");
    await expect(page.locator("#currentAddress-wrapper")).toHaveText(
      "Current Address"
    );
    await expect(page.locator("#permanentAddress-wrapper")).toHaveText(
      "Permanent Address"
    );
  });

  test("opens Check Box and verifies elements", async ({ page }) => {
    const checkBox = page.getByText("Check Box");

    await expect(checkBox).toHaveText("Check Box");
    await checkBox.click();
  });

  test("opens Radio Button and verifies elements", async ({ page }) => {
    const radioButton = page.getByText("Radio Button");

    await expect(radioButton).toHaveText("Radio Button");
    await radioButton.click();
  });

  test("opens Web Tables and verifies elements", async ({ page }) => {
    const webTables = page.getByText("Web Tables");

    await expect(webTables).toHaveText("Web Tables");
    await webTables.click();
  });

  test("opens Buttons and verifies elements", async ({ page }) => {
    const buttons = page.getByText("Buttons");

    await expect(buttons).toHaveText("Buttons");
    await buttons.click();
  });

  test("opens Links and verifies elements", async ({ page }) => {
    const links = page.getByText("Links", { exact: true });

    await expect(links).toHaveText("Links");
    await links.click();
  });

  test("opens Broken Links and verifies elements", async ({ page }) => {
    const brokenLinks = page.getByText("Broken Links - Images");

    await expect(brokenLinks).toHaveText("Broken Links - Images");
    await brokenLinks.click();
  });

  test("opens Upload and Download and verifies elements", async ({ page }) => {
    const uploadNDownload = page.getByText("Upload and Download");

    await expect(uploadNDownload).toHaveText("Upload and Download");
    await uploadNDownload.click();
  });

  test("opens Dynamic Properties and verifies elements", async ({ page }) => {
    const dynamicProperties = page.getByText("Dynamic Properties");

    await expect(dynamicProperties).toHaveText("Dynamic Properties");
    await dynamicProperties.click();
  });
});
