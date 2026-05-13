import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path = '/') {
    await this.page.goto(path);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async assertUrlContains(partial: string) {
    await expect(this.page).toHaveURL(new RegExp(partial));
  }

  async assertVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async assertText(locator: Locator, text: string) {
    await expect(locator).toContainText(text);
  }

  async assertNotVisible(locator: Locator) {
    await expect(locator).not.toBeVisible();
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(600);
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.page.waitForTimeout(600);
  }

  async isVisible(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: 4000 });
      return true;
    } catch {
      return false;
    }
  }
}