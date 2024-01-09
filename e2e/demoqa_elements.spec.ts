import { test, expect } from "@playwright/test";
import { common } from "../fixtures/common";

test.beforeEach(async ({ page }) => {
  await page.goto(common.url.elements);
});

test.describe("Demo QA - elements page", () => {
  test('has title "DEMOQA" and proper body message', async ({ page }) => {
    await expect(page).toHaveTitle(common.text.demopage);
    await expect(page.getByText(common.text.welcomeMessage)).toBeVisible();
  });

  test("opens Text Box and verifies elements", async ({ page }) => {
    const textBoxMenu = page.getByText(common.text.sections.title.textBox);

    await expect(page.getByText(common.text.sections.title.elements).nth(1)).toBeVisible();
    await expect(textBoxMenu).toHaveText(common.text.sections.title.textBox);
    await textBoxMenu.click();
    await expect(page.locator(common.selectors.sections.textBox.username)).toHaveText(common.text.textBox.fullName);
    await expect(page.getByPlaceholder(common.text.textBox.fullName)).toBeEditable();
    await expect(page.getByPlaceholder(common.text.textBox.fullName)).toHaveAttribute(common.attribute.type, common.attribute.value.text)
    await expect(page.locator(common.selectors.sections.textBox.email)).toHaveText(common.text.textBox.email);
    await expect(page.getByPlaceholder(common.text.textBox.exampleEmail)).toBeEditable();
    await expect(page.getByPlaceholder(common.text.textBox.exampleEmail)).toHaveAttribute(common.attribute.id, common.attribute.value.email)
    await expect(page.locator(common.selectors.sections.textBox.currentAddress)).toHaveText(common.text.textBox.currentAddress);
    await expect(page.getByPlaceholder(common.text.textBox.currentAddress)).toBeEditable();
    await expect(page.getByPlaceholder(common.text.textBox.currentAddress)).toHaveAttribute(common.attribute.id, common.attribute.value.currentAddress)
    await expect(page.locator(common.selectors.sections.textBox.permanentAddress)).toHaveText(common.text.textBox.permanentAddress);
    await expect(page.locator(common.selectors.generic.button)).toHaveText(common.text.textBox.submit);
  });

  test("opens Text Box and fills with test data", async ({ page }) => {
    const textBoxMenu = page.getByText(common.text.sections.title.textBox);
    const fullNameInput = page.getByPlaceholder(common.text.textBox.fullName);
    const userEmailInput = page.getByPlaceholder(common.text.textBox.exampleEmail);
    const userCurrentAddress = page.getByPlaceholder(common.text.textBox.currentAddress);
    const userPermanentAddress = page.locator("#permanentAddress");
    const testOutput = page.locator(common.selectors.generic.result);

    await textBoxMenu.click();
    await fullNameInput.fill(common.input.test.name);
    await expect(fullNameInput).toHaveValue(common.input.test.name);
    await userEmailInput.fill(common.input.test.email);
    await expect(userEmailInput).toHaveValue(common.input.test.email);
    await userCurrentAddress.fill(common.input.test.address);
    await expect(userCurrentAddress).toHaveValue(common.input.test.address);
    await userPermanentAddress.fill(common.input.test.permanent);
    await expect(userPermanentAddress).toHaveValue(common.input.test.permanent);
    await expect(testOutput).toBeHidden();
    await page.locator(common.selectors.generic.button).click();
    await expect(testOutput).toBeVisible();
  });

  test("opens Check Box and verifies elements", async ({ page }) => {
    const checkBoxMenu = page.getByText(common.text.sections.title.checkBox);
    const node = page.locator("#tree-node");
    const nodeArrow = page.locator(".rct-collapse");
    const nodeCheckbox = page.locator(".rct-checkbox");
    const nodeResults = page.locator("#result");
    const nodeTitle = page.locator(".rct-title");
    const nodeExpandButton = page.locator(".rct-options .rct-option").nth(0)
    const nodeCollapseButton = page.locator(".rct-options .rct-option").nth(1)

    await expect(checkBoxMenu).toHaveText(common.text.sections.title.checkBox);
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
    await expect(nodeTitle).toHaveText(common.text.sections.links.home);
    await expect(nodeExpandButton).toBeVisible();
    await expect(nodeExpandButton).toHaveAttribute('type', 'button');
    await expect(nodeExpandButton).toHaveAttribute('title', 'Expand all');
    await expect(nodeCollapseButton).toBeVisible();
    await expect(nodeCollapseButton).toHaveAttribute('type', 'button');
    await expect(nodeCollapseButton).toHaveAttribute('title', 'Collapse all');
  });

  test("opens Check Box and triggers actions", async ({ page }) => {
    const checkBoxMenu = page.getByText(common.text.sections.title.checkBox);
    const node = page.locator("#tree-node");
    const nodeArrow = page.getByLabel("Toggle");
    const nodeCheckbox = page.locator(".rct-checkbox");
    const nodeExpanded = page.locator(".rct-node-collapsed");
    const nodeResults = page.locator("#result");
    const nodeTitle = page.locator(".rct-title");

    await expect(checkBoxMenu).toHaveText(common.text.sections.title.checkBox);
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
    const text = page.locator(common.selectors.generic.p);
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
    const linksMenu = page.getByText(common.text.sections.title.links, { exact: true });
    const title = page.locator(common.selectors.generic.h5);
    const hyperLink = page.locator(common.selectors.generic.a);
    const response = page.locator(common.selectors.sections.links.response);

    await expect(linksMenu).toHaveText(common.text.sections.title.links);
    await linksMenu.click();
    await expect(title.nth(0)).toBeVisible();
    await expect(title.nth(0)).toHaveText(common.text.sections.links.newTab);
    await expect(hyperLink.nth(2)).toBeVisible();
    await expect(hyperLink.nth(2)).toHaveText(common.text.sections.links.home);
    await expect(hyperLink.nth(2)).toHaveAttribute(common.attribute.href, common.url.validSecure);
    await expect(hyperLink.nth(3)).toBeVisible();
    await expect(hyperLink.nth(3)).toHaveText(common.text.sections.links.home && /.{5}/);
    await expect(hyperLink.nth(3)).toHaveAttribute(common.attribute.href, common.url.validSecure);
    await expect(title.nth(1)).toHaveText(common.text.sections.links.apiCall);
    await expect(hyperLink.nth(4)).toBeVisible();
    await expect(hyperLink.nth(4)).toHaveText(common.text.statuses.created);
    await expect(hyperLink.nth(5)).toBeVisible();
    await expect(hyperLink.nth(5)).toHaveText(common.text.statuses.noContent);
    await expect(hyperLink.nth(6)).toBeVisible();
    await expect(hyperLink.nth(6)).toHaveText(common.text.statuses.moved);
    await expect(hyperLink.nth(7)).toBeVisible();
    await expect(hyperLink.nth(7)).toHaveText(common.text.statuses.badRequest);
    await expect(hyperLink.nth(8)).toBeVisible();
    await expect(hyperLink.nth(8)).toHaveText(common.text.statuses.unauthorized);
    await expect(hyperLink.nth(9)).toBeVisible();
    await expect(hyperLink.nth(9)).toHaveText(common.text.statuses.forbidden);
    await expect(hyperLink.nth(10)).toBeVisible();
    await expect(hyperLink.nth(10)).toHaveText(common.text.statuses.notFound);
    await (hyperLink.nth(4)).click();
    await expect(response).toHaveText(common.text.responses[201]);
    await (hyperLink.nth(5)).click();
    await expect(response).toHaveText(common.text.responses[204]);
    await (hyperLink.nth(6)).click();
    await expect(response).toHaveText(common.text.responses[301]);
    await (hyperLink.nth(7)).click();
    await expect(response).toHaveText(common.text.responses[400]);
    await (hyperLink.nth(8)).click();
    await expect(response).toHaveText(common.text.responses[401]);
    await (hyperLink.nth(9)).click();
    await expect(response).toHaveText(common.text.responses[403]);
    await (hyperLink.nth(10)).click();
    await expect(response).toHaveText(common.text.responses[404]);
  });

  test("opens Broken Links and verifies elements", async ({ page }) => {
    const brokenLinksMenu = page.getByText(common.text.sections.title.brokenLinksImages);
    const title = page.locator(common.selectors.generic.p);
    const hyperLink = page.locator(common.selectors.generic.a);
    const image = page.locator(common.selectors.generic.img);


    await expect(brokenLinksMenu).toHaveText(common.text.sections.title.brokenLinksImages);
    await brokenLinksMenu.click();
    await expect(title.nth(0)).toHaveText(common.text.sections.brokenLinksImages.valid.image);
    await expect(image.nth(2)).toHaveAttribute(common.attribute.src, common.path.image.valid);
    await expect(title.nth(1)).toHaveText(common.text.sections.brokenLinksImages.broken.image);
    await expect(image.nth(3)).toHaveAttribute(common.attribute.src, common.path.image.invalid);
    await expect(title.nth(2)).toHaveText(common.text.sections.brokenLinksImages.valid.link);
    await expect(hyperLink.nth(2)).toHaveText(common.text.sections.brokenLinksImages.valid.clickForEnter);
    await expect(hyperLink.nth(2)).toHaveAttribute(common.attribute.href, common.url.valid);
    await expect(title.nth(3)).toHaveText(common.text.sections.brokenLinksImages.broken.link);
    await expect(hyperLink.nth(3)).toHaveText(common.text.sections.brokenLinksImages.broken.clickForEnter);
    await expect(hyperLink.nth(3)).toHaveAttribute(common.attribute.href, common.url.invalid);
  });

  test("opens Upload and Download and verifies elements", async ({ page }) => {
    const uploadNDownloadMenu = page.getByText(common.text.sections.title.uploadNDownload);
    const downloadButton = page.locator(common.selectors.generic.button);
    const fileChooseButton = page.locator(common.selectors.buttons.fileChoose);


    await expect(uploadNDownloadMenu).toHaveText(common.text.sections.title.uploadNDownload);
    await uploadNDownloadMenu.click();
    await expect(downloadButton).toBeVisible();
    await expect(downloadButton).toHaveText(common.text.sections.uploadNDownload.download);
    await expect(downloadButton).toHaveAttribute(common.attribute.href, common.attribute.value.fileHref);
    await expect(page.locator(common.selectors.generic.label)).toHaveText(common.text.sections.uploadNDownload.fileSelect);
    await expect(fileChooseButton).toBeVisible();
  });

  test("opens Dynamic Properties and verifies elements", async ({ page }) => {
    const dynamicPropertiesMenu = page.getByText(common.text.sections.title.dynamicProperties);
    const textWithDynamicId = page.locator('p');
    const button = page.locator(common.selectors.generic.button);

    await expect(dynamicPropertiesMenu).toHaveText(common.text.sections.title.dynamicProperties);
    await dynamicPropertiesMenu.click();
    await expect(textWithDynamicId).toBeVisible();
    await expect(textWithDynamicId).toHaveText(common.text.sections.dynamicProperties.randomId);
    await expect(textWithDynamicId).toHaveAttribute(common.attribute.id, /.{5}/);
    await expect(button.nth(0)).toBeVisible();
    await expect(button.nth(0)).toBeDisabled();
    await expect(button.nth(0)).toHaveText(common.text.sections.dynamicProperties.beEnabled);
    await expect(button.nth(1)).toBeVisible();
    await expect(button.nth(1)).not.toHaveClass(common.className.redText);
    await expect(button.nth(1)).toHaveText(common.text.sections.dynamicProperties.colorChange);
    await expect(button.nth(2)).toBeHidden();
    await expect(button.nth(2)).toBeVisible({ timeout: 5000 });
    await expect(button.nth(2)).toHaveText(common.text.sections.dynamicProperties.timeVisibility);
    await expect(button.nth(1)).toHaveClass(/text-danger/);
  });
});
