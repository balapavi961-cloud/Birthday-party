import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin@123';

app.use(cors());
app.use(express.json());

// In-memory database
const db = {
  notices: [],
  gameResults: [],
  selectedCards: [],
  notes: [],
  logins: [],
};

// ─── USER ROUTES ────────────────────────────────────────────

// 1. Login
app.post('/api/login', (req, res) => {
  const { dob } = req.body;
  db.logins.push({ dob, timestamp: new Date() });
  console.log(`Login attempt with DOB: ${dob}`);
  res.json({ success: true, message: 'Welcome to the party!' });
});

// 2. Store Notice
app.post('/api/notice', (req, res) => {
  const { content } = req.body;
  db.notices.push({ content, timestamp: new Date() });
  console.log(`New notice received: ${content}`);
  res.json({ success: true, message: 'Notice stored!' });
});

// 3. Store Game Result
app.post('/api/game-result', (req, res) => {
  const { result, rounds } = req.body;
  db.gameResults.push({ result, rounds, timestamp: new Date() });
  console.log(`Game result received: ${result}`);
  res.json({ success: true, message: 'Result stored!' });
});

// 4. Store Selected Cards
app.post('/api/selected-cards', (req, res) => {
  const { cards } = req.body;
  db.selectedCards.push({ cards, timestamp: new Date() });
  console.log(`Cards selected: ${cards.join(', ')}`);
  res.json({ success: true, message: 'Selection stored!' });
});

// 5. Store Note
app.post('/api/note', (req, res) => {
  const { message } = req.body;
  db.notes.push({ message, timestamp: new Date() });
  console.log(`Note received: ${message}`);
  res.json({ success: true, message: 'Note stored!' });
});

// 6. Send Email (simulated)
app.post('/api/send-mail', async (req, res) => {
  const { cards, message } = req.body;
  console.log('Attempting to send email with cards:', cards);
  res.json({ success: true, message: 'Surprise email sent (simulated)!' });
});

// 7. Song
app.post('/api/song', (req, res) => {
  const { songId } = req.body;
  res.json({ success: true, message: `Song ${songId} selected!` });
});

// ─── ADMIN ROUTES ────────────────────────────────────────────

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, token: 'admin-token-birthday' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

// Middleware: verify admin token
const requireAdmin = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth === 'Bearer admin-token-birthday') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Unauthorized' });
  }
};

// Get all dashboard data
app.get('/api/admin/dashboard', requireAdmin, (req, res) => {
  res.json({
    success: true,
    data: {
      notices: db.notices,
      gameResults: db.gameResults,
      selectedCards: db.selectedCards,
      notes: db.notes,
      logins: db.logins,
      stats: {
        totalLogins: db.logins.length,
        totalNotes: db.notes.length,
        totalCardSelections: db.selectedCards.length,
        totalGameResults: db.gameResults.length,
      }
    }
  });
});

// Clear all data
app.delete('/api/admin/clear', requireAdmin, (req, res) => {
  db.notices = [];
  db.gameResults = [];
  db.selectedCards = [];
  db.notes = [];
  db.logins = [];
  res.json({ success: true, message: 'All data cleared!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Admin password: ${ADMIN_PASSWORD}`);
});
