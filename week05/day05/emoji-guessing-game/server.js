const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Emoji dataset
const emojis = [
    { emoji: '😀', name: 'Grinning Face' },
    { emoji: '😂', name: 'Face with Tears of Joy' },
    { emoji: '😍', name: 'Smiling Face with Heart-Eyes' },
    { emoji: '🤔', name: 'Thinking Face' },
    { emoji: '😴', name: 'Sleeping Face' },
    { emoji: '🐶', name: 'Dog Face' },
    { emoji: '🐱', name: 'Cat Face' },
    { emoji: '🐸', name: 'Frog' },
    { emoji: '🦁', name: 'Lion' },
    { emoji: '🐧', name: 'Penguin' },
    { emoji: '🌮', name: 'Taco' },
    { emoji: '🍕', name: 'Pizza' },
    { emoji: '🍔', name: 'Hamburger' },
    { emoji: '🍎', name: 'Red Apple' },
    { emoji: '🍌', name: 'Banana' },
    { emoji: '🌟', name: 'Star' },
    { emoji: '🌈', name: 'Rainbow' },
    { emoji: '🔥', name: 'Fire' },
    { emoji: '⚡', name: 'Lightning Bolt' },
    { emoji: '🌺', name: 'Hibiscus' },
    { emoji: '🚗', name: 'Car' },
    { emoji: '✈️', name: 'Airplane' },
    { emoji: '🚀', name: 'Rocket' },
    { emoji: '⚽', name: 'Soccer Ball' },
    { emoji: '🎵', name: 'Musical Note' },
    { emoji: '🎨', name: 'Artist Palette' },
    { emoji: '📱', name: 'Mobile Phone' },
    { emoji: '💎', name: 'Gem Stone' },
    { emoji: '🏆', name: 'Trophy' },
    { emoji: '🎉', name: 'Party Popper' }
];

// Game state storage (in production, use a database)
let gameState = new Map(); // playerId -> { score, currentQuestion, totalQuestions }
let leaderboard = []; // Array of { playerId, score, totalQuestions }

// Utility functions
function generatePlayerId() {
    return Math.random().toString(36).substring(2, 15);
}

function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

function generateOptions(correctEmoji) {
    const options = [correctEmoji.name];
    const incorrectOptions = emojis
        .filter(e => e.name !== correctEmoji.name)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(e => e.name);
    
    return [...options, ...incorrectOptions].sort(() => 0.5 - Math.random());
}

function updateLeaderboard(playerId, score, totalQuestions) {
    const existingIndex = leaderboard.findIndex(entry => entry.playerId === playerId);
    const newEntry = { playerId, score, totalQuestions, percentage: Math.round((score / totalQuestions) * 100) };
    
    if (existingIndex >= 0) {
        leaderboard[existingIndex] = newEntry;
    } else {
        leaderboard.push(newEntry);
    }
    
    // Sort by score (descending), then by percentage (descending)
    leaderboard.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return b.percentage - a.percentage;
    });
    
    // Keep only top 10
    leaderboard = leaderboard.slice(0, 10);
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start a new game
app.post('/api/start-game', (req, res) => {
    const playerId = generatePlayerId();
    const currentEmoji = getRandomEmoji();
    const options = generateOptions(currentEmoji);
    
    gameState.set(playerId, {
        score: 0,
        totalQuestions: 0,
        currentEmoji: currentEmoji,
        options: options
    });
    
    res.json({
        playerId,
        emoji: currentEmoji.emoji,
        options,
        score: 0,
        totalQuestions: 0
    });
});

// Submit a guess
app.post('/api/guess', (req, res) => {
    const { playerId, guess } = req.body;
    
    if (!gameState.has(playerId)) {
        return res.status(400).json({ error: 'Invalid player ID' });
    }
    
    const playerState = gameState.get(playerId);
    const isCorrect = guess === playerState.currentEmoji.name;
    
    // Store the correct answer for the CURRENT question before updating
    const currentCorrectAnswer = playerState.currentEmoji.name;
    
    // Update score
    if (isCorrect) {
        playerState.score++;
    }
    playerState.totalQuestions++;
    
    // Generate next question
    const nextEmoji = getRandomEmoji();
    const nextOptions = generateOptions(nextEmoji);
    
    playerState.currentEmoji = nextEmoji;
    playerState.options = nextOptions;
    
    gameState.set(playerId, playerState);
    
    // Update leaderboard
    updateLeaderboard(playerId, playerState.score, playerState.totalQuestions);
    
    res.json({
        correct: isCorrect,
        correctAnswer: currentCorrectAnswer, // Use the stored correct answer for current question
        nextEmoji: nextEmoji.emoji,
        nextOptions: nextOptions,
        score: playerState.score,
        totalQuestions: playerState.totalQuestions,
        message: isCorrect ? 'Correct! 🎉' : `Wrong! The correct answer was "${currentCorrectAnswer}"`
    });
});

// Get current game state
app.get('/api/game-state/:playerId', (req, res) => {
    const { playerId } = req.params;
    
    if (!gameState.has(playerId)) {
        return res.status(404).json({ error: 'Game not found' });
    }
    
    const playerState = gameState.get(playerId);
    res.json({
        emoji: playerState.currentEmoji.emoji,
        options: playerState.options,
        score: playerState.score,
        totalQuestions: playerState.totalQuestions
    });
});

// Get leaderboard
app.get('/api/leaderboard', (req, res) => {
    res.json(leaderboard);
});

// End game
app.post('/api/end-game', (req, res) => {
    const { playerId } = req.body;
    
    if (!gameState.has(playerId)) {
        return res.status(400).json({ error: 'Invalid player ID' });
    }
    
    const playerState = gameState.get(playerId);
    const finalScore = {
        score: playerState.score,
        totalQuestions: playerState.totalQuestions,
        percentage: Math.round((playerState.score / playerState.totalQuestions) * 100)
    };
    
    gameState.delete(playerId);
    
    res.json({
        finalScore,
        leaderboard: leaderboard.slice(0, 5) // Top 5 for final screen
    });
});

app.listen(port, () => {
    console.log(`🎮 Emoji Guessing Game server running at http://localhost:${port}`);
    console.log('📁 Make sure to create a "public" folder with index.html');
});