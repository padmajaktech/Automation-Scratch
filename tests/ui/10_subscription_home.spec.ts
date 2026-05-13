import { test } from '../../fixtures/fixture';
import { randomEmail } from '../../utils/randomHelper';

test('TC10 - Verify Subscription In Home Page', async ({ homePage }) => {
  await homePage.goto();
  await homePage.verifyHomePageVisible();
  await homePage.scrollDownAndVerifySubscriptionSection();
  await homePage.subscribeWithEmail(randomEmail());
});
