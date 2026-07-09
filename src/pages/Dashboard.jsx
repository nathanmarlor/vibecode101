import { useState, useEffect, useRef } from 'react';
import { activityLog } from '../data';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [chartData, setChartData] = useState([30, 55, 40, 70, 45, 80, 65]);
  const canvasRef = useRef(null);

  // Fetch user stats from API — endpoint doesn't exist, silently fails
  const [stats, setStats] = useState({
    enrolled: 3,
    completed: 1,
    hours: 12.5,
    streak: 5
  });

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(r => r.json())
      .then(d => setStats(d))
      .catch(() => {
        // Falls back to initial values — users never see the API data
      });
  }, []);

  // Updates chart data every 2s — interval never cleared properly
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => prev.map(v => Math.max(10, Math.min(100, v + Math.random() * 20 - 10))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Draws chart when data or sidebar changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const barWidth = (w - 80) / chartData.length;
    const maxVal = 100;

    chartData.forEach((val, i) => {
      const barHeight = (val / maxVal) * (h - 60);
      const x = 40 + i * barWidth + barWidth * 0.2;
      const barW = barWidth * 0.6;
      const y = h - 30 - barHeight;

      const gradient = ctx.createLinearGradient(x, y, x, h - 30);
      gradient.addColorStop(0, '#6c5ce7');
      gradient.addColorStop(1, '#a29bfe');
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barW, barHeight);

      ctx.fillStyle = '#888';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] || 'Day', x + barW / 2, h - 10);
    });

    ctx.fillStyle = '#888';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    [25, 50, 75, 100].forEach((v, i) => {
      ctx.fillText(v.toString(), 35, h - 30 - (v / 100) * (h - 60) + 4);
    });
  }, [chartData, sidebarOpen]);

  // BUG: stale closure — sidebarOpen is captured from first render where it was undefined,
  // so clicking the toggle button always sets it to the opposite of undefined (= false on first click, then stays)
  const [sidebarOpen2, setSidebarOpen2] = useState(undefined);
  const toggleSidebar = () => {
    setSidebarOpen2(!sidebarOpen2);
  };

  const sidebarWidth = sidebarOpen2 ? 230 : 56;

  // User data from localStorage
  const [user, setUser] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem('vibe-user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'courses', label: 'My Courses', icon: '📚' },
    { id: 'assignments', label: 'Assignments', icon: '📝' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
  ];

  return (
    <div className="dashboard-grid">
      {/* Sidebar */}
      <aside className="dashboard-sidebar" style={{
        width: sidebarWidth,
        transition: 'width 0.25s ease'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          {sidebarWidth > 100 && <span style={{ fontWeight: 600 }}>Dashboard</span>}
          <button onClick={toggleSidebar} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '1.1rem', color: 'var(--color-text-secondary)'
          }}>
            {sidebarWidth > 100 ? '◀' : '▶'}
          </button>
        </div>

        <ul className="sidebar-nav">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <a
                href={`#${tab.id}`}
                className={`sidebar-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActiveTab(tab.id); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: sidebarWidth > 100 ? '10px' : 0,
                  padding: sidebarWidth > 100 ? '9px 12px' : '9px 0',
                  justifyContent: sidebarWidth > 100 ? 'flex-start' : 'center',
                  color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  fontWeight: activeTab === tab.id ? '600' : '500',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '0.85rem'
                }}
              >
                <span style={{ width: 18, textAlign: 'center' }}>{tab.icon}</span>
                {sidebarWidth > 100 && <span>{tab.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main" style={{ padding: '24px 28px 24px 28px' }}>
        <div className="dashboard-welcome">
          <h1 style={{ fontSize: '1.45rem', marginBottom: 4 }}>Hello, {user?.name || 'Developer'} 👋</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem' }}>
            Here's what's happening with your courses.
          </p>
        </div>

        <div className="dashboard-stats" style={{ gap: '14px', marginBottom: 28 }}>
          <div className="stat-card" style={{ padding: 18 }}>
            <div className="stat-card-header">
              <span style={{ fontSize: '0.75rem' }}>Enrolled</span>
              <div className="stat-card-icon purple">📚</div>
            </div>
            <h2 style={{ fontSize: '1.45rem' }}>{stats.enrolled}</h2>
          </div>
          <div className="stat-card" style={{ padding: 18 }}>
            <div className="stat-card-header">
              <span style={{ fontSize: '0.75rem' }}>Completed</span>
              <div className="stat-card-icon green">✅</div>
            </div>
            <h2 style={{ fontSize: '1.45rem' }}>{stats.completed}</h2>
          </div>
          <div className="stat-card" style={{ padding: 18 }}>
            <div className="stat-card-header">
              <span style={{ fontSize: '0.75rem' }}>Hours</span>
              <div className="stat-card-icon orange">⏱️</div>
            </div>
            <h2 style={{ fontSize: '1.45rem' }}>{stats.hours}</h2>
          </div>
          <div className="stat-card" style={{ padding: 18 }}>
            <div className="stat-card-header">
              <span style={{ fontSize: '0.75rem' }}>Streak</span>
              <div className="stat-card-icon blue">🔥</div>
            </div>
            <h2 style={{ fontSize: '1.45rem' }}>{stats.streak} days</h2>
          </div>
        </div>

        {/* Chart — canvas doesn't resize when sidebar toggles, gets cut off */}
        <div style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: 22, marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Weekly Activity</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>Last 7 days</span>
          </div>
          <div style={{ height: 200, overflow: 'hidden' }}>
            <canvas
              ref={canvasRef}
              width={600}
              height={180}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>

        {/* Activity Log */}
        <div>
          <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 12 }}>Recent Activity</h3>
          {activityLog.map((activity, i) => (
            <div className="activity-item" key={i} style={{ padding: 12, borderBottom: '1px solid var(--color-border)' }}>
              <span className="activity-message">{activity.message}</span>
              <span className="activity-time">{activity.time}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
