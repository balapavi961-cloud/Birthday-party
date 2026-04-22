import React from 'react';
import { motion } from 'framer-motion';

const SpecialNotePage = ({ onNext }) => {
  return (
    <div className="page-container">
      <motion.div 
        className="glass-card"
        style={{ padding: '50px', maxWidth: '600px', width: '100%' }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h2 style={{ color: '#ff4d6d', marginBottom: '30px', fontStyle: 'italic' }}>A Special Message 💌</h2>
        <p style={{ 
          fontSize: '1.6rem', 
          color: '#c9184a', 
          lineHeight: '1.8', 
          whiteSpace: 'pre-line',
          marginBottom: '40px' 
        }}>
          ""
        </p>
        <button className="glow-button" onClick={onNext}>
          Next 🌈
        </button>
      </motion.div>
    </div>
  );
};

export default SpecialNotePage;
