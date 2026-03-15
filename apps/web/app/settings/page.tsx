'use client';

import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [contractAddress, setContractAddress] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [rpcUrl, setRpcUrl] = useState('https://sepolia.base.org');
  const [autoMint, setAutoMint] = useState(true);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('axiomforge_contract');
    if (stored) setContractAddress(stored);
  }, []);

  const handleSave = () => {
    localStorage.setItem('axiomforge_contract', contractAddress);
    localStorage.setItem('axiomforge_github_token', githubToken);
    localStorage.setItem('axiomforge_rpc_url', rpcUrl);
    localStorage.setItem('axiomforge_auto_mint', String(autoMint));
    localStorage.setItem('axiomforge_notifications', String(notifications));
    alert('Settings saved! ✅');
  };

  const handleReset = () => {
    if (confirm('Reset all settings to defaults?')) {
      setContractAddress('');
      setGithubToken('');
      setRpcUrl('https://sepolia.base.org');
      setAutoMint(true);
      setNotifications(true);
      localStorage.clear();
      alert('Settings reset to defaults.');
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>⚙️ Settings</h1>

      {/* Contract Settings */}
      <div style={{
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: 12,
        padding: 24,
        marginBottom: 24,
      }}>
        <h2 style={{ margin: '0 0 16px', fontSize: 18 }}>📜 Contract Configuration</h2>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
            Contract Address
          </label>
          <input
            type="text"
            placeholder="0x..."
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '1px solid #ddd',
              borderRadius: 6,
              fontSize: 14,
              fontFamily: 'monospace',
            }}
          />
          <p style={{ margin: '8px 0 0', fontSize: 12, color: '#666' }}>
            Deployed ERC-8004 receipt registry address on Base Sepolia
          </p>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
            RPC URL
          </label>
          <input
            type="text"
            value={rpcUrl}
            onChange={(e) => setRpcUrl(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '1px solid #ddd',
              borderRadius: 6,
              fontSize: 14,
              fontFamily: 'monospace',
            }}
          />
        </div>
      </div>

      {/* API Keys */}
      <div style={{
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: 12,
        padding: 24,
        marginBottom: 24,
      }}>
        <h2 style={{ margin: '0 0 16px', fontSize: 18 }}>🔑 API Keys</h2>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
            GitHub Token
          </label>
          <input
            type="password"
            placeholder="ghp_..."
            value={githubToken}
            onChange={(e) => setGithubToken(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '1px solid #ddd',
              borderRadius: 6,
              fontSize: 14,
              fontFamily: 'monospace',
            }}
          />
          <p style={{ margin: '8px 0 0', fontSize: 12, color: '#666' }}>
            Personal access token for GitHub API integration
          </p>
        </div>
      </div>

      {/* Preferences */}
      <div style={{
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: 12,
        padding: 24,
        marginBottom: 24,
      }}>
        <h2 style={{ margin: '0 0 16px', fontSize: 18 }}>🎛️ Preferences</h2>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={autoMint}
              onChange={(e) => setAutoMint(e.target.checked)}
              style={{ width: 18, height: 18 }}
            />
            <span style={{ fontSize: 14 }}>Auto-mint receipts on test pass</span>
          </label>
          <p style={{ margin: '8px 0 0', fontSize: 12, color: '#666', marginLeft: 30 }}>
            Automatically mint receipts when tests complete successfully
          </p>
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              style={{ width: 18, height: 18 }}
            />
            <span style={{ fontSize: 14 }}>Enable notifications</span>
          </label>
          <p style={{ margin: '8px 0 0', fontSize: 12, color: '#666', marginLeft: 30 }}>
            Get notified when runs complete or receipts are minted
          </p>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={handleSave}
          style={{
            padding: '12px 24px',
            background: '#0066ff',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          💾 Save Changes
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '12px 24px',
            background: '#f5f5f5',
            color: '#333',
            border: '1px solid #ddd',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          🔄 Reset Defaults
        </button>
      </div>
    </div>
  );
}
