import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demoqa.com/elements");
});

test.describe("Demo QA - elements page", () => {

  const text = {
    menu: {
      elements: "Elements",
      textBox: "Text Box",
    },
    email: "Email",
    fullName: "Full Name",
    exampleEmail: "name@example.com",
    currentAddress: "Current Address",
    demopage: "DEMOQA",
    welcomeMessage: "Please select an item from left to start practice.",
    permanentAddress: "Permanent Address",
    submit: "Submit"
  };
  const attribute = {
    type: "type",
    id: "id",
    value: {
      text: "text",
      email: "email",
      currentAddress: "currentAddress"
    }
  };
  const selector = {
    generic: {
      button: '.btn-primary',
      result: '#output'
    },
    username: "#userName-wrapper",
    email: "#userEmail-wrapper",
    currentAddress: "#currentAddress-wrapper",
    permanentAddress: "#permanentAddress-wrapper"
  }
  const input = {
    testName: "test name"
  }

  test('has title "DEMOQA" and proper body message', async ({ page }) => {
    await expect(page).toHaveTitle(text.demopage);
    await expect(page.getByText(text.welcomeMessage)).toBeVisible();
  });

  test("opens Text Box and verifies elements", async ({ page }) => {
    const textBoxMenu = page.getByText(text.menu.textBox);

    await expect(page.getByText(text.menu.elements).nth(1)).toBeVisible();
    await expect(textBoxMenu).toHaveText(text.menu.textBox);
    await textBoxMenu.click();
    await expect(page.locator(selector.username)).toHaveText(text.fullName);
    await expect(page.getByPlaceholder(text.fullName)).toBeEditable();
    await expect(page.getByPlaceholder(text.fullName)).toHaveAttribute(attribute.type, attribute.value.text)
    await expect(page.locator(selector.email)).toHaveText(text.email);
    await expect(page.getByPlaceholder(text.exampleEmail)).toBeEditable();
    await expect(page.getByPlaceholder(text.exampleEmail)).toHaveAttribute(attribute.id, attribute.value.email)
    await expect(page.locator(selector.currentAddress)).toHaveText(text.currentAddress);
    await expect(page.getByPlaceholder(text.currentAddress)).toBeEditable();
    await expect(page.getByPlaceholder(text.currentAddress)).toHaveAttribute(attribute.id, attribute.value.currentAddress)
    await expect(page.locator(selector.permanentAddress)).toHaveText(text.permanentAddress);
    await expect(page.locator(selector.generic.button)).toHaveText(text.submit);
  });

  test("opens Text Box and fills with test data", async ({ page }) => {
    const textBoxMenu = page.getByText(text.menu.textBox);
    const fullNameInput = page.getByPlaceholder(text.fullName);
    const userEmailInput = page.getByPlaceholder(text.exampleEmail);
    const userCurrentAddress = page.getByPlaceholder(text.currentAddress);
    const userPermanentAddress = page.locator(text.permanentAddress);
    const testOutput = page.locator(selector.generic.result);

    await textBoxMenu.click();
    await fullNameInput.fill("test name");
    await expect(fullNameInput).toHaveValue("test name");
    await userEmailInput.fill("test.email@test.com");
    await expect(userEmailInput).toHaveValue("test.email@test.com");
    await userCurrentAddress.fill("test address");
    await expect(userCurrentAddress).toHaveValue("test address");
    await userPermanentAddress.fill("permanent test address");
    await expect(userPermanentAddress).toHaveValue("permanent test address");
    await expect(testOutput).toBeHidden();
    await page.locator('.btn-primary').click();
    await expect(testOutput).toBeVisible();
    // await expect(testOutput.innerText()).toContain(`${"test name"}, ${"test.email@test.com"}, ${"test address"}, ${"permanent test address"}`);
  });

  test("opens Check Box and verifies elements", async ({ page }) => {
    const checkBoxMenu = page.getByText("Check Box");
    const node = page.locator("#tree-node");
    const nodeArrow = page.locator(".rct-collapse");
    const nodeCheckbox = page.locator(".rct-checkbox");
    const nodeResults = page.locator("#result");
    const nodeTitle = page.locator(".rct-title");
    const nodeExpandButton = page.locator(".rct-options .rct-option").nth(0)
    const nodeCollapseButton = page.locator(".rct-options .rct-option").nth(1)

    await expect(checkBoxMenu).toHaveText("Check Box");
    await checkBoxMenu.click();
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

  test("opens Check Box and triggers actions", async ({ page }) => {
    const checkBoxMenu = page.getByText("Check Box");
    const node = page.locator("#tree-node");
    const nodeArrow = page.getByLabel("Toggle");
    const nodeCheckbox = page.locator(".rct-checkbox");
    const nodeExpanded = page.locator(".rct-node-collapsed");
    const nodeResults = page.locator("#result");
    const nodeTitle = page.locator(".rct-title");

    await expect(checkBoxMenu).toHaveText("Check Box");
    await checkBoxMenu.click();
    await expect(node).toBeVisible();
    await expect(node.nth(0)).toBeEnabled();
    await nodeArrow.click();
    await expect(nodeExpanded).toHaveCount(3);
    await expect(nodeTitle.nth(1)).toHaveText("Desktop");
    await nodeCheckbox.nth(1).check();
    await expect(nodeResults).toHaveText(/You have selected :desktopnotescommands/);
    await nodeCheckbox.nth(1).uncheck();
    await expect(nodeTitle.nth(2)).toHaveText("Documents");
    await nodeCheckbox.nth(2).check();
    await expect(nodeResults).toHaveText(/You have selected :documentsworkspacereactangularveuofficepublicprivateclassifiedgeneral/);
    await nodeCheckbox.nth(2).uncheck();
    await expect(nodeTitle.nth(3)).toHaveText("Downloads");
    await nodeCheckbox.nth(3).check();
    await expect(nodeResults).toHaveText(/You have selected :downloadswordFileexcelFile/);
    await nodeCheckbox.nth(3).uncheck();
    await nodeArrow.nth(1).click();
    await expect(nodeTitle.nth(2)).toHaveText("Notes");
    await expect(nodeTitle.nth(3)).toHaveText("Commands");
    await nodeArrow.nth(1).click();
    await nodeArrow.nth(2).click();
    await expect(nodeTitle.nth(3)).toHaveText("WorkSpace");
    await expect(nodeTitle.nth(4)).toHaveText("Office");
    await nodeArrow.nth(2).click();
    await nodeArrow.nth(3).click();
    await expect(nodeTitle.nth(4)).toHaveText("Word File.doc");
    await expect(nodeTitle.nth(5)).toHaveText("Excel File.doc");
    await nodeArrow.nth(3).click();
  });

  test("opens Radio Button and verifies elements", async ({ page }) => {
    const radioButtonMenu = page.getByText("Radio Button");
    const singleRadioButton = page.locator(".custom-control-inline");

    await expect(radioButtonMenu).toHaveText("Radio Button");
    await radioButtonMenu.click();
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
    const radioButtonMenu = page.getByText("Radio Button");
    const singleRadioButton = page.locator(".custom-control-inline");
    const text = page.locator("p");
    const result = page.locator(".text-success");

    await expect(radioButtonMenu).toHaveText("Radio Button");
    await radioButtonMenu.click();
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
    const buttonsMenu = page.getByText("Buttons");
    const button = page.locator(".btn-primary");

    await expect(buttonsMenu).toHaveText("Buttons");
    await buttonsMenu.click();
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
    const buttonsMenu = page.getByText("Buttons");
    const button = page.locator(".btn-primary");

    await expect(buttonsMenu).toHaveText("Buttons");
    await buttonsMenu.click();
    await button.nth(0).dblclick();
    await expect(page.locator("#doubleClickMessage")).toHaveText("You have done a double click");
    await button.nth(1).click({ button: "right" });
    await expect(page.locator("#rightClickMessage")).toHaveText("You have done a right click");
    await button.nth(2).click();
    await expect(page.locator("#dynamicClickMessage")).toHaveText("You have done a dynamic click");
  });

  test("opens Links and verifies elements", async ({ page }) => {
    const linksMenu = page.getByText("Links", { exact: true });
    const title = page.locator("h5");
    const hyperLink = page.locator("a");
    const validURL = "https://demoqa.com";
    const response = page.locator("#linkResponse");

    await expect(linksMenu).toHaveText("Links");
    await linksMenu.click();
    await expect(title.nth(0)).toBeVisible();
    await expect(title.nth(0)).toHaveText("Following links will open new tab");
    await expect(hyperLink.nth(2)).toBeVisible();
    await expect(hyperLink.nth(2)).toHaveText("Home");
    await expect(hyperLink.nth(2)).toHaveAttribute("href", validURL);
    await expect(hyperLink.nth(3)).toBeVisible();
    await expect(hyperLink.nth(3)).toHaveText("Home" && /.{5}/);
    await expect(hyperLink.nth(3)).toHaveAttribute("href", validURL);
    await expect(title.nth(1)).toHaveText("Following links will send an api call");
    await expect(hyperLink.nth(4)).toBeVisible();
    await expect(hyperLink.nth(4)).toHaveText("Created");
    await expect(hyperLink.nth(5)).toBeVisible();
    await expect(hyperLink.nth(5)).toHaveText("No Content");
    await expect(hyperLink.nth(6)).toBeVisible();
    await expect(hyperLink.nth(6)).toHaveText("Moved");
    await expect(hyperLink.nth(7)).toBeVisible();
    await expect(hyperLink.nth(7)).toHaveText("Bad Request");
    await expect(hyperLink.nth(8)).toBeVisible();
    await expect(hyperLink.nth(8)).toHaveText("Unauthorized");
    await expect(hyperLink.nth(9)).toBeVisible();
    await expect(hyperLink.nth(9)).toHaveText("Forbidden");
    await expect(hyperLink.nth(10)).toBeVisible();
    await expect(hyperLink.nth(10)).toHaveText("Not Found");
    await (hyperLink.nth(4)).click();
    await expect(response).toHaveText("Link has responded with staus 201 and status text Created");
    await (hyperLink.nth(5)).click();
    await expect(response).toHaveText("Link has responded with staus 204 and status text No Content");
    await (hyperLink.nth(6)).click();
    await expect(response).toHaveText("Link has responded with staus 301 and status text Moved Permanently");
    await (hyperLink.nth(7)).click();
    await expect(response).toHaveText("Link has responded with staus 400 and status text Bad Request");
    await (hyperLink.nth(8)).click();
    await expect(response).toHaveText("Link has responded with staus 401 and status text Unauthorized");
    await (hyperLink.nth(9)).click();
    await expect(response).toHaveText("Link has responded with staus 403 and status text Forbidden");
    await (hyperLink.nth(10)).click();
    await expect(response).toHaveText("Link has responded with staus 404 and status text Not Found");
  });

  test("opens Broken Links and verifies elements", async ({ page }) => {
    const brokenLinksMenu = page.getByText("Broken Links - Images");
    const title = page.locator("p");
    const hyperLink = page.locator("a");
    const image = page.locator("img");
    const validJPG = "/images/Toolsqa.jpg";
    const invalidJPG = "/images/Toolsqa_1.jpg";
    const validURL = "http://demoqa.com";
    const invalidURL = "http://the-internet.herokuapp.com/status_codes/500";

    await expect(brokenLinksMenu).toHaveText("Broken Links - Images");
    await brokenLinksMenu.click();
    await expect(title.nth(0)).toHaveText("Valid image");
    await expect(image.nth(2)).toHaveAttribute('src', validJPG);
    await expect(title.nth(1)).toHaveText("Broken image");
    await expect(image.nth(3)).toHaveAttribute('src', invalidJPG);
    await expect(title.nth(2)).toHaveText("Valid Link");
    await expect(hyperLink.nth(2)).toHaveText("Click Here for Valid Link");
    await expect(hyperLink.nth(2)).toHaveAttribute("href", validURL);
    await expect(title.nth(3)).toHaveText("Broken Link");
    await expect(hyperLink.nth(3)).toHaveText("Click Here for Broken Link");
    await expect(hyperLink.nth(3)).toHaveAttribute("href", invalidURL);
  });

  test("opens Upload and Download and verifies elements", async ({ page }) => {
    const uploadNDownloadMenu = page.getByText("Upload and Download");
    const downloadButton = page.locator(".btn-primary");
    const fileChooseButton = page.locator(".form-control-file");
    const fileHref = "data:image/jpeg;base64,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";

    await expect(uploadNDownloadMenu).toHaveText("Upload and Download");
    await uploadNDownloadMenu.click();
    await expect(downloadButton).toBeVisible();
    await expect(downloadButton).toHaveText("Download");
    await expect(downloadButton).toHaveAttribute('href', fileHref);
    await expect(page.locator("label")).toHaveText("Select a file");
    await expect(fileChooseButton).toBeVisible();
  });

  test("opens Dynamic Properties and verifies elements", async ({ page }) => {
    const dynamicPropertiesMenu = page.getByText("Dynamic Properties");
    const textWithDynamicId = page.locator('p');
    const button = page.locator(".btn-primary");

    await expect(dynamicPropertiesMenu).toHaveText("Dynamic Properties");
    await dynamicPropertiesMenu.click();
    await expect(textWithDynamicId).toBeVisible();
    await expect(textWithDynamicId).toHaveText("This text has random Id");
    await expect(textWithDynamicId).toHaveAttribute('id', /.{5}/);
    await expect(button.nth(0)).toBeVisible();
    await expect(button.nth(0)).toBeDisabled();
    await expect(button.nth(0)).toHaveText("Will enable 5 seconds");
    await expect(button.nth(1)).toBeVisible();
    await expect(button.nth(1)).not.toHaveClass('text-danger');
    await expect(button.nth(1)).toHaveText("Color Change");
    await expect(button.nth(2)).toBeHidden();
    await expect(button.nth(2)).toBeVisible({ timeout: 5000 });
    await expect(button.nth(2)).toHaveText("Visible After 5 Seconds");
    await expect(button.nth(1)).toHaveClass(/text-danger/);
  });
});
