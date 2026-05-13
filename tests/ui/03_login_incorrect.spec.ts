import { test } from '../../fixtures/fixture';

test('TC3 - Login User With Incorrect Email And Password', async ({ homePage, loginPage }) => {
  await homePage.goto();
  await homePage.verifyHomePageVisible();
  await homePage.clickSignupLogin();
  await loginPage.verifyPageVisible();
  await loginPage.login('wrongemail@test.com', 'WrongPassword123');
  await loginPage.verifyLoginError();
});
