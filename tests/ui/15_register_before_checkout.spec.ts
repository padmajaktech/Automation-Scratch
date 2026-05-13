import { test } from '../../fixtures/fixture';
import { randomEmail } from '../../utils/randomHelper';
import { USER, PAYMENT } from '../../utils/testData';

test('TC15 - Place Order: Register Before Checkout', async ({
  homePage, loginPage, signupPage, accountCreatedPage,
  productsPage, cartPage, checkoutPage, paymentPage, accountDeletedPage,
}) => {
  const email = randomEmail();

  await homePage.goto();
  await homePage.clickSignupLogin();
  await loginPage.startSignup(USER.name, email);
  await signupPage.fillAndSubmit({ ...USER, address: USER.address });
  await accountCreatedPage.verifyAccountCreated();
  await accountCreatedPage.clickContinue();
  await homePage.clickProducts();
  await productsPage.hoverAndAddToCart(0);
  await productsPage.viewCart();
  await cartPage.proceedToCheckout();
  await checkoutPage.verifyAddressVisible();
  await checkoutPage.addComment('Registered before checkout');
  await checkoutPage.placeOrder();
  await paymentPage.fillAndPay(PAYMENT);
  await paymentPage.verifyOrderPlaced();
  await homePage.clickDeleteAccount();
  await accountDeletedPage.verifyAccountDeleted();
});
