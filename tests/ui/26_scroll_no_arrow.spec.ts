import { test } from '../../fixtures/fixture';

test('TC26 - Verify Scroll Up Without Arrow Button And Verify That Title Is Visible', async ({
  homePage,
}) => {
  await homePage.goto();
  await homePage.verifyHomePageVisible();
  await homePage.scrollDownAndVerifySubscriptionSection();
  await homePage.scrollUpUsingKeyboard();
  await homePage.verifyScrolledToTop();
});
