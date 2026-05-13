import { test } from '../../fixtures/fixture';
import { randomEmail } from '../../utils/randomHelper';
import { USER, PAYMENT } from '../../utils/testData';

test('TC16 - Place Order: Login Before Checkout', async ({
  homePage, loginPage, signupPage, accountCreatedPage,
  productsPage, cartPage, checkoutPage, paymentPage, accountDeletedPage,
}) => {
  const email = randomEmail();

  // Register
  await homePage.goto();
  await homePage.clickSignupLogin();
  await loginPage.startSignup(USER.name, email);
  await signupPage.fillAndSubmit({ ...USER, address: USER.address });
  await accountCreatedPage.verifyAccountCreated();
  await accountCreatedPage.clickContinue();
  await homePage.clickLogout();

  // Login
  await loginPage.login(email, USER.password);
  await homePage.verifyLoggedIn(USER.name);

  // Add to cart & checkout
  await homePage.clickProducts();
  await productsPage.hoverAndAddToCart(0);
  await productsPage.viewCart();
  await cartPage.proceedToCheckout();
  await checkoutPage.verifyAddressVisible();
  await checkoutPage.addComment('Logged in before checkout');
  await checkoutPage.placeOrder();
  await paymentPage.fillAndPay(PAYMENT);
  await paymentPage.verifyOrderPlaced();
  await homePage.clickDeleteAccount();
  await accountDeletedPage.verifyAccountDeleted();
});
