// Global JS logic (e.g. sidebar navigation, global event listeners)

// --- Auth Guard ---
if (!window.location.pathname.includes('login.html')) {
    if (!localStorage.getItem('pustakaflow_user') && localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Profile Dropdown Toggle ---
    const profileBtn = document.getElementById('profileToggleBtn');
    const profileDropdown = document.getElementById('profileDropdown');

    if (profileBtn && profileDropdown) {
        // Toggle dropdown on button click
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileDropdown.contains(e.target) && !profileBtn.contains(e.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    }

    // --- Logout Logic ---
    const logoutBtns = document.querySelectorAll('.logout-btn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('pustakaflow_user');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userName');
            window.location.href = 'login.html';
        });
    });

    // --- Dynamic User Profile Update ---
    let userName = localStorage.getItem('userName');
    let userRole = localStorage.getItem('userRole');

    // Fallback for older sessions
    if (!userName && localStorage.getItem('pustakaflow_user')) {
        try {
            const legacyData = JSON.parse(localStorage.getItem('pustakaflow_user'));
            userName = legacyData.name || 'User';
            userRole = legacyData.role || 'user';
        } catch(e) {}
    }

    if (userName && userRole) {
        const displayRole = userRole === 'admin' ? 'Admin' : 'Member';
        const initial = userName.charAt(0).toUpperCase();

        // 1. Update Left Sidebar Profile (aside) and any other name spans
        const nameSpans = document.querySelectorAll('.text-sm.font-medium.text-gray-300');
        nameSpans.forEach(span => {
            span.textContent = `${userName} (${displayRole})`;
        });
        // Also ensure avatar updates (already done below)
        const sidebarAvatar = document.querySelector('aside .rounded-full');

        // 2. Update Topbar Profile (e.g. in index.html, profile.html)
        const topbarAvatar = document.querySelector('#profileToggleBtn .rounded-full');
        if (topbarAvatar) {
            topbarAvatar.textContent = initial;
        }

        // 3. Update Account Settings Page (profile.html)
        const emailInput = document.getElementById('email');
        const fullNameInput = document.getElementById('fullName');
        const largeAvatar = document.querySelector('.w-20.h-20.rounded-full');

        if (emailInput) {
            emailInput.value = `${userName.toLowerCase()}@pustakaflow.local`;
        }
        if (fullNameInput) {
            fullNameInput.value = userName;
        }
        if (largeAvatar) {
            largeAvatar.textContent = initial;
        }
    }
});
