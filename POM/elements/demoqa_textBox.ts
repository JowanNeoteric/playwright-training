import { expect, Locator, Page } from "@playwright/test"
import { common } from "../../fixtures/common";

export class textBoxPage {
  readonly textBoxMenu: Locator;
  readonly userName: Locator;
  readonly userNameInput: Locator;
  readonly userEmail: Locator;
  readonly userEmailInput: Locator;
  readonly currentAddress: Locator;
  readonly currentAddressInput: Locator;
  readonly specificLocator: Locator
  readonly specificLocatorInput: Locator
  readonly permanentAddress: Locator;
  readonly permanentAddressInput: Locator;
  readonly submitBtn: Locator;
  readonly testOutput: Locator;

  constructor(private page: Page) {
    this.textBoxMenu = page.getByText(common.text.sections.title.textBox);
    this.userName = page.locator(common.selectors.sections.textBox.username);
    this.userNameInput = page.getByPlaceholder(common.text.sections.textBox.fullName);
    this.userEmail = page.locator(common.selectors.sections.textBox.email);
    this.userEmailInput = page.getByPlaceholder(common.text.sections.textBox.exampleEmail);
    this.currentAddress = page.locator(common.selectors.sections.textBox.currentAddress);
    this.currentAddressInput = page.getByPlaceholder(common.text.sections.textBox.currentAddress);
    this.permanentAddress = page.locator(common.selectors.sections.textBox.permanentAddress);
    this.permanentAddressInput = page.locator(common.selectors.sections.textBox.permanentAddressInput);
    this.submitBtn = page.locator(common.selectors.generic.button);
    this.testOutput = page.locator(common.selectors.generic.output);
  }

  async openTextBoxMenu() {
    await expect((this.page).getByText(common.text.sections.title.elements).nth(1)).toBeVisible();
    await expect(this.textBoxMenu).toHaveText(common.text.sections.title.textBox);
    await this.textBoxMenu.click();
    await expect(this.page).toHaveURL(/text-box/);
  }

  async verifyTextBoxPageElements() {
    await expect(this.userName).toHaveText(common.text.sections.textBox.fullName);
    await expect(this.userNameInput).toBeEditable();
    await expect(this.userNameInput).toHaveAttribute(common.attribute.name.type, common.attribute.value.text)
    await expect(this.userEmail).toHaveText(common.text.sections.textBox.email);
    await expect(this.userEmailInput).toBeEditable();
    await expect(this.userEmailInput).toHaveAttribute(common.attribute.name.id, common.attribute.value.email)
    await expect(this.currentAddress).toHaveText(common.text.sections.textBox.currentAddress);
    await expect(this.currentAddressInput).toBeEditable();
    await expect(this.currentAddressInput).toHaveAttribute(common.attribute.name.id, common.attribute.value.currentAddress)
    await expect(this.permanentAddress).toHaveText(common.text.sections.textBox.permanentAddress);
    await expect(this.submitBtn).toHaveText(common.text.sections.textBox.submit);
  }

  async fillAllTextBoxInputs(testName: string, testEmail: string, testCurrentAddress: string, testPermanentAddress: string) {
    await this.userNameInput.fill(testName);
    await expect(this.userNameInput).toHaveValue(testName);
    await this.userEmailInput.fill(testEmail);
    await expect(this.userEmailInput).toHaveValue(testEmail);
    await this.currentAddressInput.fill(testCurrentAddress);
    await expect(this.currentAddressInput).toHaveValue(testCurrentAddress);
    await this.permanentAddressInput.fill(testPermanentAddress);
    await expect(this.permanentAddressInput).toHaveValue(testPermanentAddress);
    await expect(this.testOutput).toBeHidden();
  }

  async clickSubmitButton() {
    await this.submitBtn.click();
    await expect(this.testOutput).toBeVisible();
  }
}