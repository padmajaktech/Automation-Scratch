import { test, expect } from '@playwright/test';
import { apiGet, parseResponse } from '../../utils/apiHelper';

test('API1 - Get All Products List', async ({ request }) => {
  const response = await apiGet(request, '/api/productsList');
  expect(response.status()).toBe(200);
  const body = parseResponse(await response.text());
  expect(body.responseCode).toBe(200);
  expect(Array.isArray(body.products)).toBeTruthy();
  expect((body.products as unknown[]).length).toBeGreaterThan(0);
});