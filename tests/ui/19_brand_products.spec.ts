import { test } from '../../fixtures/fixture';

test('TC19 - View And Cart Brand Products', async ({ homePage, productsPage, categoryPage }) => {
  await homePage.goto();
  await homePage.clickProducts();
  await productsPage.verifyPageVisible();
  await productsPage.clickBrand('Polo');
  await categoryPage.verifyHeaderContains('Polo');
  await categoryPage.verifyProductsVisible();
  await productsPage.clickBrand('H&M');
  await categoryPage.verifyHeaderContains('H&M');
  await categoryPage.verifyProductsVisible();
});
