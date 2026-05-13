import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RecommendedPage extends BasePage {
  readonly header: Locator;
  readonly items: Locator;
  readonly cartModal: Locator;
  readonly viewCartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator('h2:has-text("recommended items")');
    this.items = page.locator('.recommended_items .item .product-image-wrapper');
    this.cartModal = page.locator('#cartModal');
    this.viewCartLink = page.locator('a:has-text("View Cart")[href="/view_cart"]');
  }

  async verifyVisible() {
    await this.header.scrollIntoViewIfNeeded();
    await this.assertVisible(this.header);
    const count = await this.items.count();
    expect(count).toBeGreaterThan(0);
  }

  async addToCart(index = 0) {
    await this.header.scrollIntoViewIfNeeded();
    await this.page.locator('.recommended_items .add-to-cart').nth(index).click();
    await this.assertVisible(this.cartModal);
  }

  async viewCart() { await this.viewCartLink.click(); await this.waitForPageLoad(); }
}