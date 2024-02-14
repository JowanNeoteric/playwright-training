import { test } from "@playwright/test";
import { common } from "../fixtures/common";
import { demoPage } from "../POM/demoqa_generic";
import { textBoxPage } from "../POM/elements/demoqa_textBox";
import { radioButtonPage } from "../POM/elements/demoqa_radioButton";
import { checkboxPage } from "../POM/elements/demoqa_checkbox";
import { dynamicPropertiesPage } from "../POM/elements/demoqa_dynamicProperties";
import { uploadNDownloadPage } from "../POM/elements/demoqa_uploadDownload";
import { brokenLinksPage } from "../POM/elements/demoqa_brokenLinks";
import { buttonsPage } from "../POM/elements/demoqa_buttons";

test.describe("Demo QA - elements page", () => {
  let demoPageQA: demoPage;
  let radioButton: radioButtonPage;
  let textBox: textBoxPage;
  let checkBox: checkboxPage;
  let dynamicProperties: dynamicPropertiesPage;
  let uploadNDownload: uploadNDownloadPage;
  let brokenLinks: brokenLinksPage;
  let buttons: buttonsPage;

  test.beforeEach(async ({ page }) => {
    dynamicProperties = new dynamicPropertiesPage(page);
    radioButton = new radioButtonPage(page);
    textBox = new textBoxPage(page);
    demoPageQA = new demoPage(page);
    uploadNDownload = new uploadNDownloadPage(page);
    brokenLinks = new brokenLinksPage(page);
    buttons = new buttonsPage(page);

    await demoPageQA.visitDemoQA(common.url.elements);
  });

  test('has title "DEMOQA" and proper body message', async () => {
    await demoPageQA.verifyTitleAndBodyMessage(common.text.demopage, common.text.welcomeMessage);
  });

  test("opens Text Box and verifies elements", async () => {
    await textBox.openTextBoxMenu();
    await textBox.verifyTextBoxPageElements();
  });

  test("opens Text Box and fills with test data", async () => {
    await textBox.openTextBoxMenu();
    await textBox.fillAllTextBoxInputs(common.input.test.name, common.input.test.email, common.input.test.address, common.input.test.permanent);
    await textBox.clickSubmitButton();
  });

  test("opens Check Box and verifies elements", async () => {
    await checkBox.openCheckboxButtonMenu();
    await checkBox.verifyCheckboxPageElements();
    await checkBox.verifyCheckboxAttributes();
  });

  // test("opens Check Box and triggers actions", async ({ page }) => {
  //   await expect(checkBoxMenu).toHaveText(common.text.sections.title.checkBox);
  //   await checkBoxMenu.click();
  //   await expect(node).toBeVisible();
  //   await expect(node.nth(0)).toBeEnabled();
  //   await nodeArrow.click();
  //   await expect(nodeExpanded).toHaveCount(3);
  //   await expect(nodeTitle.nth(1)).toHaveText(common.text.sections.checkBox.desktop);
  //   await nodeCheckbox.nth(1).check();
  //   await expect(nodeResults).toHaveText(/You have selected :desktopnotescommands/);
  //   await nodeCheckbox.nth(1).uncheck();
  //   await expect(nodeTitle.nth(2)).toHaveText(common.text.sections.checkBox.documents);
  //   await nodeCheckbox.nth(2).check();
  //   await expect(nodeResults).toHaveText(/You have selected :documentsworkspacereactangularveuofficepublicprivateclassifiedgeneral/);
  //   await nodeCheckbox.nth(2).uncheck();
  //   await expect(nodeTitle.nth(3)).toHaveText(common.text.sections.checkBox.downloads);
  //   await nodeCheckbox.nth(3).check();
  //   await expect(nodeResults).toHaveText(/You have selected :downloadswordFileexcelFile/);
  //   await nodeCheckbox.nth(3).uncheck();
  //   await nodeArrow.nth(1).click();
  //   await expect(nodeTitle.nth(2)).toHaveText(common.text.sections.checkBox.notes);
  //   await expect(nodeTitle.nth(3)).toHaveText(common.text.sections.checkBox.commands);
  //   await nodeArrow.nth(1).click();
  //   await nodeArrow.nth(2).click();
  //   await expect(nodeTitle.nth(3)).toHaveText(common.text.sections.checkBox.workspace);
  //   await expect(nodeTitle.nth(4)).toHaveText(common.text.sections.checkBox.office);
  //   await nodeArrow.nth(2).click();
  //   await nodeArrow.nth(3).click();
  //   await expect(nodeTitle.nth(4)).toHaveText(common.text.sections.checkBox.file.word);
  //   await expect(nodeTitle.nth(5)).toHaveText(common.text.sections.checkBox.file.excel);
  //   await nodeArrow.nth(3).click();
  // });

  test("opens Radio Button and verifies elements", async () => {
    await radioButton.openRadioButtonMenu();
    await radioButton.verifyRadioButtonPageElements();
  });

  test("opens Radio Button and triggers action", async () => {
    await radioButton.openRadioButtonMenu();
    await radioButton.executeAllRadioButtonsActions();
  });

  // test("opens Web Tables and verifies elements", async ({ page }) => {
  //   const webTablesMenu = page.getByText(common.text.sections.title.webTables);
  //   const button = page.locator(common.selectors.generic.button);
  //   const searchBox = page.locator(common.selectors.sections.webTables.searchBox);
  //   const search = page.locator(common.selectors.sections.webTables.search);
  //   const tableHeader = page.locator(common.selectors.sections.webTables.table.header);
  //   const gridCell = page.getByRole("gridcell");
  //   const singleRow = page.getByRole("row");
  //   const prevButton = page.getByText(common.text.sections.webTables.button.previous);
  //   const nextButton = page.getByText(common.text.sections.webTables.button.next);

  //   await expect(webTablesMenu).toHaveText(common.text.sections.title.webTables);
  //   await webTablesMenu.click();
  //   await expect(button).toHaveText(common.text.sections.webTables.add);
  //   await expect(searchBox).toHaveAttribute(common.attribute.name.autocomplete, common.attribute.value.off);
  //   await expect(searchBox).toHaveAttribute(common.attribute.name.placeholder, common.attribute.value.search);
  //   await expect(searchBox).toBeEditable();
  //   await expect(search).toBeVisible();
  //   await expect(search).not.toHaveText(common.text.sections.webTables.search);
  //   await expect(tableHeader).toHaveCount(7);
  //   await expect(tableHeader.nth(0)).toHaveText(common.text.sections.webTables.headers.firstName);
  //   await expect(tableHeader.nth(1)).toHaveText(common.text.sections.webTables.headers.lastName);
  //   await expect(tableHeader.nth(2)).toHaveText(common.text.sections.webTables.headers.age);
  //   await expect(tableHeader.nth(3)).toHaveText(common.text.sections.webTables.headers.email);
  //   await expect(tableHeader.nth(4)).toHaveText(common.text.sections.webTables.headers.salary);
  //   await expect(tableHeader.nth(5)).toHaveText(common.text.sections.webTables.headers.department);
  //   await expect(tableHeader.nth(6)).toHaveText(common.text.sections.webTables.headers.action);
  //   await expect(singleRow).toHaveCount(11);
  //   for (let i = 0; i < 3; i++) {
  //     await expect(singleRow.nth(i + 1).locator(gridCell.nth(0))).toHaveText(common.text.sections.webTables.people[i].firstName);
  //     await expect(singleRow.nth(i + 1).locator(gridCell.nth(1))).toHaveText(common.text.sections.webTables.people[i].lastName);
  //     await expect(singleRow.nth(i + 1).locator(gridCell.nth(2))).toHaveText(common.text.sections.webTables.people[i].age);
  //     await expect(singleRow.nth(i + 1).locator(gridCell.nth(3))).toHaveText(common.text.sections.webTables.people[i].email);
  //     await expect(singleRow.nth(i + 1).locator(gridCell.nth(4))).toHaveText(common.text.sections.webTables.people[i].salary);
  //     await expect(singleRow.nth(i + 1).locator(gridCell.nth(5))).toHaveText(common.text.sections.webTables.people[i].department);
  //     await expect(singleRow.nth(i + 1).locator(common.selectors.sections.webTables.table.actionButtons).locator(common.selectors.generic.span).nth(0)).toHaveAttribute(common.attribute.name.id, common.attribute.value.edit && /[1-9]/);
  //     await expect(singleRow.nth(i + 1).locator(common.selectors.sections.webTables.table.actionButtons).locator(common.selectors.generic.span).nth(1)).toHaveAttribute(common.attribute.name.id, common.attribute.value.delete && /[1-9]/);
  //   };

  //   var paginationButtons = [prevButton, nextButton]
  //   for (let i = 0; i < paginationButtons.length; i++) {
  //     await expect(paginationButtons[i]).toBeVisible();
  //     await expect(paginationButtons[i]).toHaveAttribute(common.attribute.name.type, common.attribute.value.button);
  //     await expect(paginationButtons[i]).toBeDisabled();
  //   }
  //   await expect(page.locator(".-pageInfo")).toHaveText("Page of 1");
  //   await expect(page.locator(".-pageJump input")).toBeEditable();
  //   await expect(page.locator(".-pageJump input")).toHaveValue("1");
  //   await expect(page.locator(".-pageSizeOptions")).toBeEditable();
  //   await expect(page.locator(".-pageSizeOptions")).toHaveText(/10 rows/);
  //   await expect(page.locator("select option")).toHaveCount(6);
  // }
  // );

  test("opens Buttons and verifies elements", async () => {
    await buttons.openButtonsMenu();
    await buttons.verifyButtonsLabels();
    await buttons.verifyButtonsAttributes();
  });

  test("opens Buttons and triggers actions", async () => {
    await buttons.openButtonsMenu();
    await buttons.verifyButtonsActions();
  });

  // test("opens Links and verifies elements", async ({ page }) => {
  //   const linksMenu = page.getByText(common.text.sections.title.links, { exact: true });
  //   const title = page.locator(common.selectors.generic.h5);
  //   const hyperLink = page.locator(common.selectors.generic.a);
  //   const response = page.locator(common.selectors.sections.links.response);

  //   await expect(linksMenu).toHaveText(common.text.sections.title.links);
  //   await linksMenu.click();
  //   await expect(title.nth(0)).toBeVisible();
  //   await expect(title.nth(0)).toHaveText(common.text.sections.links.newTab);
  //   await expect(hyperLink.nth(2)).toBeVisible();
  //   await expect(hyperLink.nth(2)).toHaveText(common.text.sections.links.home);
  //   await expect(hyperLink.nth(2)).toHaveAttribute(common.attribute.name.href, common.url.validSecure);
  //   await expect(hyperLink.nth(3)).toBeVisible();
  //   await expect(hyperLink.nth(3)).toHaveText(common.text.sections.links.home && /.{5}/);
  //   await expect(hyperLink.nth(3)).toHaveAttribute(common.attribute.name.href, common.url.validSecure);
  //   await expect(title.nth(1)).toHaveText(common.text.sections.links.apiCall);
  //   await expect(hyperLink.nth(4)).toBeVisible();
  //   await expect(hyperLink.nth(4)).toHaveText(common.text.sections.links.statuses.created);
  //   await expect(hyperLink.nth(5)).toBeVisible();
  //   await expect(hyperLink.nth(5)).toHaveText(common.text.sections.links.statuses.noContent);
  //   await expect(hyperLink.nth(6)).toBeVisible();
  //   await expect(hyperLink.nth(6)).toHaveText(common.text.sections.links.statuses.moved);
  //   await expect(hyperLink.nth(7)).toBeVisible();
  //   await expect(hyperLink.nth(7)).toHaveText(common.text.sections.links.statuses.badRequest);
  //   await expect(hyperLink.nth(8)).toBeVisible();
  //   await expect(hyperLink.nth(8)).toHaveText(common.text.sections.links.statuses.unauthorized);
  //   await expect(hyperLink.nth(9)).toBeVisible();
  //   await expect(hyperLink.nth(9)).toHaveText(common.text.sections.links.statuses.forbidden);
  //   await expect(hyperLink.nth(10)).toBeVisible();
  //   await expect(hyperLink.nth(10)).toHaveText(common.text.sections.links.statuses.notFound);
  //   await (hyperLink.nth(4)).click();
  //   await expect(response).toHaveText(common.text.sections.links.responses[201]);
  //   await (hyperLink.nth(5)).click();
  //   await expect(response).toHaveText(common.text.sections.links.responses[204]);
  //   await (hyperLink.nth(6)).click();
  //   await expect(response).toHaveText(common.text.sections.links.responses[301]);
  //   await (hyperLink.nth(7)).click();
  //   await expect(response).toHaveText(common.text.sections.links.responses[400]);
  //   await (hyperLink.nth(8)).click();
  //   await expect(response).toHaveText(common.text.sections.links.responses[401]);
  //   await (hyperLink.nth(9)).click();
  //   await expect(response).toHaveText(common.text.sections.links.responses[403]);
  //   await (hyperLink.nth(10)).click();
  //   await expect(response).toHaveText(common.text.sections.links.responses[404]);
  // });

  test("opens Broken Links and verifies elements", async () => {
    await brokenLinks.openBrokenLinksMenu();
    await brokenLinks.verifyTitleText();
    await brokenLinks.verifyImageAttribute();
    await brokenLinks.verifyLinkTextAndAttribute();
  });

  test("opens Upload and Download and verifies elements", async () => {
    await uploadNDownload.openUploadAndDownloadMenu();
    await uploadNDownload.verifyDynamicPropertiesElements();
  });

  test("opens Dynamic Properties and verifies elements", async () => {
    await dynamicProperties.openDynamicPropertiesMenu();
    await dynamicProperties.verifyDynamicTextId();
    await dynamicProperties.verifyDynamicPropertiesElements();
  });
});
