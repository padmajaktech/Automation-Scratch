export const USER = {
  name: 'Test User',
  email: `testuser_${Date.now()}@example.com`,
  password: 'Test@1234',
  firstName: 'Test',
  lastName: 'User',
  company: 'Test Co',
  address: '123 Test Street',
  address2: 'Suite 100',
  country: 'United States',
  state: 'California',
  city: 'Los Angeles',
  zipcode: '90001',
  mobileNumber: '9876543210',
  birthDay: '10',
  birthMonth: 'January',
  birthYear: '1990',
  title: 'Mr' as 'Mr' | 'Mrs',
};

export const PAYMENT = {
  nameOnCard: 'Test User',
  cardNumber: '4111111111111111',
  cvc: '123',
  expiryMonth: '12',
  expiryYear: '2027',
};

export const CONTACT = {
  name: 'Test Contact',
  email: 'contact@example.com',
  subject: 'Test Subject',
  message: 'This is a test message from automated test.',
};

export const SEARCH = {
  productName: 'top',
  brandName: 'Polo',
};

export const API_USER = {
  name: 'API Test User',
  email: `apiuser_${Date.now()}@example.com`,
  password: 'Api@1234',
  firstName: 'Api',
  lastName: 'User',
  company: 'Api Co',
  address1: '456 Api Street',
  address2: 'Apt 200',
  country: 'United States',
  state: 'Texas',
  city: 'Austin',
  zipcode: '73301',
  mobileNumber: '1234567890',
  birth_date: '15',
  birth_month: 'March',
  birth_year: '1992',
  title: 'Mr',
};