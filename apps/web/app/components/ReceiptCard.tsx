interface ReceiptCardProps {
  runId: string;
  issue: string;
  receiptHash: string;
  artifactUri: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'verified';
}

export default function ReceiptCard({ runId, issue, receiptHash, artifactUri, timestamp, status }: ReceiptCardProps) {
  const statusColors = {
    pending: { bg: '#e2e3e5', text: '#383d41' },
    completed: { bg: '#fff3cd', text: '#856404' },
    verified: { bg: '#d4edda', text: '#155724' },
  };

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      background: '#fff',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontFamily: 'monospace', fontSize: 14, color: '#666' }}>{runId}</span>
        <span style={{
          padding: '4px 8px',
          borderRadius: 4,
          fontSize: 12,
          background: statusColors[status].bg,
          color: statusColors[status].text,
        }}>
          {status}
        </span>
      </div>

      <h3 style={{ margin: '0 0 12px', fontSize: 16 }}>{issue}</h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px', fontSize: 13 }}>
        <span style={{ color: '#888' }}>Receipt Hash:</span>
        <span style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{receiptHash}</span>

        <span style={{ color: '#888' }}>Artifact URI:</span>
        <a href={artifactUri} style={{ fontFamily: 'monospace', color: '#0066ff' }}>{artifactUri}</a>

        <span style={{ color: '#888' }}>Timestamp:</span>
        <span>{new Date(timestamp).toLocaleString()}</span>
      </div>

      <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #e0e0e0', display: 'flex', gap: 8 }}>
        <button
          style={{
            padding: '6px 12px',
            background: '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 12,
          }}
          onClick={() => navigator.clipboard.writeText(receiptHash)}
        >
          📋 Copy Hash
        </button>
        <button
          style={{
            padding: '6px 12px',
            background: '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 12,
          }}
          onClick={() => window.open(`https://sepolia.basescan.org/tx/${receiptHash}`, '_blank')}
        >
          🔍 View on Explorer
        </button>
      </div>
    </div>
  );
}
