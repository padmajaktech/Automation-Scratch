import { test, expect } from '../../fixtures/fixture';
import { randomEmail } from '../../utils/randomHelper';
import { USER } from '../../utils/testData';

test('TC2 - Login User With Correct Credentials', async ({
  homePage, loginPage, signupPage, accountCreatedPage, accountDeletedPage,
}) => {
  const email = randomEmail();

  // Register first
  await homePage.goto();
  await homePage.clickSignupLogin();
  await loginPage.startSignup(USER.name, email);
  await signupPage.fillAndSubmit({ ...USER, address: USER.address });
  await accountCreatedPage.verifyAccountCreated();
  await accountCreatedPage.clickContinue();
  await homePage.clickDeleteAccount();
  await accountDeletedPage.verifyAccountDeleted();
  await accountDeletedPage.clickContinue();

  // Now re-register and login fresh
  const email2 = randomEmail();
  await homePage.goto();
  await homePage.clickSignupLogin();
  await loginPage.startSignup(USER.name, email2);
  await signupPage.fillAndSubmit({ ...USER, address: USER.address });
  await accountCreatedPage.verifyAccountCreated();
  await accountCreatedPage.clickContinue();
  await homePage.clickLogout();

  // Login
  await loginPage.verifyPageVisible();
  await loginPage.login(email2, USER.password);
  await homePage.verifyLoggedIn(USER.name);
  await homePage.clickDeleteAccount();
  await accountDeletedPage.verifyAccountDeleted();
});
