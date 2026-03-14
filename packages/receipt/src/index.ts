import { z } from 'zod';
import { keccak256, toUtf8Bytes } from 'ethers';

export const ReceiptSchema = z.object({
  taskHash: z.string(),
  commitHash: z.string(),
  testReportHash: z.string(),
  artifactURI: z.string(),
  agentId: z.string(),
  timestamp: z.number()
});

export type Receipt = z.infer<typeof ReceiptSchema>;

export function hashReceipt(receipt: Receipt): string {
  const payload = JSON.stringify(receipt);
  return keccak256(toUtf8Bytes(payload));
}
