import { test } from '../../fixtures/fixture';

test('TC18 - View Category Products', async ({ homePage, categoryPage }) => {
  await homePage.goto();
  await homePage.verifyHomePageVisible();
  await homePage.clickWomenSubCategory('Dress');
  await categoryPage.verifyHeaderContains('Women');
  await categoryPage.verifyProductsVisible();
  await homePage.clickMenSubCategory('Tshirts');
  await categoryPage.verifyHeaderContains('Men');
  await categoryPage.verifyProductsVisible();
});
