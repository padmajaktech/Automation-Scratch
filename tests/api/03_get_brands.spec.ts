import { test, expect } from '@playwright/test';
import { apiGet, parseResponse } from '../../utils/apiHelper';

test('API3 - Get All Brands List', async ({ request }) => {
  const response = await apiGet(request, '/api/brandsList');
  expect(response.status()).toBe(200);
  const body = parseResponse(await response.text());
  expect(body.responseCode).toBe(200);
  expect(Array.isArray(body.brands)).toBeTruthy();
  expect((body.brands as unknown[]).length).toBeGreaterThan(0);
});