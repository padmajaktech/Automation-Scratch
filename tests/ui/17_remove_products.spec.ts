import { test } from '../../fixtures/fixture';

test('TC17 - Remove Products From Cart', async ({ homePage, productsPage, cartPage }) => {
  await homePage.goto();
  await homePage.clickProducts();
  await productsPage.hoverAndAddToCart(0);
  await productsPage.viewCart();
  await cartPage.verifyCartCount(1);
  await cartPage.removeProduct(0);
  await cartPage.verifyCartEmpty();
});
