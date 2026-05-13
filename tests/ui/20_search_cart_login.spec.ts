import { test } from '../../fixtures/fixture';
import { randomEmail } from '../../utils/randomHelper';
import { USER, SEARCH } from '../../utils/testData';

test('TC20 - Search Products And Verify Cart After Login', async ({
  homePage, loginPage, signupPage, accountCreatedPage,
  productsPage, cartPage, accountDeletedPage,
}) => {
  const email = randomEmail();

  await homePage.goto();
  await homePage.clickSignupLogin();
  await loginPage.startSignup(USER.name, email);
  await signupPage.fillAndSubmit({ ...USER, address: USER.address });
  await accountCreatedPage.verifyAccountCreated();
  await accountCreatedPage.clickContinue();

  await homePage.clickProducts();
  await productsPage.searchProduct(SEARCH.productName);
  await productsPage.verifySearchedProductsVisible();
  await productsPage.hoverAndAddToCart(0);
  await productsPage.viewCart();
  await cartPage.verifyCartCount(1);

  await homePage.clickDeleteAccount();
  await accountDeletedPage.verifyAccountDeleted();
});
