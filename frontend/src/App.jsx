import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// Import Pages
import LoginPage from './pages/LoginPage';
import BirthdayWishPage from './pages/BirthdayWishPage';
import NoticePage from './pages/NoticePage';
import SlideshowPage from './pages/SlideshowPage';
import GamePage from './pages/GamePage';
import CardFlipPage from './pages/CardFlipPage';
import FinalCardsPage from './pages/FinalCardsPage';
import BarbieSelfiePage from './pages/BarbieSelfiePage';
import SpecialNotePage from './pages/SpecialNotePage';
import NotePage from './pages/NotePage';
import EndingPage from './pages/EndingPage';

const HeartBackground = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const left = Math.random() * 100;
      const size = Math.random() * 20 + 10;
      const duration = Math.random() * 5 + 3;
      
      setHearts(prev => [...prev, { id, left, size, duration }]);
      
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== id));
      }, duration * 1000);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="heart-bg">
      {hearts.map(heart => (
        <span 
          key={heart.id} 
          className="heart"
          style={{ 
            left: `${heart.left}%`, 
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
};

const STAGES = {
  LOGIN: 'login',
  WISH: 'wish',
  NOTICE: 'notice',
  SLIDESHOW: 'slideshow',
  GAME: 'game',
  CARDFLIP: 'cardflip',
  FINALCARDS: 'finalcards',
  BARBIE_SELFIE: 'barbie_selfie',
  SPECIAL_NOTE: 'special_note',
  NOTE: 'note',
  ENDING: 'ending'
};

function App() {
  const [stage, setStage] = useState(STAGES.LOGIN);
  const [isMusicStarted, setIsMusicStarted] = useState(false);
  const globalAudioRef = useRef(null);
  const [userData, setUserData] = useState({
    name: 'Friend',
    notice: '',
    gameRounds: 0,
    selectedCards: []
  });

  useEffect(() => {
    if (globalAudioRef.current) {
      if (stage === STAGES.SLIDESHOW || stage === STAGES.BARBIE_SELFIE) {
        globalAudioRef.current.pause();
      } else if (isMusicStarted) {
        globalAudioRef.current.play().catch(err => console.log("Global music failed:", err));
      }
    }
  }, [stage, isMusicStarted]);

  const nextStage = () => {
    if (!isMusicStarted) setIsMusicStarted(true);
    const stageOrder = Object.values(STAGES);
    const currentIndex = stageOrder.indexOf(stage);
    if (currentIndex < stageOrder.length - 1) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff758f', '#c9184a']
      });
      setStage(stageOrder[currentIndex + 1]);
    }
  };

  const updateUserData = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  const renderStage = () => {
    switch (stage) {
      case STAGES.LOGIN:
        return <LoginPage onNext={nextStage} />;
      case STAGES.WISH:
        return <BirthdayWishPage onNext={nextStage} name={userData.name} />;
      case STAGES.NOTICE:
        return <NoticePage onNext={nextStage} updateData={updateUserData} />;
      case STAGES.SLIDESHOW:
        return <SlideshowPage onNext={nextStage} />;
      case STAGES.GAME:
        return (
          <GamePage 
            onNext={nextStage} 
            updateData={updateUserData} 
            currentRounds={userData.gameRounds} 
          />
        );
      case STAGES.CARDFLIP:
        return (
          <CardFlipPage 
            round={userData.gameRounds}
            onNext={() => {
              if (userData.gameRounds < 3) {
                setStage(STAGES.GAME);
              } else {
                setStage(STAGES.FINALCARDS);
              }
            }} 
          />
        );
      case STAGES.FINALCARDS:
        return <FinalCardsPage onNext={nextStage} updateData={updateUserData} />;
      case STAGES.BARBIE_SELFIE:
        return <BarbieSelfiePage onNext={nextStage} />;
      case STAGES.SPECIAL_NOTE:
        return <SpecialNotePage onNext={nextStage} />;
      case STAGES.NOTE:
        return <NotePage onNext={nextStage} />;
      case STAGES.ENDING:
        return <EndingPage />;
      default:
        return <LoginPage onNext={nextStage} />;
    }
  };

  return (
    <div className="App">
      <HeartBackground />
      <audio 
        ref={globalAudioRef} 
        src="birthday_melody.mp3" 
        loop 
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {renderStage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
