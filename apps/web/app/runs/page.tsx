'use client';

import { useState } from 'react';
import Link from 'next/link';

const MOCK_RUNS = [
  { id: 'run_001', issue: 'Fix auth redirect bug', status: 'completed', duration: '2.3s', timestamp: '2026-03-14T18:30:00Z' },
  { id: 'run_002', issue: 'Add rate limiting to API', status: 'verified', duration: '3.1s', timestamp: '2026-03-14T20:15:00Z' },
  { id: 'run_003', issue: 'Optimize DB queries', status: 'pending', duration: '1.8s', timestamp: '2026-03-15T09:45:00Z' },
  { id: 'run_004', issue: 'Update TypeScript deps', status: 'completed', duration: '2.7s', timestamp: '2026-03-15T10:20:00Z' },
  { id: 'run_005', issue: 'Refactor auth module', status: 'verified', duration: '4.2s', timestamp: '2026-03-15T11:00:00Z' },
];

export default function RunsPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredRuns = MOCK_RUNS.filter(run => {
    const matchesFilter = filter === 'all' || run.status === filter;
    const matchesSearch = run.issue.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusColors = {
    pending: { bg: '#e2e3e5', text: '#383d41' },
    completed: { bg: '#fff3cd', text: '#856404' },
    verified: { bg: '#d4edda', text: '#155724' },
  };

  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>🚀 Agent Runs</h1>

      {/* Filters */}
      <div style={{
        display: 'flex',
        gap: 12,
        marginBottom: 24,
        flexWrap: 'wrap',
      }}>
        <input
          type="text"
          placeholder="Search runs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: 200,
            padding: '10px 14px',
            border: '1px solid #ddd',
            borderRadius: 6,
            fontSize: 14,
          }}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: '10px 14px',
            border: '1px solid #ddd',
            borderRadius: 6,
            fontSize: 14,
            background: '#fff',
          }}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="verified">Verified</option>
        </select>
      </div>

      {/* Table */}
      <div style={{
        border: '1px solid #e0e0e0',
        borderRadius: 8,
        overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead style={{ background: '#f5f5f5' }}>
            <tr>
              <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Run ID</th>
              <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Issue</th>
              <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Status</th>
              <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Duration</th>
              <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Timestamp</th>
              <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRuns.map((run, idx) => (
              <tr key={run.id} style={{ background: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: 12, borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>{run.id}</td>
                <td style={{ padding: 12, borderBottom: '1px solid #e0e0e0' }}>{run.issue}</td>
                <td style={{ padding: 12, borderBottom: '1px solid #e0e0e0' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: 4,
                    fontSize: 12,
                    background: statusColors[run.status as keyof typeof statusColors].bg,
                    color: statusColors[run.status as keyof typeof statusColors].text,
                  }}>
                    {run.status}
                  </span>
                </td>
                <td style={{ padding: 12, borderBottom: '1px solid #e0e0e0' }}>{run.duration}</td>
                <td style={{ padding: 12, borderBottom: '1px solid #e0e0e0', fontSize: 13, color: '#666' }}>
                  {new Date(run.timestamp).toLocaleString()}
                </td>
                <td style={{ padding: 12, borderBottom: '1px solid #e0e0e0' }}>
                  <Link
                    href="/receipts"
                    style={{
                      padding: '4px 8px',
                      background: '#f0f4ff',
                      color: '#0066ff',
                      border: 'none',
                      borderRadius: 4,
                      textDecoration: 'none',
                      fontSize: 12,
                      marginRight: 4,
                    }}
                  >
                    View
                  </Link>
                  <button
                    style={{
                      padding: '4px 8px',
                      background: '#f5f5f5',
                      color: '#333',
                      border: '1px solid #ddd',
                      borderRadius: 4,
                      cursor: 'pointer',
                      fontSize: 12,
                    }}
                    onClick={() => alert('Export: ' + run.id)}
                  >
                    Export
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        fontSize: 13,
        color: '#666',
      }}>
        <span>Showing {filteredRuns.length} of {MOCK_RUNS.length} runs</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button disabled style={{ padding: '6px 12px', border: '1px solid #ddd', borderRadius: 4, background: '#f5f5f5', cursor: 'not-allowed' }}>← Previous</button>
          <button disabled style={{ padding: '6px 12px', border: '1px solid #ddd', borderRadius: 4, background: '#f5f5f5', cursor: 'not-allowed' }}>Next →</button>
        </div>
      </div>
    </div>
  );
}
