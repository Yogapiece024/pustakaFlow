// js/dashboard.js
// Dashboard specific JS logic

document.addEventListener('DOMContentLoaded', () => {
    const myBooksCountEl = document.getElementById('myBooksCount');

    if (myBooksCountEl) {
        // Default buku yang di-upload agar UI terlihat hidup saat pertama kali dijalankan
        const defaultBooks = [
            {
                title: "Uploaded Book Title",
                author: "Author Name",
                serial: "USR-2026-001"
            }
        ];

        function getUploadedBooksCount() {
            const stored = localStorage.getItem('pustakaflow_my_books');
            if (!stored) {
                // Inisialisasi default jika belum ada data di localStorage
                localStorage.setItem('pustakaflow_my_books', JSON.stringify(defaultBooks));
                return defaultBooks.length;
            }
            try {
                const books = JSON.parse(stored);
                return Array.isArray(books) ? books.length : 0;
            } catch (e) {
                console.error("Gagal membaca data buku dari localStorage:", e);
                return 0;
            }
        }

        // Set jumlah buku terunggah secara dinamis
        myBooksCountEl.innerText = getUploadedBooksCount();
    }
});
