import 'dotenv/config';
import { Octokit } from '@octokit/rest';
import { executeTask, createPR } from './execution.js';
import { verifyReceipt } from '@axiomforge/receipt';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.GITHUB_OWNER || 'dr-winner';
const REPO = process.env.GITHUB_REPO || 'AxiomForge';
const GITHUB_ISSUE = process.env.GITHUB_ISSUE ? parseInt(process.env.GITHUB_ISSUE) : null;
const CHAIN_ID = parseInt(process.env.CHAIN_ID || '84532');

if (!GITHUB_TOKEN) {
  console.error('Missing GITHUB_TOKEN');
  process.exit(1);
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

async function main() {
  console.log('⚡ AxiomForge Agent');
  console.log(`Target: ${OWNER}/${REPO}`);
  console.log(`Chain: Base Sepolia (${CHAIN_ID})`);

  // Fetch latest open issue if none specified
  let issueNumber = GITHUB_ISSUE;
  
  if (!issueNumber) {
    console.log('📋 Fetching latest open issue...');
    const issues = await octokit.issues.listForRepo({ 
      owner: OWNER, 
      repo: REPO, 
      state: 'open',
      per_page: 1 
    });
    
    if (issues.data.length === 0) {
      console.log('No open issues found.');
      return;
    }
    
    issueNumber = issues.data[0].number;
    console.log(`✓ Selected: #${issueNumber} - ${issues.data[0].title}`);
  }

  // Execute the task
  console.log('🚀 Executing agent flow...');
  
  const result = await executeTask({
    taskId: `issue-${issueNumber}`,
    issueNumber: issueNumber!,
    owner: OWNER,
    repo: REPO,
    commitHash: 'main',
    artifactURI: 'ipfs://pending',
    agentId: 'erc8004:axiomforge',
    repoPath: process.cwd(),
    githubToken: GITHUB_TOKEN,
    chainId: CHAIN_ID,
  });

  console.log('');
  console.log('📜 Receipt minted:', result.receiptHash);
  console.log('📄 Test status:', result.testOutput);
  console.log('🔧 Patch:', result.patchOutput);
  console.log('✅ Test status:', result.testStatus);
  
  // Verify receipt integrity
  const isValid = verifyReceipt(result.receipt, result.receiptHash);
  console.log('🔐 Receipt verified:', isValid ? '✅ Valid' : '❌ Invalid');
  
  // Save receipt path
  const receiptPath = `${process.cwd()}/.axiomforge-receipt.json`;
  console.log('💾 Saved to:', receiptPath);
}

main().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
