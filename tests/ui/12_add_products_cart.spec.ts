import { test } from '../../fixtures/fixture';

test('TC12 - Add Products In Cart', async ({ homePage, productsPage, cartPage }) => {
  await homePage.goto();
  await homePage.clickProducts();
  await productsPage.verifyPageVisible();
  await productsPage.hoverAndAddToCart(0);
  await productsPage.continueShopping();
  await productsPage.hoverAndAddToCart(1);
  await productsPage.viewCart();
  await cartPage.verifyCartCount(2);
});
