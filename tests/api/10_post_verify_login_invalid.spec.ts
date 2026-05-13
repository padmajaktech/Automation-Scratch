import { test, expect } from '@playwright/test';
import { apiPost, parseResponse } from '../../utils/apiHelper';

test('API10 - POST To Verify Login With Invalid Details', async ({ request }) => {
  const response = await apiPost(request, '/api/verifyLogin', {
    email: 'nonexistent_user_xyz@nowhere.com',
    password: 'WrongPass999',
  });
  const body = parseResponse(await response.text());
  expect(body.responseCode).toBe(404);
  expect(body.message).toContain('User not found!');
});