// Sign In Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signinForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const signinBtn = document.querySelector('.signin-btn');
    const rememberCheckbox = document.getElementById('remember');

    // Password visibility toggle
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icon
        const eyeIcon = this.querySelector('.eye-icon');
        eyeIcon.textContent = type === 'password' ? '👁️' : '🙈';
    });

    // Form validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    function showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + '-error');
        const inputElement = document.getElementById(fieldId);
        
        errorElement.textContent = message;
        inputElement.style.borderColor = '#e74c3c';
        
        // Remove error after 3 seconds
        setTimeout(() => {
            errorElement.textContent = '';
            inputElement.style.borderColor = '#e1e5e9';
        }, 3000);
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        
        document.querySelectorAll('input').forEach(input => {
            input.style.borderColor = '#e1e5e9';
        });
    }

    // Real-time validation
    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            showError('email', 'Please enter a valid email address');
        }
    });

    passwordInput.addEventListener('blur', function() {
        if (this.value && !validatePassword(this.value)) {
            showError('password', 'Password must be at least 6 characters long');
        }
    });

    // Form submission
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const remember = rememberCheckbox.checked;
        
        clearErrors();
        
        let isValid = true;
        
        // Validate email
        if (!email) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        if (!password) {
            showError('password', 'Password is required');
            isValid = false;
        } else if (!validatePassword(password)) {
            showError('password', 'Password must be at least 6 characters long');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            signinBtn.classList.add('loading');
            signinBtn.querySelector('.loading-spinner').style.display = 'block';
            
            // Simulate API call
            setTimeout(() => {
                // Here you would typically make an API call to your backend
                console.log('Sign in attempt:', { email, password, remember });
                
                // For demo purposes, we'll simulate successful login
                if (email === 'demo@example.com' && password === 'demo123') {
                    // Successful login
                    localStorage.setItem('userEmail', email);
                    if (remember) {
                        localStorage.setItem('rememberMe', 'true');
                    }
                    
                    // Show success message
                    showSuccessMessage('Sign in successful! Redirecting...');
                    
                    // Redirect to main page after 2 seconds
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);
                } else {
                    // Failed login
                    signinBtn.classList.remove('loading');
                    signinBtn.querySelector('.loading-spinner').style.display = 'none';
                    showError('password', 'Invalid email or password');
                }
            }, 1500);
        }
    });

    // Success message function
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(39, 174, 96, 0.3);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(successDiv);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    // Social sign-in buttons
    document.querySelector('.google-btn').addEventListener('click', function() {
        console.log('Google sign-in clicked');
        alert('Google sign-in would be implemented here');
    });

    document.querySelector('.facebook-btn').addEventListener('click', function() {
        console.log('Facebook sign-in clicked');
        alert('Facebook sign-in would be implemented here');
    });

    // Auto-fill remembered email
    const rememberedEmail = localStorage.getItem('userEmail');
    const rememberMe = localStorage.getItem('rememberMe');
    
    if (rememberedEmail && rememberMe === 'true') {
        emailInput.value = rememberedEmail;
        rememberCheckbox.checked = true;
    }

    // Input focus effects
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Demo credentials hint
    setTimeout(() => {
        const hintDiv = document.createElement('div');
        hintDiv.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.95);
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                font-size: 0.85rem;
                color: #666;
                max-width: 250px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                z-index: 1000;
            ">
                <strong>Demo Credentials:</strong><br>
                Email: demo@example.com<br>
                Password: demo123
                <button onclick="this.parentElement.parentElement.remove()" style="
                    position: absolute;
                    top: 5px;
                    right: 8px;
                    background: none;
                    border: none;
                    font-size: 16px;
                    cursor: pointer;
                    color: #999;
                ">×</button>
            </div>
        `;
        document.body.appendChild(hintDiv);
    }, 3000);
});

// Add slideInRight animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);