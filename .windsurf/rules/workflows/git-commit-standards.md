# AI Auto-Commit & Version Control Standards

**Trigger**: `git commit`, `git add`, version control, save points

When the AI (Windsurf/Antigravity) is proposing or executing Git commits, the following strict rules MUST be followed to ensure a clean, logical, and clutter-free Git history:

## 1. Atomic and Logical Commits
- **STRICTLY FORBIDDEN**: Committing all modified files at once using a blanket `git commit -am` or `git add .` if the changes span multiple unrelated logical boundaries.
- **MANDATORY**: Group files into logical, atomic commits. For example:
  - Commit 1: Database/Service layer changes.
  - Commit 2: UI Components and styling updates.
  - Commit 3: Unit tests for the new features.
- Each commit must represent a single, self-contained unit of work.

## 2. Exclude AI Workspace & Tracking Files
- **STRICTLY FORBIDDEN**: You must NEVER stage or commit AI-generated scratchpads, task tracking files, or analysis artifacts.
- Explicitly exclude files such as:
  - Any files located in AI-specific memory directories (e.g., `.gemini/`, AI brain folders).
  - Short-lived tracking files like `task.md`, `analysis_results.md`, or transient scratchpads.
  - IDE configuration files unless specifically requested by the user.

## 3. Explicit Staging
- Always use `git add <specific_file_paths>` rather than bulk adding. Review the `git status` carefully to ensure no junk files are included before formulating the commit command.

## 4. Descriptive Commit Messages
- Use clear, conventional commit messages (e.g., `feat:`, `fix:`, `test:`, `chore:`).
- The commit message must accurately reflect the specific logical chunk of files being committed, rather than summarizing the entire overarching user task.

## 5. Branching Standards
- **STRICTLY FORBIDDEN**: You must NEVER commit directly to common/protected branches such as `dev`, `release`, or `main`.
- **MANDATORY PRE-COMMIT CHECK**: Before executing any commit, verify the current branch:
  - If on a common branch (`dev`, `release`), create a new branch using a descriptive name or ticket number (e.g., `git checkout -b EL-XXX-description`).
  - If the user has already provided or created a meaningful branch (e.g., `EL-440`, `automation-e2e-suite`), you may proceed with the commit on that branch.
- If in doubt, always ask the user to confirm the target branch before committing.
