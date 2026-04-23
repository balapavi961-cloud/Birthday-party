import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NoticePage = ({ onNext, updateData }) => {
  const [content, setContent] = useState('');

  const handleDone = async () => {
    updateData({ notice: content });
    try {
      await fetch('http://localhost:5000/api/notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
    } catch (err) {
      console.error(err);
    }
    onNext();
  };

  return (
    <div className="page-container">
      <motion.div 
        className="glass-card"
        style={{ padding: '40px', maxWidth: '600px', width: '100%' }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h2 style={{ color: '#ff4d6d', marginBottom: '20px' }}>📋Disclaimer!</h2>
        <p style={{ color: '#c9184a', marginBottom: '20px', fontSize: '1.1rem' }}>
            This is to inform you 📢 that I am using your picture 🖼️ <br />for a surprise 🎁 purpose. So I took your pic 📸 screenshot from your Instagram highlights without your permission 🙈. So sorry about that 🙏. The picture will be deleted 🗑️ after surprising you 🎉. Thank you 😊🙏
            </p>
        
        <button className="glow-button" onClick={handleDone}>
          Done ✨
        </button>
      </motion.div>
    </div>
  );
};

export default NoticePage;
