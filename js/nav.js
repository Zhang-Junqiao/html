// js/nav.js
// Inject navigation and footer in English to avoid repetition.

const pages = [
  { href: 'index.html', label: 'Home' },
  { href: 'spots.html', label: 'Must-See Spots' },
  { href: 'food.html', label: 'Food Map' },
  { href: 'tips.html', label: 'Practical Tips' }
];

// Get current page filename, default to index.html
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// Create header and nav
const header = document.createElement('header');
const nav = document.createElement('nav');

pages.forEach(p => {
  const a = document.createElement('a');
  a.href = p.href;
  a.textContent = p.label;
  if (p.href === currentPage) {
    a.classList.add('active');
  }
  nav.appendChild(a);
});

header.appendChild(nav);

// Create footer
const footer = document.createElement('footer');
footer.innerHTML = '<p>2026 · Junqiao Zhang · Hainan Bielefeld University of Applied Sciences</p >';

// Insert into body
document.body.prepend(header);
document.body.append(footer);