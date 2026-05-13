import { test } from '../../fixtures/fixture';
import { randomEmail } from '../../utils/randomHelper';
import { USER } from '../../utils/testData';

test('TC5 - Register User With Existing Email', async ({
  homePage, loginPage, signupPage, accountCreatedPage, accountDeletedPage,
}) => {
  const email = randomEmail();

  // Register once
  await homePage.goto();
  await homePage.clickSignupLogin();
  await loginPage.startSignup(USER.name, email);
  await signupPage.fillAndSubmit({ ...USER, address: USER.address });
  await accountCreatedPage.verifyAccountCreated();
  await accountCreatedPage.clickContinue();
  await homePage.clickLogout();

  // Try registering with same email
  await homePage.clickSignupLogin();
  await loginPage.startSignup(USER.name, email);
  await loginPage.verifyEmailExistsError();

  // Cleanup
  await loginPage.login(email, USER.password);
  await homePage.clickDeleteAccount();
  await accountDeletedPage.verifyAccountDeleted();
});
