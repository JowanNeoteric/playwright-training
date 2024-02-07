import { expect, Page } from "@playwright/test"

export class demoPage {
  constructor(private page: Page) {
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