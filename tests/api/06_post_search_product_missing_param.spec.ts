import { test, expect } from '@playwright/test';
import { apiPost, parseResponse } from '../../utils/apiHelper';

test('API6 - POST To Search Product Without Search Parameter', async ({ request }) => {
  const response = await apiPost(request, '/api/searchProduct', {});
  const body = parseResponse(await response.text());
  expect(body.responseCode).toBe(400);
  expect(body.message).toContain('Bad request');
});