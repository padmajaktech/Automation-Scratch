import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CategoryPage extends BasePage {
  readonly categoryHeader: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.categoryHeader = page.locator('h2.title');
    this.productCards = page.locator('.features_items .product-image-wrapper');
  }

  async verifyHeaderContains(text: string) {
    await this.assertVisible(this.categoryHeader);
    await this.assertText(this.categoryHeader, text);
  }

  async verifyProductsVisible() {
    const count = await this.productCards.count();
    expect(count).toBeGreaterThan(0);
  }
}