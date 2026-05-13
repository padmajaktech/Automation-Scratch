import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  readonly productName: Locator;
  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;
  readonly quantityInput: Locator;
  readonly addToCartBtn: Locator;
  readonly cartModal: Locator;
  readonly continueShoppingBtn: Locator;
  readonly viewCartLink: Locator;
  readonly reviewName: Locator;
  readonly reviewEmail: Locator;
  readonly reviewText: Locator;
  readonly reviewSubmit: Locator;
  readonly reviewSuccess: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('.product-information h2');
    this.productCategory = page.locator('.product-information p:has-text("Category")');
    this.productPrice = page.locator('.product-information span span');
    this.productAvailability = page.locator('.product-information p:has-text("Availability")');
    this.productCondition = page.locator('.product-information p:has-text("Condition")');
    this.productBrand = page.locator('.product-information p:has-text("Brand")');
    this.quantityInput = page.locator('#quantity');
    this.addToCartBtn = page.locator('button:has-text("Add to cart")');
    this.cartModal = page.locator('#cartModal');
    this.continueShoppingBtn = page.locator('button:has-text("Continue Shopping")');
    this.viewCartLink = page.locator('p a:has-text("View Cart"), u:has-text("View Cart")').first();
    this.reviewName = page.locator('input#name');
    this.reviewEmail = page.locator('input#email');
    this.reviewText = page.locator('textarea#review');
    this.reviewSubmit = page.locator('button#button-review');
    this.reviewSuccess = page.locator('#review-section .alert-success');
  }

  async verifyProductDetailVisible() {
    await this.assertVisible(this.productName);
    await this.assertVisible(this.productCategory);
    await this.assertVisible(this.productPrice);
    await this.assertVisible(this.productAvailability);
    await this.assertVisible(this.productCondition);
    await this.assertVisible(this.productBrand);
  }

  async setQuantity(qty: number) {
    await this.quantityInput.clear();
    await this.quantityInput.fill(String(qty));
  }

  async addToCart() {
    await this.addToCartBtn.click();
    await this.assertVisible(this.cartModal);
  }

  async continueShopping() { await this.continueShoppingBtn.click(); }

  async viewCart() { await this.viewCartLink.click(); await this.waitForPageLoad(); }

  async submitReview(name: string, email: string, review: string) {
    await this.reviewName.fill(name);
    await this.reviewEmail.fill(email);
    await this.reviewText.fill(review);
    await this.reviewSubmit.click();
    await this.assertVisible(this.reviewSuccess);
  }
}