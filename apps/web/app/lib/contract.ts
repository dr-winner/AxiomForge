// Contract utilities for AxiomForge Identity (ERC-8004)
// Once deployed, these will connect to the live contract on Base Sepolia

export const CONTRACT_ABI = [
  "event ReceiptMinted(bytes32 indexed receiptHash, string artifactUri, address indexed creator, uint256 timestamp)",
  "function mintReceipt(bytes32 receiptHash, string memory artifactUri) external",
  "function getReceipt(bytes32 receiptHash) external view returns (string memory artifactUri, address creator, uint256 timestamp, bool exists)",
  "function receiptExists(bytes32 receiptHash) external view returns (bool)",
  "function getAllReceipts() external view returns (bytes32[] memory)",
];

export interface ReceiptData {
  artifactUri: string;
  creator: string;
  timestamp: bigint;
  exists: boolean;
}

// Placeholder contract address - update after deployment
export const CONTRACT_ADDRESS = '0x6eeA600d2AbC11D3fF82a6732b1042Eec52A111d';

// Base Sepolia chain ID
export const CHAIN_ID = 84532;

// Helper to format receipt hash
export function formatReceiptHash(hash: string): string {
  return hash.startsWith('0x') ? hash : `0x${hash}`;
}

// Helper to compute keccak256 hash (matching Solidity)
export function computeReceiptHash(runId: string, artifactUri: string): string {
  // This is a simplified version - in production, use ethers.utils.keccak256
  const combined = `${runId}:${artifactUri}`;
  return `0x${combined.split('').reduce((acc, char) => acc + char.charCodeAt(0).toString(16).padStart(2, '0'), '')}`;
}

// Check if we're on Base Sepolia
export function isBaseSepolia(chainId: number): boolean {
  return chainId === CHAIN_ID;
}

// Build explorer URL for a transaction
export function getExplorerTxUrl(txHash: string): string {
  return `https://sepolia.basescan.org/tx/${txHash}`;
}

// Build explorer URL for an address
export function getExplorerAddressUrl(address: string): string {
  return `https://sepolia.basescan.org/address/${address}`;
}
