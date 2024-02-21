import { expect, Locator, Page } from "@playwright/test"
import { common } from "../../fixtures/common";

const title = [common.text.sections.links.newTab, common.text.sections.links.apiCall];
const label = [common.text.sections.links.home, common.text.sections.links.home && /.{5}/, common.text.sections.links.statuses.created, common.text.sections.links.statuses.noContent, common.text.sections.links.statuses.moved, common.text.sections.links.statuses.badRequest, common.text.sections.links.statuses.unauthorized, common.text.sections.links.statuses.forbidden, common.text.sections.links.statuses.notFound];
const status = [201, 204, 301, 400, 401, 403, 404];

export class linksPage {
  readonly linksMenu: Locator;
  readonly title: Locator;
  readonly hyperLink: Locator;
  readonly response: Locator;

  constructor(private page: Page) {
    this.linksMenu = page.getByText(common.text.sections.title.links, { exact: true });
    this.title = page.locator(common.selectors.generic.h5);
    this.hyperLink = page.locator(common.selectors.generic.a);
    this.response = page.locator(common.selectors.sections.links.response);
  }

  async openLinksMenu() {
    await expect(this.linksMenu).toHaveText(common.text.sections.title.links);
    await this.linksMenu.click();
    await expect(this.page).toHaveURL(/links/);
  }

  async verifyTitleText() {
    for (let i = 0; i < title.length; i++) {
      await expect(this.title.nth(i)).toHaveText(title[i]);
    }
  };

  async isHyperLinkVisible() {
    for (let i = 2; i < 11; i++) {
      expect(this.hyperLink.nth(i)).toBeVisible();
    }
  };

  async verifyHyperLinkLabel() {
    for (let i = 0; i < 9; i++) {
      await expect(this.hyperLink.nth(i + 2)).toContainText(label[i]);
    }
  };

  async verifyHyperLinkResponse() {
    for (let i = 0; i < 7; i++) {
      await (this.hyperLink.nth(i + 4)).click();
      await expect(this.response).toHaveText(common.text.sections.links.responses[status[i]]);
    }
  };
}