import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ADMIN_URL = 'http://localhost:5000';

/* ── tiny helper ── */
const fmt = (ts) => new Date(ts).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' });

/* ── Section card ── */
const Section = ({ icon, title, children, accent = '#ff4d6d' }) => (
  <motion.div
    className="admin-section"
    style={{ borderTop: `4px solid ${accent}` }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <h3 style={{ color: accent }}>{icon} {title}</h3>
    {children}
  </motion.div>
);

/* ── Stat pill ── */
const Stat = ({ label, value, color }) => (
  <div className="admin-stat" style={{ background: color }}>
    <span className="stat-val">{value}</span>
    <span className="stat-label">{label}</span>
  </div>
);

/* ══════════════════ MAIN ══════════════════ */
const SuperAdminPage = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cleared, setCleared] = useState(false);

  /* ── Login ── */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${ADMIN_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const json = await res.json();
      if (json.success) {
        setToken(json.token);
      } else {
        setError('❌ Wrong password!');
      }
    } catch {
      setError('❌ Server not reachable. Make sure backend is running.');
    }
  };

  /* ── Fetch dashboard ── */
  const fetchData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${ADMIN_URL}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch {
      setError('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchData(); }, [fetchData]);

  /* ── Clear all ── */
  const handleClear = async () => {
    if (!window.confirm('⚠️ Clear ALL data? This cannot be undone!')) return;
    await fetch(`${ADMIN_URL}/api/admin/clear`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setCleared(true);
    fetchData();
    setTimeout(() => setCleared(false), 3000);
  };

  /* ──────────── LOGIN SCREEN ──────────── */
  if (!token) {
    return (
      <div className="admin-login-bg">
        <motion.div className="admin-login-card"
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="admin-logo">👑</div>
          <h1 className="admin-login-title">Super Admin</h1>
          <p className="admin-login-sub">Birthday Party Dashboard</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="admin-input"
              required
            />
            {error && <p className="admin-error">{error}</p>}
            <button type="submit" className="admin-btn">🔓 Access Dashboard</button>
          </form>
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#ff85a2' }}>
            Default password: <code>admin@123</code>
          </p>
        </motion.div>
      </div>
    );
  }

  /* ──────────── DASHBOARD ──────────── */
  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <div>
          <h1 className="admin-title">👑 Super Admin Dashboard</h1>
          <p className="admin-sub">Birthday Party — Live Data</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="admin-btn-outline" onClick={fetchData}>🔄 Refresh</button>
          <button className="admin-btn-danger" onClick={handleClear}>🗑️ Clear All</button>
          <button className="admin-btn-outline" onClick={() => setToken(null)}>🚪 Logout</button>
        </div>
      </div>

      {cleared && <div className="admin-toast">✅ All data cleared!</div>}

      {loading && <div className="admin-loading">Loading… 💫</div>}

      {data && (
        <div className="admin-body">
          {/* Stats */}
          <div className="admin-stats-row">
            <Stat label="Logins" value={data.stats.totalLogins} color="linear-gradient(135deg,#ff4d6d,#ff758f)" />
            <Stat label="Notes Written" value={data.stats.totalNotes} color="linear-gradient(135deg,#a855f7,#c084fc)" />
            <Stat label="Card Selections" value={data.stats.totalCardSelections} color="linear-gradient(135deg,#0d9488,#34d399)" />
            <Stat label="Game Rounds" value={data.stats.totalGameResults} color="linear-gradient(135deg,#d97706,#fbbf24)" />
          </div>

          {/* Selected Cards */}
          <Section icon="🍭" title="Selected Candy Cards" accent="#ff4d6d">
            {data.selectedCards.length === 0
              ? <p className="admin-empty">No cards selected yet.</p>
              : data.selectedCards.map((entry, i) => (
                <div key={i} className="admin-row">
                  <span className="admin-row-icons">{entry.cards.join('  ')}</span>
                  <span className="admin-row-time">{fmt(entry.timestamp)}</span>
                </div>
              ))
            }
          </Section>

          {/* Experience Notes */}
          <Section icon="💌" title="Experience Notes" accent="#a855f7">
            {data.notes.length === 0
              ? <p className="admin-empty">No notes written yet.</p>
              : data.notes.map((entry, i) => (
                <div key={i} className="admin-note-card">
                  <p className="admin-note-text">"{entry.message}"</p>
                  <span className="admin-row-time">{fmt(entry.timestamp)}</span>
                </div>
              ))
            }
          </Section>

          {/* Notices */}
          <Section icon="📋" title="Notices / Wishes" accent="#0d9488">
            {data.notices.length === 0
              ? <p className="admin-empty">No notices yet.</p>
              : data.notices.map((entry, i) => (
                <div key={i} className="admin-row">
                  <span>{entry.content}</span>
                  <span className="admin-row-time">{fmt(entry.timestamp)}</span>
                </div>
              ))
            }
          </Section>

          {/* Game Results */}
          <Section icon="🎮" title="Game Results" accent="#d97706">
            {data.gameResults.length === 0
              ? <p className="admin-empty">No game results yet.</p>
              : data.gameResults.map((entry, i) => (
                <div key={i} className="admin-row">
                  <span>Result: <strong>{entry.result}</strong> | Rounds: <strong>{entry.rounds}</strong></span>
                  <span className="admin-row-time">{fmt(entry.timestamp)}</span>
                </div>
              ))
            }
          </Section>

          {/* Logins */}
          <Section icon="🔑" title="Login Attempts" accent="#3b82f6">
            {data.logins.length === 0
              ? <p className="admin-empty">No logins yet.</p>
              : data.logins.map((entry, i) => (
                <div key={i} className="admin-row">
                  <span>DOB entered: <code>{entry.dob}</code></span>
                  <span className="admin-row-time">{fmt(entry.timestamp)}</span>
                </div>
              ))
            }
          </Section>
        </div>
      )}

      <style>{`
        .admin-login-bg {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1a0a14, #3d0a26);
          padding: 1rem;
        }
        .admin-login-card {
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,77,109,0.3);
          border-radius: 24px;
          padding: 3rem 2.5rem;
          width: 100%;
          max-width: 400px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .admin-logo { font-size: 4rem; margin-bottom: 0.5rem; }
        .admin-login-title { color: #ff4d6d; font-size: 2rem; margin-bottom: 0.25rem; }
        .admin-login-sub { color: #ff85a2; margin-bottom: 2rem; font-size: 0.95rem; }
        .admin-input {
          width: 100%;
          padding: 0.85rem 1.2rem;
          border-radius: 50px;
          border: 1.5px solid rgba(255,77,109,0.4);
          background: rgba(255,255,255,0.08);
          color: white;
          font-size: 1rem;
          outline: none;
          margin-bottom: 1rem;
          box-sizing: border-box;
        }
        .admin-input::placeholder { color: rgba(255,255,255,0.4); }
        .admin-btn {
          width: 100%;
          background: linear-gradient(45deg, #ff4d6d, #c9184a);
          color: white;
          border: none;
          padding: 0.9rem;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s;
        }
        .admin-btn:hover { transform: scale(1.03); box-shadow: 0 8px 20px rgba(255,77,109,0.4); }
        .admin-error { color: #ff85a2; font-size: 0.9rem; margin-bottom: 0.75rem; }

        /* ─── Dashboard ─── */
        .admin-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a0a14, #3d0a26);
          color: white;
          padding: 1.5rem;
          font-family: 'Outfit', sans-serif;
          box-sizing: border-box;
        }
        .admin-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,77,109,0.2);
        }
        .admin-title { font-size: clamp(1.4rem, 4vw, 2.2rem); color: #ff4d6d; margin: 0; }
        .admin-sub { color: #ff85a2; font-size: 0.9rem; margin: 0.25rem 0 0; }
        .admin-btn-outline {
          background: transparent;
          border: 1.5px solid #ff4d6d;
          color: #ff4d6d;
          padding: 0.55rem 1.1rem;
          border-radius: 50px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.2s;
        }
        .admin-btn-outline:hover { background: rgba(255,77,109,0.15); }
        .admin-btn-danger {
          background: rgba(220,38,38,0.15);
          border: 1.5px solid #dc2626;
          color: #fca5a5;
          padding: 0.55rem 1.1rem;
          border-radius: 50px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.2s;
        }
        .admin-btn-danger:hover { background: rgba(220,38,38,0.3); }
        .admin-toast {
          background: #166534;
          color: #bbf7d0;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          margin-bottom: 1rem;
          font-weight: 600;
          text-align: center;
        }
        .admin-loading { text-align: center; padding: 2rem; color: #ff85a2; font-size: 1.2rem; }

        /* Stats */
        .admin-stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .admin-stat {
          border-radius: 16px;
          padding: 1.2rem 1rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .stat-val { font-size: 2.2rem; font-weight: 800; color: white; }
        .stat-label { font-size: 0.8rem; color: rgba(255,255,255,0.8); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }

        /* Sections */
        .admin-body { display: flex; flex-direction: column; gap: 1.5rem; }
        .admin-section {
          background: rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 1.5rem;
          border-left: none;
          border-right: none;
          border-bottom: none;
        }
        .admin-section h3 { font-size: 1.1rem; margin: 0 0 1rem; }
        .admin-empty { color: rgba(255,255,255,0.35); font-style: italic; }
        .admin-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding: 0.7rem 1rem;
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }
        .admin-row-icons { font-size: 1.4rem; letter-spacing: 4px; }
        .admin-row-time { font-size: 0.75rem; color: rgba(255,255,255,0.4); white-space: nowrap; }
        .admin-note-card {
          background: rgba(168,85,247,0.1);
          border: 1px solid rgba(168,85,247,0.2);
          border-radius: 12px;
          padding: 1rem 1.2rem;
          margin-bottom: 0.75rem;
        }
        .admin-note-text {
          color: #e9d5ff;
          font-size: 1rem;
          line-height: 1.6;
          margin: 0 0 0.5rem;
          font-style: italic;
        }
        code { background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-size: 0.85rem; }
        @media (max-width: 480px) {
          .admin-header { flex-direction: column; }
          .admin-stats-row { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
};

export default SuperAdminPage;
