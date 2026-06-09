// js/catalog.js
// Local JSON catalog for PustakaFlow

let allBooks = [];

/** Utility: create an element */
function createEl(tag, classes = [], html = "") {
  const el = document.createElement(tag);
  if (classes.length) el.className = classes.join(" ");
  if (html) el.innerHTML = html;
  return el;
}

/** Show loader in grid */
function showLoader() {
  const grid = document.getElementById("catalogGrid");
  if (!grid) return;
  grid.innerHTML = `
    <div class="col-span-full flex items-center justify-center py-12 space-x-2">
      <svg class="animate-spin h-6 w-6 text-navy-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span class="text-sm text-gray-600">Loading books…</span>
    </div>
  `;
}

/** Render cards from an array of book objects */
function renderBookCards(books) {
  const grid = document.getElementById("catalogGrid");
  if (!grid) return;
  grid.innerHTML = "";

  if (!books || books.length === 0) {
    grid.innerHTML = `<div class="col-span-full py-12 text-center text-gray-500">No books found.</div>`;
    return;
  }

  books.forEach((book) => {
    const title = book.title || "Untitled";
    const author = book.author || "Unknown Author";
    const coverUrl = book.cover_path ? book.cover_path : "https://placehold.co/250x350?text=No+Cover";
    const buttonHref = book.epub_path ? `reader.html?epub=${encodeURIComponent(book.epub_path)}` : null;

    const card = createEl("div", [
      "bg-white",
      "rounded-xl",
      "border",
      "border-gray-150",
      "p-4",
      "shadow-sm",
      "hover:shadow-md",
      "hover:border-gray-200",
      "transition-all",
      "duration-250",
      "group",
      "flex",
      "flex-col",
      "h-full",
      "cursor-pointer",
    ]);

    if (buttonHref) {
      card.setAttribute("onclick", `window.location.href='${buttonHref}'`);
    }

    card.innerHTML = `
      <div class="aspect-[2/3] w-full bg-gray-50 rounded-lg mb-4 overflow-hidden flex items-center justify-center border border-gray-100">
        <img src="${coverUrl}" alt="Cover" class="w-full h-full object-cover" loading="lazy" />
      </div>
      <h4 class="font-serif text-gray-900 font-semibold leading-snug mb-1 line-clamp-2" title="${title}">${title}</h4>
      <p class="text-xs text-gray-500 mb-2 line-clamp-1">${author}</p>
      <div class="mt-auto flex items-center gap-2">
        ${buttonHref ? `<a href="${buttonHref}" class="text-xs font-medium text-white bg-navy-900 hover:bg-gray-800 px-2.5 py-1.5 rounded transition-colors" onclick="event.stopPropagation();">Read Online</a>` : ""}
      </div>
    `;
    grid.appendChild(card);
  });
}

/** Load books from local JSON file */
async function loadLocalBooks() {
  showLoader();
  try {
    const res = await fetch("books.json");
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    allBooks = data;
    renderBookCards(allBooks);
  } catch (err) {
    console.error("Failed to load local books:", err);
    const grid = document.getElementById("catalogGrid");
    if (grid) {
      grid.innerHTML = `<div class="col-span-full py-12 text-center text-rose-600">Unable to load books. Please check the file.</div>`;
    }
  }
}

/** Search the local books array */
function searchLocalBooks(term) {
  const lowered = term.toLowerCase();
  const filtered = allBooks.filter((b) => {
    return (
      (b.title && b.title.toLowerCase().includes(lowered)) ||
      (b.author && b.author.toLowerCase().includes(lowered))
    );
  });
  renderBookCards(filtered);
}

/** Initialise listeners and load data */
function initCatalog() {
  const searchInput = document.getElementById("catalogSearch");
  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const term = searchInput.value.trim();
        if (term) {
          searchLocalBooks(term);
        } else {
          renderBookCards(allBooks);
        }
      }
    });
  }
  loadLocalBooks();
}

document.addEventListener("DOMContentLoaded", initCatalog);
