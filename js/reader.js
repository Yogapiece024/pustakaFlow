// js/reader.js

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const epubPath = urlParams.get('epub');
  
  const viewer = document.getElementById('viewer');

  if (!epubPath) {
    viewer.innerHTML = '<div class="flex items-center justify-center h-full text-red-500 font-medium">Error: Tidak ada file buku yang dipilih. Silakan kembali ke katalog.</div>';
    return;
  }

  // Tampilkan pesan loading
  viewer.innerHTML = '<div class="flex flex-col items-center justify-center h-full text-gray-600"><svg class="animate-spin h-8 w-8 text-navy-900 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Loading ebook...</span></div>';

  try {
    // Muat file lokal menggunakan epub.js
    const book = ePub(epubPath);
    
    // Konfigurasi container untuk membaca buku
    // Menggunakan scrolled-doc untuk mencegah bug halaman kosong akibat gagal kalkulasi pagination
    const rendition = book.renderTo("viewer", {
      width: "100%",
      height: "100%",
      spread: "none",
      flow: "scrolled-doc", 
      manager: "continuous"
    });

    // Menangani error dari objek book
    book.on('error', function(err) {
      console.error("ePub Error:", err);
      viewer.innerHTML = '<div class="flex flex-col items-center justify-center h-full text-red-500 font-medium text-center p-6">Gagal memuat buku.<br><span class="text-sm text-gray-500 mt-2">Pastikan file EPUB valid.</span></div>';
    });

    // Render buku saat sudah siap
    book.ready.then(() => {
      // Hapus pesan loading sebelum buku ditampilkan
      const loadingEl = viewer.querySelector('div');
      if (loadingEl) loadingEl.remove();

      return rendition.display();
    }).catch(error => {
      console.error("Display Error:", error);
      viewer.innerHTML = '<div class="flex items-center justify-center h-full text-red-500 font-medium">Gagal menampilkan halaman buku.</div>';
    });



  } catch (error) {
    console.error("Critical Error:", error);
    viewer.innerHTML = '<div class="flex items-center justify-center h-full text-red-500 font-medium">Terjadi kesalahan sistem saat memuat modul pembaca buku.</div>';
  }
});
