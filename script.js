document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registration-form');
    const loginForm = document.getElementById('login-form');
    const messageDiv = document.getElementById('message');
    const showRegisterButton = document.getElementById('show-register');
    const showLoginButton = document.getElementById('show-login');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const activeUser = localStorage.getItem('activeUser');

    if (activeUser) {
        messageDiv.textContent = `Welcome back, ${activeUser}`;
    }

    const clearFormInputsAndMessage = () => {
        document.querySelectorAll('input').forEach(input => input.value = '');
        messageDiv.textContent = '';
    };

    showRegisterButton.addEventListener('click', () => {
        clearFormInputsAndMessage();
        registrationForm.classList.add('active');
        loginForm.classList.remove('active');
    });

    showLoginButton.addEventListener('click', () => {
        clearFormInputsAndMessage();
        registrationForm.classList.remove('active');
        loginForm.classList.add('active');
    });

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;

        const userExists = users.some(user => user.username === username);

        if (userExists) {
            alert('User is already registered. Redirecting to login page...');
            registrationForm.classList.remove('active');
            loginForm.classList.add('active');
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            messageDiv.textContent = 'Registration successful. Please login.';
            setTimeout(() => {
                messageDiv.textContent = '';
                registrationForm.classList.remove('active');
                loginForm.classList.add('active');
            }, 2000);
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('activeUser', username);
            messageDiv.textContent = `Login successful. Welcome, ${username}`;
            loginForm.reset();
        } else {
            messageDiv.textContent = 'Invalid username or password.';
        }
    });
});
