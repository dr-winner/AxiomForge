// Contract utilities for AxiomForge Identity (ERC-8004)
// Connects to the deployed contract on Base Sepolia

export const CONTRACT_ABI = [
  "event IdentityRegistered(address indexed agent, string metadataURI)",
  "event ReceiptSubmitted(address indexed agent, bytes32 indexed receiptHash, string artifactURI)",
  "function metadataURIs(address) external view returns (string memory)",
  "function receiptOwner(bytes32) external view returns (address)",
  "function registerIdentity(string calldata metadataURI) external",
  "function submitReceipt(bytes32 receiptHash, string calldata artifactURI) external",
  "function verifyReceipt(bytes32 receiptHash, address agent) external view returns (bool)",
];

export interface ReceiptData {
  artifactUri: string;
  creator: string;
  timestamp: bigint;
  exists: boolean;
}

// Deployed contract address on Base Sepolia
export const CONTRACT_ADDRESS = '0x6eeA600d2AbC11D3fF82a6732b1042Eec52A111d';

// Base Sepolia chain ID
export const CHAIN_ID = 84532;

// Helper to format receipt hash
export function formatReceiptHash(hash: string): string {
  return hash.startsWith('0x') ? hash : `0x${hash}`;
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
