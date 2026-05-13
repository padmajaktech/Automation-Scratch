import { test } from '../../fixtures/fixture';

test('TC7 - Verify Test Cases Page', async ({ homePage, testCasesPage }) => {
  await homePage.goto();
  await homePage.verifyHomePageVisible();
  await homePage.clickTestCases();
  await testCasesPage.verifyPageVisible();
});
