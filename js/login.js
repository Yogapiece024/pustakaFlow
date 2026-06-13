const CREDENTIALS = [
    { username: 'Asep', password: 'Tukangbatagor123', role: 'admin' },
    { username: 'cecep', password: 'Tukangbubur123', role: 'user' },
];

try {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'index.html';
    }
} catch (e) {
    console.warn("localStorage is not accessible:", e);
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorBox = document.getElementById('loginError');
    const errorText = document.getElementById('loginErrorText');
    const loginBtn = document.getElementById('loginBtn');
    const loginBtnText = document.getElementById('loginBtnText');
    const loginSpinner = document.getElementById('loginSpinner');
    const togglePwdBtn = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');

    let passwordVisible = false;
    if (togglePwdBtn && passwordInput && eyeIcon) {
        togglePwdBtn.addEventListener('click', () => {
            passwordVisible = !passwordVisible;
            passwordInput.type = passwordVisible ? 'text' : 'password';
            eyeIcon.innerHTML = passwordVisible
                ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l18 18"></path>`
                : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>`;
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const enteredUser = usernameInput.value.trim();
            const enteredPass = passwordInput.value;

            if (errorBox) errorBox.classList.add('hidden');

            if (loginBtnText) loginBtnText.textContent = 'Signing in…';
            if (loginSpinner) loginSpinner.classList.remove('hidden');
            if (loginBtn) loginBtn.disabled = true;

            setTimeout(() => {
                // Case-insensitive username check
                const match = CREDENTIALS.find(
                    (c) => c.username.toLowerCase() === enteredUser.toLowerCase() && c.password === enteredPass
                );

                if (match) {
                    try {
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('userRole', match.role);
                        localStorage.setItem('userName', match.username);
                        localStorage.setItem('pustakaflow_user', JSON.stringify({
                            name: match.username,
                            email: match.username + '@pustakaflow.local',
                            role: match.role,
                        }));
                    } catch (err) {
                        console.error("Failed to write to localStorage:", err);
                    }

                    window.location.href = 'index.html';
                } else {
                    if (errorText) errorText.textContent = 'Invalid username or password. Please try again.';
                    if (errorBox) errorBox.classList.remove('hidden');

                    const card = loginForm.closest('.login-card');
                    if (card) {
                        card.classList.add('shake');
                        setTimeout(() => card.classList.remove('shake'), 500);
                    }

                    if (loginBtnText) loginBtnText.textContent = 'Sign In';
                    if (loginSpinner) loginSpinner.classList.add('hidden');
                    if (loginBtn) loginBtn.disabled = false;

                    passwordInput.value = '';
                    passwordInput.focus();
                }
            }, 600);
        });
    }
});
