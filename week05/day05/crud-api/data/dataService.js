const axios = require('axios');

// Base URL for JSONPlaceholder API
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Function to fetch all posts from JSONPlaceholder API
async function fetchPosts() {
  try {
    console.log('🔄 Making GET request to fetch all posts...');
    const response = await axios.get(`${BASE_URL}/posts`);
    
    console.log(`📦 Successfully fetched ${response.data.length} posts from JSONPlaceholder`);
    return response.data;
    
  } catch (error) {
    console.error('💥 Error in fetchPosts:', error.message);
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }
}

// Function to fetch a single post by ID from JSONPlaceholder API
async function fetchPostById(postId) {
  try {
    console.log(`🔄 Making GET request to fetch post with ID: ${postId}...`);
    const response = await axios.get(`${BASE_URL}/posts/${postId}`);
    
    console.log(`📦 Successfully fetched post with ID: ${postId} from JSONPlaceholder`);
    return response.data;
    
  } catch (error) {
    console.error(`💥 Error in fetchPostById for ID ${postId}:`, error.message);
    throw error; // Re-throw to preserve status codes
  }
}

// Function to create a new post via JSONPlaceholder API
async function createPost(postData) {
  try {
    console.log('🔄 Making POST request to create new post...');
    const response = await axios.post(`${BASE_URL}/posts`, postData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`📦 Successfully created post with ID: ${response.data.id}`);
    return response.data;
    
  } catch (error) {
    console.error('💥 Error in createPost:', error.message);
    throw new Error(`Failed to create post: ${error.message}`);
  }
}

// Function to update an existing post via JSONPlaceholder API
async function updatePost(postId, postData) {
  try {
    console.log(`🔄 Making PUT request to update post with ID: ${postId}...`);
    const response = await axios.put(`${BASE_URL}/posts/${postId}`, postData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`📦 Successfully updated post with ID: ${postId}`);
    return response.data;
    
  } catch (error) {
    console.error(`💥 Error in updatePost for ID ${postId}:`, error.message);
    throw new Error(`Failed to update post: ${error.message}`);
  }
}

// Function to delete a post via JSONPlaceholder API
async function deletePost(postId) {
  try {
    console.log(`🔄 Making DELETE request to delete post with ID: ${postId}...`);
    const response = await axios.delete(`${BASE_URL}/posts/${postId}`);
    
    console.log(`📦 Successfully deleted post with ID: ${postId}`);
    return response.data;
    
  } catch (error) {
    console.error(`💥 Error in deletePost for ID ${postId}:`, error.message);
    throw new Error(`Failed to delete post: ${error.message}`);
  }
}

// Export all functions
module.exports = {
  fetchPosts,
  fetchPostById,
  createPost,
  updatePost,
  deletePost
};