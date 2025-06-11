const express = require('express');
const router = express.Router();

// Sample trivia quiz questions and answers (hard-coded for simplicity)
const triviaQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    answer: "Paris",
    options: ["London", "Berlin", "Paris", "Madrid"],
    difficulty: "easy",
    category: "Geography"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    answer: "Mars",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    difficulty: "easy",
    category: "Science"
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    answer: "Blue whale",
    options: ["African Elephant", "Blue whale", "Giraffe", "Polar Bear"],
    difficulty: "medium",
    category: "Biology"
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    answer: "Leonardo da Vinci",
    options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Michelangelo"],
    difficulty: "medium",
    category: "Art"
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    answer: "Au",
    options: ["Go", "Gd", "Au", "Ag"],
    difficulty: "hard",
    category: "Chemistry"
  },
  {
    id: 6,
    question: "In which year did World War II end?",
    answer: "1945",
    options: ["1944", "1945", "1946", "1947"],
    difficulty: "medium",
    category: "History"
  },
  {
    id: 7,
    question: "What is the smallest prime number?",
    answer: "2",
    options: ["0", "1", "2", "3"],
    difficulty: "easy",
    category: "Mathematics"
  },
  {
    id: 8,
    question: "Which programming language was created by Brendan Eich?",
    answer: "JavaScript",
    options: ["Python", "Java", "JavaScript", "C++"],
    difficulty: "hard",
    category: "Technology"
  }
];

// Initialize session data
const initializeSession = (req) => {
  if (!req.session.quiz) {
    req.session.quiz = {
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      startTime: new Date(),
      isCompleted: false
    };
  }
};

// GET /quiz - Start the quiz and display the first question
router.get('/', (req, res) => {
  initializeSession(req);
  
  // Reset quiz if it was completed
  if (req.session.quiz.isCompleted) {
    req.session.quiz = {
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      startTime: new Date(),
      isCompleted: false
    };
  }
  
  const currentIndex = req.session.quiz.currentQuestionIndex;
  
  if (currentIndex >= triviaQuestions.length) {
    req.session.quiz.isCompleted = true;
    return res.json({
      success: true,
      message: '🎉 Quiz completed!',
      finalScore: req.session.quiz.score,
      totalQuestions: triviaQuestions.length,
      percentage: Math.round((req.session.quiz.score / triviaQuestions.length) * 100),
      redirectTo: '/quiz/score'
    });
  }
  
  const currentQuestion = triviaQuestions[currentIndex];
  
  res.json({
    success: true,
    message: currentIndex === 0 ? '🎯 Welcome to the Trivia Quiz!' : '➡️ Next question',
    progress: {
      currentQuestion: currentIndex + 1,
      totalQuestions: triviaQuestions.length,
      score: req.session.quiz.score
    },
    question: {
      id: currentQuestion.id,
      text: currentQuestion.question,
      options: currentQuestion.options,
      category: currentQuestion.category,
      difficulty: currentQuestion.difficulty
    },
    instructions: 'Submit your answer using POST /quiz with {"answer": "your_answer"}'
  });
});

// POST /quiz - Submit an answer to the current question
router.post('/', (req, res) => {
  initializeSession(req);
  
  if (req.session.quiz.isCompleted) {
    return res.status(400).json({
      success: false,
      message: 'Quiz already completed. Visit /quiz/score to see results or /quiz/reset to start over.'
    });
  }
  
  const { answer } = req.body;
  const currentIndex = req.session.quiz.currentQuestionIndex;
  
  if (currentIndex >= triviaQuestions.length) {
    return res.status(400).json({
      success: false,
      message: 'No more questions available.'
    });
  }
  
  if (!answer) {
    return res.status(400).json({
      success: false,
      message: 'Answer is required. Please provide your answer.'
    });
  }
  
  const currentQuestion = triviaQuestions[currentIndex];
  const userAnswer = answer.toString().trim();
  const correctAnswer = currentQuestion.answer;
  const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
  
  // Update score if correct
  if (isCorrect) {
    req.session.quiz.score += 1;
  }
  
  // Store the answer
  req.session.quiz.answers.push({
    questionId: currentQuestion.id,
    question: currentQuestion.question,
    userAnswer: userAnswer,
    correctAnswer: correctAnswer,
    isCorrect: isCorrect,
    category: currentQuestion.category,
    difficulty: currentQuestion.difficulty
  });
  
  // Move to next question
  req.session.quiz.currentQuestionIndex += 1;
  
  const isLastQuestion = req.session.quiz.currentQuestionIndex >= triviaQuestions.length;
  
  if (isLastQuestion) {
    req.session.quiz.isCompleted = true;
    req.session.quiz.endTime = new Date();
  }
  
  res.json({
    success: true,
    result: {
      correct: isCorrect,
      message: isCorrect ? '✅ Correct!' : '❌ Incorrect!',
      correctAnswer: correctAnswer,
      explanation: isCorrect ? 'Well done!' : `The correct answer was "${correctAnswer}"`
    },
    progress: {
      currentScore: req.session.quiz.score,
      questionsAnswered: req.session.quiz.answers.length,
      totalQuestions: triviaQuestions.length
    },
    nextStep: isLastQuestion 
      ? 'Quiz completed! Visit /quiz/score to see your final results.'
      : 'Visit /quiz to get the next question.'
  });
});

// GET /quiz/score - Display the user's final score
router.get('/score', (req, res) => {
  if (!req.session.quiz || req.session.quiz.answers.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No quiz data found. Please start a quiz first by visiting /quiz'
    });
  }
  
  const quiz = req.session.quiz;
  const totalQuestions = triviaQuestions.length;
  const score = quiz.score;
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let performance = '';
  if (percentage >= 90) performance = '🏆 Excellent!';
  else if (percentage >= 70) performance = '🎉 Great job!';
  else if (percentage >= 50) performance = '👍 Good effort!';
  else performance = '💪 Keep practicing!';
  
  const timeTaken = quiz.endTime ? 
    Math.round((new Date(quiz.endTime) - new Date(quiz.startTime)) / 1000) : 
    Math.round((new Date() - new Date(quiz.startTime)) / 1000);
  
  // Category breakdown
  const categoryStats = {};
  quiz.answers.forEach(answer => {
    if (!categoryStats[answer.category]) {
      categoryStats[answer.category] = { correct: 0, total: 0 };
    }
    categoryStats[answer.category].total += 1;
    if (answer.isCorrect) categoryStats[answer.category].correct += 1;
  });
  
  res.json({
    success: true,
    message: `${performance} Quiz Results`,
    finalScore: {
      score: score,
      totalQuestions: totalQuestions,
      percentage: percentage,
      timeTaken: `${timeTaken} seconds`
    },
    performance: performance,
    categoryBreakdown: categoryStats,
    detailedAnswers: quiz.answers,
    actions: {
      'GET /quiz/reset': 'Start a new quiz',
      'GET /quiz/stats': 'View overall statistics'
    }
  });
});

// GET /quiz/reset - Reset the quiz
router.get('/reset', (req, res) => {
  req.session.quiz = {
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    startTime: new Date(),
    isCompleted: false
  };
  
  res.json({
    success: true,
    message: '🔄 Quiz reset successfully!',
    action: 'Visit /quiz to start a new quiz'
  });
});

// GET /quiz/stats - Get quiz statistics
router.get('/stats', (req, res) => {
  const stats = {
    totalQuestions: triviaQuestions.length,
    categories: {},
    difficulties: {}
  };
  
  triviaQuestions.forEach(question => {
    // Category stats
    if (!stats.categories[question.category]) {
      stats.categories[question.category] = 0;
    }
    stats.categories[question.category] += 1;
    
    // Difficulty stats
    if (!stats.difficulties[question.difficulty]) {
      stats.difficulties[question.difficulty] = 0;
    }
    stats.difficulties[question.difficulty] += 1;
  });
  
  res.json({
    success: true,
    message: '📊 Quiz Statistics',
    statistics: stats,
    sessionInfo: req.session.quiz ? {
      currentProgress: req.session.quiz.answers.length,
      isActive: !req.session.quiz.isCompleted
    } : null
  });
});

// GET /quiz/questions - View all questions (for reference)
router.get('/questions', (req, res) => {
  const questionsWithoutAnswers = triviaQuestions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    category: q.category,
    difficulty: q.difficulty
  }));
  
  res.json({
    success: true,
    message: '📝 All Quiz Questions',
    totalQuestions: triviaQuestions.length,
    questions: questionsWithoutAnswers,
    note: 'Answers are hidden to maintain quiz integrity'
  });
});

module.exports = router;