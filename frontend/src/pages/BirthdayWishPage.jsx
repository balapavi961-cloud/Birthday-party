import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BirthdayWishPage = ({ onNext, name }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-container" style={{ background: 'transparent' }}>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <h1 style={{ fontSize: '4rem', color: '#ff4d6d', textShadow: '0 0 20px rgba(255, 255, 255, 0.8)' }}>
          🎉 Happy Birthday {name} 🎉
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#c9184a', marginTop: '20px' }}>
          Today is all about YOU! 🎂✨
        </p>
      </motion.div>

      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: '50px' }}
        >
          <button className="glow-button" onClick={onNext}>
            Enter to the Party 🎊
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default BirthdayWishPage;
