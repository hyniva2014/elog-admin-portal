import fs from 'fs';
import { execSync } from 'child_process';
import axios from 'axios';

// Load environment variables manually so we don't rely on external dotenv dependency
function loadEnv() {
    try {
        const envConfig = fs.readFileSync('.automation/.env', 'utf8');
        envConfig.split(/\r?\n/).forEach(line => {
            const match = line.match(/^([^#=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                let value = match[2].trim();
                // Strip quotes if they exist
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.slice(1, -1);
                } else if (value.startsWith("'") && value.endsWith("'")) {
                    value = value.slice(1, -1);
                }
                if (!process.env[key]) {
                    process.env[key] = value;
                }
            }
        });
    } catch (e) {
        console.log("⚠️ No .env file found or couldn't be parsed. Relying on system environment variables.");
    }
}

loadEnv();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const JIRA_DOMAIN = "hyniva.atlassian.net";
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;

// Validation
let missingEnv = false;
if (!GITHUB_TOKEN) {
    console.error("❌ Error: GITHUB_TOKEN is not set in .env");
    missingEnv = true;
}
if (!JIRA_EMAIL) {
    console.error("❌ Error: JIRA_EMAIL is not set in .env");
    missingEnv = true;
}
if (!JIRA_API_TOKEN) {
    console.error("❌ Error: JIRA_API_TOKEN is not set in .env");
    missingEnv = true;
}

if (missingEnv) {
    console.log(`
Please create or update your .env file in the root directory with the following:
GITHUB_TOKEN=your_github_personal_access_token
JIRA_EMAIL=your_jira_email_address
JIRA_API_TOKEN=your_jira_api_token
`);
    process.exit(1);
}

// Utility to run a synchronous process and capture output robustly
function runCommand(command) {
    try {
        return execSync(command, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    } catch (e) {
        return null;
    }
}

// 1. Get current branch name
const branch = runCommand("git rev-parse --abbrev-ref HEAD");
if (!branch || branch === "dev" || branch === "main" || branch === "master") {
    console.error("❌ Error: Please checkout a valid feature/bugfix branch before creating a PR.");
    process.exit(1);
}

// 2. Extract Jira Ticket ID from branch name (e.g. feature/ELOG-123 or bugfix/ELOG-456)
const jiraTicketMatch = branch.match(/[A-Za-z]+-\d+/);
const jiraTicket = jiraTicketMatch ? jiraTicketMatch[0].toUpperCase() : null;

// 3. Get repository owner and name from git config
const remoteUrl = runCommand("git remote get-url origin");
if (!remoteUrl) {
    console.error("❌ Error: Unable to get git origin URL. Make sure this is a valid git repository with a remote 'origin'.");
    process.exit(1);
}

let owner, repo;
const httpsMatch = remoteUrl.match(/https:\/\/github\.com\/([^\/]+)\/([^\.]+)(\.git)?/);
const sshMatch = remoteUrl.match(/git@github\.com:([^\/]+)\/([^\.]+)(\.git)?/);

if (httpsMatch) {
    owner = httpsMatch[1];
    repo = httpsMatch[2].replace(/\.git$/, '');
} else if (sshMatch) {
    owner = sshMatch[1];
    repo = sshMatch[2].replace(/\.git$/, '');
} else {
    console.error(`❌ Error: Unrecognized GitHub URL format: ${remoteUrl}`);
    process.exit(1);
}

async function main() {
    console.log(`🚀 Starting PR Automation for branch: \x1b[36m${branch}\x1b[0m\n`);

    const inputMsg = process.argv[2];
    const isAutoMsg = !inputMsg;
    const commitMsg = inputMsg || `Automated code sync for ${branch}`;

    // Step 0: Auto Add, Commit, and Pull
    const stagedFiles = runCommand("git diff --cached --name-only");
    if (stagedFiles && stagedFiles.trim() !== '') {
        console.log("⏳ Detected manually staged files. Committing only those files...");
    } else {
        console.log("⏳ No manually staged files detected. Auto-staging all local changes...");
        runCommand("git add .");
    }

    try {
        execSync(`git commit -m "${commitMsg}"`, { stdio: 'pipe', encoding: 'utf8' });
        console.log(`\x1b[32m✅ Committed:\x1b[0m ${commitMsg}`);
    } catch (e) {
        console.log("ℹ️ No new changes to commit.");
    }

    console.log("⏳ Fetching and pulling latest remote changes...");
    try {
        execSync(`git fetch origin`, { stdio: 'pipe', encoding: 'utf8' });
        execSync(`git pull`, { stdio: 'pipe', encoding: 'utf8' });
    } catch (e) {
        console.log("ℹ️ Could not pull (likely no upstream branch yet).");
    }

    // 4. Summarize code changes to use in PR description and Jira comment
    let fileStats = runCommand("git diff --stat origin/dev..HEAD");
    if (!fileStats) {
        fileStats = runCommand("git diff --stat HEAD~1..HEAD") || "File changes successfully synced.";
    }

    let commits = runCommand("git log origin/dev..HEAD --pretty=format:\"- %s\"");
    if (!commits) {
        commits = runCommand("git log -n 5 --pretty=format:\"- %s\"");
    }
    
    // Strip technical prefixes (e.g., feat:, chore:, fix:) from the Jira display
    if (commits) {
        commits = commits.replace(/-\s*(?:feat|fix|chore|refactor|docs|test|style|perf|build|ci|revert)(?:\([^)]+\))?:\s*/gmi, '- ');
        
        // Remove automated sync commits so they don't clutter Jira
        commits = commits.split('\n').filter(line => 
            !line.toLowerCase().includes("automated commit for") && 
            !line.toLowerCase().includes("automated code sync for")
        ).join('\n').trim();

        if (!commits) {
            commits = "- _Routine sync: No new manual feature changes._";
        }
    }

    const readableSummary = isAutoMsg 
        ? `*Latest Code Changes:*\n${commits}`
        : `*Developer Summary of Functionality:*\n${inputMsg}`;

    let prTitle = isAutoMsg ? `Merge ${branch} into dev` : inputMsg;
    
    // 5. Ensure PR Title starts with Jira Ticket ID
    if (jiraTicket) {
        // Clean existing ticket prefix if it exists to ensure standard format "TICKET-ID: Message"
        const cleanMsg = prTitle.replace(/^[A-Za-z]+-\d+\s*[:\-]?\s*/i, '').trim();
        prTitle = `${jiraTicket}: ${cleanMsg}`;
    }
    let prBody = `### Overview\n${readableSummary}\n\n### Changed Files\n\`\`\`text\n${fileStats}\n\`\`\`\n\n`;
    if (jiraTicket) prBody += `Jira Ticket: [${jiraTicket}](https://${JIRA_DOMAIN}/browse/${jiraTicket})`;

    let prUrl = null;
    let isNewPr = true;

    try {
        // Step 1: Ensure branch is pushed to remote
        console.log("\n⏳ Pushing current branch to remote origin...");
        execSync(`git push -u origin ${branch}`, { stdio: 'inherit' });

        // Step 2: Create PR against 'dev' branch via GitHub API
        console.log("\n⏳ Creating Pull Request to 'dev' branch...");
        const githubResponse = await axios.post(
            `https://api.github.com/repos/${owner}/${repo}/pulls`,
            {
                title: prTitle,
                body: prBody,
                head: branch,
                base: "dev"
            },
            {
                headers: {
                    "Accept": "application/vnd.github+json",
                    "Authorization": `Bearer ${GITHUB_TOKEN}`,
                    "X-GitHub-Api-Version": "2022-11-28"
                }
            }
        );

        prUrl = githubResponse.data.html_url;
        console.log(`\x1b[32m✅ Successfully created Pull Request:\x1b[0m ${prUrl}`);
    } catch (error) {
        let prExists = false;
        if (error.response && error.response.data && error.response.data.errors) {
            const errs = error.response.data.errors;
            if (errs.length > 0 && errs[0].message && errs[0].message.includes("A pull request already exists")) {
                 console.log(`\n⚠️ A pull request already exists for ${branch}. Retrieving existing PR details...`);
                 prExists = true;
            } else {
                 console.error("\n❌ Failed to create PR.");
                 console.error(error.response.data.errors);
                 process.exit(1);
            }
        } else {
            console.error("\n❌ Failed to create PR.");
            console.error(error ? error.message : "Unknown error");
            process.exit(1);
        }

        if (prExists) {
            try {
                const existingPrResponse = await axios.get(
                    `https://api.github.com/repos/${owner}/${repo}/pulls?state=open&head=${owner}:${branch}`,
                    {
                        headers: {
                            "Accept": "application/vnd.github+json",
                            "Authorization": `Bearer ${GITHUB_TOKEN}`,
                            "X-GitHub-Api-Version": "2022-11-28"
                        }
                    }
                );
                if (existingPrResponse.data.length > 0) {
                    prUrl = existingPrResponse.data[0].html_url;
                    isNewPr = false;
                    console.log(`\x1b[32m✅ New commits pushed to existing Pull Request:\x1b[0m ${prUrl}`);
                } else {
                    console.error("❌ Could not find the existing PR.");
                    process.exit(1);
                }
            } catch (fetchErr) {
                 console.error("❌ Failed to fetch existing PR details.");
                 process.exit(1);
            }
        }
    }

    // Step 3: Automatically comment on Jira Ticket using basic auth structure
    if (jiraTicket) {
        console.log(`\n⏳ Adding comment to Jira Ticket (${jiraTicket})...`);
        
        let formattedMsg = inputMsg || commitMsg;
        // Automatically format multi-line messages into bullet points if they aren't already
        if (formattedMsg.includes('\n') && !formattedMsg.match(/^\s*[*#-]/m)) {
            formattedMsg = formattedMsg.split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0)
                .map(line => `* ${line}`)
                .join('\n');
        }

        const jiraComment = `${formattedMsg}\n\n*PR Link:* ${prUrl}`;
        const encodedAuth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');

        try {
            await axios.post(
                `https://${JIRA_DOMAIN}/rest/api/2/issue/${jiraTicket}/comment`,
                {
                    body: jiraComment
                },
                {
                    headers: {
                        "Authorization": `Basic ${encodedAuth}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            console.log(`\x1b[32m✅ Successfully commented on Jira ticket:\x1b[0m ${jiraTicket}`);
        } catch (error) {
             console.error(`\n❌ Failed to comment on Jira ticket: ${jiraTicket}`);
             if (error.response) {
                 console.error(error.response.data);
             } else {
                 console.error(error.message);
             }
        }
    } else {
        console.log("\n⚠️ No Jira ticket identifier found in the branch name (e.g. ELOG-123). Skipping Jira comment phase.");
    }

    // Step 4: Open the PR URL automatically in the browser
    if (prUrl) {
        console.log(`\n⏳ Opening Pull Request in browser...`);
        const start = (process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open');
        try {
            const command = process.platform === 'win32' ? `start "" "${prUrl}"` : `${start} "${prUrl}"`;
            execSync(command);
        } catch (e) {
            console.error("⚠️ Failed to open PR URL automatically.");
        }
    }
}

main();
