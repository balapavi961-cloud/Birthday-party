import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LoginPage = ({ onNext }) => {
  const [dob, setDob] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dob })
      });
      onNext();
    } catch (err) {
      console.error(err);
      onNext(); // Proceed anyway for fake login
    }
  };

  return (
    <div className="page-container">
      <motion.div 
        className="glass-card"
        style={{ padding: '40px', maxWidth: '400px', width: '100%' }}
        initial={{ y: 50 }}
        animate={{ y: 0 }}
      >
        <h1 style={{ color: '#ff4d6d', marginBottom: '20px' }}>Unlock the Surprise</h1>
        <form onSubmit={handleLogin}>
          <div style={{ textAlign: 'left', marginBottom: '10px' }}>
            <label style={{ color: '#c9184a', fontWeight: 'bold' }}>Enter Date of Birth</label>
          </div>
          <input 
            type="date" 
            value={dob} 
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <button type="submit" className="glow-button">Login 💖</button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
