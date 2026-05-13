import { test, expect } from '@playwright/test';
import { apiPost, parseResponse } from '../../utils/apiHelper';

test('API5 - POST To Search Product', async ({ request }) => {
  const response = await apiPost(request, '/api/searchProduct', { search_product: 'top' });
  expect(response.status()).toBe(200);
  const body = parseResponse(await response.text());
  expect(body.responseCode).toBe(200);
  expect(Array.isArray(body.products)).toBeTruthy();
  expect((body.products as unknown[]).length).toBeGreaterThan(0);
});