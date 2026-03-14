import { z } from 'zod';

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
  // placeholder hash (replace with keccak256)
  return JSON.stringify(receipt);
}
