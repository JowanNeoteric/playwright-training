import { expect, Locator, Page } from "@playwright/test"
import { common } from "../../fixtures/common";

export class radioButtonPage {
  readonly page: Page;
  readonly radioButtonMenu: Locator;
  readonly singleRadioButton: Locator;
  readonly pageQuestion: Locator;
  readonly text: Locator;
  readonly result: Locator;

  constructor(page: Page) {
    this.page = page;
    this.radioButtonMenu = page.getByText(common.text.sections.title.radioButton);
    this.singleRadioButton = page.locator(common.selectors.sections.radioButton.singleControl);
    this.pageQuestion = page.getByText(common.text.sections.radioButton.question);
    this.text = page.locator(common.selectors.generic.p);
    this.result = page.locator(common.selectors.sections.radioButton.result);
  }

  async openRadioButtonMenu() {
    await expect((this.page).getByText(common.text.sections.title.elements).nth(1)).toBeVisible();
    await expect(this.radioButtonMenu).toHaveText(common.text.sections.title.radioButton);
    await this.radioButtonMenu.click();
    await expect(this.page).toHaveURL(/radio-button/);
  }

  async verifyRadioButtonPageElements() {
    await expect(this.pageQuestion).toBeVisible();
    await expect(this.singleRadioButton.nth(0)).toBeVisible();
    await expect(this.singleRadioButton.nth(0)).toHaveText(common.text.sections.radioButton.answers.yes);
    await expect(this.singleRadioButton.nth(1)).toBeVisible();
    await expect(this.singleRadioButton.nth(1)).toHaveText(common.text.sections.radioButton.answers.impressive);
    await expect(this.singleRadioButton.nth(2)).toBeVisible();
    await expect(this.singleRadioButton.nth(2)).toHaveText(common.text.sections.radioButton.answers.no);
    await expect(this.singleRadioButton.nth(2)).toHaveClass(/disabled/);
  }

  async executeAllRadioButtonsActions() {
    await this.singleRadioButton.nth(0).click();
    await expect(this.text).toHaveText(/You have selected/);
    await expect(this.result).toHaveText(common.text.sections.radioButton.answers.yes);
    await this.singleRadioButton.nth(1).click();
    await expect(this.text).toHaveText(/You have selected/);
    await expect(this.result).toHaveText(common.text.sections.radioButton.answers.impressive);
  }
}