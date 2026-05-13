import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly loginHeader: Locator;
  readonly loginEmail: Locator;
  readonly loginPassword: Locator;
  readonly loginBtn: Locator;
  readonly loginError: Locator;
  readonly signupHeader: Locator;
  readonly signupName: Locator;
  readonly signupEmail: Locator;
  readonly signupBtn: Locator;
  readonly signupError: Locator;

  constructor(page: Page) {
    super(page);
    this.loginHeader = page.locator('h2:has-text("Login to your account")');
    this.loginEmail = page.locator('form[action="/login"] input[data-qa="login-email"]');
    this.loginPassword = page.locator('input[data-qa="login-password"]');
    this.loginBtn = page.locator('button[data-qa="login-button"]');
    this.loginError = page.locator('p:has-text("Your email or password is incorrect!")');
    this.signupHeader = page.locator('h2:has-text("New User Signup!")');
    this.signupName = page.locator('input[data-qa="signup-name"]');
    this.signupEmail = page.locator('input[data-qa="signup-email"]');
    this.signupBtn = page.locator('button[data-qa="signup-button"]');
    this.signupError = page.locator('p:has-text("Email Address already exist!")');
  }

  async goto() { await this.navigate('/login'); await this.waitForPageLoad(); }

  async verifyPageVisible() {
    await this.assertVisible(this.loginHeader);
    await this.assertVisible(this.signupHeader);
  }

  async login(email: string, password: string) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginBtn.click();
    await this.waitForPageLoad();
  }

  async verifyLoginError() { await this.assertVisible(this.loginError); }

  async startSignup(name: string, email: string) {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupBtn.click();
    await this.waitForPageLoad();
  }

  async verifyEmailExistsError() { await this.assertVisible(this.signupError); }
}