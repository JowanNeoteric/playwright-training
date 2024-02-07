import { expect, Locator, Page } from "@playwright/test"
import { common } from "../../fixtures/common";

const answers = [
  common.text.sections.radioButton.answers.yes, common.text.sections.radioButton.answers.impressive, common.text.sections.radioButton.answers.no
]

export class radioButtonPage {
  readonly radioButtonMenu: Locator;
  readonly singleRadioButton: Locator;
  readonly pageQuestion: Locator;
  readonly text: Locator;
  readonly result: Locator;

  constructor(private page: Page) {
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
    for (let i = 0; i < 3; i++) {
      await expect(this.singleRadioButton.nth(i)).toBeVisible();
      await expect(this.singleRadioButton.nth(i)).toHaveText(answers[i]);
    }
    await this.isRadioButtonDisabled();
  }

  async executeAllRadioButtonsActions() {
    for (let i = 0; i < 2; i++) {
      await this.singleRadioButton.nth(i).click();
      await expect(this.text).toHaveText(/You have selected/);
      await expect(this.result).toHaveText(answers[i]);
    }
  }

  async isRadioButtonDisabled() {
    await expect(this.singleRadioButton.nth(2)).toHaveClass(/disabled/);
  }
}
