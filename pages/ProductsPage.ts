import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly pageHeader: Locator;
  readonly productsList: Locator;
  readonly productCards: Locator;
  readonly searchInput: Locator;
  readonly searchBtn: Locator;
  readonly searchedHeader: Locator;
  readonly cartModal: Locator;
  readonly continueShoppingBtn: Locator;
  readonly viewCartLink: Locator;
  readonly womenCategory: Locator;
  readonly menCategory: Locator;
  readonly kidsCategory: Locator;
  readonly brandsSidebar: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = page.locator('h2:has-text("All Products")');
    this.productsList = page.locator('.features_items');
    this.productCards = page.locator('.features_items .product-image-wrapper');
    this.searchInput = page.locator('#search_product');
    this.searchBtn = page.locator('#submit_search');
    this.searchedHeader = page.locator('h2:has-text("Searched Products")');
    this.cartModal = page.locator('#cartModal');
    this.continueShoppingBtn = page.locator('button:has-text("Continue Shopping")');
    this.viewCartLink = page.locator('p a:has-text("View Cart"):visible').first();
    this.womenCategory = page.locator('a[href="#Women"]');
    this.menCategory = page.locator('a[href="#Men"]');
    this.kidsCategory = page.locator('a[href="#Kids"]');
    this.brandsSidebar = page.locator('.brands_products');
  }

  async goto() { await this.navigate('/products'); await this.waitForPageLoad(); }

  async verifyPageVisible() {
    await this.assertVisible(this.productsList);
    const headers = this.page.locator('h2.title');
    const headerCount = await headers.count();
    if (headerCount > 0) {
      await this.assertVisible(headers.first());
    }
  }

  async verifyProductsListed() {
    const count = await this.productCards.count();
    expect(count).toBeGreaterThan(0);
  }

  async clickViewProduct(index = 0) {
    await this.page.locator('.choose a:has-text("View Product")').nth(index).click();
    await this.waitForPageLoad();
  }

  async searchProduct(name: string) {
    await this.searchInput.fill(name);
    await this.searchBtn.click();
    await this.waitForPageLoad();
  }

  async verifySearchedProductsVisible() {
    await this.assertVisible(this.searchedHeader);
    const count = await this.productCards.count();
    expect(count).toBeGreaterThan(0);
  }

  async verifyAllSearchResultsContain(keyword: string) {
    const names = this.page.locator('.productinfo p');
    const count = await names.count();
    for (let i = 0; i < count; i++) {
      const text = await names.nth(i).textContent();
      expect(text?.toLowerCase()).toContain(keyword.toLowerCase());
    }
  }

  async hoverAndAddToCart(index = 0) {
    const card = this.productCards.nth(index);
    await card.hover();
    await card.locator('.add-to-cart:visible').first().click();
    await this.assertVisible(this.cartModal);
  }

  async continueShopping() { await this.continueShoppingBtn.click(); }

  async viewCart() { await this.viewCartLink.click(); await this.waitForPageLoad(); }

  async addMultipleToCart(indices: number[]) {
    for (const i of indices) {
      await this.hoverAndAddToCart(i);
      await this.continueShopping();
    }
  }

  async clickWomenSubCategory(sub: string) {
    await this.womenCategory.click();
    await this.page.locator(`#Women a:has-text("${sub}")`).click();
    await this.waitForPageLoad();
  }

  async clickMenSubCategory(sub: string) {
    await this.menCategory.click();
    await this.page.locator(`#Men a:has-text("${sub}")`).click();
    await this.waitForPageLoad();
  }

  async clickKidsSubCategory(sub: string) {
    await this.kidsCategory.click();
    await this.page.locator(`#Kids a:has-text("${sub}")`).click();
    await this.waitForPageLoad();
  }

  async clickBrand(brandName: string) {
    await this.brandsSidebar.locator(`a:has-text("${brandName}")`).click();
    await this.waitForPageLoad();
  }

  async verifyCategoryPageHeader(text: string) {
    await this.assertVisible(this.page.locator('h2.title'));
    await this.assertText(this.page.locator('h2.title'), text);
  }
}