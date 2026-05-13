import { test, expect } from '@playwright/test';
import { apiPost, parseResponse } from '../../utils/apiHelper';

test('API2 - POST To All Products List (Method Not Allowed)', async ({ request }) => {
  const response = await apiPost(request, '/api/productsList', {});
  expect(response.status()).toBe(200); // site returns 200 with responseCode 405
  const body = parseResponse(await response.text());
  expect(body.responseCode).toBe(405);
  expect(body.message).toContain('This request method is not supported');
});