'use client';

export default function AnalyticsPage() {
  const stats = {
    totalRuns: 15,
    successRate: 93.3,
    avgDuration: '2.8s',
    totalReceipts: 14,
  };

  const runsByDay = [
    { day: 'Mon', runs: 2 },
    { day: 'Tue', runs: 3 },
    { day: 'Wed', runs: 5 },
    { day: 'Thu', runs: 3 },
    { day: 'Fri', runs: 2 },
    { day: 'Sat', runs: 0 },
    { day: 'Sun', runs: 0 },
  ];

  const maxRuns = Math.max(...runsByDay.map(d => d.runs));

  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>📊 Analytics</h1>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
        marginBottom: 32,
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: 24,
          borderRadius: 12,
          color: '#fff',
        }}>
          <p style={{ margin: '0 0 8px', fontSize: 13, opacity: 0.9 }}>Total Runs</p>
          <p style={{ margin: 0, fontSize: 36, fontWeight: 700 }}>{stats.totalRuns}</p>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          padding: 24,
          borderRadius: 12,
          color: '#fff',
        }}>
          <p style={{ margin: '0 0 8px', fontSize: 13, opacity: 0.9 }}>Success Rate</p>
          <p style={{ margin: 0, fontSize: 36, fontWeight: 700 }}>{stats.successRate}%</p>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          padding: 24,
          borderRadius: 12,
          color: '#fff',
        }}>
          <p style={{ margin: '0 0 8px', fontSize: 13, opacity: 0.9 }}>Avg Duration</p>
          <p style={{ margin: 0, fontSize: 36, fontWeight: 700 }}>{stats.avgDuration}</p>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          padding: 24,
          borderRadius: 12,
          color: '#fff',
        }}>
          <p style={{ margin: '0 0 8px', fontSize: 13, opacity: 0.9 }}>Total Receipts</p>
          <p style={{ margin: 0, fontSize: 36, fontWeight: 700 }}>{stats.totalReceipts}</p>
        </div>
      </div>

      {/* Chart */}
      <div style={{
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: 12,
        padding: 24,
        marginBottom: 32,
      }}>
        <h2 style={{ margin: '0 0 20px', fontSize: 18 }}>Runs This Week</h2>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          height: 200,
          gap: 8,
        }}>
          {runsByDay.map((d) => (
            <div key={d.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div
                style={{
                  width: 40,
                  height: `${(d.runs / maxRuns) * 150}px`,
                  background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s',
                }}
              />
              <span style={{ marginTop: 8, fontSize: 12, color: '#666' }}>{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Status Breakdown */}
      <div style={{
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: 12,
        padding: 24,
      }}>
        <h2 style={{ margin: '0 0 20px', fontSize: 18 }}>Status Breakdown</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <div style={{ padding: 16, background: '#d4edda', borderRadius: 8, textAlign: 'center' }}>
            <p style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#155724' }}>12</p>
            <p style={{ margin: 0, fontSize: 13, color: '#155724' }}>Verified</p>
          </div>
          <div style={{ padding: 16, background: '#fff3cd', borderRadius: 8, textAlign: 'center' }}>
            <p style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#856404' }}>2</p>
            <p style={{ margin: 0, fontSize: 13, color: '#856404' }}>Completed</p>
          </div>
          <div style={{ padding: 16, background: '#e2e3e5', borderRadius: 8, textAlign: 'center' }}>
            <p style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#383d41' }}>1</p>
            <p style={{ margin: 0, fontSize: 13, color: '#383d41' }}>Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
}
