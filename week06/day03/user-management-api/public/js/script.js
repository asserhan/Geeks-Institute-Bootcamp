// Enable/disable submit buttons based on form validity
document.addEventListener('DOMContentLoaded', function() {
    // For register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        const registerBtn = document.getElementById('registerBtn');
        const inputs = registerForm.querySelectorAll('input');
        
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                registerBtn.disabled = !Array.from(inputs).every(input => input.value.trim() !== '');
            });
        });
        
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            };
            
            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                const messageDiv = document.getElementById('message');
                
                if (response.ok) {
                    messageDiv.textContent = `Welcome ${result.user.name} ${result.user.lastName}! You have successfully registered.`;
                    messageDiv.className = 'message success';
                    registerForm.reset();
                    registerBtn.disabled = true;
                } else {
                    messageDiv.textContent = result.message;
                    messageDiv.className = 'message error';
                }
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('message').textContent = 'An error occurred during registration.';
                document.getElementById('message').className = 'message error';
            }
        });
    }
    
    // For login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const loginBtn = document.getElementById('loginBtn');
        const inputs = loginForm.querySelectorAll('input');
        
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                loginBtn.disabled = !Array.from(inputs).every(input => input.value.trim() !== '');
            });
        });
        
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            };
            
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                const messageDiv = document.getElementById('message');
                
                if (response.ok) {
                    messageDiv.textContent = `Welcome back ${result.user.name}! You have successfully logged in.`;
                    messageDiv.className = 'message success';
                    loginForm.reset();
                    loginBtn.disabled = true;
                } else {
                    messageDiv.textContent = result.message;
                    messageDiv.className = 'message error';
                }
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('message').textContent = 'An error occurred during login.';
                document.getElementById('message').className = 'message error';
            }
        });
    }
});