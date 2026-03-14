import 'dotenv/config';
import { Octokit } from '@octokit/rest';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.GITHUB_OWNER || 'dr-winner';
const REPO = process.env.GITHUB_REPO || 'AxiomForge';

if (!GITHUB_TOKEN) {
  console.error('Missing GITHUB_TOKEN');
  process.exit(1);
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

async function main() {
  console.log('AxiomForge Agent (WIP)');
  console.log(`Target repo: ${OWNER}/${REPO}`);

  // Placeholder: list open issues
  const issues = await octokit.issues.listForRepo({ owner: OWNER, repo: REPO, state: 'open' });
  console.log(`Open issues: ${issues.data.length}`);
  for (const issue of issues.data.slice(0, 5)) {
    console.log(`#${issue.number} ${issue.title}`);
  }

  // TODO: plan → execute → verify → receipt
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
