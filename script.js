/**
 * Capsule Mood Pixel — Kalender Suasana Hati
 * Navigasi bulan/tahun bebas, localStorage.
 * Hanya bisa mengisi suasana hati untuk hari ini & sebelumnya.
 * Tanggal masa depan terkunci.
 */
const MOODS = [
  { key: 'happy',   label: 'Senang',  color: '#FDC800', icon: 'sun' },
  { key: 'sad',     label: 'Sedih',   color: '#432DD7', icon: 'cloud-rain' },
  { key: 'angry',   label: 'Marah',   color: '#DC2626', icon: 'flame' },
  { key: 'excited', label: 'Semangat',color: '#D97706', icon: 'zap' },
  { key: 'calm',    label: 'Tenang',  color: '#16A34A', icon: 'leaf' },
  { key: 'neutral', label: 'Biasa',   color: 'rgba(28,41,60,0.4)', icon: 'circle' },
];

const STORAGE_PREFIX = 'mood-';
let memoryStore = new Map();
let storageAvailable = false;

try {
  localStorage.setItem('__test','1');
  localStorage.removeItem('__test');
  storageAvailable = true;
} catch {}

function getMood(dateStr) {
  const key = STORAGE_PREFIX + dateStr;
  if (storageAvailable) return localStorage.getItem(key) || null;
  return memoryStore.get(key) || null;
}
function setMood(dateStr, moodKey) {
  const key = STORAGE_PREFIX + dateStr;
  if (storageAvailable) {
    try { localStorage.setItem(key, moodKey); }
    catch { storageAvailable = false; memoryStore.set(key, moodKey); }
  } else {
    memoryStore.set(key, moodKey);
  }
}
function removeMood(dateStr) {
  const key = STORAGE_PREFIX + dateStr;
  if (storageAvailable) localStorage.removeItem(key);
  else memoryStore.delete(key);
}

// ──────────────── Icons ────────────────
function getIcon(iconKey) {
  const paths = {
    sun: `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`,
    'cloud-rain': `<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><line x1="16" y1="14" x2="16" y2="18"/><line x1="12" y1="16" x2="12" y2="20"/><line x1="8" y1="14" x2="8" y2="18"/>`,
    flame: `<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>`,
    zap: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
    leaf: `<path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>`,
    circle: `<circle cx="12" cy="12" r="8"/>`,
  };
  const path = paths[iconKey] || paths.circle;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}

function isLightColor(color) {
  if (color.startsWith('rgba')) {
    const m = color.match(/[\d.]+/g);
    if (m && m.length >= 3) {
      const [r,g,b] = [parseFloat(m[0]), parseFloat(m[1]), parseFloat(m[2])];
      return (0.299*r + 0.587*g + 0.114*b) > 153;
    }
    return true;
  }
  const hex = color.replace('#','');
  const r = parseInt(hex.substr(0,2),16), g = parseInt(hex.substr(2,2),16), b = parseInt(hex.substr(4,2),16);
  return (0.299*r + 0.587*g + 0.114*b) > 153;
}

// ──────────────── DOM ────────────────
const monthTitle = document.getElementById('monthTitle');
const grid = document.getElementById('calendarGrid');
const legend = document.getElementById('legend');
const modalOverlay = document.getElementById('modalOverlay');
const modal = document.getElementById('modal');
const moodOptions = document.getElementById('moodOptions');
const btnClearMood = document.getElementById('btnClearMood');
const modalClose = document.getElementById('modalClose');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const btnToday = document.getElementById('btnToday');

let currentYear, currentMonth;
let activeDate = null; // string YYYY-MM-DD

// ──────────────── Build Legend ────────────────
function buildLegend() {
  legend.innerHTML = MOODS.map(m => {
    const iconSvg = getIcon(m.icon);
    return `<div class="legend-item">
      <span class="legend-swatch" style="background:${m.color};color:${isLightColor(m.color)?'#1C293C':'#FBFBF9'}">${iconSvg}</span>
      ${m.label}
    </div>`;
  }).join('');
}

// ──────────────── Build Mood Options in Modal ────────────────
function buildMoodOptions() {
  moodOptions.innerHTML = MOODS.map(m => {
    const iconSvg = getIcon(m.icon);
    return `<button type="button" class="mood-btn" data-mood="${m.key}">
      <span class="mood-swatch" style="background:${m.color};color:${isLightColor(m.color)?'#1C293C':'#FBFBF9'}">${iconSvg}</span>
      <span class="mood-label">${m.label}</span>
    </button>`;
  }).join('');

  moodOptions.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!activeDate) return;
      const moodKey = btn.dataset.mood;
      setMood(activeDate, moodKey);
      updateCell(activeDate, moodKey);
      closeModal();
    });
  });
}

// ──────────────── Modal Logic ────────────────
function openModal(dateStr) {
  activeDate = dateStr;
  const currentMood = getMood(dateStr);
  moodOptions.querySelectorAll('.mood-btn').forEach(b => {
    b.classList.toggle('is-selected', b.dataset.mood === currentMood);
  });
  modalOverlay.hidden = false;
  requestAnimationFrame(() => modalOverlay.classList.add('is-open'));
  const firstBtn = moodOptions.querySelector('.mood-btn');
  if (firstBtn) firstBtn.focus();
  document.addEventListener('keydown', handleModalKeydown);
}

function closeModal() {
  modalOverlay.classList.remove('is-open');
  setTimeout(() => {
    if (!modalOverlay.classList.contains('is-open')) {
      modalOverlay.hidden = true;
    }
  }, 200);
  activeDate = null;
  document.removeEventListener('keydown', handleModalKeydown);
}

function handleModalKeydown(e) {
  if (e.key === 'Escape') {
    e.preventDefault();
    closeModal();
    return;
  }
  if (e.key === 'Tab') {
    const focusable = modal.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length-1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

btnClearMood.addEventListener('click', () => {
  if (!activeDate) return;
  removeMood(activeDate);
  updateCell(activeDate, null);
  closeModal();
});

// ──────────────── Update Single Cell ────────────────
function updateCell(dateStr, moodKey) {
  const btn = grid.querySelector(`.day-cell[data-date="${dateStr}"]`);
  if (!btn) return;
  if (moodKey) {
    const mood = MOODS.find(m => m.key === moodKey);
    btn.dataset.mood = moodKey;
    btn.style.backgroundColor = mood.color;
    btn.style.color = isLightColor(mood.color) ? '#1C293C' : '#FBFBF9';
  } else {
    delete btn.dataset.mood;
    btn.style.backgroundColor = '';
    btn.style.color = '';
  }
}

// ──────────────── Build Calendar ────────────────
function buildCalendar(year, month) {
  currentYear = year;
  currentMonth = month;
  const bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  monthTitle.textContent = `${bulan[month]} ${year}`;

  const firstDay = new Date(year, month, 1);
  const isoWeekday = (firstDay.getDay() + 6) % 7; // Senin=0
  const startDate = new Date(year, month, 1 - isoWeekday);
  const totalCells = 35;

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

  // Untuk menentukan apakah sel adalah masa depan
  const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  grid.innerHTML = '';
  for (let i = 0; i < totalCells; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const inMonth = d.getMonth() === month;
    const isToday = dateStr === todayStr;

    // Cek masa depan
    const cellDateOnly = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const isFuture = cellDateOnly > todayDateOnly;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'day-cell';
    btn.textContent = d.getDate();
    btn.dataset.date = dateStr;
    btn.setAttribute('role', 'gridcell');
    btn.setAttribute('aria-label', `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`);

    // Disable jika luar bulan atau masa depan
    const isDisabled = !inMonth || isFuture;
    if (isDisabled) {
      btn.classList.add(isFuture ? 'is-future' : 'is-disabled');
      btn.tabIndex = -1;
      btn.setAttribute('aria-disabled', 'true');
    } else {
      btn.tabIndex = 0;
    }

    if (isToday) btn.classList.add('is-today');

    const saved = getMood(dateStr);
    if (saved) {
      btn.dataset.mood = saved;
      const mood = MOODS.find(m => m.key === saved);
      if (mood) {
        btn.style.backgroundColor = mood.color;
        btn.style.color = isLightColor(mood.color) ? '#1C293C' : '#FBFBF9';
      }
    }

    btn.addEventListener('click', () => {
      if (isDisabled) return;
      openModal(dateStr);
    });

    grid.appendChild(btn);
  }
}

// ──────────────── Navigation ────────────────
function navigateToMonth(year, month) {
  buildCalendar(year, month);
}

btnPrev.addEventListener('click', () => {
  let newMonth = currentMonth - 1;
  let newYear = currentYear;
  if (newMonth < 0) {
    newMonth = 11;
    newYear--;
  }
  navigateToMonth(newYear, newMonth);
});

btnNext.addEventListener('click', () => {
  let newMonth = currentMonth + 1;
  let newYear = currentYear;
  if (newMonth > 11) {
    newMonth = 0;
    newYear++;
  }
  navigateToMonth(newYear, newMonth);
});

btnToday.addEventListener('click', () => {
  const today = new Date();
  navigateToMonth(today.getFullYear(), today.getMonth());
});

// ──────────────── Init ────────────────
function init() {
  buildLegend();
  buildMoodOptions();
  const today = new Date();
  buildCalendar(today.getFullYear(), today.getMonth());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}