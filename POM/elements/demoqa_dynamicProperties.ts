import { expect, Locator, Page } from "@playwright/test"
import { common } from "../../fixtures/common";

const labels = [
  common.text.sections.dynamicProperties.beEnabled, common.text.sections.dynamicProperties.colorChange, common.text.sections.dynamicProperties.timeVisibility
]

export class dynamicPropertiesPage {
  readonly dynamicPropertiesMenu: Locator;
  readonly textWithDynamicId: Locator;
  readonly propertiesButton: Locator;

  constructor(private page: Page) {
    this.dynamicPropertiesMenu = page.getByText(common.text.sections.title.dynamicProperties);
    this.textWithDynamicId = page.locator(common.selectors.generic.p);
    this.propertiesButton = page.locator(common.selectors.generic.button);

  }

  async openDynamicPropertiesMenu() {
    await expect(this.dynamicPropertiesMenu).toHaveText(common.text.sections.title.dynamicProperties);
    await this.dynamicPropertiesMenu.click();
    await expect(this.page).toHaveURL(/dynamic-properties/);
  }

  async verifyDynamicPropertiesElements() {
    await this.isPropertiesButtonHidden();
    await this.isPropertiesButtonVisible();
    await this.isPropertiesButtonDisabled();
    await this.isLabelNotRedColoured();
    await this.verifyButtonLabel();
    await this.isPropertiesButtonVisibleAfterTimeout();
    await this.isLabelRedColoured();
  };

  async verifyDynamicTextId() {
    await expect(this.textWithDynamicId).toBeVisible();
    await expect(this.textWithDynamicId).toHaveText(common.text.sections.dynamicProperties.randomId);
    await expect(this.textWithDynamicId).toHaveAttribute(common.attribute.name.id, /.{5}/);
  };

  async verifyButtonLabel() {
    for (let i = 0; i < labels.length; i++) {
      await expect(this.propertiesButton.nth(i)).toHaveText(labels[i]);
    }
  };

  async isLabelNotRedColoured() {
    await expect(this.propertiesButton.nth(1)).not.toHaveClass(common.className.redText);
  };

  async isLabelRedColoured() {
    await expect(this.propertiesButton.nth(1)).toHaveClass(/text-danger/);
  };

  async isPropertiesButtonHidden() {
    await expect(this.propertiesButton.nth(2)).toBeHidden();
  };

  async isPropertiesButtonVisible() {
    for (let i = 0; i < 2; i++) {
      await expect(this.propertiesButton.nth(i)).toBeVisible();
    }
  }

  async isPropertiesButtonVisibleAfterTimeout() {
    await expect(this.propertiesButton.nth(2)).toBeVisible({ timeout: 7000 });
  }

  async isPropertiesButtonDisabled() {
    await expect(this.propertiesButton.nth(0)).toBeDisabled();
  }
}