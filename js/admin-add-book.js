// js/admin-add-book.js
// Serial Code Generator for Add Book CMS
// Mapping of category to prefix codes
const categoryPrefixes = {
  "Fiction": "FIC",
  "Science": "SCI",
  "History": "HIS",
  "Technology": "TEC",
};

// Elements
const categorySelect = document.getElementById('category');
const generateBtn = document.getElementById('generateSerialBtn');
const serialInput = document.getElementById('serialCode');

// Helper to pad numbers with leading zeros
function pad(num, size) {
  let s = String(num);
  while (s.length < size) s = '0' + s;
  return s;
}

// Dummy persistence using localStorage (or fallback to in‑memory)
function getLastSerialNumber() {
  const stored = localStorage.getItem('lastSerialNumber');
  return stored ? parseInt(stored, 10) : 0;
}

function setLastSerialNumber(num) {
  localStorage.setItem('lastSerialNumber', num);
}

function generateSerial() {
  const category = categorySelect.value;
  const prefix = categoryPrefixes[category] || 'GEN';
  const year = new Date().getFullYear();
  // Increment last number
  const lastNum = getLastSerialNumber();
  const nextNum = lastNum + 1;
  setLastSerialNumber(nextNum);
  const padded = pad(nextNum, 4);
  const serial = `${prefix}-${year}-${padded}`;
  serialInput.value = serial;
  const barcodeImg = document.getElementById('barcodePreview');
  if (barcodeImg) barcodeImg.classList.remove('hidden');
}

if (generateBtn && categorySelect && serialInput) {
  generateBtn.addEventListener('click', generateSerial);
}

// Optional: auto‑update prefix when category changes (clear old serial)
if (categorySelect && serialInput) {
  categorySelect.addEventListener('change', () => {
    serialInput.value = '';
  });
}
