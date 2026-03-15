'use client';

import { useState, useEffect } from 'react';
import ReceiptCard from './components/ReceiptCard';
import { CONTRACT_ADDRESS, getExplorerTxUrl } from './lib/contract';

// Placeholder data - will be replaced with on-chain data once contract is deployed
const MOCK_RECEIPTS = [
  {
    runId: 'run_001',
    issue: 'Fix auth redirect bug',
    receiptHash: '0x7a8f9c2d1e4b5a6c3d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c',
    artifactUri: 'ipfs://QmX7Kd9Zq3N8pR2vL5wY6tB4mC1jH9fE8aS3dG7kP0uI2',
    timestamp: '2026-03-14T18:30:00Z',
    status: 'completed' as const,
  },
  {
    runId: 'run_002',
    issue: 'Add rate limiting to API',
    receiptHash: '0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c',
    artifactUri: 'ipfs://QmY8Le0Ar4O9qS3wM6xZ7uC5nD2kI0gF9bT4eH8lQ1vJ3',
    timestamp: '2026-03-14T20:15:00Z',
    status: 'verified' as const,
  },
];

export default function Page() {
  const [contractAddress, setContractAddress] = useState<string>(CONTRACT_ADDRESS);
  const [receipts, setReceipts] = useState(MOCK_RECEIPTS);
  const [isRunningDemo, setIsRunningDemo] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('axiomforge_contract');
    if (stored) setContractAddress(stored);
  }, []);

  return (
    <main style={{ fontFamily: 'system-ui', padding: 24, maxWidth: 960, margin: '0 auto' }}>
      <header style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: 16, marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>⚡ AxiomForge</h1>
        <p style={{ margin: '8px 0 0', color: '#666' }}>Genesis Agent Network — Proof‑of‑Execution</p>
        {contractAddress && (
          <p style={{ margin: '8px 0 0', fontSize: 12, color: '#888' }}>
            Contract: <code>{contractAddress.slice(0, 10)}...{contractAddress.slice(-8)}</code>
          </p>
        )}
      </header>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>📜 Receipt Registry</h2>
        {receipts.length > 0 ? (
          receipts.map((receipt) => (
            <ReceiptCard key={receipt.runId} {...receipt} />
          ))
        ) : (
          <div style={{ background: '#f8f9fa', padding: 16, borderRadius: 8, border: '1px solid #e0e0e0' }}>
            <p style={{ margin: 0, color: '#666' }}>No receipts yet. Run a demo task to mint your first receipt!</p>
          </div>
        )}
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>🧪 Demo Control</h2>
        <div style={{ background: '#f0f4ff', padding: 16, borderRadius: 8, border: '1px solid #d0d7ff' }}>
          <p style={{ margin: '0 0 12px', color: '#0066ff' }}>
            Trigger an end-to-end agent run: GitHub issue → code patch → tests → receipt mint
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              style={{
                padding: '10px 20px',
                background: isRunningDemo ? '#ccc' : '#0066ff',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: isRunningDemo ? 'not-allowed' : 'pointer',
                fontSize: 14,
                opacity: isRunningDemo ? 0.6 : 1,
              }}
              disabled={isRunningDemo}
              onClick={async () => {
                setIsRunningDemo(true);
                // Simulated demo run - will connect to agent backend later
                await new Promise(r => setTimeout(r, 2000));
                const newReceipt = {
                  runId: `run_${String(receipts.length + 1).padStart(3, '0')}`,
                  issue: 'Demo: Auto-generated task',
                  receiptHash: `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
                  artifactUri: 'ipfs://QmDemo' + Math.random().toString(36).slice(2, 10),
                  timestamp: new Date().toISOString(),
                  status: 'completed' as const,
                };
                setReceipts(prev => [newReceipt, ...prev]);
                setIsRunningDemo(false);
                alert('Demo run complete! Receipt minted (simulated).');
              }}
            >
              {isRunningDemo ? '⏳ Running...' : '▶️ Run Demo Task'}
            </button>
            <button
              style={{
                padding: '10px 20px',
                background: '#fff',
                color: '#0066ff',
                border: '1px solid #0066ff',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 14,
              }}
              onClick={() => {
                if (contractAddress && contractAddress !== '0x0000000000000000000000000000000000000000') {
                  navigator.clipboard.writeText(contractAddress);
                  alert('Contract address copied!');
                } else {
                  alert('Contract not deployed yet. Waiting for deployment...');
                }
              }}
            >
              📋 {contractAddress && contractAddress !== '0x0000000000000000000000000000000000000000' ? 'Copy Contract Address' : 'Pending Deployment'}
            </button>
            <button
              style={{
                padding: '10px 20px',
                background: '#fff',
                color: '#333',
                border: '1px solid #ddd',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 14,
              }}
              onClick={() => window.open(getExplorerTxUrl('latest'), '_blank')}
            >
              🔍 Base Sepolia Explorer
            </button>
          </div>
        </div>
      </section>

      <footer style={{ marginTop: 48, paddingTop: 16, borderTop: '1px solid #e0e0e0', fontSize: 12, color: '#888' }}>
        <p style={{ margin: 0 }}>
          PL_Genesis Hackathon • ERC‑8004 Receipt Registry • Base Sepolia
        </p>
        <p style={{ margin: '8px 0 0' }}>
          <a href="https://github.com/dr-winner/AxiomForge" style={{ color: '#0066ff' }}>GitHub</a>
          {' • '}
          <a href="https://sepolia.basescan.org" style={{ color: '#0066ff' }}>Base Sepolia Explorer</a>
        </p>
      </footer>
    </main>
  );
}
