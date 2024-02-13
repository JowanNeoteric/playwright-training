import { expect, Locator, Page } from "@playwright/test"
import { common } from "../../fixtures/common";

export class uploadNDownloadPage {
  readonly uploadAndDownloadMenu: Locator;
  readonly downloadButton: Locator;
  readonly fileChooseButton: Locator;

  constructor(private page: Page) {
    this.uploadAndDownloadMenu = page.getByText(common.text.sections.title.uploadNDownload);
    this.downloadButton = page.locator(common.selectors.generic.button);
    this.fileChooseButton = page.locator(common.selectors.buttons.fileChoose);
  }

  async openUploadAndDownloadMenu() {
    await expect(this.uploadAndDownloadMenu).toHaveText(common.text.sections.title.uploadNDownload);
    await this.uploadAndDownloadMenu.click();
    await expect(this.page).toHaveURL(/upload-download/);
  }

  async verifyDynamicPropertiesElements() {
    await expect(this.downloadButton).toBeVisible();
    await expect(this.downloadButton).toHaveText(common.text.sections.uploadNDownload.download);
    await expect(this.downloadButton).toHaveAttribute(common.attribute.name.href, common.attribute.value.fileHref);
    await expect(this.page.locator(common.selectors.generic.label)).toHaveText(common.text.sections.uploadNDownload.fileSelect);
    await expect(this.fileChooseButton).toBeVisible();
  };
}