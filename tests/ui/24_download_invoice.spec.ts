import { test } from '../../fixtures/fixture';
import { randomEmail } from '../../utils/randomHelper';
import { USER, PAYMENT } from '../../utils/testData';

test('TC24 - Download Invoice After Purchase Order', async ({
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
  await checkoutPage.addComment('Download invoice test');
  await checkoutPage.placeOrder();
  await paymentPage.fillAndPay(PAYMENT);
  await paymentPage.verifyOrderPlaced();

  const download = await paymentPage.downloadInvoice();
  const filename = download.suggestedFilename();
  // filename should be invoice-related
  await paymentPage.clickContinue();

  await homePage.clickDeleteAccount();
  await accountDeletedPage.verifyAccountDeleted();
});
