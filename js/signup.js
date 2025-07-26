// Sign Up Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const signupBtn = document.querySelector('.signup-btn');
    const termsCheckbox = document.getElementById('terms');
    const passwordStrength = document.getElementById('passwordStrength');

    // Password visibility toggle
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icon
        const eyeIcon = this.querySelector('.eye-icon');
        eyeIcon.textContent = type === 'password' ? '👁️' : '🙈';
    });

    // Password strength checker
    function checkPasswordStrength(password) {
        let strength = 0;
        let strengthClass = '';
        
        // Length check
        if (password.length >= 8) strength++;
        
        // Uppercase and lowercase check
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        
        // Number check
        if (/\d/.test(password)) strength++;
        
        // Special character check
        if (/[!@#$%^&*(),.?\":{}|<>]/.test(password)) strength++;
        
        // Determine strength class
        if (strength <= 1) {
            strengthClass = 'weak';
        } else if (strength <= 3) {
            strengthClass = 'medium';
        } else {
            strengthClass = 'strong';
        }
        
        return { strength, strengthClass };
    }

    // Password strength indicator
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const result = checkPasswordStrength(password);
        
        passwordStrength.className = 'password-strength ' + result.strengthClass;
        
        if (password.length === 0) {
            passwordStrength.className = 'password-strength';
        }
    });

    // Form validation functions
    function validateName(name) {
        return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 8;
    }

    function validatePasswordMatch(password, confirmPassword) {
        return password === confirmPassword;
    }

    function showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + '-error');
        const inputElement = document.getElementById(fieldId);
        
        errorElement.textContent = message;
        inputElement.style.borderColor = '#e74c3c';
        
        // Remove error after 5 seconds
        setTimeout(() => {
            errorElement.textContent = '';
            inputElement.style.borderColor = '#e1e5e9';
        }, 5000);
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
    firstNameInput.addEventListener('blur', function() {
        if (this.value && !validateName(this.value)) {
            showError('firstName', 'Please enter a valid first name (letters only, min 2 characters)');
        }
    });

    lastNameInput.addEventListener('blur', function() {
        if (this.value && !validateName(this.value)) {
            showError('lastName', 'Please enter a valid last name (letters only, min 2 characters)');
        }
    });

    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            showError('email', 'Please enter a valid email address');
        }
    });

    passwordInput.addEventListener('blur', function() {
        if (this.value && !validatePassword(this.value)) {
            showError('password', 'Password must be at least 8 characters long');
        }
    });

    confirmPasswordInput.addEventListener('blur', function() {
        if (this.value && !validatePasswordMatch(passwordInput.value, this.value)) {
            showError('confirmPassword', 'Passwords do not match');
        }
    });

    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const termsAccepted = termsCheckbox.checked;
        
        clearErrors();
        
        let isValid = true;
        
        // Validate first name
        if (!firstName) {
            showError('firstName', 'First name is required');
            isValid = false;
        } else if (!validateName(firstName)) {
            showError('firstName', 'Please enter a valid first name');
            isValid = false;
        }
        
        // Validate last name
        if (!lastName) {
            showError('lastName', 'Last name is required');
            isValid = false;
        } else if (!validateName(lastName)) {
            showError('lastName', 'Please enter a valid last name');
            isValid = false;
        }
        
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
            showError('password', 'Password must be at least 8 characters long');
            isValid = false;
        }
        
        // Validate password confirmation
        if (!confirmPassword) {
            showError('confirmPassword', 'Please confirm your password');
            isValid = false;
        } else if (!validatePasswordMatch(password, confirmPassword)) {
            showError('confirmPassword', 'Passwords do not match');
            isValid = false;
        }
        
        // Validate terms acceptance
        if (!termsAccepted) {
            showError('terms', 'You must accept the terms and conditions');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            signupBtn.classList.add('loading');
            signupBtn.querySelector('.loading-spinner').style.display = 'block';
            
            // Simulate API call
            setTimeout(() => {
                // Here you would typically make an API call to your backend
                console.log('Sign up attempt:', { 
                    firstName, 
                    lastName, 
                    email, 
                    password,
                    termsAccepted 
                });
                
                // Simulate successful registration
                showSuccessMessage('Account created successfully! Redirecting to sign in...');
                
                // Store user data temporarily
                localStorage.setItem('registeredEmail', email);
                localStorage.setItem('registeredName', firstName + ' ' + lastName);
                
                // Redirect to sign in page after 2 seconds
                setTimeout(() => {
                    window.location.href = 'signin.html';
                }, 2000);
                
            }, 2000);
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
            max-width: 300px;
        `;
        
        document.body.appendChild(successDiv);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
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

    // Auto-capitalize names
    firstNameInput.addEventListener('input', function() {
        this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1).toLowerCase();
    });

    lastNameInput.addEventListener('input', function() {
        this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1).toLowerCase();
    });

    // Email format helper
    emailInput.addEventListener('input', function() {
        this.value = this.value.toLowerCase();
    });

    // Password requirements tooltip
    passwordInput.addEventListener('focus', function() {
        if (!document.querySelector('.password-requirements')) {
            const tooltip = document.createElement('div');
            tooltip.className = 'password-requirements';
            tooltip.innerHTML = `
                <div style="
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: #333;
                    color: white;
                    padding: 10px;
                    border-radius: 5px;
                    font-size: 0.8rem;
                    z-index: 100;
                    margin-top: 5px;
                ">
                    Password requirements:<br>
                    • At least 8 characters<br>
                    • Mix of uppercase & lowercase<br>
                    • At least one number<br>
                    • At least one special character
                </div>
            `;
            this.parentElement.style.position = 'relative';
            this.parentElement.appendChild(tooltip);
        }
    });

    passwordInput.addEventListener('blur', function() {
        const tooltip = document.querySelector('.password-requirements');
        if (tooltip) {
            tooltip.remove();
        }
    });
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