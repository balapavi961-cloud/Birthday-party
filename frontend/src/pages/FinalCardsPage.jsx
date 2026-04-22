import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FinalCardsPage = ({ onNext, updateData }) => {
  const [selected, setSelected] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const icons = ['🍭', '🍬', '🍫', '🍩', '🧁', '🍦', '🍰', '🍪', '🍨'];

  const toggleSelect = (idx) => {
    if (selected.includes(idx)) {
      setSelected(selected.filter(i => i !== idx));
    } else if (selected.length < 3) {
      setSelected([...selected, idx]);
    }
  };

  const handleSend = async () => {
    setIsSending(true);
    const selectedCardIcons = selected.map(i => icons[i]);
    updateData({ selectedCards: selectedCardIcons });

    try {
      // 1. Store selected cards
      await fetch('http://localhost:5000/api/selected-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cards: selectedCardIcons })
      });

      // 2. Send email
      await fetch('http://localhost:5000/api/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cards: selectedCardIcons, message: "A surprise birthday reveal!" })
      });

      setIsSent(true);
    } catch (err) {
      console.error(err);
      setIsSent(true); // Proceed anyway for demo
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="page-container">
      <h2 style={{ color: '#ff4d6d', marginBottom: '10px' }}>The Final Selection 🌈</h2>
      <p style={{ color: '#c9184a', marginBottom: '30px' }}>Choose your 3 favorite treats to send a surprise! ✨</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', maxWidth: '400px', margin: '0 auto 40px' }}>
        {icons.map((icon, idx) => {
          const isSelected = selected.includes(idx);
          const isFaded = selected.length === 3 && !isSelected;
          
          return (
            <motion.div
              key={idx}
              onClick={() => toggleSelect(idx)}
              animate={{ 
                opacity: isFaded ? 0.3 : 1,
                scale: isSelected ? 1.1 : 1,
                borderColor: isSelected ? '#ff4d6d' : 'white'
              }}
              className="glass-card"
              style={{ 
                height: '100px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '2.5rem',
                cursor: 'pointer',
                border: isSelected ? '4px solid' : '2px solid white',
                borderRadius: '15px'
              }}
            >
              {icon}
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selected.length === 3 && !isSent && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button 
              className="glow-button" 
              onClick={handleSend}
              disabled={isSending}
            >
              {isSending ? "Sending Surprise... 💌" : "Send Surprise 💌"}
            </button>
          </motion.div>
        )}
        
        {isSent && (
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ color: '#ff4d6d' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Sent! 💖✨</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#c9184a' }}>
              You receive your gift as soon as possible 🎁
            </p>
            <button className="glow-button" onClick={onNext}>
              Next Stage 🎤
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinalCardsPage;
