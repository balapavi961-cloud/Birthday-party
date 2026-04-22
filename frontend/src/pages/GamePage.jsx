import React, { useState } from 'react';
import { motion } from 'framer-motion';

const choices = [
  { name: 'Rock', icon: '✊' },
  { name: 'Paper', icon: '✋' },
  { name: 'Scissors', icon: '✌️' }
];

const GamePage = ({ onNext, updateData, currentRounds }) => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [matchesWon, setMatchesWon] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);

  const playGame = async (choice) => {
    // Force computer to lose
    let comp;
    if (choice.name === 'Rock') comp = choices.find(c => c.name === 'Scissors');
    else if (choice.name === 'Paper') comp = choices.find(c => c.name === 'Rock');
    else comp = choices.find(c => c.name === 'Paper');

    setUserChoice(choice);
    setComputerChoice(comp);
    setTotalMatches(prev => prev + 1);

    const res = "You won! 🎉";
    setMatchesWon(prev => prev + 1);
    setResult(res);

    // Check if round is over (3 matches)
    if (totalMatches + 1 === 3) {
      setTimeout(async () => {
        if (matchesWon + (res === "You won! 🎉" ? 1 : 0) >= 2) {
          // User wins round
          const newRounds = currentRounds + 1;
          updateData({ gameRounds: newRounds });
          try {
            await fetch('http://localhost:5000/api/game-result', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ result: 'Win', rounds: newRounds })
            });
          } catch (err) {}
          onNext(); // Move to CardFlip
        } else {
          // User loses round, reset
          alert("Round lost! Try again to win 2/3 matches! 🍭");
          setMatchesWon(0);
          setTotalMatches(0);
          setResult('');
          setUserChoice(null);
          setComputerChoice(null);
        }
      }, 1500);
    }
  };

  return (
    <div className="page-container">
      <motion.div className="glass-card" style={{ padding: '40px', maxWidth: '500px', width: '100%' }}>
        <h2 style={{ color: '#ff4d6d', marginBottom: '10px' }}>Match {currentRounds + 1} / 3 🎮</h2>
        <p style={{ color: '#c9184a', marginBottom: '30px' }}>Win 2 out of 3 matches to reveal cards!</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
          {choices.map(c => (
            <button 
              key={c.name} 
              className="glow-button" 
              style={{ fontSize: '2rem', padding: '20px', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={() => playGame(c)}
            >
              {c.icon}
            </button>
          ))}
        </div>

        <div style={{ minHeight: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {userChoice && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                You: {userChoice.icon} vs Computer: {computerChoice.icon}
              </div>
              <h3 style={{ fontSize: '1.8rem', color: '#ff4d6d' }}>{result}</h3>
              <div style={{ marginTop: '10px', color: '#c9184a' }}>
                Score: {matchesWon} / {totalMatches}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default GamePage;
