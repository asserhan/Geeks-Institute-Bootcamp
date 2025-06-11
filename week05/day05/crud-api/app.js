const express = require('express');
const dataService = require('./data/dataService');

// Create an instance of Express app
const app = express();

// Middleware to parse JSON body content
app.use(express.json());

// Route to fetch all posts using the dataService module
app.get('/api/posts', async (req, res) => {
  try {
    console.log('📡 Fetching posts from JSONPlaceholder API...');
    
    // Use the fetchPosts function from dataService module
    const posts = await dataService.fetchPosts();
    
    console.log('✅ Data successfully retrieved and sent as response');
    console.log(`📊 Total posts retrieved: ${posts.length}`);
    
    // Respond with the fetched data
    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
    
  } catch (error) {
    console.error('❌ Error fetching posts:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch posts',
      error: error.message
    });
  }
});

// Route to fetch a single post by ID
app.get('/api/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    console.log(`📡 Fetching post with ID: ${postId} from JSONPlaceholder API...`);
    
    // Use the fetchPostById function from dataService module
    const post = await dataService.fetchPostById(postId);
    
    console.log('✅ Post data successfully retrieved and sent as response');
    
    // Respond with the fetched post
    res.json({
      success: true,
      data: post
    });
    
  } catch (error) {
    console.error('❌ Error fetching post:', error.message);
    
    if (error.response && error.response.status === 404) {
      res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch post',
        error: error.message
      });
    }
  }
});

// Route to create a new post
app.post('/api/posts', async (req, res) => {
  try {
    const postData = req.body;
    console.log('📡 Creating new post via JSONPlaceholder API...');
    
    // Use the createPost function from dataService module
    const newPost = await dataService.createPost(postData);
    
    console.log('✅ Post successfully created and response sent');
    
    // Respond with the created post
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: newPost
    });
    
  } catch (error) {
    console.error('❌ Error creating post:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to create post',
      error: error.message
    });
  }
});

// Route to update a post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const postData = req.body;
    console.log(`📡 Updating post with ID: ${postId} via JSONPlaceholder API...`);
    
    // Use the updatePost function from dataService module
    const updatedPost = await dataService.updatePost(postId, postData);
    
    console.log('✅ Post successfully updated and response sent');
    
    // Respond with the updated post
    res.json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost
    });
    
  } catch (error) {
    console.error('❌ Error updating post:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update post',
      error: error.message
    });
  }
});

// Route to delete a post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    console.log(`📡 Deleting post with ID: ${postId} via JSONPlaceholder API...`);
    
    // Use the deletePost function from dataService module
    await dataService.deletePost(postId);
    
    console.log('✅ Post successfully deleted and response sent');
    
    // Respond with success message
    res.json({
      success: true,
      message: `Post with ID ${postId} deleted successfully`
    });
    
  } catch (error) {
    console.error('❌ Error deleting post:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to delete post',
      error: error.message
    });
  }
});

// Error handling for invalid routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Set up the app to listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 CRUD API server is running on port ${PORT}`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log(`📖 Available endpoints:`);
  console.log(`   GET    /api/posts        - Get all posts`);
  console.log(`   GET    /api/posts/:id    - Get a specific post`);
  console.log(`   POST   /api/posts        - Create a new post`);
  console.log(`   PUT    /api/posts/:id    - Update a post`);
  console.log(`   DELETE /api/posts/:id    - Delete a post`);
  console.log(`🔗 Data source: https://jsonplaceholder.typicode.com/posts`);
});

module.exports = app;