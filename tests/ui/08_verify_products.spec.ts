import { test } from '../../fixtures/fixture';

test('TC8 - Verify All Products And Product Detail Page', async ({
  homePage, productsPage, productDetailPage,
}) => {
  await homePage.goto();
  await homePage.clickProducts();
  await productsPage.verifyPageVisible();
  await productsPage.verifyProductsListed();
  await productsPage.clickViewProduct(0);
  await productDetailPage.verifyProductDetailVisible();
});
