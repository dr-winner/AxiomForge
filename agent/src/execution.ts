import { hashReceipt, Receipt } from '@axiomforge/receipt';
import { Octokit } from '@octokit/rest';
import { writeFileSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

interface ExecutionResult {
  receipt: Receipt;
  receiptHash: string;
  testOutput: string;
  patchOutput: string;
}

export async function executeTask(params: {
  taskId: string;
  issueNumber: number;
  repo: string;
  owner: string;
  commitHash: string;
  artifactURI: string;
  agentId: string;
  repoPath: string;
  githubToken?: string;
}): Promise<ExecutionResult> {
  const { taskId, issueNumber, repo, owner, commitHash, artifactURI, agentId, repoPath, githubToken } = params;

  // Step 1: Fetch GitHub issue
  console.log(`📋 Fetching issue #${issueNumber} from ${owner}/${repo}...`);
  
  let issueTitle = 'Unknown Issue';
  let issueBody = '';
  
  if (githubToken) {
    try {
      const octokit = new Octokit({ auth: githubToken });
      const issue = await octokit.issues.get({ owner, repo, issue_number: issueNumber });
      issueTitle = issue.data.title;
      issueBody = issue.data.body || '';
      console.log(`✓ Issue: "${issueTitle}"`);
    } catch (err) {
      console.warn('⚠️ Could not fetch issue (check token):', err);
    }
  }

  // Step 2: Generate patch (placeholder - real agent logic goes here)
  console.log('🔧 Generating patch...');
  const patchOutput = `Patch for: ${issueTitle}\nStatus: generated\nTimestamp: ${new Date().toISOString()}`;
  
  // Step 3: Run tests
  console.log('🧪 Running tests...');
  let testOutput = 'tests:skipped';
  let testStatus: 'passed' | 'failed' | 'skipped' = 'skipped';
  
  try {
    const testResult = execSync('npm test 2>&1 || true', { 
      cwd: repoPath, 
      encoding: 'utf-8',
      timeout: 60000 
    });
    
    if (testResult.includes('passing')) {
      testOutput = 'tests:passed';
      testStatus = 'passed';
      console.log('✅ Tests passed');
    } else if (testResult.includes('failing')) {
      testOutput = 'tests:failed';
      testStatus = 'failed';
      console.log('❌ Tests failed');
    } else {
      testOutput = 'tests:skipped';
      testStatus = 'skipped';
      console.log('⏭️ Tests skipped');
    }
  } catch {
    testOutput = 'tests:failed';
    testStatus = 'failed';
    console.log('❌ Test execution failed');
  }

  // Step 4: Build receipt
  const receipt: Receipt = {
    taskHash: `${taskId}-${issueNumber}`,
    commitHash: commitHash,
    testReportHash: testOutput,
    artifactURI: artifactURI,
    agentId: agentId,
    timestamp: Date.now()
  };

  const receiptHash = hashReceipt(receipt);
  
  // Step 5: Write receipt to file
  const out = { receipt, receiptHash, testOutput, patchOutput };
  writeFileSync(`${repoPath}/.axiomforge-receipt.json`, JSON.stringify(out, null, 2));
  
  console.log(`📜 Receipt minted: ${receiptHash}`);
  
  return out;
}

export async function createPR(params: {
  owner: string;
  repo: string;
  title: string;
  body: string;
  head: string;
  base: string;
  githubToken: string;
}): Promise<number> {
  const octokit = new Octokit({ auth: params.githubToken });
  
  const pr = await octokit.pulls.create({
    owner: params.owner,
    repo: params.repo,
    title: params.title,
    body: params.body,
    head: params.head,
    base: params.base,
  });
  
  console.log(`🔗 PR created: #${pr.data.number} - ${pr.data.html_url}`);
  return pr.data.number;
}
