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

  // WhatsApp images for cards
  const images = [
    "/images/WhatsApp Image 2026-04-23 at 5.05.06 PM (1).jpeg",
    "/images/WhatsApp Image 2026-04-23 at 5.05.06 PM.jpeg",
    "/images/WhatsApp Image 2026-04-23 at 5.05.07 PM (1).jpeg",
    "/images/WhatsApp Image 2026-04-23 at 5.05.07 PM (2).jpeg",
    "/images/WhatsApp Image 2026-04-23 at 5.05.07 PM.jpeg",
    "/images/WhatsApp Image 2026-04-23 at 5.05.08 PM (1).jpeg",
    "/images/WhatsApp Image 2026-04-23 at 5.05.08 PM (2).jpeg",
    "/images/WhatsApp Image 2026-04-23 at 5.05.08 PM.jpeg",
    "/images/WhatsApp Image 2026-04-23 at 5.05.09 PM.jpeg"
  ];
  
  const startIdx = (round - 1) * 3;
  const currentImages = images.slice(startIdx, startIdx + 3);

  return (
    <div className="page-container">
      <h2 style={{ color: '#ff4d6d', marginBottom: '30px' }}>Reveal Your Cards! Round {round} / 3 🎁</h2>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '50px' }}>
        {currentImages.map((img, idx) => (
          <div key={idx} className="card-scene" onClick={() => handleFlip(idx)}>
            <div className={`card-inner ${flipped[idx] ? 'is-flipped' : ''}`}>
              <div className="card-face card-front">?</div>
              <div className="card-face card-back">
                <img src={img} alt="Card Content" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '15px' }} />
              </div>
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
