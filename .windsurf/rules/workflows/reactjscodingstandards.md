    # React JS Coding Standards

**STRICT CODE CHURN PREVENTION:** You are strictly forbidden from refactoring, reorganizing, or rewriting existing, functional code simply because of stylistic preferences or model switching. ONLY modify existing code if it is demonstrably non-functional or logically incorrect. If it works, leave it alone and build around it.
## Trigger
- **File Types**: `*.js`, `*.ts`, `*.tsx`, `*.jsx`, `*.json`

## Component Architecture & Logic

### Separation of Concerns
- Never mix logic with rendering
- Use custom hooks for state, effects, and data fetching
- The main component file should focus on the UI structure

### Single Responsibility Principle (SRP)
- Each component must perform exactly one function
- Split complex components into smaller, reusable units

### Externalize Map Elements
- When using `.map()` in JSX, the inner elements must be extracted into a separate, standalone component

### Guards
- Use guard clauses (early returns) for loading states, errors, or empty data
- Avoid nested ternary operators in JSX

## Code Style & Syntax

### Destructuring
- Always destructure objects and arrays before use
- Avoid repetitive `props.item.name` or `data[0]` syntax

### No Inline Functions
- Do not define functions inside JSX props (e.g., `onClick={() => ...}`)
- Use named functions or `useCallback` defined above the return statement

### No Inline Classes
- Styling must be handled through defined project patterns
- Never use inline style objects or logic

### DRY Principle
- Never duplicate logic
- If a pattern appears twice, move it to a shared helper or hook

### Constraints & Flow
- **Argument Limit**: Functions should have a maximum of 3 parameters
- **Control Flow**: Maintain a maximum nesting depth of 2 levels
- Extract inner logic into helper functions to keep flow flat and readable

## Styling & UI Frameworks

### Design Pattern
- Use MUI (Material UI) design patterns
- If the project is React JS, use Material UI components as the base

### Styled Components
- Use Styled Components for all variations and custom styling
- Styled components must be placed in a separate file named `[ComponentName].styled.ts` (or `.js`)
- Do not define them within the main component file
- Use MUI components as the base for styled components (e.g., `styled(Box)`, `styled(Typography)`)

### Color Usage
- Always use colors from `src/theme/palette.js` instead of hardcoded values
- Access colors through theme object: `theme.palette.primary.main`, `theme.palette.grey[500]`, etc.
- Available color categories: primary, secondary, success, info, warning, error, light, dark, grey, text, divider
- If a required color doesn't exist in palette.js, add it to the appropriate category before using
- Use semantic color names (success, error, warning) instead of specific hex values
- For custom brand colors, add them to the palette using `getColorVariants()` function

### Common Components
- Always check `src/common/` for existing components before creating new ones
- Use existing common components when available to maintain consistency
- Only create new components when no suitable common component exists

## File Organization

### Utility Functions
- Extract non-UI logic into small, single-purpose functions in an external utility file

### Application Constants
- Place all application or module-specific constants in an external constants file
- Do not hardcode values

## Global State Management

- Use a global state management solution (e.g., Redux, Context API) for shared state across components
- Store all API calls in global state to avoid multiple API calls

## Validation

- Use a validation library (e.g., Yup, Zod) for form validation and data validation
- Apply validation to all forms and data