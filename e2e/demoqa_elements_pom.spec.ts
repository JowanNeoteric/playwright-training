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

  test("opens Radio Button and verifies elements", async () => {
    await radioButton.openRadioButtonMenu();
    await radioButton.verifyRadioButtonPageElements();
  });

  test("opens Radio Button and triggers action", async () => {
    await radioButton.openRadioButtonMenu();
    await radioButton.executeAllRadioButtonsActions();
  });

  test("opens Buttons and verifies elements", async () => {
    await buttons.openButtonsMenu();
    await buttons.verifyButtonsLabels();
    await buttons.verifyButtonsAttributes();
  });

  test("opens Buttons and triggers actions", async () => {
    await buttons.openButtonsMenu();
    await buttons.verifyButtonsActions();
  });

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
