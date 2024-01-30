import { expect, Locator, Page } from "@playwright/test"

export class demoPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visitDemoQA(url: string,) {
    await this.page.goto(url);
    await this.page.getByLabel('Consent', { exact: true }).click(); //overrides cookies window
  }

  async verifyTitleAndBodyMessage(title: string, text: string) {
    await expect(this.page).toHaveTitle(title);
    await expect(this.page.getByText(text)).toBeVisible();
  }
}