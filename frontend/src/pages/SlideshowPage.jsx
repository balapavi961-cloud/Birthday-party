import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  "/images/photo1.jpeg",
  "/images/photo2.jpeg",
  "/images/photo3.jpeg",
  "/images/photo4.jpeg",
  "/images/photo5.jpeg",
  "/images/photo6.jpeg",
];

const SlideshowPage = ({ onNext }) => {
  const [index, setIndex] = useState(-1); // -1 means "Tap to start"
  const [started, setStarted] = useState(false);
  const [audioUrl] = useState('/background.mp3'); // Pointing to local file in public folder
  const audioRef = useRef(null);

  useEffect(() => {
    if (started && index < images.length) {
      const timer = setTimeout(() => {
        if (index < images.length - 1) {
          setIndex(index + 1);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [index, started]);

  useEffect(() => {
    if (started && audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }
  }, [started]);

  const handleTap = () => {
    if (!started) {
      setStarted(true);
      setIndex(0);
    }
  };

  return (
    <div className="page-container" style={{ cursor: 'pointer' }} onClick={handleTap}>
      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key="tap-msg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card"
            style={{ padding: '40px', maxWidth: '500px' }}
          >
            <h1 style={{ fontSize: '2.5rem', color: '#ff4d6d', marginBottom: '20px' }}>
              Memories 💖
            </h1>
            
            <p style={{ fontSize: '1.2rem', color: '#ff758f', marginTop: '20px' }}>
              Tap anywhere to start the magic ✨
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="page-container"
          >
            <div className="glass-card" style={{ 
              padding: '10px', 
              maxWidth: '80vw', 
              maxHeight: '85vh', 
              width: '80%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              position: 'relative' 
            }}>
              <img 
                src={images[index]} 
                alt="Memory" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxHeight: '70vh', 
                  objectFit: 'contain', 
                  borderRadius: '15px',
                  marginBottom: '15px',
                  border: '2px solid white'
                }}
              />
              <div style={{ display: 'flex', gap: '15px' }}>
                {index === images.length - 1 ? (
                  <button className="glow-button" onClick={(e) => { e.stopPropagation(); onNext(); }}>
                    Continue 🎈
                  </button>
                ) : (
                  <button className="glow-button" onClick={(e) => { e.stopPropagation(); setIndex(prev => Math.min(prev + 1, images.length - 1)); }}>
                    Next ➡️
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real Music Player */}
      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} loop />
      )}

      {started && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 30 }}>
          <div className="glass-card" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.2rem' }}>🎵</span>
            <span style={{ fontSize: '0.8rem', color: '#c9184a' }}>
              {audioUrl ? 'Music Playing...' : 'No Music Selected'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideshowPage;
