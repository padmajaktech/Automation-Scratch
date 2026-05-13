import { test, expect } from '@playwright/test';
import { apiDelete, parseResponse } from '../../utils/apiHelper';

test('API9 - DELETE To Verify Login (Method Not Allowed)', async ({ request }) => {
  const response = await apiDelete(request, '/api/verifyLogin');
  const body = parseResponse(await response.text());
  expect(body.responseCode).toBe(405);
  expect(body.message).toContain('This request method is not supported');
});