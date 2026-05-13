import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactUsPage extends BasePage {
  readonly pageHeader: Locator;
  readonly getInTouchHeader: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly fileUpload: Locator;
  readonly submitBtn: Locator;
  readonly successMsg: Locator;
  readonly homeBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = page.locator('h2:has-text("Contact Us")');
    this.getInTouchHeader = page.locator('h2:has-text("Get In Touch")');
    this.nameInput = page.locator('input[data-qa="name"]');
    this.emailInput = page.locator('input[data-qa="email"]');
    this.subjectInput = page.locator('input[data-qa="subject"]');
    this.messageInput = page.locator('textarea[data-qa="message"]');
    this.fileUpload = page.locator('input[name="upload_file"]');
    this.submitBtn = page.locator('input[data-qa="submit-button"]');
    this.successMsg = page.locator('#contact-page .status.alert-success');
    this.homeBtn = page.locator('#contact-page a.btn.btn-success:has-text("Home")');
  }

  async goto() { await this.navigate('/contact_us'); await this.waitForPageLoad(); }

  async verifyPageVisible() {
    await this.assertVisible(this.pageHeader);
    await this.assertVisible(this.getInTouchHeader);
  }

  async fillAndSubmit(details: { name: string; email: string; subject: string; message: string; filePath?: string }) {
    await this.nameInput.fill(details.name);
    await this.emailInput.fill(details.email);
    await this.subjectInput.fill(details.subject);
    await this.messageInput.fill(details.message);
    if (details.filePath) await this.fileUpload.setInputFiles(details.filePath);
    this.page.once('dialog', d => d.accept());
    await this.submitBtn.click();
    await this.waitForPageLoad();
  }

  async verifySuccess() {
    await this.assertVisible(this.successMsg);
    await this.assertText(this.successMsg, 'Success! Your details have been submitted successfully.');
  }

  async clickHome() { await this.homeBtn.click(); await this.waitForPageLoad(); }
}