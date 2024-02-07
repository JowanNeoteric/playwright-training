import { expect, Locator, Page } from "@playwright/test"
import { common } from "../../fixtures/common";

export class checkboxPage {
  readonly checkBoxMenu: Locator;
  readonly node: Locator;
  readonly nodeArrow: Locator;
  readonly nodeCheckbox: Locator;
  readonly nodeResults: Locator;
  readonly nodeTitle: Locator;
  readonly nodeExpandButton: Locator;
  readonly nodeCollapseButton: Locator;

  constructor(private page: Page) {
    this.checkBoxMenu = page.getByText(common.text.sections.title.checkBox);
    this.node = page.locator(common.selectors.sections.checkBox.node.main);
    this.nodeArrow = page.locator(common.selectors.sections.checkBox.node.arrow);
    this.nodeCheckbox = page.locator(common.selectors.sections.checkBox.node.checkBox);
    this.nodeResults = page.locator(common.selectors.sections.checkBox.node.result);
    this.nodeTitle = page.locator(common.selectors.sections.checkBox.node.title);
    this.nodeExpandButton = page.locator(common.selectors.sections.checkBox.node.controls).nth(0);
    this.nodeCollapseButton = page.locator(common.selectors.sections.checkBox.node.controls).nth(1);
  }

  async openCheckboxButtonMenu() {
    await expect((this.page).getByText(common.text.sections.title.elements).nth(1)).toBeVisible();
    await expect(this.checkBoxMenu).toHaveText(common.text.sections.title.checkBox);
    await this.checkBoxMenu.click();
    await expect(this.page).toHaveURL(/checkbox/);
  }

  async verifyCheckboxPageElements() {
    await expect(this.node).toBeVisible();
    await expect(this.node.nth(0)).toBeEnabled();
    await expect(this.nodeArrow).toBeVisible();
    await expect(this.nodeArrow).toHaveAttribute(common.attribute.name.type, common.attribute.value.button);
    await expect(this.nodeCheckbox).toBeVisible();
    await this.nodeCheckbox.click();
    await expect(this.nodeResults).toBeVisible();
    await expect(this.nodeResults).toHaveText(/You have selected/);
    await expect(this.page.locator(common.selectors.sections.checkBox.node.icon)).toBeVisible();
    await expect(this.nodeTitle).toBeVisible();
    await expect(this.nodeTitle).toHaveText(common.text.sections.links.home);
  };

  async verifyCheckboxAttributes() {
    await expect(this.nodeExpandButton).toBeVisible();
    await expect(this.nodeExpandButton).toHaveAttribute(common.attribute.name.type, common.attribute.value.button);
    await expect(this.nodeExpandButton).toHaveAttribute(common.attribute.name.title, common.attribute.value.expand);
    await expect(this.nodeCollapseButton).toBeVisible();
    await expect(this.nodeCollapseButton).toHaveAttribute(common.attribute.name.type, common.attribute.value.button);
    await expect(this.nodeCollapseButton).toHaveAttribute(common.attribute.name.title, common.attribute.value.collapse);
  };
}