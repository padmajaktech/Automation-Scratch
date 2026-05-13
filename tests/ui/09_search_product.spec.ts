import { test } from '../../fixtures/fixture';
import { SEARCH } from '../../utils/testData';

test('TC9 - Search Product', async ({ homePage, productsPage }) => {
  await homePage.goto();
  await homePage.clickProducts();
  await productsPage.verifyPageVisible();
  await productsPage.searchProduct(SEARCH.productName);
  await productsPage.verifySearchedProductsVisible();
});
