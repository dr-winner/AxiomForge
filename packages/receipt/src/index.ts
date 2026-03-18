import { z } from 'zod';
import { keccak256, toUtf8Bytes, solidityPackedKeccak256, Wallet, recoverAddress } from 'ethers';

/**
 * ERC-8004 Compliant Receipt Schema
 * 
 * ERC-8004 defines "Soulbound Tokens" for identity/attestations.
 * This receipt schema captures proof-of-execution with:
 * - taskHash: Unique identifier for the task executed
 * - commitHash: Git commit hash of the fix
 * - testReportHash: Hash of test results
 * - artifactURI: IPFS/Arweave URI for artifacts
 * - agentId: Agent identity (ERC-8004 compliant)
 * - timestamp: Unix timestamp
 * - chainId: Chain where receipt was minted
 * - signature: Agent's cryptographic signature
 */
export const ReceiptSchema = z.object({
  taskHash: z.string().describe('Keccak256 hash of task specification'),
  commitHash: z.string().describe('Git commit SHA of the executed fix'),
  testReportHash: z.string().describe('Hash of test execution results'),
  artifactURI: z.string().describe('IPFS/Arweave URI for artifacts'),
  agentId: z.string().describe('Agent identity identifier (ERC-8004)'),
  timestamp: z.number().describe('Unix timestamp of execution'),
  chainId: z.number().default(84532).describe('Chain ID (Base Sepolia default)'),
  signature: z.string().optional().describe('Agent cryptographic signature')
});

export type Receipt = z.infer<typeof ReceiptSchema>;

/**
 * ERC-8004 Identity Metadata Schema
 */
export const IdentitySchema = z.object({
  agentId: z.string(),
  name: z.string(),
  description: z.string(),
  capabilities: z.array(z.string()),
  version: z.string(),
  createdAt: z.number()
});

export type Identity = z.infer<typeof IdentitySchema>;

/**
 * Compute deterministic receipt hash (ERC-8004 compliant)
 * Uses Solidity-style packed hashing for on-chain verification
 */
export function hashReceipt(receipt: Receipt): string {
  return solidityPackedKeccak256(
    ['bytes32', 'bytes32', 'bytes32', 'string', 'string', 'uint64', 'uint256'],
    [
      receipt.taskHash,
      receipt.commitHash,
      receipt.testReportHash,
      receipt.artifactURI,
      receipt.agentId,
      receipt.timestamp,
      receipt.chainId
    ]
  );
}

/**
 * Verify receipt integrity - checks hash matches and schema valid
 */
export function verifyReceipt(receipt: Receipt, expectedHash: string): boolean {
  // Validate schema
  const parseResult = ReceiptSchema.safeParse(receipt);
  if (!parseResult.success) {
    console.error('Receipt schema validation failed:', parseResult.error);
    return false;
  }
  
  // Compute hash and compare
  const computedHash = hashReceipt(receipt);
  return computedHash.toLowerCase() === expectedHash.toLowerCase();
}

/**
 * Build task hash from issue/commit data
 */
export function buildTaskHash(owner: string, repo: string, issueNumber: number, commitSha: string): string {
  const payload = `${owner}/${repo}#${issueNumber}@${commitSha}`;
  return keccak256(toUtf8Bytes(payload));
}

/**
 * Build test report hash from test output
 */
export function buildTestReportHash(testOutput: string): string {
  return keccak256(toUtf8Bytes(testOutput));
}

/**
 * Sign receipt with agent private key (for off-chain verification)
 */
export async function signReceipt(receipt: Receipt, privateKey: string): Promise<string> {
  const wallet = new Wallet(privateKey);
  const hash = hashReceipt(receipt);
  const signature = await wallet.signMessage(hash);
  return signature;
}

/**
 * Recover signer from receipt signature
 */
export function recoverSigner(receipt: Receipt, signature: string): string {
  const hash = hashReceipt(receipt);
  const recovered = recoverAddress(hash, signature);
  return recovered;
}
