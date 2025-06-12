
require('dotenv').config();

const express = require('express');
const postRoutes = require('./routes/postRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;


console.log('Environment check:');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/posts', postRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Blog API',
    endpoints: {
      'GET /posts': 'Get all posts',
      'GET /posts/:id': 'Get post by ID',
      'POST /posts': 'Create new post',
      'PUT /posts/:id': 'Update post by ID',
      'DELETE /posts/:id': 'Delete post by ID'
    }
  });
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});