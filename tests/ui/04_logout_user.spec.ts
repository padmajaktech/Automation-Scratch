import { test } from '../../fixtures/fixture';
import { randomEmail } from '../../utils/randomHelper';
import { USER } from '../../utils/testData';

test('TC4 - Logout User', async ({ homePage, loginPage, signupPage, accountCreatedPage }) => {
  const email = randomEmail();

  await homePage.goto();
  await homePage.clickSignupLogin();
  await loginPage.startSignup(USER.name, email);
  await signupPage.fillAndSubmit({ ...USER, address: USER.address });
  await accountCreatedPage.verifyAccountCreated();
  await accountCreatedPage.clickContinue();
  await homePage.verifyLoggedIn(USER.name);
  await homePage.clickLogout();
  await loginPage.verifyPageVisible();
});
