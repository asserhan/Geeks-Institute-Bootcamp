const express = require('express');
const router = express.Router();

// Homepage route
router.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Homepage</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        max-width: 800px; 
                        margin: 50px auto; 
                        padding: 20px;
                        background-color: #f5f5f5;
                    }
                    .container {
                        background: white;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    h1 { color: #333; }
                    a { 
                        color: #007bff; 
                        text-decoration: none; 
                        margin-right: 15px;
                        padding: 8px 12px;
                        border: 1px solid #007bff;
                        border-radius: 5px;
                        display: inline-block;
                        margin-bottom: 10px;
                    }
                    a:hover { 
                        background-color: #007bff; 
                        color: white; 
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🏠 Welcome to the Homepage!</h1>
                    <p>This is a simple Express.js application with router modules.</p>
                    <h3>Available Routes:</h3>
                    <a href="/">Home</a>
                    <a href="/about">About Us</a>
                    <a href="/contact">Contact</a>
                    <a href="/users">Users</a>
                    <a href="/users/123">User Profile</a>
                </div>
            </body>
        </html>
    `);
});

// About Us route
router.get('/about', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>About Us</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        max-width: 800px; 
                        margin: 50px auto; 
                        padding: 20px;
                        background-color: #f5f5f5;
                    }
                    .container {
                        background: white;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    h1 { color: #333; }
                    a { 
                        color: #007bff; 
                        text-decoration: none; 
                        padding: 8px 12px;
                        border: 1px solid #007bff;
                        border-radius: 5px;
                    }
                    a:hover { 
                        background-color: #007bff; 
                        color: white; 
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>📖 About Us</h1>
                    <p>We are learning Express.js and how to create modular routes using express.Router().</p>
                    <p>This application demonstrates:</p>
                    <ul>
                        <li>Setting up Express.js server</li>
                        <li>Creating router modules</li>
                        <li>Mounting routers in the main application</li>
                        <li>Handling different HTTP routes</li>
                    </ul>
                    <br>
                    <a href="/">← Back to Home</a>
                </div>
            </body>
        </html>
    `);
});

// Contact route
router.get('/contact', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Contact</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        max-width: 800px; 
                        margin: 50px auto; 
                        padding: 20px;
                        background-color: #f5f5f5;
                    }
                    .container {
                        background: white;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    h1 { color: #333; }
                    a { 
                        color: #007bff; 
                        text-decoration: none; 
                        padding: 8px 12px;
                        border: 1px solid #007bff;
                        border-radius: 5px;
                    }
                    a:hover { 
                        background-color: #007bff; 
                        color: white; 
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>📞 Contact Us</h1>
                    <p>Get in touch with us!</p>
                    <p>📧 Email: contact@example.com</p>
                    <p>📱 Phone: (555) 123-4567</p>
                    <p>🏢 Address: 123 Express Lane, Node City, JS 12345</p>
                    <br>
                    <a href="/">← Back to Home</a>
                </div>
            </body>
        </html>
    `);
});

// Users list route
router.get('/users', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
    ];

    res.send(`
        <html>
            <head>
                <title>Users</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        max-width: 800px; 
                        margin: 50px auto; 
                        padding: 20px;
                        background-color: #f5f5f5;
                    }
                    .container {
                        background: white;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    h1 { color: #333; }
                    .user-card {
                        border: 1px solid #ddd;
                        padding: 15px;
                        margin: 10px 0;
                        border-radius: 5px;
                        background-color: #f9f9f9;
                    }
                    a { 
                        color: #007bff; 
                        text-decoration: none; 
                        padding: 8px 12px;
                        border: 1px solid #007bff;
                        border-radius: 5px;
                    }
                    a:hover { 
                        background-color: #007bff; 
                        color: white; 
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>👥 Users List</h1>
                    ${users.map(user => `
                        <div class="user-card">
                            <h3>${user.name}</h3>
                            <p>Email: ${user.email}</p>
                            <a href="/users/${user.id}">View Profile</a>
                        </div>
                    `).join('')}
                    <br>
                    <a href="/">← Back to Home</a>
                </div>
            </body>
        </html>
    `);
});

// Individual user route with parameter
router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const users = {
        '1': { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
        '2': { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
        '3': { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' }
    };

    const user = users[userId];

    if (!user) {
        return res.status(404).send(`
            <html>
                <head>
                    <title>User Not Found</title>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            max-width: 800px; 
                            margin: 50px auto; 
                            padding: 20px;
                            background-color: #f5f5f5;
                            text-align: center;
                        }
                        .container {
                            background: white;
                            padding: 30px;
                            border-radius: 10px;
                            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        }
                        h1 { color: #e74c3c; }
                        a { 
                            color: #007bff; 
                            text-decoration: none; 
                            padding: 8px 12px;
                            border: 1px solid #007bff;
                            border-radius: 5px;
                        }
                        a:hover { 
                            background-color: #007bff; 
                            color: white; 
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>❌ User Not Found</h1>
                        <p>User with ID "${userId}" does not exist.</p>
                        <a href="/users">← Back to Users</a>
                    </div>
                </body>
            </html>
        `);
    }

    res.send(`
        <html>
            <head>
                <title>User Profile - ${user.name}</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        max-width: 800px; 
                        margin: 50px auto; 
                        padding: 20px;
                        background-color: #f5f5f5;
                    }
                    .container {
                        background: white;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    h1 { color: #333; }
                    .profile-info {
                        background-color: #f8f9fa;
                        padding: 20px;
                        border-radius: 8px;
                        margin: 20px 0;
                    }
                    .info-row {
                        margin: 10px 0;
                        padding: 8px 0;
                        border-bottom: 1px solid #eee;
                    }
                    .label {
                        font-weight: bold;
                        color: #555;
                    }
                    a { 
                        color: #007bff; 
                        text-decoration: none; 
                        padding: 8px 12px;
                        border: 1px solid #007bff;
                        border-radius: 5px;
                        margin-right: 10px;
                    }
                    a:hover { 
                        background-color: #007bff; 
                        color: white; 
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>👤 User Profile</h1>
                    <div class="profile-info">
                        <div class="info-row">
                            <span class="label">ID:</span> ${user.id}
                        </div>
                        <div class="info-row">
                            <span class="label">Name:</span> ${user.name}
                        </div>
                        <div class="info-row">
                            <span class="label">Email:</span> ${user.email}
                        </div>
                        <div class="info-row">
                            <span class="label">Role:</span> ${user.role}
                        </div>
                    </div>
                    <a href="/users">← Back to Users</a>
                    <a href="/">🏠 Home</a>
                </div>
            </body>
        </html>
    `);
});

module.exports = router;