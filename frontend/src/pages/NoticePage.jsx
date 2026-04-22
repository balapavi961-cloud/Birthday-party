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
        <h2 style={{ color: '#ff4d6d', marginBottom: '20px' }}>📋 Important Notice!</h2>
        <p style={{ color: '#c9184a', marginBottom: '20px', fontSize: '1.1rem' }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum deleniti harum sapiente nisi inventore eum facilis modi pariatur, explicabo cumque porro fugit, totam accusantium sit vel qui sed quod voluptate molestias architecto itaque! Nesciunt optio praesentium, ullam beatae totam voluptatem perspiciatis molestiae ipsa iure dicta eveniet aliquid iste cum facere. 💖
        </p>
        
        <button className="glow-button" onClick={handleDone}>
          Done ✨
        </button>
      </motion.div>
    </div>
  );
};

export default NoticePage;
