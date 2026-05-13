import { test } from '../../fixtures/fixture';
import { randomEmail } from '../../utils/randomHelper';
import { USER, PAYMENT } from '../../utils/testData';

test('TC14 - Place Order: Register While Checkout', async ({
  homePage, productsPage, cartPage, loginPage, signupPage,
  accountCreatedPage, checkoutPage, paymentPage, accountDeletedPage,
}) => {
  const email = randomEmail();

  await homePage.goto();
  await homePage.clickProducts();
  await productsPage.hoverAndAddToCart(0);
  await productsPage.viewCart();
  await cartPage.proceedToCheckout();
  await cartPage.clickRegisterLogin();
  await loginPage.startSignup(USER.name, email);
  await signupPage.fillAndSubmit({ ...USER, address: USER.address });
  await accountCreatedPage.verifyAccountCreated();
  await accountCreatedPage.clickContinue();
  await homePage.clickCart();
  await cartPage.proceedToCheckout();
  await checkoutPage.verifyAddressVisible();
  await checkoutPage.addComment('Test order comment');
  await checkoutPage.placeOrder();
  await paymentPage.fillAndPay(PAYMENT);
  await paymentPage.verifyOrderPlaced();
  await homePage.clickDeleteAccount();
  await accountDeletedPage.verifyAccountDeleted();
});
