import { test } from '../../fixtures/fixture';

test('TC13 - Verify Product Quantity In Cart', async ({
  homePage, productsPage, productDetailPage, cartPage,
}) => {
  await homePage.goto();
  await homePage.clickProducts();
  await productsPage.clickViewProduct(0);
  await productDetailPage.verifyProductDetailVisible();
  await productDetailPage.setQuantity(4);
  await productDetailPage.addToCart();
  await productDetailPage.viewCart();
  await cartPage.verifyProductQuantity(0, 4);
});
