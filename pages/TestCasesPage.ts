import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TestCasesPage extends BasePage {
  readonly pageHeader: Locator;
  readonly testCasesList: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = page.locator('h2.title, h2:has-text("Test Cases")');
    this.testCasesList = page.locator('.panel-group .panel');
  }

  async verifyPageVisible() {
    await this.assertUrlContains('test_cases');
    await this.assertVisible(this.pageHeader);
    const count = await this.testCasesList.count();
    expect(count).toBeGreaterThan(0);
  }
}