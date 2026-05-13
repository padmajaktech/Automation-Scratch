import { test, expect } from '@playwright/test';
import { apiPost, apiPut, apiDelete, parseResponse } from '../../utils/apiHelper';
import { randomEmail } from '../../utils/randomHelper';

test('API13 - PUT METHOD To Update User Account', async ({ request }) => {
  const email = randomEmail();
  const password = 'Update@1234';

  // Create account first
  await apiPost(request, '/api/createAccount', {
    name: 'Update Test User',
    email,
    password,
    title: 'Mr',
    birth_date: '5',
    birth_month: 'May',
    birth_year: '1985',
    firstname: 'Update',
    lastname: 'User',
    company: 'Update Co',
    address1: '10 Update Ave',
    address2: '',
    country: 'United States',
    state: 'Florida',
    city: 'Miami',
    zipcode: '33101',
    mobile_number: '8888888888',
  });

  // Update the account
  const response = await apiPut(request, '/api/updateAccount', {
    name: 'Updated Name',
    email,
    password,
    title: 'Mrs',
    birth_date: '10',
    birth_month: 'June',
    birth_year: '1990',
    firstname: 'Updated',
    lastname: 'Name',
    company: 'New Co',
    address1: '99 New Street',
    address2: 'Floor 2',
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    zipcode: 'M5H 2N2',
    mobile_number: '7777777777',
  });

  const body = parseResponse(await response.text());
  expect(body.responseCode).toBe(200);
  expect(body.message).toContain('User updated!');

  // Cleanup
  await apiDelete(request, '/api/deleteAccount', { email, password });
});