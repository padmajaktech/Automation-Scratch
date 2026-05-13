import { test } from '../../fixtures/fixture';
import { randomEmail } from '../../utils/randomHelper';
import { USER } from '../../utils/testData';

test('TC23 - Verify Address Details In Checkout Page', async ({
  homePage, loginPage, signupPage, accountCreatedPage,
  productsPage, cartPage, checkoutPage, accountDeletedPage,
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
  await checkoutPage.verifyDeliveryFirstName(USER.firstName);
  await checkoutPage.verifyDeliveryLastName(USER.lastName);

  await homePage.clickDeleteAccount();
  await accountDeletedPage.verifyAccountDeleted();
});
