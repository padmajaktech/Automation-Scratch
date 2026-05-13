import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartRows: Locator;
  readonly emptyMsg: Locator;
  readonly proceedBtn: Locator;
  readonly registerLoginLink: Locator;
  readonly subscriptionEmail: Locator;
  readonly subscriptionSubmit: Locator;
  readonly subscriptionSuccess: Locator;

  constructor(page: Page) {
    super(page);
    this.cartRows = page.locator('#cart_info_table tbody tr');
    this.emptyMsg = page.locator('b:has-text("Cart is empty!")');
    this.proceedBtn = page.locator('a:has-text("Proceed To Checkout")');
    this.registerLoginLink = page.locator('a:has-text("Register / Login")');
    this.subscriptionEmail = page.locator('#susbscribe_email');
    this.subscriptionSubmit = page.locator('#subscribe');
    this.subscriptionSuccess = page.locator('#success-subscribe');
  }

  async goto() { await this.navigate('/view_cart'); await this.waitForPageLoad(); }

  async verifyProductInCart(productName: string) {
    const names = this.page.locator('td.cart_description h4 a');
    const texts = await names.allTextContents();
    expect(texts.some(t => t.toLowerCase().includes(productName.toLowerCase()))).toBeTruthy();
  }

  async verifyCartCount(expected: number) {
    await expect(this.cartRows).toHaveCount(expected);
  }

  async verifyProductQuantity(rowIndex: number, qty: number) {
    const cell = this.cartRows.nth(rowIndex).locator('.cart_quantity button');
    await expect(cell).toContainText(String(qty));
  }

  async removeProduct(rowIndex = 0) {
    await this.cartRows.nth(rowIndex).locator('.cart_quantity_delete').click();
    await this.page.waitForTimeout(600);
  }

  async verifyCartEmpty() { await this.assertVisible(this.emptyMsg); }

  async proceedToCheckout() { await this.proceedBtn.click(); await this.waitForPageLoad(); }

  async clickRegisterLogin() { await this.registerLoginLink.click(); await this.waitForPageLoad(); }

  async subscribeFromCart(email: string) {
    await this.scrollToBottom();
    await this.subscriptionEmail.fill(email);
    await this.subscriptionSubmit.click();
    await this.assertVisible(this.subscriptionSuccess);
    await this.assertText(this.subscriptionSuccess, 'You have been successfully subscribed!');
  }
}