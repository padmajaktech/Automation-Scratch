import { test } from '../../fixtures/fixture';
import { CONTACT } from '../../utils/testData';
import * as path from 'path';

test('TC6 - Contact Us Form', async ({ homePage, contactUsPage }) => {
  await homePage.goto();
  await homePage.verifyHomePageVisible();
  await homePage.clickContactUs();
  await contactUsPage.verifyPageVisible();
  await contactUsPage.fillAndSubmit({
    name: CONTACT.name,
    email: CONTACT.email,
    subject: CONTACT.subject,
    message: CONTACT.message,
    filePath: path.join(__dirname, '../../utils/testData.ts'),
  });
  await contactUsPage.verifySuccess();
  await contactUsPage.clickHome();
  await homePage.verifyHomePageVisible();
});
