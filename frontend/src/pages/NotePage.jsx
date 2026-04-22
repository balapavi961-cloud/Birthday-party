import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NotePage = ({ onNext }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!message.trim()) { setIsEditing(false); return; }
    try {
      await fetch('http://localhost:5000/api/note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
    } catch (err) {
      console.error('Note save failed:', err);
    }
    setSaved(true);
    setIsEditing(false);
  };

  return (
    <div className="page-container">
      <motion.div
        className="glass-card"
        style={{ padding: '50px', maxWidth: '600px', width: '100%' }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 style={{ color: '#ff4d6d', marginBottom: '30px', fontStyle: 'italic' }}>Experience Note 💌</h2>

        {isEditing ? (
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ minHeight: '200px', textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6' }}
            placeholder="Share your experience about birthday..."
          />
        ) : (
          <p style={{
            fontSize: '1.4rem',
            color: '#c9184a',
            lineHeight: '1.8',
            whiteSpace: 'pre-line',
            marginBottom: '40px'
          }}>
            {message || 'Please share your experience about your special Day? 💖'}
          </p>
        )}

        {saved && (
          <p style={{ color: '#22c55e', fontWeight: 600, marginBottom: '10px' }}>✅ Note saved!</p>
        )}

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {isEditing ? (
            <button
              className="glow-button"
              style={{ background: 'rgba(255,255,255,0.2)', color: '#ff4d6d', border: '1px solid #ff4d6d' }}
              onClick={handleSave}
            >
              Save Note ✅
            </button>
          ) : (
            <button
              className="glow-button"
              style={{ background: 'rgba(255,255,255,0.2)', color: '#ff4d6d', border: '1px solid #ff4d6d' }}
              onClick={() => setIsEditing(true)}
            >
              Edit Note ✏️
            </button>
          )}
          <button className="glow-button" onClick={onNext}>Continue 🌈</button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotePage;
