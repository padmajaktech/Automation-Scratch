import { test, expect } from '@playwright/test';
import { apiPost, apiDelete, parseResponse } from '../../utils/apiHelper';
import { randomEmail } from '../../utils/randomHelper';

test('API11 - POST To Create/Register User Account', async ({ request }) => {
  const email = randomEmail();

  const response = await apiPost(request, '/api/createAccount', {
    name: 'API Test User',
    email,
    password: 'Api@1234',
    title: 'Mr',
    birth_date: '15',
    birth_month: 'March',
    birth_year: '1992',
    firstname: 'Api',
    lastname: 'User',
    company: 'Api Co',
    address1: '456 Api Street',
    address2: 'Apt 200',
    country: 'United States',
    state: 'Texas',
    city: 'Austin',
    zipcode: '73301',
    mobile_number: '1234567890',
  });

  const body = parseResponse(await response.text());
  expect(body.responseCode).toBe(201);
  expect(body.message).toContain('User created!');

  await apiDelete(request, '/api/deleteAccount', { email, password: 'Api@1234' });
});