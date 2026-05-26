// js/my-library.js
document.addEventListener('DOMContentLoaded', () => {

    // ── Tab switching ────────────────────────────────────────────────────────
    const tabUploads  = document.getElementById('tab-uploads');
    const tabBorrowed = document.getElementById('tab-borrowed');
    const panelUploads  = document.getElementById('content-uploads');
    const panelBorrowed = document.getElementById('content-borrowed');

    function activateTab(activeTab, activePanel, inactiveTab, inactivePanel) {
        // Show active panel
        activePanel.classList.remove('hidden');
        // Hide inactive panel
        inactivePanel.classList.add('hidden');

        // Style active tab — Deep Navy underline + bold
        activeTab.classList.add('text-navy-900', 'font-bold', 'border-b-4', 'border-navy-900');
        activeTab.classList.remove('text-gray-500', 'font-normal');

        // Style inactive tab — grey, no underline
        inactiveTab.classList.remove('text-navy-900', 'font-bold', 'border-b-4', 'border-navy-900');
        inactiveTab.classList.add('text-gray-500', 'font-normal');
    }

    if (tabUploads && tabBorrowed) {
        tabUploads.addEventListener('click', () => {
            activateTab(tabUploads, panelUploads, tabBorrowed, panelBorrowed);
        });

        tabBorrowed.addEventListener('click', () => {
            activateTab(tabBorrowed, panelBorrowed, tabUploads, panelUploads);
        });
    }

    // ── Add New Book modal ───────────────────────────────────────────────────
    const addBookBtn   = document.getElementById('addBookBtn');
    const modal        = document.getElementById('addBookModal');
    const closeModal   = document.getElementById('closeAddBookModal');
    const addBookForm  = document.getElementById('addBookForm');
    const uploadsGrid  = document.getElementById('uploadsGrid');

    if (addBookBtn && modal) {
        addBookBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });

        closeModal && closeModal.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.add('hidden');
        });
    }

    if (addBookForm && uploadsGrid) {
        addBookForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const title  = document.getElementById('bookTitle').value.trim() || 'Untitled Book';
            const author = document.getElementById('bookAuthor').value.trim() || 'Unknown Author';
            const serial = `USR-${Math.floor(10000 + Math.random() * 90000)}`;

            // Build new card
            const card = document.createElement('div');
            card.className = 'flex flex-col p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-gray-200 transition-colors';
            card.innerHTML = `
                <div class="w-full h-40 bg-gray-100 rounded mb-3 flex items-center justify-center text-gray-300">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13
                               C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13
                               C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13
                               C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                </div>
                <h3 class="font-medium text-gray-800 font-serif leading-tight">${title}</h3>
                <p class="text-xs text-gray-500 mt-0.5">${author}</p>
                <p class="text-xs text-slate-400 mt-1 font-mono">Serial: ${serial}</p>
            `;

            uploadsGrid.appendChild(card);

            // Reset form & close modal
            addBookForm.reset();
            modal && modal.classList.add('hidden');
        });
    }
});
