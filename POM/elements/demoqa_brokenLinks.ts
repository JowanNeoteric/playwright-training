import { expect, Locator, Page } from "@playwright/test"
import { common } from "../../fixtures/common";

const title = [common.text.sections.brokenLinksImages.valid.image, common.text.sections.brokenLinksImages.broken.image, common.text.sections.brokenLinksImages.valid.link, common.text.sections.brokenLinksImages.broken.link];
const text = [common.text.sections.brokenLinksImages.valid.clickForEnter, common.text.sections.brokenLinksImages.broken.clickForEnter];
const attribute = [common.url.valid, common.url.invalid];

export class brokenLinksPage {
  readonly brokenLinksMenu: Locator;
  readonly title: Locator;
  readonly hyperLink: Locator;
  readonly image: Locator;

  constructor(private page: Page) {
    this.brokenLinksMenu = page.getByText(common.text.sections.title.brokenLinksImages);
    this.title = page.locator(common.selectors.generic.p);
    this.hyperLink = page.locator(common.selectors.generic.a);
    this.image = page.locator(common.selectors.generic.img);
  }

  async openBrokenLinksMenu() {
    await expect(this.brokenLinksMenu).toHaveText(common.text.sections.title.brokenLinksImages);
    await this.brokenLinksMenu.click();
    await expect(this.page).toHaveURL(/broken/);
  }

  async verifyTitleText() {
    for (let i = 0; i < title.length; i++) {
      await expect(this.title.nth(i)).toHaveText(title[i]);
    }
  };

  async verifyImageAttribute() {
    await expect(this.image.nth(2)).toHaveAttribute(common.attribute.name.src, common.path.image.valid);
    await expect(this.image.nth(3)).toHaveAttribute(common.attribute.name.src, common.path.image.invalid);
  };

  async verifyLinkTextAndAttribute() {
    for (let i = 0; i < 2; i++) {
      await expect(this.hyperLink.nth(i + 2)).toHaveText(text[i]);
      await expect(this.hyperLink.nth(i + 2)).toHaveAttribute(common.attribute.name.href, attribute[i]);
    }
  };
}