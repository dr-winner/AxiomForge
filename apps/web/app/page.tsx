'use client';

import { useState, useEffect } from 'react';
import ReceiptCard from './components/ReceiptCard';
import { CONTRACT_ADDRESS, getExplorerTxUrl } from './lib/contract';

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

export default function DashboardPage() {
  const [contractAddress, setContractAddress] = useState<string>(CONTRACT_ADDRESS);
  const [receipts, setReceipts] = useState(MOCK_RECEIPTS);
  const [isRunningDemo, setIsRunningDemo] = useState(false);
  const [stats, setStats] = useState({ total: 3, completed: 2, verified: 1, pending: 1 });

  useEffect(() => {
    const stored = localStorage.getItem('axiomforge_contract');
    if (stored) setContractAddress(stored);
  }, []);

  const handleRunDemo = async () => {
    setIsRunningDemo(true);
    await new Promise(r => setTimeout(r, 2000));
    const newReceipt = {
      runId: `run_${String(receipts.length + 1).padStart(3, '0')}`,
      issue: 'Demo: Auto-generated task #' + (receipts.length + 1),
      receiptHash: `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      artifactUri: 'ipfs://QmDemo' + Math.random().toString(36).slice(2, 10),
      timestamp: new Date().toISOString(),
      status: 'completed' as const,
    };
    setReceipts(prev => [newReceipt, ...prev]);
    setStats(prev => ({ ...prev, total: prev.total + 1, completed: prev.completed + 1 }));
    setIsRunningDemo(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 12,
        padding: 32,
        marginBottom: 32,
        color: '#fff',
      }}>
        <h1 style={{ margin: '0 0 8px', fontSize: 32, fontWeight: 700 }}>
          Genesis Agent Network
        </h1>
        <p style={{ margin: '0 0 16px', fontSize: 16, opacity: 0.9 }}>
          Proof‑of‑Execution — Automated code generation, testing, and on-chain verification
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <span style={{
            padding: '6px 12px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 6,
            fontSize: 13,
          }}>
            📊 {stats.total} Total Runs
          </span>
          <span style={{
            padding: '6px 12px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 6,
            fontSize: 13,
          }}>
            ✅ {stats.completed} Completed
          </span>
          <span style={{
            padding: '6px 12px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 6,
            fontSize: 13,
          }}>
            🔒 {stats.verified} Verified
          </span>
          <span style={{
            padding: '6px 12px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 6,
            fontSize: 13,
          }}>
            ⏳ {stats.pending} Pending
          </span>
        </div>
      </section>

      {/* Quick Actions */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
        marginBottom: 32,
      }}>
        <div style={{
          background: '#f0f4ff',
          padding: 20,
          borderRadius: 8,
          border: '1px solid #d0d7ff',
        }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 16 }}>🧪 Run Demo</h3>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: '#666' }}>
            Trigger an end-to-end agent execution
          </p>
          <button
            onClick={handleRunDemo}
            disabled={isRunningDemo}
            style={{
              width: '100%',
              padding: '10px 16px',
              background: isRunningDemo ? '#ccc' : '#0066ff',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: isRunningDemo ? 'not-allowed' : 'pointer',
              fontSize: 14,
              opacity: isRunningDemo ? 0.6 : 1,
            }}
          >
            {isRunningDemo ? '⏳ Running...' : '▶️ Start Run'}
          </button>
        </div>

        <div style={{
          background: '#fff',
          padding: 20,
          borderRadius: 8,
          border: '1px solid #e0e0e0',
        }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 16 }}>📋 Contract</h3>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: '#666' }}>
            {contractAddress !== '0x0000000000000000000000000000000000000000' ? 'Deployed' : 'Pending'}
          </p>
          <button
            onClick={() => {
              if (contractAddress !== '0x0000000000000000000000000000000000000000') {
                navigator.clipboard.writeText(contractAddress);
                alert('Copied!');
              }
            }}
            style={{
              width: '100%',
              padding: '10px 16px',
              background: '#f5f5f5',
              color: '#333',
              border: '1px solid #ddd',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            📋 {contractAddress !== '0x0000000000000000000000000000000000000000' ? 'Copy Address' : 'Not Deployed'}
          </button>
        </div>

        <div style={{
          background: '#fff',
          padding: 20,
          borderRadius: 8,
          border: '1px solid #e0e0e0',
        }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 16 }}>🔍 Explorer</h3>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: '#666' }}>
            View on Base Sepolia
          </p>
          <a
            href="https://sepolia.basescan.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              padding: '10px 16px',
              background: '#f5f5f5',
              color: '#333',
              border: '1px solid #ddd',
              borderRadius: 6,
              textDecoration: 'none',
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            🔗 Open Explorer
          </a>
        </div>
      </section>

      {/* Recent Receipts */}
      <section>
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>📜 Recent Receipts</h2>
        {receipts.length > 0 ? (
          receipts.map((receipt) => (
            <ReceiptCard key={receipt.runId} {...receipt} />
          ))
        ) : (
          <div style={{
            background: '#f8f9fa',
            padding: 24,
            borderRadius: 8,
            textAlign: 'center',
            color: '#666',
          }}>
            No receipts yet. Run a demo task to mint your first receipt!
          </div>
        )}
      </section>
    </div>
  );
}
