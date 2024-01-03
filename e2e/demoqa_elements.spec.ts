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
    await expect(page.getByPlaceholder('Full Name')).toBeEditable();
    await expect(page.getByPlaceholder('Full Name')).toHaveAttribute('type', "text")
    await expect(page.locator("#userEmail-wrapper")).toHaveText("Email");
    await expect(page.getByPlaceholder('name@example.com')).toBeEditable();
    await expect(page.getByPlaceholder('name@example.com')).toHaveAttribute('type', "email")
    await expect(page.locator("#currentAddress-wrapper")).toHaveText(
      "Current Address"
    );
    await expect(page.getByPlaceholder('Current Address')).toBeEditable();
    await expect(page.getByPlaceholder('Current Address')).toHaveAttribute('id', "currentAddress")
    await expect(page.locator("#permanentAddress-wrapper")).toHaveText(
      "Permanent Address"
    );
    await expect(page.locator('.btn-primary')).toHaveText('Submit');
  });

  test("opens Text Box and fills with test data", async ({ page }) => {
    const textBox = page.getByText("Text Box");
    const fullNameInput = page.getByPlaceholder('Full Name');
    const userEmailInput = page.getByPlaceholder('name@example.com');
    const userCurrentAddress = page.getByPlaceholder('Current Address');
    const userPermanentAddress = page.locator('#permanentAddress');
    const testOutput = page.locator('#output');

    await textBox.click();
    await fullNameInput.fill("test name");
    await expect(fullNameInput).toHaveValue("test name");
    await userEmailInput.fill("test.email@test.com");
    await expect(userEmailInput).toHaveValue("test.email@test.com");
    await userCurrentAddress.fill("test address");
    await expect(userCurrentAddress).toHaveValue(
      "test address"
    );
    await userPermanentAddress.fill("permanent test address");
    await expect(userPermanentAddress).toHaveValue(
      "permanent test address"
    );
    await expect(testOutput).toBeHidden();
    await page.locator('.btn-primary').click();
    await expect(testOutput).toBeVisible();
    // await expect(testOutput.innerText()).toContain(`${"test name"}, ${"test.email@test.com"}, ${"test address"}, ${"permanent test address"}`);
  });

  test("opens Check Box and verifies elements", async ({ page }) => {
    const checkBox = page.getByText("Check Box");
    const node = page.locator("#tree-node");

    await expect(checkBox).toHaveText("Check Box");
    await checkBox.click();
    await expect(node).toBeVisible();
    await expect(node.nth(0)).toBeEnabled();
    await expect(page.locator(".rct-collapse")).toBeVisible();
    await expect(page.locator(".rct-collapse")).toHaveAttribute('type', 'button');
    await expect(page.locator(".rct-checkbox")).toBeVisible();
    await page.locator(".rct-checkbox").click();
    await expect(page.locator("#result")).toBeVisible();
    await expect(page.locator("#result")).toHaveText("You have selected :homedesktopnotescommandsdocumentsworkspacereactangularveuofficepublicprivateclassifiedgeneraldownloadswordFileexcelFile");
    await expect(page.locator(".rct-node-icon")).toBeVisible();
    await expect(page.locator(".rct-title")).toBeVisible();
    await expect(page.locator(".rct-title")).toHaveText("Home");
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
