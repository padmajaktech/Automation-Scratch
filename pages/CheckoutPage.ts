import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly deliveryAddress: Locator;
  readonly billingAddress: Locator;
  readonly commentBox: Locator;
  readonly placeOrderBtn: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    super(page);
    this.deliveryAddress = page.locator('#address_delivery');
    this.billingAddress = page.locator('#address_invoice');
    this.commentBox = page.locator('textarea[name="message"]');
    this.placeOrderBtn = page.locator('a:has-text("Place Order")');
    this.cartItems = page.locator('#cart_items tbody tr');
  }

  async verifyAddressVisible() {
    await this.assertVisible(this.deliveryAddress);
    await this.assertVisible(this.billingAddress);
  }

  async verifyDeliveryFirstName(name: string) {
    await this.assertText(this.deliveryAddress.locator('.address_firstname'), name);
  }

  async verifyDeliveryLastName(name: string) {
    await this.assertText(this.deliveryAddress.locator('.address_lastname'), name);
  }

  async verifyCartNotEmpty() {
    const count = await this.cartItems.count();
    expect(count).toBeGreaterThan(0);
  }

  async addComment(text: string) { await this.commentBox.fill(text); }

  async placeOrder() { await this.placeOrderBtn.click(); await this.waitForPageLoad(); }
}