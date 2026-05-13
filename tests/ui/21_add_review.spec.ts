import { test } from '../../fixtures/fixture';

test('TC21 - Add Review On Product', async ({ homePage, productsPage, productDetailPage }) => {
  await homePage.goto();
  await homePage.clickProducts();
  await productsPage.verifyPageVisible();
  await productsPage.clickViewProduct(0);
  await productDetailPage.submitReview('Review User', 'review@test.com', 'Great product! Highly recommended.');
});
