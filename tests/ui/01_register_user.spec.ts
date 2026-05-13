import { test, expect } from '../../fixtures/fixture';
import { randomEmail } from '../../utils/randomHelper';
import { USER, PAYMENT } from '../../utils/testData';

test('TC1 - Register User', async ({
  homePage, loginPage, signupPage, accountCreatedPage, accountDeletedPage,
}) => {
  const email = randomEmail();

  await homePage.goto();
  await homePage.verifyHomePageVisible();
  await homePage.clickSignupLogin();
  await loginPage.verifyPageVisible();
  await loginPage.startSignup(USER.name, email);
  await signupPage.fillAndSubmit({
    title: USER.title,
    password: USER.password,
    birthDay: USER.birthDay,
    birthMonth: USER.birthMonth,
    birthYear: USER.birthYear,
    newsletter: true,
    offers: true,
    firstName: USER.firstName,
    lastName: USER.lastName,
    company: USER.company,
    address: USER.address,
    address2: USER.address2,
    country: USER.country,
    state: USER.state,
    city: USER.city,
    zipcode: USER.zipcode,
    mobileNumber: USER.mobileNumber,
  });
  await accountCreatedPage.verifyAccountCreated();
  await accountCreatedPage.clickContinue();
  await homePage.verifyLoggedIn(USER.name);
  await homePage.clickDeleteAccount();
  await accountDeletedPage.verifyAccountDeleted();
});
