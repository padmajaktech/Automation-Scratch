import { test, expect } from '@playwright/test';
import { apiPost, parseResponse } from '../../utils/apiHelper';

test('API8 - POST To Verify Login Without Email Parameter', async ({ request }) => {
  const response = await apiPost(request, '/api/verifyLogin', { password: 'test1234' });
  const body = parseResponse(await response.text());
  expect(body.responseCode).toBe(400);
  expect(body.message).toContain('Bad request');
});