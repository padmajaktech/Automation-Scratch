import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignUpPage';
import { AccountCreatedPage } from '../pages/AccountCreatedPage';
import { AccountDeletedPage } from '../pages/AccountDeletedPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { ContactUsPage } from '../pages/ContactUsPage';
import { TestCasesPage } from '../pages/TestCasesPage';
import { CategoryPage } from '../pages/CategoryPage';
import { RecommendedPage } from '../pages/RecommendedPage';

type Pages = {
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  accountCreatedPage: AccountCreatedPage;
  accountDeletedPage: AccountDeletedPage;
  productsPage: ProductsPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  contactUsPage: ContactUsPage;
  testCasesPage: TestCasesPage;
  categoryPage: CategoryPage;
  recommendedPage: RecommendedPage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => use(new HomePage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  signupPage: async ({ page }, use) => use(new SignupPage(page)),
  accountCreatedPage: async ({ page }, use) => use(new AccountCreatedPage(page)),
  accountDeletedPage: async ({ page }, use) => use(new AccountDeletedPage(page)),
  productsPage: async ({ page }, use) => use(new ProductsPage(page)),
  productDetailPage: async ({ page }, use) => use(new ProductDetailPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  paymentPage: async ({ page }, use) => use(new PaymentPage(page)),
  contactUsPage: async ({ page }, use) => use(new ContactUsPage(page)),
  testCasesPage: async ({ page }, use) => use(new TestCasesPage(page)),
  categoryPage: async ({ page }, use) => use(new CategoryPage(page)),
  recommendedPage: async ({ page }, use) => use(new RecommendedPage(page)),
});

export { expect } from '@playwright/test';