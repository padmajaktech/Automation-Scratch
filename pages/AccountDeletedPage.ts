import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountDeletedPage extends BasePage {
  readonly header: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator('h2[data-qa="account-deleted"]');
    this.continueBtn = page.locator('a[data-qa="continue-button"]');
  }

  async verifyAccountDeleted() {
    await this.assertVisible(this.header);
    await this.assertText(this.header, 'Account Deleted!');
  }

  async clickContinue() { await this.continueBtn.click(); await this.waitForPageLoad(); }
}