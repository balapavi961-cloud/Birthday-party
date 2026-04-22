import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './BarbieSelfiePage.css';

import barbie1 from '../assets/barbie/barbie1.png';
import barbie2 from '../assets/barbie/barbie2.png';
import barbie3 from '../assets/barbie/barbie3.png';

const BARBIE_IMAGES = [barbie1, barbie2, barbie3];

let lastIndex = -1;
const getRandomBarbie = () => {
  let idx;
  do { idx = Math.floor(Math.random() * BARBIE_IMAGES.length); }
  while (idx === lastIndex && BARBIE_IMAGES.length > 1);
  lastIndex = idx;
  return BARBIE_IMAGES[idx];
};

const BarbieSelfiePage = ({ onNext }) => {
  const webcamRef = useRef(null);
  const [capturedCards, setCapturedCards] = useState([]);
  const [showFlash, setShowFlash] = useState(false);

  const capture = useCallback(() => {
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 150);
    const barbie = getRandomBarbie();
    setCapturedCards(prev => [barbie, ...prev]);
    confetti({
      particleCount: 180,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff85a2', '#ff4d6d', '#ffb3c1', '#ffffff', '#fbbf24', '#c084fc']
    });
  }, []);

  const videoConstraints = { width: 1280, height: 720, facingMode: 'user' };

  return (
    <div className="barbie-page">
      <motion.div className="barbie-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="barbie-title">✨ Beauty Magic ✨</h1>
        <p className="barbie-subtitle">Take a selfie — discover your inner BeautyQueen Princess!</p>

        {/* Live Camera */}
        <div className="webcam-wrapper">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="webcam-preview"
          />
          <AnimatePresence>
            {showFlash && (
              <motion.div className="camera-flash"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            )}
          </AnimatePresence>
          <div className="camera-overlay" />
        </div>

        {/* Controls */}
        <div className="controls">
          <motion.button className="capture-btn"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92 }} onClick={capture}>
            📸 Take Magical Selfie
          </motion.button>
          {capturedCards.length > 0 && (
            <motion.button className="next-btn"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92 }} onClick={onNext}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              Continue Journey 💖
            </motion.button>
          )}
        </div>

        {/* Gallery */}
        <div className="gallery-section">
          <h2 className="gallery-title">Your Beatifull  Transformations 💅</h2>
          <div className="gallery-grid">
            <AnimatePresence>
              {capturedCards.map((img, index) => (
                <motion.div key={index} className="gallery-item"
                  initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
                  <img src={img} alt={`Barbie ${index + 1}`} loading="lazy" />
                  <div className="barbie-card-label">💖 Princess #{index + 1}</div>
                </motion.div>
              ))}
            </AnimatePresence>
            {capturedCards.length === 0 && (
              <div className="gallery-placeholder">
                📷 Your magical transformations will appear here!
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BarbieSelfiePage;
