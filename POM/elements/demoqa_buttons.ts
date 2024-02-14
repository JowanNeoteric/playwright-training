import { expect, Locator, Page } from "@playwright/test"
import { common } from "../../fixtures/common";

const labels = [
  common.text.sections.buttons.click.double, common.text.sections.buttons.click.right, common.text.sections.buttons.click.single];

export class buttonsPage {
  readonly buttonsMenu: Locator;
  readonly testButton: Locator;
  readonly singleButtonResponse: Locator;
  readonly doubleButtonResponse: Locator;
  readonly rightButtonResponse: Locator;

  constructor(private page: Page) {
    this.buttonsMenu = page.getByText(common.text.sections.title.buttons);
    this.testButton = page.locator(common.selectors.generic.button);
    this.doubleButtonResponse = page.locator(common.selectors.sections.buttons.response.double);
    this.rightButtonResponse = page.locator(common.selectors.sections.buttons.response.right);
    this.singleButtonResponse = page.locator(common.selectors.sections.buttons.response.single);
  }

  async openButtonsMenu() {
    await expect(this.buttonsMenu).toHaveText(common.text.sections.title.buttons);
    await this.buttonsMenu.click();
    await expect(this.page).toHaveURL(/buttons/);
  }

  async verifyButtonsActions() {
    await this.testButton.nth(0).dblclick();
    await expect(this.doubleButtonResponse).toHaveText(common.text.sections.buttons.response.double);
    await this.testButton.nth(1).click({ button: "right" });
    await expect(this.rightButtonResponse).toHaveText(common.text.sections.buttons.response.right);
    await this.testButton.nth(2).click();
    await expect(this.singleButtonResponse).toHaveText(common.text.sections.buttons.response.single);
  };

  async verifyButtonsAttributes() {
    for (let i = 0; i < 3; i++) {
      await expect(this.testButton.nth(i)).toHaveAttribute(common.attribute.name.type, common.attribute.value.button);
    }
  };

  async verifyButtonsLabels() {
    for (let i = 0; i < labels.length; i++) {
      await expect(this.testButton.nth(i)).toHaveText(labels[i]);
    }
  };
}