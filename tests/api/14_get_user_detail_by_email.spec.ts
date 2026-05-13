import { test, expect } from '@playwright/test';
import { apiPost, apiDelete, parseResponse, API_BASE } from '../../utils/apiHelper';
import { randomEmail } from '../../utils/randomHelper';

test('API14 - GET User Account Detail By Email', async ({ request }) => {
  const email = randomEmail();
  const password = 'Get@1234';

  // Create account
  await apiPost(request, '/api/createAccount', {
    name: 'Get Detail User',
    email,
    password,
    title: 'Mr',
    birth_date: '20',
    birth_month: 'August',
    birth_year: '1988',
    firstname: 'GetDetail',
    lastname: 'User',
    company: 'Detail Co',
    address1: '5 Detail Road',
    address2: '',
    country: 'United States',
    state: 'New York',
    city: 'NYC',
    zipcode: '10001',
    mobile_number: '6666666666',
  });

  // GET user detail by email
  const response = await request.get(`${API_BASE}/api/getUserDetailByEmail`, {
    params: { email },
  });
  const body = parseResponse(await response.text());
  expect(body.responseCode).toBe(200);
  expect(body.user).toBeTruthy();
  const user = body.user as { email: string; name: string };
  expect(user.email).toBe(email);
  expect(user.name).toBe('Get Detail User');

  // Cleanup
  await apiDelete(request, '/api/deleteAccount', { email, password });
});