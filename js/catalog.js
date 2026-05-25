document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('bookModal');
    const modalPanel = document.getElementById('modalPanel');
    const backdrop = document.getElementById('modalBackdrop');
    const closeBtn = document.getElementById('closeModalBtn');
    const cancelBtn = document.getElementById('cancelModalBtn');
    // Selects all book cards inside the catalog section
    const bookCards = document.querySelectorAll('.grid > .group.cursor-pointer'); 

    function openModal() {
        if (!modal) return;
        modal.classList.remove('hidden');
        // Small delay to allow display block to apply before animating opacity/transform
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            if (modalPanel) {
                modalPanel.classList.remove('scale-95');
                modalPanel.classList.add('scale-100');
            }
        }, 10);
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.add('opacity-0');
        if (modalPanel) {
            modalPanel.classList.remove('scale-100');
            modalPanel.classList.add('scale-95');
        }
        // Wait for transition to finish before hiding completely
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }

    // Add click listener to all book cards
    if (bookCards) {
        bookCards.forEach(card => {
            card.addEventListener('click', openModal);
        });
    }

    // Close listeners
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
});
