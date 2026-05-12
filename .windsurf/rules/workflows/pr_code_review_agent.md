# PR Code Review Agent Workflow

## Overview

This workflow defines the standard operating procedure for AI-assisted pull request code review in this project. When triggered by the user requesting a PR review with a PR number, follow these exact steps.

## Workflow Steps

### 1. Branch Switching

When provided with a PR number:

- **Primary Method**: Use GitHub CLI to switch to the PR branch

  ```bash
  gh pr checkout <PR_NUMBER>
  ```

- **Fallback Method**: If GitHub CLI is unavailable, use standard git commands

  ```bash
  git fetch origin pull/<PR_NUMBER>/head:<BRANCH_NAME>
  git checkout <BRANCH_NAME>
  ```

### 2. File Identification

Identify and view the exact changes in the PR:

- **Primary Method**: Use GitHub CLI to view the diff

  ```bash
  gh pr diff <PR_NUMBER>
  ```

- **Fallback Method**: If GitHub CLI is unavailable, use standard git commands

  ```bash
  git diff origin/main...HEAD
  ```

**CRITICAL**: Analyze the diff patch output itself (the + and - lines). Do not simply list the modified files and read their entire contents.

**Exclusion Rules**: Skip the following file types:

- Package lock files (package-lock.json, yarn.lock, bun.lockb)
- Build artifacts and generated files
- Configuration files not related to code structure (.gitignore, .env files, CI/CD configs)

### 3. Context Gathering

Silently read and establish baseline standards from:

- `current_architecture.md` (project architecture documentation)
- All rule files in `.windsurf/rules/workflows/` directory

### 4. Code Review Execution

Analyze the specific lines of code changed in the PR against established architecture standards:

**Scope of Review**: You MUST strictly limit your review to the lines of code added or modified in this specific Pull Request.

Do NOT critique, refactor, or complain about pre-existing code in the file, even if it violates current architectural rules.

You may only use the surrounding unmodified code for context to understand if the new lines violate any rules or break the architecture.

**Architecture Compliance Checks**:

- **Folder Structure**: Verify files are placed in correct directories per `current_architecture.md`
- **Component Organization**: Ensure shared components go in `src/common/`, feature-specific in `src/components/`
- **Styling Boundaries**: Check MUI Theme vs Styled Components usage follows documented patterns
- **API Isolation**: Verify API calls are properly isolated in `src/components/API/` directory
- **Hooks & State**: Confirm custom hooks are in `src/hooks/` and follow established patterns

**Review Focus**: Only flag violations that directly contradict the documented architecture patterns in the changed lines.

### 5. Reporting Format

Output a structured Markdown report with the following sections:

#### Files Analyzed

- List all files reviewed in the PR
- Note any files skipped and why

#### Architecture Violations

For each violation:

- **File and Line Number**
- **Violation Description**: Specific rule violated
- **Code Snippet**: Brief excerpt showing the issue
- **Suggested Fix**: Clear recommendation (do not implement automatically)

#### Positive Observations

- Highlight code that follows architecture standards well
- Note good practices observed

#### Summary & Recommendations

- Overall assessment of architectural compliance
- Priority level for any fixes needed
- Next steps (require user approval before any code changes)

### 6. Cleanup

After completing the PR review task:

- **Temporary Branch Cleanup**: If temporary branches were created during the review process (e.g., `pr-<NUMBER>`), clean them up locally using:

  ```bash
  git branch -D pr-<NUMBER>
  ```

- **Workspace Maintenance**: Remove any temporary files or artifacts created during the review process

## Critical Constraints

- **No Automatic Fixes**: Never rewrite or modify code during review
- **Report Only**: Output the review report and wait for user direction
- **Ask for Permission**: Always request approval before proceeding with any suggested changes
- **Maintain Standards**: Base all judgments strictly on documented architecture and existing rules

## Trigger

This workflow activates when the user explicitly requests a PR code review by providing a PR number.
