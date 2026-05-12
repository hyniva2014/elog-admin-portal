# E2E & BDD Testing Standards

**Trigger**: `*.feature`, `*steps.js`, `*steps.ts`, `*page.js`, `*page.ts`, UI Automation

These strict standards govern all end-to-end (E2E), UI, and functional automation testing within the project to ensure scalable, maintainable, and reliable test suites.

## 1. Strict File Separation
- **MANDATORY**: All E2E, UI, and BDD automation files MUST reside entirely inside a root-level `/tests/e2e/` directory.
- **STRICTLY FORBIDDEN**: Placing *any* automation, feature, or step definition files inside the `src/` directory.

## 2. BDD Framework & Gherkin
- **REQUIREMENT**: Standardize the use of Behavior-Driven Development (BDD) for all functional test scenarios.
- All functional tests MUST be written in strict **Gherkin syntax** (`Feature`, `Scenario`, `Given`, `When`, `Then`, `And`, `But`).

## 3. Separation of Concerns
- **MANDATORY**: Test step definitions (`*steps.js`/`*steps.ts`) MUST be completely separated from the Gherkin `.feature` files.
- Feature files should only contain plain-text business logic, while step files map those descriptions to automation code within the `/tests/e2e/` folder structure.

## 4. Page Object Model (POM)
- **REQUIREMENT**: The use of the Page Object Model (POM) design pattern is mandatory.
- UI element selectors (XPaths, CSS Selectors, Test IDs) and page-specific actions MUST be centralized in dedicated Page classes (e.g., `LoginPage.js`).
- Step definitions should call POM methods rather than interacting with UI selectors directly.

## 5. Resilience & Waiting Strategies
- **STRICT RULE**: **Hardcoded timeouts are completely forbidden** (e.g., `cy.wait(5000)` or `browser.pause(5000)`).
- **MANDATORY**: Use dynamic waits tailored to the testing framework (e.g., waiting for an element to become visible, clickable, or for specific network endpoints/API requests to resolve) before proceeding with assertions.

## 6. Comprehensive Test Coverage
- **REQUIREMENT**: Every new feature or module MUST be covered by the following test case categories:
  - **Positive Cases**: Verifying the "happy path" where the system behaves as expected with valid data.
  - **Negative Cases**: Verifying that the system remains stable and provides appropriate feedback when given invalid or unauthorized input.
  - **Edge Cases**: Testing boundary conditions (e.g., maximum character limits, earliest/latest dates, zero values).
  - **Unexpected Data**: Verifying system resilience against "garbage" data such as:
    - Empty strings (`""`), `null`, `undefined`.
    - Empty arrays (`[]`) or empty objects (`{}`).
    - Malformed formats (e.g., invalid email formats, non-numeric strings in numeric values).
