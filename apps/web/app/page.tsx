'use client';

import { useState, useEffect } from 'react';

// Placeholder data - will be replaced with on-chain data once contract is deployed
const MOCK_RUNS = [
  {
    id: 'run_001',
    issue: 'Fix auth redirect bug',
    status: 'completed',
    receiptHash: '0x7a8f9c2d1e4b5a6c3d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c',
    timestamp: '2026-03-14T18:30:00Z',
  },
  {
    id: 'run_002',
    issue: 'Add rate limiting to API',
    status: 'verified',
    receiptHash: '0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c',
    timestamp: '2026-03-14T20:15:00Z',
  },
];

export default function Page() {
  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const [runs, setRuns] = useState(MOCK_RUNS);

  useEffect(() => {
    // TODO: Fetch contract address from env or API
    // Once deployed, this will read from the blockchain
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
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>🚀 Agent Runs</h2>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead style={{ background: '#f5f5f5' }}>
              <tr>
                <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Run ID</th>
                <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Issue</th>
                <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Status</th>
                <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {runs.map((run, idx) => (
                <tr key={run.id} style={{ background: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ padding: 12, borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>{run.id}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #e0e0e0' }}>{run.issue}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #e0e0e0' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: 4,
                      fontSize: 12,
                      background: run.status === 'verified' ? '#d4edda' : run.status === 'completed' ? '#fff3cd' : '#e2e3e5',
                      color: run.status === 'verified' ? '#155724' : run.status === 'completed' ? '#856404' : '#383d41',
                    }}>
                      {run.status}
                    </span>
                  </td>
                  <td style={{ padding: 12, borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace', fontSize: 12 }}>
                    {run.receiptHash.slice(0, 16)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>📜 Receipt Registry</h2>
        <div style={{ background: '#f8f9fa', padding: 16, borderRadius: 8, border: '1px solid #e0e0e0' }}>
          <p style={{ margin: '0 0 12px', color: '#666' }}>
            On-chain receipts will appear here once the contract is deployed to Base Sepolia.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              style={{
                padding: '10px 20px',
                background: '#0066ff',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 14,
              }}
              onClick={() => alert('Demo: This would trigger a new agent run → GitHub issue → patch → test → receipt mint')}
            >
              🧪 Run Demo Task
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
                navigator.clipboard.writeText(contractAddress || 'pending deployment');
                alert('Contract address copied!');
              }}
            >
              📋 Copy Contract Address
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
