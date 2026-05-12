# Strict Unit Testing Standards

**Trigger**: `*.test.js`, `*.test.jsx`, `*.test.ts`, `*.test.tsx`, `*.spec.js`, `*.spec.ts`

These strict unit testing standards apply to both the React frontend and Node.js backend to ensure high software quality, robustness, and predictable execution.

## 1. File Structure & Colocation
- **MANDATORY**: All unit test files MUST be colocated exactly next to their corresponding implementation files inside the `src/` directory.
- Example: If the implementation is `src/components/DomoEmbed/DomoEmbed.jsx`, the test file MUST be `src/components/DomoEmbed/DomoEmbed.test.jsx`.
- **STRICTLY FORBIDDEN**: Creating a separate root folder (e.g., `/__tests__/`, `/tests/`) for unit tests. Tests must live alongside the code they verify.

## 2. Coverage Target
- **REQUIREMENT**: 100% code coverage is REQUIRED for all new components, custom hooks, reducers, and backend utility functions.
- Every branch, logical path, and return statement must be executed and asserted by tests.

## 3. Edge & Negative Cases
- **MANDATORY**: Every test suite (`describe` block) MUST include dedicated `describe` or `it` blocks specifically for negative testing and boundary conditions.
- You must verify how the code behaves when operations fail or inputs are at extreme boundaries.

## 4. Data Integrity Testing
- **REQUIREMENT**: Tests must explicitly feed invalid and aggressive payloads to components and functions to ensure graceful degradation.
- You must explicitly pass and assert against:
  - `null`
  - `undefined`
  - Empty strings (`""`)
  - Empty arrays (`[]`)
  - Aggressively unsanitized or malformed payloads.

## 5. Mocking
- **STRICT RULE**: Unit tests must NEVER hit real network or database layers.
- All external dependencies MUST be strictly mocked:
  - **Axios / API Calls**: Use `jest.mock()` or `axios-mock-adapter` to perfectly replicate API responses and HTTP errors (400, 401, 404, 500).
  - **Database Calls**: Mock the ORM/DB driver layer entirely.
  - **Timers/Dates**: Mock `Date` and `setTimeout`/`setInterval` using Jest's fake timers to prevent inconsistent test runs.
