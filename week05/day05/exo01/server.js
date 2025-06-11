const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data array to simulate a database
let data = [
  {
    id: 1,
    title: 'Getting Started with Node.js',
    content: 'Node.js is a powerful JavaScript runtime built on Chrome\'s V8 JavaScript engine. It allows developers to build scalable server-side applications using JavaScript.'
  },
  {
    id: 2,
    title: 'Understanding RESTful APIs',
    content: 'REST (Representational State Transfer) is an architectural style for designing networked applications. It uses standard HTTP methods like GET, POST, PUT, and DELETE.'
  },
  {
    id: 3,
    title: 'Express.js Fundamentals',
    content: 'Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.'
  }
];

// Helper function to generate unique IDs
function generateId() {
  return data.length > 0 ? Math.max(...data.map(post => post.id)) + 1 : 1;
}

// Helper function to find post by ID
function findPostById(id) {
  return data.find(post => post.id === parseInt(id));
}

// Helper function to find post index by ID
function findPostIndexById(id) {
  return data.findIndex(post => post.id === parseInt(id));
}

// GET /posts - Return all blog posts
app.get('/posts', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: data.length,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error occurred while fetching posts'
    });
  }
});

// GET /posts/:id - Return a specific blog post
app.get('/posts/:id', (req, res) => {
  try {
    const id = req.params.id;
    
    // Validate ID format
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID format'
      });
    }

    const post = findPostById(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error occurred while fetching the post'
    });
  }
});

// POST /posts - Create a new blog post
app.post('/posts', (req, res) => {
  try {
    const { title, content } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required fields'
      });
    }

    // Validate field types and length
    if (typeof title !== 'string' || typeof content !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Title and content must be strings'
      });
    }

    if (title.trim().length === 0 || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Title and content cannot be empty'
      });
    }

    // Create new post
    const newPost = {
      id: generateId(),
      title: title.trim(),
      content: content.trim()
    };

    data.push(newPost);

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: newPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error occurred while creating the post'
    });
  }
});

// PUT /posts/:id - Update an existing blog post
app.put('/posts/:id', (req, res) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;

    // Validate ID format
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID format'
      });
    }

    // Find post
    const postIndex = findPostIndexById(id);
    
    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required fields'
      });
    }

    // Validate field types and length
    if (typeof title !== 'string' || typeof content !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Title and content must be strings'
      });
    }

    if (title.trim().length === 0 || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Title and content cannot be empty'
      });
    }

    // Update post
    data[postIndex] = {
      id: parseInt(id),
      title: title.trim(),
      content: content.trim()
    };

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: data[postIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error occurred while updating the post'
    });
  }
});

// DELETE /posts/:id - Delete a blog post
app.delete('/posts/:id', (req, res) => {
  try {
    const id = req.params.id;

    // Validate ID format
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID format'
      });
    }

    // Find post index
    const postIndex = findPostIndexById(id);
    
    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Remove post from array
    const deletedPost = data.splice(postIndex, 1)[0];

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
      data: deletedPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error occurred while deleting the post'
    });
  }
});

// Error handling for invalid routes (404)
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server'
  });
});

// Set port and start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Blog API server is running on port ${PORT}`);
  console.log(`📝 Available endpoints:`);
  console.log(`   GET    http://localhost:${PORT}/posts`);
  console.log(`   GET    http://localhost:${PORT}/posts/:id`);
  console.log(`   POST   http://localhost:${PORT}/posts`);
  console.log(`   PUT    http://localhost:${PORT}/posts/:id`);
  console.log(`   DELETE http://localhost:${PORT}/posts/:id`);
});

module.exports = app;