import { test } from '../../fixtures/fixture';

test('TC25 - Verify Scroll Up Using Arrow Button And Verify That Title Is Visible', async ({
  homePage,
}) => {
  await homePage.goto();
  await homePage.verifyHomePageVisible();
  await homePage.scrollDownAndVerifySubscriptionSection();
  await homePage.scrollUpUsingArrow();
  await homePage.verifyScrolledToTop();
});
