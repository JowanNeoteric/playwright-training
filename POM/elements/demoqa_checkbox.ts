import { expect, Locator, Page } from "@playwright/test"
import { common } from "../../fixtures/common";
import { demoPage } from "../demoqa_generic";

export class checkboxPage {
  constructor(private page: Page) {
    this.page = page;
  }
}