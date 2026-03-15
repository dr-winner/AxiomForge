'use client';

import { useState } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: darkMode ? '#0a0a0a' : '#f8f9fa',
      color: darkMode ? '#fff' : '#333',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Header */}
      <header style={{
        background: darkMode ? '#1a1a1a' : '#fff',
        borderBottom: '1px solid ' + (darkMode ? '#333' : '#e0e0e0'),
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Link href="/" style={{
            textDecoration: 'none',
            color: darkMode ? '#fff' : '#333',
            fontSize: 24,
            fontWeight: 700,
          }}>
            ⚡ AxiomForge
          </Link>

          <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Link href="/" style={{
              textDecoration: 'none',
              color: darkMode ? '#aaa' : '#666',
              fontSize: 14,
            }}>Dashboard</Link>
            <Link href="/runs" style={{
              textDecoration: 'none',
              color: darkMode ? '#aaa' : '#666',
              fontSize: 14,
            }}>Runs</Link>
            <Link href="/receipts" style={{
              textDecoration: 'none',
              color: darkMode ? '#aaa' : '#666',
              fontSize: 14,
            }}>Receipts</Link>
            <Link href="/analytics" style={{
              textDecoration: 'none',
              color: darkMode ? '#aaa' : '#666',
              fontSize: 14,
            }}>Analytics</Link>
            <Link href="/settings" style={{
              textDecoration: 'none',
              color: darkMode ? '#aaa' : '#666',
              fontSize: 14,
            }}>Settings</Link>

            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                padding: '8px 12px',
                background: darkMode ? '#333' : '#f0f0f0',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 14,
                color: darkMode ? '#fff' : '#333',
              }}
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: 32,
      }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid ' + (darkMode ? '#333' : '#e0e0e0'),
        padding: '24px',
        textAlign: 'center',
        fontSize: 12,
        color: darkMode ? '#666' : '#999',
        marginTop: 48,
      }}>
        <p style={{ margin: '0 0 8px' }}>
          PL_Genesis Hackathon • ERC‑8004 Receipt Registry • Base Sepolia
        </p>
        <p style={{ margin: 0 }}>
          <a href="https://github.com/dr-winner/AxiomForge" style={{ color: '#0066ff' }}>GitHub</a>
          {' • '}
          <a href="https://sepolia.basescan.org" style={{ color: '#0066ff' }}>Base Sepolia Explorer</a>
          {' • '}
          <a href="https://docs.openclaw.ai" style={{ color: '#0066ff' }}>Docs</a>
        </p>
      </footer>
    </div>
  );
}
