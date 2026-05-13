import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export interface UserDetails {
  title?: 'Mr' | 'Mrs';
  password: string;
  birthDay?: string;
  birthMonth?: string;
  birthYear?: string;
  newsletter?: boolean;
  offers?: boolean;
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export class SignupPage extends BasePage {
  readonly pageHeader: Locator;
  readonly titleMr: Locator;
  readonly titleMrs: Locator;
  readonly passwordInput: Locator;
  readonly daySelect: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator;
  readonly newsletter: Locator;
  readonly offers: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly company: Locator;
  readonly address1: Locator;
  readonly address2: Locator;
  readonly country: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zipcode: Locator;
  readonly mobile: Locator;
  readonly createAccountBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = page.locator('h2:has-text("Enter Account Information")');
    this.titleMr = page.locator('#id_gender1');
    this.titleMrs = page.locator('#id_gender2');
    this.passwordInput = page.locator('input[data-qa="password"]');
    this.daySelect = page.locator('select[data-qa="days"]');
    this.monthSelect = page.locator('select[data-qa="months"]');
    this.yearSelect = page.locator('select[data-qa="years"]');
    this.newsletter = page.locator('#newsletter');
    this.offers = page.locator('#optin');
    this.firstName = page.locator('input[data-qa="first_name"]');
    this.lastName = page.locator('input[data-qa="last_name"]');
    this.company = page.locator('input[data-qa="company"]');
    this.address1 = page.locator('input[data-qa="address"]');
    this.address2 = page.locator('input[data-qa="address2"]');
    this.country = page.locator('select[data-qa="country"]');
    this.state = page.locator('input[data-qa="state"]');
    this.city = page.locator('input[data-qa="city"]');
    this.zipcode = page.locator('input[data-qa="zipcode"]');
    this.mobile = page.locator('input[data-qa="mobile_number"]');
    this.createAccountBtn = page.locator('button[data-qa="create-account"]');
  }

  async verifyPageVisible() { await this.assertVisible(this.pageHeader); }

  async fillAndSubmit(u: UserDetails) {
    await this.verifyPageVisible();
    if (u.title === 'Mr') await this.titleMr.check();
    else if (u.title === 'Mrs') await this.titleMrs.check();
    await this.passwordInput.fill(u.password);
    if (u.birthDay) await this.daySelect.selectOption(u.birthDay);
    if (u.birthMonth) await this.monthSelect.selectOption(u.birthMonth);
    if (u.birthYear) await this.yearSelect.selectOption(u.birthYear);
    if (u.newsletter) await this.newsletter.check();
    if (u.offers) await this.offers.check();
    await this.firstName.fill(u.firstName);
    await this.lastName.fill(u.lastName);
    if (u.company) await this.company.fill(u.company);
    await this.address1.fill(u.address);
    if (u.address2) await this.address2.fill(u.address2);
    await this.country.selectOption(u.country);
    await this.state.fill(u.state);
    await this.city.fill(u.city);
    await this.zipcode.fill(u.zipcode);
    await this.mobile.fill(u.mobileNumber);
    await this.createAccountBtn.click();
    await this.waitForPageLoad();
  }
}