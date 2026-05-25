// js/check-status.js

// Assumes there is an input with id 'statusSerialInput' and a button with id 'checkStatusBtn'
// and a div with id 'statusResult' to display the result.

document.addEventListener('DOMContentLoaded', () => {
  const serialInput = document.getElementById('statusSerialInput');
  const checkBtn = document.getElementById('checkStatusBtn');
  const resultDiv = document.getElementById('statusResult');

  if (!serialInput || !checkBtn || !resultDiv) return;

  checkBtn.addEventListener('click', async () => {
    const serial = serialInput.value.trim();
    if (!serial) {
      alert('Please enter a serial code');
      return;
    }
    try {
      const resp = await fetch(`/api/books/${encodeURIComponent(serial)}`);
      const data = await resp.json();
      if (!resp.ok) {
        resultDiv.innerHTML = `<p class="text-red-600">${data.error || 'Error fetching book'}</p>`;
        return;
      }
      // Display book information
      resultDiv.innerHTML = `
        <h3 class="text-lg font-semibold mb-2">${data.title}</h3>
        <p><strong>Status:</strong> ${data.status}</p>
        <img src="${data.cover_path}" alt="Cover" class="mt-2 max-w-xs" />
        <img src="${data.barcode_path}" alt="Barcode" class="mt-2 max-w-xs" />
      `;
    } catch (err) {
      console.error('Check status error:', err);
      resultDiv.innerHTML = '<p class="text-red-600">Network error</p>';
    }
  });
});
