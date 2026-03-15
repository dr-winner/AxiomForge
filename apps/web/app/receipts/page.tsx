'use client';

import { useState } from 'react';
import ReceiptCard from '../components/ReceiptCard';

const MOCK_RECEIPTS = [
  {
    runId: 'run_001',
    issue: 'Fix auth redirect bug in OAuth flow',
    receiptHash: '0x7a8f9c2d1e4b5a6c3d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c',
    artifactUri: 'ipfs://QmX7Kd9Zq3N8pR2vL5wY6tB4mC1jH9fE8aS3dG7kP0uI2',
    timestamp: '2026-03-14T18:30:00Z',
    status: 'completed' as const,
  },
  {
    runId: 'run_002',
    issue: 'Add rate limiting to REST API endpoints',
    receiptHash: '0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c',
    artifactUri: 'ipfs://QmY8Le0Ar4O9qS3wM6xZ7uC5nD2kI0gF9bT4eH8lQ1vJ3',
    timestamp: '2026-03-14T20:15:00Z',
    status: 'verified' as const,
  },
  {
    runId: 'run_003',
    issue: 'Optimize database queries for user dashboard',
    receiptHash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
    artifactUri: 'ipfs://QmZ9Mf1Bs5P0rT4xN7yA8vD6oE3lJ1hG0cU5fI9mR2wK4',
    timestamp: '2026-03-15T09:45:00Z',
    status: 'pending' as const,
  },
];

export default function ReceiptsPage() {
  const [search, setSearch] = useState('');
  const [verifyHash, setVerifyHash] = useState('');

  const filteredReceipts = MOCK_RECEIPTS.filter(r =>
    r.issue.toLowerCase().includes(search.toLowerCase()) ||
    r.receiptHash.toLowerCase().includes(search.toLowerCase())
  );

  const handleVerify = () => {
    if (verifyHash) {
      alert(`Verification: ${verifyHash.startsWith('0x') ? 'Valid hash format ✅' : 'Invalid format ❌'}`);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>📜 Receipt Explorer</h1>

      {/* Verify Tool */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 12,
        padding: 24,
        marginBottom: 32,
        color: '#fff',
      }}>
        <h2 style={{ margin: '0 0 12px', fontSize: 20 }}>🔍 Verify Receipt</h2>
        <p style={{ margin: '0 0 16px', opacity: 0.9 }}>
          Enter a receipt hash to verify its on-chain existence
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="0x..."
            value={verifyHash}
            onChange={(e) => setVerifyHash(e.target.value)}
            style={{
              flex: 1,
              minWidth: 300,
              padding: '10px 14px',
              border: 'none',
              borderRadius: 6,
              fontSize: 14,
              fontFamily: 'monospace',
            }}
          />
          <button
            onClick={handleVerify}
            style={{
              padding: '10px 20px',
              background: '#fff',
              color: '#667eea',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Verify
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Search receipts by issue or hash..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #ddd',
            borderRadius: 8,
            fontSize: 14,
          }}
        />
      </div>

      {/* Receipts List */}
      <div>
        {filteredReceipts.length > 0 ? (
          filteredReceipts.map((receipt) => (
            <ReceiptCard key={receipt.runId} {...receipt} />
          ))
        ) : (
          <div style={{
            background: '#f8f9fa',
            padding: 32,
            borderRadius: 8,
            textAlign: 'center',
            color: '#666',
          }}>
            No receipts found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
