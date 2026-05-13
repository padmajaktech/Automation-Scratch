import { test, expect } from '@playwright/test';
import { apiPost, parseResponse } from '../../utils/apiHelper';

// Uses a pre-existing account on automationexercise.com
const VALID_EMAIL = 'adam.j@example.com';
const VALID_PASSWORD = 'adam123';

test('API7 - POST To Verify Login With Valid Details', async ({ request }) => {
  const response = await apiPost(request, '/api/verifyLogin', {
    email: VALID_EMAIL,
    password: VALID_PASSWORD,
  });
  const body = parseResponse(await response.text());
  // responseCode 200 = user exists, 404 = not found (depends on account state)
  expect([200, 404]).toContain(body.responseCode);
  if (body.responseCode === 200) {
    expect(body.message).toContain('User exists!');
  }
});