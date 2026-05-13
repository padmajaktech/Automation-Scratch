import { test, expect } from '@playwright/test';
import { apiPost, apiDelete, parseResponse } from '../../utils/apiHelper';
import { randomEmail } from '../../utils/randomHelper';

test('API12 - DELETE METHOD To Delete User Account', async ({ request }) => {
  const email = randomEmail();
  const password = 'Delete@1234';

  // Create account first
  await apiPost(request, '/api/createAccount', {
    name: 'Delete Test User',
    email,
    password,
    title: 'Mr',
    birth_date: '1',
    birth_month: 'January',
    birth_year: '1990',
    firstname: 'Delete',
    lastname: 'User',
    company: 'Del Co',
    address1: '1 Delete St',
    address2: '',
    country: 'United States',
    state: 'California',
    city: 'LA',
    zipcode: '90001',
    mobile_number: '9999999999',
  });

  // Now delete it
  const response = await apiDelete(request, '/api/deleteAccount', { email, password });
  const body = parseResponse(await response.text());
  expect(body.responseCode).toBe(200);
  expect(body.message).toContain('Account deleted!');
});