const express = require('express');
const session = require('express-session');
const quizRouter = require('./routes/quiz');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware for tracking user progress
app.use(session({
  secret: 'trivia-quiz-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, // Set to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Mount the quiz router
app.use('/quiz', quizRouter);

// Home route
app.get('/', (req, res) => {
  res.json({
    message: '🎯 Welcome to the Trivia Quiz Game!',
    instructions: {
      'GET /quiz': 'Start the quiz and get the first question',
      'POST /quiz': 'Submit an answer to the current question',
      'GET /quiz/score': 'View your final score',
      'GET /quiz/reset': 'Reset the quiz and start over',
      'GET /quiz/stats': 'View quiz statistics'
    },
    tip: 'Start your quiz by visiting /quiz'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    availableRoutes: ['/', '/quiz', '/quiz/score', '/quiz/reset', '/quiz/stats']
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🎯 Trivia Quiz Game is running on http://localhost:${PORT}`);
  console.log(`🚀 Visit http://localhost:${PORT} to start playing!`);
});

module.exports = app;