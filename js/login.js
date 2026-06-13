const CREDENTIALS = [
    { username: 'Asep', password: 'Tukangbatagor123', role: 'admin' },
    { username: 'cecep', password: 'Tukangbubur123', role: 'user' },
];

if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'index.html';
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
    togglePwdBtn.addEventListener('click', () => {
        passwordVisible = !passwordVisible;
        passwordInput.type = passwordVisible ? 'text' : 'password';
        eyeIcon.innerHTML = passwordVisible
            ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l18 18"></path>`
            : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>`;
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const enteredUser = usernameInput.value.trim();
        const enteredPass = passwordInput.value;

        errorBox.classList.add('hidden');

        loginBtnText.textContent = 'Signing in…';
        loginSpinner.classList.remove('hidden');
        loginBtn.disabled = true;

        setTimeout(() => {
            const match = CREDENTIALS.find(
                (c) => c.username === enteredUser && c.password === enteredPass
            );

            if (match) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', match.role);
                localStorage.setItem('userName', match.username);
                localStorage.setItem('pustakaflow_user', JSON.stringify({
                    name: match.username,
                    email: match.username + '@pustakaflow.local',
                    role: match.role,
                }));

                window.location.href = 'index.html';
            } else {
                errorText.textContent = 'Invalid username or password. Please try again.';
                errorBox.classList.remove('hidden');

                const card = loginForm.closest('.login-card');
                card.classList.add('shake');
                setTimeout(() => card.classList.remove('shake'), 500);

                loginBtnText.textContent = 'Sign In';
                loginSpinner.classList.add('hidden');
                loginBtn.disabled = false;

                passwordInput.value = '';
                passwordInput.focus();
            }
        }, 600);
    });
});
