// ============================================
// FIREBASE SETUP
// ============================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getDatabase, ref, set, remove, onValue, get, runTransaction
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey:            "AIzaSyCdbtCNYY-NJK6zNRhUe6Sduz31R8Q3XtA",
  authDomain:        "sadaqah-jariyah-cac9b.firebaseapp.com",
  databaseURL:       "https://sadaqah-jariyah-cac9b-default-rtdb.firebaseio.com",
  projectId:         "sadaqah-jariyah-cac9b",
  storageBucket:     "sadaqah-jariyah-cac9b.firebasestorage.app",
  messagingSenderId: "744079593545",
  appId:             "1:744079593545:web:1491548dad4c207cb12f98"
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

// ============================================
// JUZ DATA
// ============================================
const juzData = [
  { number: 1,  name: "الجزء 1",  range: "الفاتحة (1-7) → البقرة (1-141)" },
  { number: 2,  name: "الجزء 2",  range: "البقرة (142-252)" },
  { number: 3,  name: "الجزء 3",  range: "البقرة (253) → آل عمران (92)" },
  { number: 4,  name: "الجزء 4",  range: "آل عمران (93) → النساء (23)" },
  { number: 5,  name: "الجزء 5",  range: "النساء (24-147)" },
  { number: 6,  name: "الجزء 6",  range: "النساء (148) → المائدة (81)" },
  { number: 7,  name: "الجزء 7",  range: "المائدة (82) → الأنعام (110)" },
  { number: 8,  name: "الجزء 8",  range: "الأنعام (111) → الأعراف (87)" },
  { number: 9,  name: "الجزء 9",  range: "الأعراف (88) → الأنفال (40)" },
  { number: 10, name: "الجزء 10", range: "الأنفال (41) → التوبة (92)" },
  { number: 11, name: "الجزء 11", range: "التوبة (93) → هود (5)" },
  { number: 12, name: "الجزء 12", range: "هود (6) → يوسف (52)" },
  { number: 13, name: "الجزء 13", range: "يوسف (53) → إبراهيم (52)" },
  { number: 14, name: "الجزء 14", range: "الحجر (1) → النحل (128)" },
  { number: 15, name: "الجزء 15", range: "الإسراء (1) → الكهف (74)" },
  { number: 16, name: "الجزء 16", range: "الكهف (75) → طه (135)" },
  { number: 17, name: "الجزء 17", range: "الأنبياء (1) → الحج (78)" },
  { number: 18, name: "الجزء 18", range: "المؤمنون (1) → الفرقان (20)" },
  { number: 19, name: "الجزء 19", range: "الفرقان (21) → النمل (55)" },
  { number: 20, name: "الجزء 20", range: "النمل (56) → العنكبوت (45)" },
  { number: 21, name: "الجزء 21", range: "العنكبوت (46) → الأحزاب (30)" },
  { number: 22, name: "الجزء 22", range: "الأحزاب (31) → يس (27)" },
  { number: 23, name: "الجزء 23", range: "يس (28) → الزمر (31)" },
  { number: 24, name: "الجزء 24", range: "الزمر (32) → فصلت (46)" },
  { number: 25, name: "الجزء 25", range: "فصلت (47) → الجاثية (37)" },
  { number: 26, name: "الجزء 26", range: "الأحقاف (1) → الذاريات (30)" },
  { number: 27, name: "الجزء 27", range: "الذاريات (31) → الحديد (29)" },
  { number: 28, name: "الجزء 28", range: "المجادلة (1) → التحريم (12)" },
  { number: 29, name: "الجزء 29", range: "الملك (1) → المرسلات (50)" },
  { number: 30, name: "الجزء 30", range: "النبأ (1) → الناس (6)" }
];

// ============================================
// STATE
// ============================================
let myClaimedJuz = parseInt(localStorage.getItem('myClaimedJuz')) || null;
let myUserName   = localStorage.getItem('myUserName') || null;
let takenJuz     = {};

// ============================================
// DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', function () {

  // ── Intro ────────────────────────────────
  const introOverlay = document.querySelector('.intro-overlay');
  const introButton  = document.querySelector('.intro-button');

  if (introButton) {
    introButton.addEventListener('click', function () {
      introOverlay.style.transition    = 'opacity 1s ease, transform 1s ease';
      introOverlay.style.opacity       = '0';
      introOverlay.style.transform     = 'scale(1.05)';
      introOverlay.style.pointerEvents = 'none';
      setTimeout(() => { introOverlay.style.display = 'none'; }, 1000);
    });
  }

  // ── Smooth scroll ────────────────────────
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.getElementById(this.getAttribute('href').substring(1));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ── Section fade-in ──────────────────────
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.id === 'dua') animateDuaCards();
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('section').forEach(s => obs.observe(s));

  function animateDuaCards () {
    document.querySelectorAll('.dua-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('animate-in'), i * 180);
    });
  }

  // ── Build Juz Grid ───────────────────────
  const quranGrid = document.getElementById('quranGrid');
  juzData.forEach(juz => {
    const btn = document.createElement('button');
    btn.className   = 'juz-button';
    btn.dataset.juz = juz.number;
    btn.innerHTML   = `
      <div style="font-size:1.3rem;font-weight:700;margin-bottom:0.4rem;">${juz.name}</div>
      <div style="font-size:0.9rem;line-height:1.6;opacity:0.85;">${juz.range}</div>
    `;
    quranGrid.appendChild(btn);
  });

  // ── Juz Click ────────────────────────────
  document.querySelectorAll('.juz-button').forEach(button => {
    button.addEventListener('click', function () {
      const n = parseInt(this.dataset.juz);
      if (myClaimedJuz === n)  { openCancelModal(n); return; }
      if (myClaimedJuz)        { showNotification('لقد اخترت جزءاً من قبل 🕌'); return; }
      if (takenJuz[n])         { showNotification('هذا الجزء محجوز من شخص آخر 🔒'); return; }
      openConfirmModal(n);
    });
  });

  // ============================================
  // MODAL: CONFIRM SELECTION
  // ============================================
  function openConfirmModal (juzNumber) {
    const modal     = document.getElementById('confirmModal');
    const titleEl   = document.getElementById('confirmModalTitle');
    const yesBtn    = document.getElementById('confirmYesBtn');
    const nameInput = document.getElementById('userNameInput');
    const juz       = juzData.find(j => j.number === juzNumber);

    titleEl.textContent         = juz.name;
    nameInput.value             = myUserName || '';
    nameInput.style.borderColor = '';
    nameInput.placeholder       = 'اسمك...';

    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
    nameInput.focus();

    const newYes = yesBtn.cloneNode(true);
    yesBtn.parentNode.replaceChild(newYes, yesBtn);

    newYes.addEventListener('click', function () {
      const name = nameInput.value.trim();
      if (!name) {
        nameInput.style.borderColor = '#e74c3c';
        nameInput.placeholder       = 'يرجى إدخال اسمك أولاً...';
        return;
      }
      myUserName = name;
      localStorage.setItem('myUserName', name);
      closeModal('confirmModal');
      claimJuzSafe(juzNumber, name);
    });

    nameInput.onkeypress = e => { if (e.key === 'Enter') newYes.click(); };
  }

  // ============================================
  // MODAL: CANCEL JUZ
  // ============================================
  function openCancelModal (juzNumber) {
    const modal      = document.getElementById('cancelModal');
    const confirmBtn = document.getElementById('confirmCancelBtn');
    const juz        = juzData.find(j => j.number === juzNumber);

    document.getElementById('cancelModalJuzTitle').textContent = juz.name;
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);

    const newBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
    newBtn.addEventListener('click', () => { releaseJuz(juzNumber); closeModal('cancelModal'); });
  }

  function closeModal (id) {
    const modal = document.getElementById(id);
    modal.classList.remove('show');
    setTimeout(() => { modal.style.display = 'none'; }, 400);
  }

  document.getElementById('confirmModalClose')?.addEventListener('click', () => closeModal('confirmModal'));
  document.getElementById('confirmNoBtn')      ?.addEventListener('click', () => closeModal('confirmModal'));
  document.getElementById('cancelModalClose')  ?.addEventListener('click', () => closeModal('cancelModal'));
  document.getElementById('keepJuzBtn')        ?.addEventListener('click', () => closeModal('cancelModal'));

  ['confirmModal','cancelModal'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', function (e) {
      if (e.target === this) closeModal(id);
    });
  });

  // ============================================
  // CLAIM JUZ — Firebase Transaction
  // ============================================
  function claimJuzSafe (juzNumber, userName) {
    const juzRef = ref(db, `takenJuz/${juzNumber}`);
    runTransaction(juzRef, currentData => {
      if (currentData !== null) return undefined; // abort: already taken
      return { taken: true, name: userName, time: Date.now() };
    })
    .then(result => {
      if (result.committed) {
        myClaimedJuz = juzNumber;
        localStorage.setItem('myClaimedJuz', juzNumber);
        showNotification('تقبل الله منك 🤍');
      } else {
        showNotification('تم حجز هذا الجزء للتو من شخص آخر 🔒');
      }
    })
    .catch(() => showNotification('حدث خطأ، حاول مرة أخرى'));
  }

  // ============================================
  // RELEASE JUZ
  // ============================================
  function releaseJuz (juzNumber) {
    remove(ref(db, `takenJuz/${juzNumber}`))
      .then(() => {
        myClaimedJuz = null;
        localStorage.removeItem('myClaimedJuz');
        showNotification('تم إلغاء الحجز 🔓');
      })
      .catch(() => showNotification('حدث خطأ، حاول مرة أخرى'));
  }

  // ============================================
  // REALTIME LISTENER
  // ============================================
  onValue(ref(db, 'takenJuz'), snapshot => {
    takenJuz = snapshot.val() || {};
    updateJuzCounter();
    renderJuzButtons();
  });

  function renderJuzButtons () {
    document.querySelectorAll('.juz-button').forEach(btn => {
      const n    = parseInt(btn.dataset.juz);
      const juz  = juzData.find(j => j.number === n);
      const info = takenJuz[n];

      if (myClaimedJuz === n) {
        btn.classList.add('selected');
        btn.classList.remove('taken');
        btn.disabled      = false;
        btn.style.opacity = '1';
        btn.innerHTML = `
          <div style="font-size:1.3rem;font-weight:700;margin-bottom:0.4rem;">${juz.name}</div>
          <div style="font-size:0.9rem;line-height:1.6;opacity:0.85;">${juz.range}</div>
          <div style="position:absolute;top:8px;left:8px;background:#4CAF50;color:#fff;padding:0.3rem 0.7rem;border-radius:12px;font-size:0.75rem;font-weight:700;">✓ ${myUserName || 'جزؤك'}</div>
          <div style="position:absolute;bottom:6px;right:50%;transform:translateX(50%);font-size:0.7rem;color:rgba(76,175,80,0.75);white-space:nowrap;">انقر للإلغاء</div>
        `;
      } else if (info) {
        btn.classList.remove('selected');
        btn.classList.add('taken');
        btn.disabled      = true;
        btn.style.opacity = '0.38';
        const taker = (info && info.name) ? info.name : 'محجوز';
        btn.innerHTML = `
          <div style="font-size:1.3rem;font-weight:700;margin-bottom:0.4rem;">${juz.name}</div>
          <div style="font-size:0.9rem;line-height:1.6;">${juz.range}</div>
          <div style="position:absolute;top:8px;left:8px;background:#e74c3c;color:#fff;padding:0.3rem 0.7rem;border-radius:12px;font-size:0.75rem;font-weight:700;">🔒 ${taker}</div>
        `;
      } else {
        btn.classList.remove('selected','taken');
        btn.style.opacity = '1';
        btn.disabled      = !!myClaimedJuz;
        btn.innerHTML = `
          <div style="font-size:1.3rem;font-weight:700;margin-bottom:0.4rem;">${juz.name}</div>
          <div style="font-size:0.9rem;line-height:1.6;opacity:0.85;">${juz.range}</div>
        `;
      }
    });
  }

  // ============================================
  // JUZ COUNTER
  // ============================================
  function updateJuzCounter () {
    const counter = document.getElementById('juzCounter');
    const fill    = document.getElementById('juzProgressFill');
    if (!counter || !fill) return;
    const taken = Object.keys(takenJuz).length;
    const pct   = Math.round((taken / 30) * 100);
    counter.textContent = `${taken} / 30 جزء محجوز — ${pct}%`;
    fill.style.width    = pct + '%';
  }

  // ============================================
  // NOTIFICATION
  // ============================================
  const notification = document.getElementById('notification');

  function showNotification (message) {
    const el = notification.querySelector('.notification-text');
    if (el) el.innerHTML = `<i class="fas fa-heart"></i> ${message}`;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 2800);
  }

  // ============================================
  // SHARE
  // ============================================
  document.getElementById('whatsappBtn')?.addEventListener('click', () => {
    const url  = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('شاركنا في ختمة القرآن — صدقة جارية 🤍\n');
    window.open(`https://wa.me/?text=${text}${url}`, '_blank');
  });

  document.getElementById('shareBtn')?.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({ title: 'أجر | Adjer', url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => showNotification('تم نسخ الرابط 🔗'));
    }
  });

  // ============================================
  // TASBIH
  // ============================================
  const tasbihDisplay = document.querySelector('.tasbih-display');
  const tasbihButton  = document.querySelector('.tasbih-button');
  const resetButton   = document.querySelector('.reset-button');
  const progressFill  = document.querySelector('.progress-fill');
  const maxCount      = 100;
  let   tasbihCount   = parseInt(localStorage.getItem('tasbihCount')) || 0;

  updateTasbihDisplay();

  tasbihButton.addEventListener('click', function () {
    tasbihCount++;
    localStorage.setItem('tasbihCount', tasbihCount);
    updateTasbihDisplay();
    playClick();
    this.style.transform = 'scale(0.95)';
    setTimeout(() => { this.style.transform = ''; }, 100);
    if (tasbihCount % 100 === 0) showNotification(`🌟 أتممت ${tasbihCount} تسبيحة`);
  });

  resetButton.addEventListener('click', () => {
    tasbihCount = 0;
    localStorage.setItem('tasbihCount', 0);
    updateTasbihDisplay();
  });

  function updateTasbihDisplay () {
    tasbihDisplay.textContent = tasbihCount;
    const pct  = (tasbihCount % maxCount) / maxCount * 100;
    const done = tasbihCount > 0 && tasbihCount % maxCount === 0;
    progressFill.style.width      = pct + '%';
    progressFill.style.background = done
      ? 'linear-gradient(90deg,#4CAF50,#8BC34A)'
      : 'linear-gradient(90deg,var(--gold),#ffd700)';
    tasbihDisplay.style.color = done ? '#4CAF50' : 'var(--gold)';
  }

  function playClick () {
    try {
      const ctx  = new (window.AudioContext || window.webkitAudioContext)();
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
  }

  // ============================================
  // GLOBAL COUNTDOWN — FIREBASE
  // startDate stored in Firebase once, shared by all users
  // ============================================
  const dayEl  = document.querySelector('.days');
  const hourEl = document.querySelector('.hours');
  const minEl  = document.querySelector('.minutes');
  const secEl  = document.querySelector('.seconds');
  const doneEl = document.querySelector('.completion-message');
  const dispEl = document.querySelector('.countdown-display');

  const countdownRef    = ref(db, 'weeklyCountdown/startDate');
  let   countdownInterval = null;

  get(countdownRef).then(snapshot => {
    let startTs;
    if (snapshot.exists()) {
      startTs = snapshot.val();
    } else {
      startTs = Date.now();
      set(countdownRef, startTs);
    }
    const target = startTs + 7 * 24 * 60 * 60 * 1000;
    if (Date.now() >= target) {
      const newStart = Date.now();
      set(countdownRef, newStart);
      startCountdown(newStart + 7 * 24 * 60 * 60 * 1000);
    } else {
      startCountdown(target);
    }
  }).catch(() => {
    // Fallback to localStorage
    let stored = parseInt(localStorage.getItem('weeklyCountdownTarget'));
    if (!stored || stored <= Date.now()) {
      stored = Date.now() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem('weeklyCountdownTarget', stored);
    }
    startCountdown(stored);
  });

  function startCountdown (targetTime) {
    if (countdownInterval) clearInterval(countdownInterval);
    tick();
    countdownInterval = setInterval(tick, 1000);

    function tick () {
      const diff = targetTime - Date.now();
      if (diff <= 0) {
        clearInterval(countdownInterval);
        dispEl.style.display = 'none';
        doneEl.style.display = 'block';
        const newStart = Date.now();
        set(countdownRef, newStart).catch(() => {});
        setTimeout(() => {
          doneEl.style.display = 'none';
          dispEl.style.display = 'grid';
          startCountdown(newStart + 7 * 24 * 60 * 60 * 1000);
        }, 5000);
        return;
      }
      dayEl.textContent  = Math.floor(diff / 86400000);
      hourEl.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2,'0');
      minEl.textContent  = String(Math.floor((diff % 3600000)  / 60000)).padStart(2,'0');
      secEl.textContent  = String(Math.floor((diff % 60000)    / 1000)).padStart(2,'0');
    }
  }

  // ============================================
  // STARS PARALLAX
  // ============================================
  const starsContainer = document.querySelector('.stars-container');
  for (let i = 0; i < 100; i++) {
    const s  = document.createElement('div');
    s.className = 'star';
    const sz = Math.random() * 3;
    s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*3}s;animation-duration:${Math.random()*3+2}s;`;
    starsContainer.appendChild(s);
  }

  document.addEventListener('mousemove', e => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    starsContainer.style.transform = `translate(${x*10}px,${y*10}px)`;
  });

  // ============================================
  // CURSOR HALO
  // ============================================
  const cursorHalo = document.querySelector('.cursor-halo');
  document.addEventListener('mousemove', e => {
    cursorHalo.style.left = (e.clientX - 20) + 'px';
    cursorHalo.style.top  = (e.clientY - 20) + 'px';
    let near = false;
    document.querySelectorAll('button, .nav-link, .dua-card').forEach(el => {
      const r = el.getBoundingClientRect();
      if (Math.hypot(e.clientX-(r.left+r.width/2), e.clientY-(r.top+r.height/2)) < 100) near = true;
    });
    cursorHalo.style.transform = near ? 'scale(1.5)' : 'scale(1)';
    cursorHalo.style.opacity   = near ? '1' : '0.7';
  });

  // ============================================
  // HAMBURGER MENU
  // ============================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu      = document.getElementById('navMenu');

  const navOverlay = document.createElement('div');
  navOverlay.className = 'nav-overlay';
  document.body.appendChild(navOverlay);

  const openMenu  = () => { hamburgerBtn.classList.add('open'); navMenu.classList.add('open'); navOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { hamburgerBtn.classList.remove('open'); navMenu.classList.remove('open'); navOverlay.classList.remove('open'); document.body.style.overflow = ''; };

  hamburgerBtn?.addEventListener('click', () => navMenu.classList.contains('open') ? closeMenu() : openMenu());
  navOverlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // ============================================
  // FEEDBACK
  // ============================================
  const starBtns       = document.querySelectorAll('.star-btn');
  const ratingText     = document.getElementById('ratingText');
  const feedbackSubmit = document.getElementById('feedbackSubmit');
  const feedbackThanks = document.getElementById('feedbackThanks');
  const ratingLabels   = ['','ممتاز 🌟','جيد جداً','جيد','مقبول','ضعيف'];
  let   selectedRating = 0;

  starBtns.forEach(star => {
    star.addEventListener('mouseenter', function () {
      const v = parseInt(this.dataset.value);
      starBtns.forEach(s => s.classList.toggle('hovered', parseInt(s.dataset.value) >= v));
      ratingText.textContent = ratingLabels[v];
      ratingText.classList.add('active');
    });
    star.addEventListener('mouseleave', () => {
      starBtns.forEach(s => s.classList.remove('hovered'));
      ratingText.textContent = selectedRating ? ratingLabels[selectedRating] : 'اختر تقييمك';
      if (!selectedRating) ratingText.classList.remove('active');
    });
    star.addEventListener('click', function () {
      selectedRating = parseInt(this.dataset.value);
      starBtns.forEach(s => s.classList.toggle('selected', parseInt(s.dataset.value) >= selectedRating));
      ratingText.textContent = ratingLabels[selectedRating];
      ratingText.classList.add('active');
    });
  });

  if (feedbackSubmit) {
    feedbackSubmit.addEventListener('click', async function () {
      if (!selectedRating) {
        ratingText.textContent = 'يرجى اختيار تقييم أولاً ⭐';
        ratingText.classList.add('active');
        return;
      }
      const SHEET = 'https://script.google.com/macros/s/AKfycbwHfphB7fh1U9anvF9Y50GcZBXSwsHVs2b2BASvGj8O0Ae47GdS-W2HcaVZQyx694WaAw/exec';
      try {
        feedbackSubmit.textContent = '...جاري الإرسال';
        feedbackSubmit.disabled    = true;
        await fetch(SHEET, {
          method: 'POST', mode: 'no-cors',
          body: JSON.stringify({
            rating:    selectedRating,
            feedback1: document.getElementById('feedback1').value || '—',
            feedback2: document.getElementById('feedback2').value || '—',
            feedback3: document.getElementById('feedback3').value || '—'
          })
        });
        feedbackSubmit.style.display = 'none';
        feedbackThanks.style.display = 'block';
      } catch {
        feedbackSubmit.textContent = 'حدث خطأ، حاول مرة أخرى';
        feedbackSubmit.disabled    = false;
      }
    });
  }

  console.log('🌟 أجر | Adjer — Loaded');
  console.log('🤲 In memory of your beloved father and brother');

});
