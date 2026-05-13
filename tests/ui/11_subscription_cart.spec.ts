import { test } from '../../fixtures/fixture';
import { randomEmail } from '../../utils/randomHelper';

test('TC11 - Verify Subscription In Cart Page', async ({ homePage, cartPage }) => {
  await homePage.goto();
  await homePage.verifyHomePageVisible();
  await homePage.clickCart();
  await cartPage.goto();
  await cartPage.subscribeFromCart(randomEmail());
});
