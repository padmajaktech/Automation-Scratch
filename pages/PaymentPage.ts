import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export interface PaymentDetails {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

export class PaymentPage extends BasePage {
  readonly nameOnCard: Locator;
  readonly cardNumber: Locator;
  readonly cvc: Locator;
  readonly expiryMonth: Locator;
  readonly expiryYear: Locator;
  readonly payBtn: Locator;
  readonly successMsg: Locator;
  readonly downloadInvoiceBtn: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.nameOnCard = page.locator('input[data-qa="name-on-card"]');
    this.cardNumber = page.locator('input[data-qa="card-number"]');
    this.cvc = page.locator('input[data-qa="cvc"]');
    this.expiryMonth = page.locator('input[data-qa="expiry-month"]');
    this.expiryYear = page.locator('input[data-qa="expiry-year"]');
    this.payBtn = page.locator('button[data-qa="pay-button"]');
    this.successMsg = page.locator(
      'p:has-text("Congratulations! Your order has been confirmed!"), ' +
      'b:has-text("Your order has been placed successfully!")'
    ).first();
    this.downloadInvoiceBtn = page.locator('a:has-text("Download Invoice")');
    this.continueBtn = page.locator('a[data-qa="continue-button"]');
  }

  async fillAndPay(d: PaymentDetails) {
    await this.nameOnCard.fill(d.nameOnCard);
    await this.cardNumber.fill(d.cardNumber);
    await this.cvc.fill(d.cvc);
    await this.expiryMonth.fill(d.expiryMonth);
    await this.expiryYear.fill(d.expiryYear);
    await this.payBtn.click();
    await this.waitForPageLoad();
  }

  async verifyOrderPlaced() { await this.assertVisible(this.successMsg); }

  async downloadInvoice() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadInvoiceBtn.click(),
    ]);
    return download;
  }

  async clickContinue() { await this.continueBtn.click(); await this.waitForPageLoad(); }
}