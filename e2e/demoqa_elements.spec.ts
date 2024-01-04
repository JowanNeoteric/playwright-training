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
    const textBoxColumn = page.getByText("Text Box");

    await expect(page.getByText("Elements").nth(1)).toBeVisible();
    await expect(textBoxColumn).toHaveText("Text Box");
    await textBoxColumn.click();
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
    const textBoxColumn = page.getByText("Text Box");
    const fullNameInput = page.getByPlaceholder('Full Name');
    const userEmailInput = page.getByPlaceholder('name@example.com');
    const userCurrentAddress = page.getByPlaceholder('Current Address');
    const userPermanentAddress = page.locator('#permanentAddress');
    const testOutput = page.locator('#output');

    await textBoxColumn.click();
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
    const checkBoxColumn = page.getByText("Check Box");
    const node = page.locator("#tree-node");
    const nodeArrow = page.locator(".rct-collapse");
    const nodeCheckbox = page.locator(".rct-checkbox");
    const nodeResults = page.locator("#result");
    const nodeTitle = page.locator(".rct-title");
    const nodeExpandButton = page.locator(".rct-options .rct-option").nth(0)
    const nodeCollapseButton = page.locator(".rct-options .rct-option").nth(1)

    await expect(checkBoxColumn).toHaveText("Check Box");
    await checkBoxColumn.click();
    await expect(node).toBeVisible();
    await expect(node.nth(0)).toBeEnabled();
    await expect(nodeArrow).toBeVisible();
    await expect(nodeArrow).toHaveAttribute('type', 'button');
    await expect(nodeCheckbox).toBeVisible();
    await nodeCheckbox.click();
    await expect(nodeResults).toBeVisible();
    await expect(nodeResults).toHaveText("You have selected :homedesktopnotescommandsdocumentsworkspacereactangularveuofficepublicprivateclassifiedgeneraldownloadswordFileexcelFile");
    await expect(page.locator(".rct-node-icon")).toBeVisible();
    await expect(nodeTitle).toBeVisible();
    await expect(nodeTitle).toHaveText("Home");
    await expect(nodeExpandButton).toBeVisible();
    await expect(nodeExpandButton).toHaveAttribute('type', 'button');
    await expect(nodeExpandButton).toHaveAttribute('title', 'Expand all');
    await expect(nodeCollapseButton).toBeVisible();
    await expect(nodeCollapseButton).toHaveAttribute('type', 'button');
    await expect(nodeCollapseButton).toHaveAttribute('title', 'Collapse all');
  });

  test("opens Radio Button and verifies elements", async ({ page }) => {
    const radioButtonColumn = page.getByText("Radio Button");
    const singleRadioButton = page.locator(".custom-control-inline");

    await expect(radioButtonColumn).toHaveText("Radio Button");
    await radioButtonColumn.click();
    await expect(page.getByText('Do you like the site?')).toBeVisible();
    await expect(singleRadioButton.nth(0)).toBeVisible();
    await expect(singleRadioButton.nth(0)).toHaveText("Yes");
    await expect(singleRadioButton.nth(1)).toBeVisible();
    await expect(singleRadioButton.nth(1)).toHaveText("Impressive");
    await expect(singleRadioButton.nth(2)).toBeVisible();
    await expect(singleRadioButton.nth(2)).toHaveText("No");
    await expect(singleRadioButton.nth(2)).toHaveClass(/disabled/);
  });

  test("opens Radio Button and triggers action", async ({ page }) => {
    const radioButtonColumn = page.getByText("Radio Button");
    const singleRadioButton = page.locator(".custom-control-inline");
    const text = page.locator("p");
    const result = page.locator(".text-success");

    await expect(radioButtonColumn).toHaveText("Radio Button");
    await radioButtonColumn.click();
    await singleRadioButton.nth(0).click();
    await expect(text).toHaveText(/You have selected/);
    await expect(result).toHaveText("Yes");
    await singleRadioButton.nth(1).click();
    await expect(text).toHaveText(/You have selected/);
    await expect(result).toHaveText("Impressive");
  });

  test("opens Web Tables and verifies elements", async ({ page }) => {
    const webTables = page.getByText("Web Tables");

    await expect(webTables).toHaveText("Web Tables");
    await webTables.click();
  });

  test("opens Buttons and verifies elements", async ({ page }) => {
    const buttonsColumn = page.getByText("Buttons");
    const button = page.locator(".btn-primary");

    await expect(buttonsColumn).toHaveText("Buttons");
    await buttonsColumn.click();
    await expect(button.nth(0)).toBeVisible();
    await expect(button.nth(0)).toHaveText("Double Click Me");
    await expect(button.nth(0)).toHaveAttribute("type", "button");
    await expect(button.nth(1)).toBeVisible();
    await expect(button.nth(1)).toHaveText("Right Click Me");
    await expect(button.nth(1)).toHaveAttribute("type", "button");
    await expect(button.nth(2)).toBeVisible();
    await expect(button.nth(2)).toHaveText("Click Me");
    await expect(button.nth(2)).toHaveAttribute("type", "button");
  });

  test("opens Buttons and triggers actions", async ({ page }) => {
    const buttonsColumn = page.getByText("Buttons");
    const button = page.locator(".btn-primary");


    await expect(buttonsColumn).toHaveText("Buttons");
    await buttonsColumn.click();
    await button.nth(0).dblclick();
    await expect(page.locator("#doubleClickMessage")).toHaveText("You have done a double click");
    await button.nth(1).click({ button: "right" });
    await expect(page.locator("#rightClickMessage")).toHaveText("You have done a right click");
    await button.nth(2).click();
    await expect(page.locator("#dynamicClickMessage")).toHaveText("You have done a dynamic click");
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
