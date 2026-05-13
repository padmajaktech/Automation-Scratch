import { test } from '../../fixtures/fixture';

test('TC22 - Add To Cart From Recommended Items', async ({
  homePage, recommendedPage, cartPage,
}) => {
  await homePage.goto();
  await homePage.verifyHomePageVisible();
  await recommendedPage.verifyVisible();
  await recommendedPage.addToCart(0);
  await recommendedPage.viewCart();
  await cartPage.verifyCartCount(1);
});
