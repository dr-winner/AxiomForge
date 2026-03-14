import { hashReceipt, Receipt } from '@axiomforge/receipt';
import { writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

export async function executeTask(params: {
  taskId: string;
  commitHash: string;
  artifactURI: string;
  agentId: string;
  repoPath: string;
}) {
  // Placeholder test execution (replace with actual test runner)
  let testReport = 'tests:skipped';
  try {
    execSync('npm test', { cwd: params.repoPath, stdio: 'ignore' });
    testReport = 'tests:passed';
  } catch {
    testReport = 'tests:failed';
  }

  const receipt: Receipt = {
    taskHash: params.taskId,
    commitHash: params.commitHash,
    testReportHash: testReport,
    artifactURI: params.artifactURI,
    agentId: params.agentId,
    timestamp: Date.now()
  };

  const receiptHash = hashReceipt(receipt);
  const out = { receipt, receiptHash };

  writeFileSync(`${params.repoPath}/.axiomforge-receipt.json`, JSON.stringify(out, null, 2));

  return out;
}
