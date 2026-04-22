import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CardFlipPage = ({ onNext, round }) => {
  const [flipped, setFlipped] = useState([false, false, false]);

  const handleFlip = (index) => {
    const newFlipped = [...flipped];
    newFlipped[index] = true;
    setFlipped(newFlipped);
  };

  const allFlipped = flipped.every(f => f === true);

  // Candy Crush style icons/images for cards
  const icons = ['🍭', '🍬', '🍫', '🍩', '🧁', '🍦', '🍰', '🍪', '🍨'];
  const startIdx = (round - 1) * 3;
  const currentIcons = icons.slice(startIdx, startIdx + 3);

  return (
    <div className="page-container">
      <h2 style={{ color: '#ff4d6d', marginBottom: '30px' }}>Reveal Your Cards! Round {round} / 3 🎁</h2>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '50px' }}>
        {currentIcons.map((icon, idx) => (
          <div key={idx} className="card-scene" onClick={() => handleFlip(idx)}>
            <div className={`card-inner ${flipped[idx] ? 'is-flipped' : ''}`}>
              <div className="card-face card-front">?</div>
              <div className="card-face card-back">{icon}</div>
            </div>
          </div>
        ))}
      </div>

      {allFlipped && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button className="glow-button" onClick={onNext}>
            {round === 3 ? "View All Revealed Cards 🌟" : "Back to Next Match 🎮"}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default CardFlipPage;
