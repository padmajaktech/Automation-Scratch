# Automation-Scratch
Designed and developed a scalable Playwright automation framework from scratch using TypeScript and Page Object Model (POM) architecture for UI and API automation testing.
# Automation Exercise – Playwright POM Framework

End-to-end test automation for [automationexercise.com](https://automationexercise.com) using *Playwright* + *TypeScript* following the *Page Object Model (POM)*.

## Project Structure

automationexercise-playwright/
├── pages/                  # Page Object classes
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── SignupPage.ts
│   ├── AccountCreatedPage.ts
│   ├── AccountDeletedPage.ts
│   ├── ProductsPage.ts
│   ├── ProductDetailPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── PaymentPage.ts
│   ├── ContactUsPage.ts
│   ├── TestCasesPage.ts
│   ├── CategoryPage.ts
│   ├── RecommendedPage.ts
│   └── index.ts
├── tests/
│   ├── ui/                 # 26 UI test specs (TC01–TC26)
│   └── api/                # 14 API test specs (API01–API14)
├── utils/
│   ├── testData.ts         # Shared test data constants
│   ├── randomHelper.ts     # Random data generators
│   └── apiHelper.ts        # API request wrappers
├── fixtures/
│   └── fixtures.ts         # Playwright custom fixtures
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── .gitignore


---

## Setup

### 1. Install dependencies
bash
npm install


### 2. Install Playwright browsers
bash
npx playwright install chromium

---

## Running Tests

| Command | Description |
|---|---|
| npm test | Run all tests |
| npm run test:ui | Run only UI tests |
| npm run test:api | Run only API tests |
| npm run test:headed | Run with browser visible |
| npm run test:report | Open HTML report |

### Run a single test file
bash
npx playwright test tests/ui/tc01-register-user.spec.ts


### Run a specific test case by title
bash
npx playwright test -g "TC1 - Register User"

---

## Commit Structure

| Commit | Content |
|---|---|
| Commit 1 | Initial project setup (config, pages, utils, fixtures) |
| Commit 2–27 | UI Test Cases TC01–TC26 (one per commit) |
| Commit 28–41 | API Test Cases API01–API14 (one per commit) |

### Git workflow for each commit
bash
# Example: Commit 2 = TC01
git add tests/ui/tc01-register-user.spec.ts
git commit -m "Commit 2: TC1 - Register User"

# Example: Commit 28 = API01
git add tests/api/api01-get-all-products.spec.ts
git commit -m "Commit 28: API1 - Get All Products List"

---

## Framework Design

- *BasePage.ts* — shared helpers (navigate, assertVisible, assertText, scrollToBottom, etc.) inherited by all page classes
- *Fixtures* — all page objects injected via test.extend so each spec imports one clean test object
- *testData.ts* — all static test values in one place; randomHelper.ts generates unique emails per run to avoid conflicts
- *apiHelper.ts* — thin wrappers over Playwright's request context (apiGet, apiPost, apiPut, apiDelete, parseResponse)
- *Screenshots & video* — captured automatically on failure via playwright.config.ts

---

## Notes
- Tests run *serially* (workers: 1) because automationexercise.com has shared state
- Each UI test that creates an account *deletes it* at the end to keep the site clean
- API tests that create accounts also clean up after themselves
- The site shows ad popups intermittently — if tests fail due to overlays, re-run once (retries are configured)
