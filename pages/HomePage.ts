import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Navigation links
  readonly navHome: Locator;
  readonly navProducts: Locator;
  readonly navCart: Locator;
  readonly navSignupLogin: Locator;
  readonly navLoggedInAs: Locator;
  readonly navLogout: Locator;
  readonly navDeleteAccount: Locator;
  readonly navContactUs: Locator;
  readonly navTestCases: Locator;

  // Hero / banner
  readonly heroSlider: Locator;
  readonly heroBannerText: Locator;

  // Scroll & arrow
  readonly scrollUpArrow: Locator;
  readonly fullFledgedText: Locator;
  readonly subscriptionSection: Locator;
  readonly subscriptionEmailInput: Locator;
  readonly subscriptionSubmitBtn: Locator;
  readonly subscriptionSuccessAlert: Locator;

  // Recommended items
  readonly recommendedItemsHeader: Locator;
  readonly recommendedItems: Locator;

  // Categories (left sidebar)
  readonly categoriesSidebar: Locator;
  readonly womenCategory: Locator;
  readonly menCategory: Locator;
  readonly kidsCategory: Locator;
  readonly brandsSidebar: Locator;

  constructor(page: Page) {
    super(page);

    // Nav
    this.navHome = page.locator('a[href="/"]').first();
    this.navProducts = page.locator('a[href="/products"]');
    this.navCart = page.locator('a[href="/view_cart"]').filter({ hasText: 'Cart' }).first();
    this.navSignupLogin = page.locator('a[href="/login"]');
    this.navLoggedInAs = page.locator('a:has-text("Logged in as")');
    this.navLogout = page.locator('a[href="/logout"]');
    this.navDeleteAccount = page.locator('a[href="/delete_account"]');
    this.navContactUs = page.locator('a[href="/contact_us"]');
    this.navTestCases = page.locator('a[href="/test_cases"]').first();

    // Hero
    this.heroSlider = page.locator('#slider');
    this.heroBannerText = page.locator('.hero-text, .slider-content');

    // Scroll
    this.scrollUpArrow = page.locator('#scrollUp');
    this.fullFledgedText = page.locator('h2:has-text("Full-Fledged practice website for Automation Engineers")').first();
    this.subscriptionSection = page.locator('#footer');
    this.subscriptionEmailInput = page.locator('#susbscribe_email');
    this.subscriptionSubmitBtn = page.locator('#subscribe');
    this.subscriptionSuccessAlert = page.locator('#success-subscribe');

    // Recommended items
    this.recommendedItemsHeader = page.locator('h2:has-text("recommended items")');
    this.recommendedItems = page.locator('.recommended_items .item');

    // Categories
    this.categoriesSidebar = page.locator('.left-sidebar');
    this.womenCategory = page.locator('a[href="#Women"]');
    this.menCategory = page.locator('a[href="#Men"]');
    this.kidsCategory = page.locator('a[href="#Kids"]');
    this.brandsSidebar = page.locator('.brands_products');
  }

  async goto() {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  async verifyHomePageVisible() {
    await expect(this.page).toHaveURL(/automationexercise\.com\/?$/);
    await this.assertVisible(this.heroSlider);
  }

  async verifyLoggedIn(username: string) {
    await this.assertVisible(this.navLoggedInAs);
    await this.assertText(this.navLoggedInAs, username);
  }

  async clickSignupLogin() {
    await this.navSignupLogin.click();
    await this.waitForPageLoad();
  }

  async clickProducts() {
    await this.navProducts.click();
    await this.waitForPageLoad();
  }

  async clickCart() {
    await this.navCart.click();
    await this.waitForPageLoad();
  }

  async clickLogout() {
    await this.navLogout.click();
    await this.waitForPageLoad();
  }

  async clickDeleteAccount() {
    await this.navDeleteAccount.click();
    await this.waitForPageLoad();
  }

  async clickContactUs() {
    await this.navContactUs.click();
    await this.waitForPageLoad();
  }

  async clickTestCases() {
    await this.navTestCases.click();
    await this.waitForPageLoad();
  }

  async subscribeWithEmail(email: string) {
    await this.scrollToBottom();
    await this.subscriptionEmailInput.fill(email);
    await this.subscriptionSubmitBtn.click();
    await this.assertVisible(this.subscriptionSuccessAlert);
    await this.assertText(this.subscriptionSuccessAlert, 'You have been successfully subscribed!');
  }

  async scrollDownAndVerifySubscriptionSection() {
    await this.scrollToBottom();
    await this.assertVisible(this.subscriptionSection);
    await expect(this.subscriptionSection).toContainText(/subscription/i);
  }

  async scrollUpUsingArrow() {
    await this.assertVisible(this.scrollUpArrow);
    await this.scrollUpArrow.click();
    await this.page.waitForTimeout(1000);
  }

  async scrollUpUsingKeyboard() {
    await this.page.locator('body').focus();
    await this.page.keyboard.press('Home');
    await this.page.waitForTimeout(1000);
  }

  async verifyScrolledToTop() {
    await this.assertVisible(this.fullFledgedText);
  }

  async clickWomenCategory() {
    await this.womenCategory.click();
  }

  async clickMenCategory() {
    await this.menCategory.click();
  }

  async clickKidsCategory() {
    await this.kidsCategory.click();
  }

  /** TC18: expand Women, then open a sub-category (e.g. Dress, Tops). */
  async clickWomenSubCategory(subCategoryName: string) {
    await this.assertVisible(this.categoriesSidebar);
    await this.womenCategory.click();
    const link = this.categoriesSidebar
      .locator('#Women a')
      .filter({ hasText: new RegExp(subCategoryName, 'i') })
      .first();
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await this.waitForPageLoad();
  }

  /** TC18: expand Men from sidebar, then open a sub-category (e.g. Tshirts). */
  async clickMenSubCategory(subCategoryName: string) {
    await this.assertVisible(this.categoriesSidebar);
    await this.menCategory.click();
    const link = this.categoriesSidebar
      .locator('#Men a')
      .filter({ hasText: new RegExp(subCategoryName, 'i') })
      .first();
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await this.waitForPageLoad();
  }

  async addRecommendedItemToCart(index: number = 0) {
    await this.scrollToBottom();
    await this.assertVisible(this.recommendedItemsHeader);
    const addToCartBtn = this.page.locator('.recommended_items .add-to-cart').nth(index);
    await addToCartBtn.click();
  }

  async clickBrand(brandName: string) {
    await this.brandsSidebar.locator(`a:has-text("${brandName}")`).click();
    await this.waitForPageLoad();
  }
}