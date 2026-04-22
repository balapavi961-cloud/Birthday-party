import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const EndingPage = () => {
  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.2rem',
      boxSizing: 'border-box',
      textAlign: 'center',
      background: 'transparent',
      overflowX: 'hidden',
    }}>
      {/* Music badge — top left, responsive */}
      <div style={{
        position: 'fixed',
        top: '12px',
        left: '12px',
        zIndex: 10,
        background: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '6px 14px',
        border: '1px solid rgba(255,255,255,0.3)',
      }}>
        <span style={{ color: '#ff4d6d', fontSize: '0.85rem', fontWeight: 600 }}>🎵 Soft Music Looping...</span>
      </div>

      {/* Main title */}
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.15, 1] }}
        transition={{ duration: 1.5, times: [0, 0.6, 1] }}
        style={{
          fontSize: 'clamp(2rem, 8vw, 5rem)',
          lineHeight: '1.25',
          background: 'linear-gradient(to right, #ff4d6d, #c9184a, #ff758f)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))',
          marginBottom: '1.5rem',
          wordBreak: 'break-word',
          maxWidth: '100%',
          padding: '0 0.5rem',
        }}
      >
        🎉 HAPPY BIRTHDAY! 💖 🎉
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
        style={{
          fontSize: 'clamp(1rem, 4vw, 1.5rem)',
          color: '#c9184a',
          fontWeight: 600,
          maxWidth: '600px',
          lineHeight: '1.6',
          padding: '0 1rem',
        }}
      >
        Wishing you the most wonderful year ahead filled with love, laughter, and endless candy! 🍭✨
      </motion.p>

      {/* Floating emoji bar */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          fontSize: 'clamp(1.5rem, 6vw, 3rem)',
          marginTop: '2.5rem',
        }}
      >
        🎂✨💖✨🎁
      </motion.div>
    </div>
  );
};

export default EndingPage;
