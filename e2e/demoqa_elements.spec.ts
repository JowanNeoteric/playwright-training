import { test, expect } from "@playwright/test";
import { common } from "../fixtures/common";

test.beforeEach(async ({ page }) => {
  await page.goto(common.url.elements);
  await page.getByLabel("Consent").click();
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
    await expect(page.locator(common.selectors.sections.textBox.username)).toHaveText(common.text.sections.textBox.fullName);
    await expect(page.getByPlaceholder(common.text.sections.textBox.fullName)).toBeEditable();
    await expect(page.getByPlaceholder(common.text.sections.textBox.fullName)).toHaveAttribute(common.attribute.name.type, common.attribute.value.text)
    await expect(page.locator(common.selectors.sections.textBox.email)).toHaveText(common.text.sections.textBox.email);
    await expect(page.getByPlaceholder(common.text.sections.textBox.exampleEmail)).toBeEditable();
    await expect(page.getByPlaceholder(common.text.sections.textBox.exampleEmail)).toHaveAttribute(common.attribute.name.id, common.attribute.value.email)
    await expect(page.locator(common.selectors.sections.textBox.currentAddress)).toHaveText(common.text.sections.textBox.currentAddress);
    await expect(page.getByPlaceholder(common.text.sections.textBox.currentAddress)).toBeEditable();
    await expect(page.getByPlaceholder(common.text.sections.textBox.currentAddress)).toHaveAttribute(common.attribute.name.id, common.attribute.value.currentAddress)
    await expect(page.locator(common.selectors.sections.textBox.permanentAddress)).toHaveText(common.text.sections.textBox.permanentAddress);
    await expect(page.locator(common.selectors.generic.button)).toHaveText(common.text.sections.textBox.submit);
  });

  test("opens Text Box and fills with test data", async ({ page }) => {
    const textBoxMenu = page.getByText(common.text.sections.title.textBox);
    const fullNameInput = page.getByPlaceholder(common.text.sections.textBox.fullName);
    const userEmailInput = page.getByPlaceholder(common.text.sections.textBox.exampleEmail);
    const userCurrentAddress = page.getByPlaceholder(common.text.sections.textBox.currentAddress);
    const userPermanentAddress = page.locator(common.selectors.sections.textBox.permanentAddressInput);
    const testOutput = page.locator(common.selectors.generic.output);

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
    const node = page.locator(common.selectors.sections.checkBox.node.main);
    const nodeArrow = page.locator(common.selectors.sections.checkBox.node.arrow);
    const nodeCheckbox = page.locator(common.selectors.sections.checkBox.node.checkBox);
    const nodeResults = page.locator(common.selectors.sections.checkBox.node.result);
    const nodeTitle = page.locator(common.selectors.sections.checkBox.node.title);
    const nodeExpandButton = page.locator(common.selectors.sections.checkBox.node.controls).nth(0)
    const nodeCollapseButton = page.locator(common.selectors.sections.checkBox.node.controls).nth(1)

    await expect(checkBoxMenu).toHaveText(common.text.sections.title.checkBox);
    await checkBoxMenu.click();
    await expect(node).toBeVisible();
    await expect(node.nth(0)).toBeEnabled();
    await expect(nodeArrow).toBeVisible();
    await expect(nodeArrow).toHaveAttribute(common.attribute.name.type, common.attribute.value.button);
    await expect(nodeCheckbox).toBeVisible();
    await nodeCheckbox.click();
    await expect(nodeResults).toBeVisible();
    await expect(nodeResults).toHaveText(/You have selected/);
    await expect(page.locator(common.selectors.sections.checkBox.node.icon)).toBeVisible();
    await expect(nodeTitle).toBeVisible();
    await expect(nodeTitle).toHaveText(common.text.sections.links.home);
    await expect(nodeExpandButton).toBeVisible();
    await expect(nodeExpandButton).toHaveAttribute(common.attribute.name.type, common.attribute.value.button);
    await expect(nodeExpandButton).toHaveAttribute(common.attribute.name.title, common.attribute.value.expand);
    await expect(nodeCollapseButton).toBeVisible();
    await expect(nodeCollapseButton).toHaveAttribute(common.attribute.name.type, common.attribute.value.button);
    await expect(nodeCollapseButton).toHaveAttribute(common.attribute.name.title, common.attribute.value.collapse);
  });

  test("opens Check Box and triggers actions", async ({ page }) => {
    const checkBoxMenu = page.getByText(common.text.sections.title.checkBox);
    const node = page.locator(common.selectors.sections.checkBox.node.main);
    const nodeArrow = page.locator(common.selectors.sections.checkBox.node.arrow);
    const nodeCheckbox = page.locator(common.selectors.sections.checkBox.node.checkBox);
    const nodeExpanded = page.locator(common.selectors.sections.checkBox.node.expanded);
    const nodeResults = page.locator(common.selectors.sections.checkBox.node.result);
    const nodeTitle = page.locator(common.selectors.sections.checkBox.node.title);

    await expect(checkBoxMenu).toHaveText(common.text.sections.title.checkBox);
    await checkBoxMenu.click();
    await expect(node).toBeVisible();
    await expect(node.nth(0)).toBeEnabled();
    await nodeArrow.click();
    await expect(nodeExpanded).toHaveCount(3);
    await expect(nodeTitle.nth(1)).toHaveText(common.text.sections.checkBox.desktop);
    await nodeCheckbox.nth(1).check();
    await expect(nodeResults).toHaveText(/You have selected :desktopnotescommands/);
    await nodeCheckbox.nth(1).uncheck();
    await expect(nodeTitle.nth(2)).toHaveText(common.text.sections.checkBox.documents);
    await nodeCheckbox.nth(2).check();
    await expect(nodeResults).toHaveText(/You have selected :documentsworkspacereactangularveuofficepublicprivateclassifiedgeneral/);
    await nodeCheckbox.nth(2).uncheck();
    await expect(nodeTitle.nth(3)).toHaveText(common.text.sections.checkBox.downloads);
    await nodeCheckbox.nth(3).check();
    await expect(nodeResults).toHaveText(/You have selected :downloadswordFileexcelFile/);
    await nodeCheckbox.nth(3).uncheck();
    await nodeArrow.nth(1).click();
    await expect(nodeTitle.nth(2)).toHaveText(common.text.sections.checkBox.notes);
    await expect(nodeTitle.nth(3)).toHaveText(common.text.sections.checkBox.commands);
    await nodeArrow.nth(1).click();
    await nodeArrow.nth(2).click();
    await expect(nodeTitle.nth(3)).toHaveText(common.text.sections.checkBox.workspace);
    await expect(nodeTitle.nth(4)).toHaveText(common.text.sections.checkBox.office);
    await nodeArrow.nth(2).click();
    await nodeArrow.nth(3).click();
    await expect(nodeTitle.nth(4)).toHaveText(common.text.sections.checkBox.file.word);
    await expect(nodeTitle.nth(5)).toHaveText(common.text.sections.checkBox.file.excel);
    await nodeArrow.nth(3).click();
  });

  test("opens Radio Button and verifies elements", async ({ page }) => {
    const radioButtonMenu = page.getByText(common.text.sections.title.radioButton);
    const singleRadioButton = page.locator(common.selectors.sections.radioButton.singleControl);

    await expect(radioButtonMenu).toHaveText(common.text.sections.title.radioButton);
    await radioButtonMenu.click();
    await expect(page.getByText(common.text.sections.radioButton.question)).toBeVisible();
    await expect(singleRadioButton.nth(0)).toBeVisible();
    await expect(singleRadioButton.nth(0)).toHaveText(common.text.sections.radioButton.answers.yes);
    await expect(singleRadioButton.nth(1)).toBeVisible();
    await expect(singleRadioButton.nth(1)).toHaveText(common.text.sections.radioButton.answers.impressive);
    await expect(singleRadioButton.nth(2)).toBeVisible();
    await expect(singleRadioButton.nth(2)).toHaveText(common.text.sections.radioButton.answers.no);
    await expect(singleRadioButton.nth(2)).toHaveClass(/disabled/);
  });

  test("opens Radio Button and triggers action", async ({ page }) => {
    const radioButtonMenu = page.getByText(common.text.sections.title.radioButton);
    const singleRadioButton = page.locator(common.selectors.sections.radioButton.singleControl);
    const text = page.locator(common.selectors.generic.p);
    const result = page.locator(common.selectors.sections.radioButton.result);

    await expect(radioButtonMenu).toHaveText(common.text.sections.title.radioButton);
    await radioButtonMenu.click();
    await singleRadioButton.nth(0).click();
    await expect(text).toHaveText(/You have selected/);
    await expect(result).toHaveText(common.text.sections.radioButton.answers.yes);
    await singleRadioButton.nth(1).click();
    await expect(text).toHaveText(/You have selected/);
    await expect(result).toHaveText(common.text.sections.radioButton.answers.impressive);
  });

  test("opens Web Tables and verifies elements", async ({ page }) => {
    const webTablesMenu = page.getByText(common.text.sections.title.webTables);
    const button = page.locator(common.selectors.generic.button);
    const searchBox = page.locator(common.selectors.sections.webTables.searchBox);
    const search = page.locator(common.selectors.sections.webTables.search);
    const tableHeader = page.locator(common.selectors.sections.webTables.table.header);
    const gridCell = page.getByRole("gridcell");
    const singleRow = page.getByRole("row");
    const prevButton = page.getByText(common.text.sections.webTables.button.previous);
    const nextButton = page.getByText(common.text.sections.webTables.button.next);

    await expect(webTablesMenu).toHaveText(common.text.sections.title.webTables);
    await webTablesMenu.click();
    await expect(button).toHaveText(common.text.sections.webTables.add);
    await expect(searchBox).toHaveAttribute(common.attribute.name.autocomplete, common.attribute.value.off);
    await expect(searchBox).toHaveAttribute(common.attribute.name.placeholder, common.attribute.value.search);
    await expect(searchBox).toBeEditable();
    await expect(search).toBeVisible();
    await expect(search).not.toHaveText(common.text.sections.webTables.search);
    await expect(tableHeader).toHaveCount(7);
    await expect(tableHeader.nth(0)).toHaveText(common.text.sections.webTables.headers.firstName);
    await expect(tableHeader.nth(1)).toHaveText(common.text.sections.webTables.headers.lastName);
    await expect(tableHeader.nth(2)).toHaveText(common.text.sections.webTables.headers.age);
    await expect(tableHeader.nth(3)).toHaveText(common.text.sections.webTables.headers.email);
    await expect(tableHeader.nth(4)).toHaveText(common.text.sections.webTables.headers.salary);
    await expect(tableHeader.nth(5)).toHaveText(common.text.sections.webTables.headers.department);
    await expect(tableHeader.nth(6)).toHaveText(common.text.sections.webTables.headers.action);
    await expect(singleRow).toHaveCount(11);
    for (let i = 0; i < 3; i++) {
      await expect(singleRow.nth(i + 1).locator(gridCell.nth(0))).toHaveText(common.text.sections.webTables.people[i].firstName);
      await expect(singleRow.nth(i + 1).locator(gridCell.nth(1))).toHaveText(common.text.sections.webTables.people[i].lastName);
      await expect(singleRow.nth(i + 1).locator(gridCell.nth(2))).toHaveText(common.text.sections.webTables.people[i].age);
      await expect(singleRow.nth(i + 1).locator(gridCell.nth(3))).toHaveText(common.text.sections.webTables.people[i].email);
      await expect(singleRow.nth(i + 1).locator(gridCell.nth(4))).toHaveText(common.text.sections.webTables.people[i].salary);
      await expect(singleRow.nth(i + 1).locator(gridCell.nth(5))).toHaveText(common.text.sections.webTables.people[i].department);
      await expect(singleRow.nth(i + 1).locator(common.selectors.sections.webTables.table.actionButtons).locator(common.selectors.generic.span).nth(0)).toHaveAttribute(common.attribute.name.id, common.attribute.value.edit && /[1-9]/);
      await expect(singleRow.nth(i + 1).locator(common.selectors.sections.webTables.table.actionButtons).locator(common.selectors.generic.span).nth(1)).toHaveAttribute(common.attribute.name.id, common.attribute.value.delete && /[1-9]/);
    };

    var paginationButtons = [prevButton, nextButton]
    for (let i = 0; i < paginationButtons.length; i++) {
      await expect(paginationButtons[i]).toBeVisible();
      await expect(paginationButtons[i]).toHaveAttribute(common.attribute.name.type, common.attribute.value.button);
      await expect(paginationButtons[i]).toBeDisabled();
    }
    await expect(page.locator(".-pageInfo")).toHaveText("Page of 1");
    await expect(page.locator(".-pageJump input")).toBeEditable();
    await expect(page.locator(".-pageJump input")).toHaveValue("1");
    await expect(page.locator(".-pageSizeOptions")).toBeEditable();
    await expect(page.locator(".-pageSizeOptions")).toHaveText(/10 rows/);
    await expect(page.locator("select option")).toHaveCount(6);
  }
  );

  test("opens Buttons and verifies elements", async ({ page }) => {
    const buttonsMenu = page.getByText(common.text.sections.title.buttons);
    const button = page.locator(common.selectors.generic.button);

    await expect(buttonsMenu).toHaveText(common.text.sections.title.buttons);
    await buttonsMenu.click();
    await expect(button.nth(0)).toBeVisible();
    await expect(button.nth(0)).toHaveText(common.text.sections.buttons.click.double);
    await expect(button.nth(0)).toHaveAttribute(common.attribute.name.type, common.attribute.value.button);
    await expect(button.nth(1)).toBeVisible();
    await expect(button.nth(1)).toHaveText(common.text.sections.buttons.click.right);
    await expect(button.nth(1)).toHaveAttribute(common.attribute.name.type, common.attribute.value.button);
    await expect(button.nth(2)).toBeVisible();
    await expect(button.nth(2)).toHaveText(common.text.sections.buttons.click.single);
    await expect(button.nth(2)).toHaveAttribute(common.attribute.name.type, common.attribute.value.button);
  });

  test("opens Buttons and triggers actions", async ({ page }) => {
    const buttonsMenu = page.getByText(common.text.sections.title.buttons);
    const button = page.locator(common.selectors.generic.button);

    await expect(buttonsMenu).toHaveText(common.text.sections.title.buttons);
    await buttonsMenu.click();
    await button.nth(0).dblclick();
    await expect(page.locator(common.selectors.sections.buttons.double)).toHaveText(common.text.sections.buttons.response.double);
    await button.nth(1).click({ button: "right" });
    await expect(page.locator(common.selectors.sections.buttons.right)).toHaveText(common.text.sections.buttons.response.right);
    await button.nth(2).click();
    await expect(page.locator(common.selectors.sections.buttons.single)).toHaveText(common.text.sections.buttons.response.single);
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
    await expect(hyperLink.nth(2)).toHaveAttribute(common.attribute.name.href, common.url.validSecure);
    await expect(hyperLink.nth(3)).toBeVisible();
    await expect(hyperLink.nth(3)).toHaveText(common.text.sections.links.home && /.{5}/);
    await expect(hyperLink.nth(3)).toHaveAttribute(common.attribute.name.href, common.url.validSecure);
    await expect(title.nth(1)).toHaveText(common.text.sections.links.apiCall);
    await expect(hyperLink.nth(4)).toBeVisible();
    await expect(hyperLink.nth(4)).toHaveText(common.text.sections.links.statuses.created);
    await expect(hyperLink.nth(5)).toBeVisible();
    await expect(hyperLink.nth(5)).toHaveText(common.text.sections.links.statuses.noContent);
    await expect(hyperLink.nth(6)).toBeVisible();
    await expect(hyperLink.nth(6)).toHaveText(common.text.sections.links.statuses.moved);
    await expect(hyperLink.nth(7)).toBeVisible();
    await expect(hyperLink.nth(7)).toHaveText(common.text.sections.links.statuses.badRequest);
    await expect(hyperLink.nth(8)).toBeVisible();
    await expect(hyperLink.nth(8)).toHaveText(common.text.sections.links.statuses.unauthorized);
    await expect(hyperLink.nth(9)).toBeVisible();
    await expect(hyperLink.nth(9)).toHaveText(common.text.sections.links.statuses.forbidden);
    await expect(hyperLink.nth(10)).toBeVisible();
    await expect(hyperLink.nth(10)).toHaveText(common.text.sections.links.statuses.notFound);
    await (hyperLink.nth(4)).click();
    await expect(response).toHaveText(common.text.sections.links.responses[201]);
    await (hyperLink.nth(5)).click();
    await expect(response).toHaveText(common.text.sections.links.responses[204]);
    await (hyperLink.nth(6)).click();
    await expect(response).toHaveText(common.text.sections.links.responses[301]);
    await (hyperLink.nth(7)).click();
    await expect(response).toHaveText(common.text.sections.links.responses[400]);
    await (hyperLink.nth(8)).click();
    await expect(response).toHaveText(common.text.sections.links.responses[401]);
    await (hyperLink.nth(9)).click();
    await expect(response).toHaveText(common.text.sections.links.responses[403]);
    await (hyperLink.nth(10)).click();
    await expect(response).toHaveText(common.text.sections.links.responses[404]);
  });

  test("opens Broken Links and verifies elements", async ({ page }) => {
    const brokenLinksMenu = page.getByText(common.text.sections.title.brokenLinksImages);
    const title = page.locator(common.selectors.generic.p);
    const hyperLink = page.locator(common.selectors.generic.a);
    const image = page.locator(common.selectors.generic.img);


    await expect(brokenLinksMenu).toHaveText(common.text.sections.title.brokenLinksImages);
    await brokenLinksMenu.click();
    await expect(title.nth(0)).toHaveText(common.text.sections.brokenLinksImages.valid.image);
    await expect(image.nth(2)).toHaveAttribute(common.attribute.name.src, common.path.image.valid);
    await expect(title.nth(1)).toHaveText(common.text.sections.brokenLinksImages.broken.image);
    await expect(image.nth(3)).toHaveAttribute(common.attribute.name.src, common.path.image.invalid);
    await expect(title.nth(2)).toHaveText(common.text.sections.brokenLinksImages.valid.link);
    await expect(hyperLink.nth(2)).toHaveText(common.text.sections.brokenLinksImages.valid.clickForEnter);
    await expect(hyperLink.nth(2)).toHaveAttribute(common.attribute.name.href, common.url.valid);
    await expect(title.nth(3)).toHaveText(common.text.sections.brokenLinksImages.broken.link);
    await expect(hyperLink.nth(3)).toHaveText(common.text.sections.brokenLinksImages.broken.clickForEnter);
    await expect(hyperLink.nth(3)).toHaveAttribute(common.attribute.name.href, common.url.invalid);
  });

  test("opens Upload and Download and verifies elements", async ({ page }) => {
    const uploadNDownloadMenu = page.getByText(common.text.sections.title.uploadNDownload);
    const downloadButton = page.locator(common.selectors.generic.button);
    const fileChooseButton = page.locator(common.selectors.buttons.fileChoose);

    await expect(uploadNDownloadMenu).toHaveText(common.text.sections.title.uploadNDownload);
    await uploadNDownloadMenu.click();
    await expect(downloadButton).toBeVisible();
    await expect(downloadButton).toHaveText(common.text.sections.uploadNDownload.download);
    await expect(downloadButton).toHaveAttribute(common.attribute.name.href, common.attribute.value.fileHref);
    await expect(page.locator(common.selectors.generic.label)).toHaveText(common.text.sections.uploadNDownload.fileSelect);
    await expect(fileChooseButton).toBeVisible();
  });

  test("opens Dynamic Properties and verifies elements", async ({ page }) => {
    const dynamicPropertiesMenu = page.getByText(common.text.sections.title.dynamicProperties);
    const textWithDynamicId = page.locator(common.selectors.generic.p);
    const button = page.locator(common.selectors.generic.button);

    await expect(dynamicPropertiesMenu).toHaveText(common.text.sections.title.dynamicProperties);
    await dynamicPropertiesMenu.click();
    await expect(textWithDynamicId).toBeVisible();
    await expect(textWithDynamicId).toHaveText(common.text.sections.dynamicProperties.randomId);
    await expect(textWithDynamicId).toHaveAttribute(common.attribute.name.id, /.{5}/);
    await expect(button.nth(0)).toBeVisible();
    await expect(button.nth(0)).toBeDisabled();
    await expect(button.nth(0)).toHaveText(common.text.sections.dynamicProperties.beEnabled);
    await expect(button.nth(1)).toBeVisible();
    await expect(button.nth(1)).not.toHaveClass(common.className.redText);
    await expect(button.nth(1)).toHaveText(common.text.sections.dynamicProperties.colorChange);
    await expect(button.nth(2)).toBeHidden();
    await expect(button.nth(2)).toBeVisible({ timeout: 7000 });
    await expect(button.nth(2)).toHaveText(common.text.sections.dynamicProperties.timeVisibility);
    await expect(button.nth(1)).toHaveClass(/text-danger/);
  });
});
