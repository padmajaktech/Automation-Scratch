import { test, expect } from '@playwright/test';
import { apiPut, parseResponse } from '../../utils/apiHelper';

test('API4 - PUT To All Brands List (Method Not Allowed)', async ({ request }) => {
  const response = await apiPut(request, '/api/brandsList', {});
  const body = parseResponse(await response.text());
  expect(body.responseCode).toBe(405);
  expect(body.message).toContain('This request method is not supported');
});