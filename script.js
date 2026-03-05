// ============================================
// FIREBASE SETUP
// ============================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getDatabase, ref, set, onValue, get, runTransaction, remove
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
// FIREBASE DATABASE STRUCTURE
// ============================================
// takenJuz/{1..30}/count  : number   — how many users selected this juz
// takenJuz/{1..30}/time   : number   — last updated timestamp
// weeklyCountdown/startTime : number — epoch ms when current week started
// weeklyCountdown/resetting : boolean — reset lock (prevents race conditions)
// visitors/total            : number — total unique sessions
//
// REQUIRED FIREBASE RULES:
// { "rules": { ".read": true, ".write": true } }
// ============================================

// ============================================
// JUZ DATA
// ============================================
const juzData = [
  { number:  1, name: "الجزء 1",  range: "الفاتحة (1-7) \u2192 البقرة (1-141)" },
  { number:  2, name: "الجزء 2",  range: "البقرة (142-252)" },
  { number:  3, name: "الجزء 3",  range: "البقرة (253) \u2192 آل عمران (92)" },
  { number:  4, name: "الجزء 4",  range: "آل عمران (93) \u2192 النساء (23)" },
  { number:  5, name: "الجزء 5",  range: "النساء (24-147)" },
  { number:  6, name: "الجزء 6",  range: "النساء (148) \u2192 المائدة (81)" },
  { number:  7, name: "الجزء 7",  range: "المائدة (82) \u2192 الأنعام (110)" },
  { number:  8, name: "الجزء 8",  range: "الأنعام (111) \u2192 الأعراف (87)" },
  { number:  9, name: "الجزء 9",  range: "الأعراف (88) \u2192 الأنفال (40)" },
  { number: 10, name: "الجزء 10", range: "الأنفال (41) \u2192 التوبة (92)" },
  { number: 11, name: "الجزء 11", range: "التوبة (93) \u2192 هود (5)" },
  { number: 12, name: "الجزء 12", range: "هود (6) \u2192 يوسف (52)" },
  { number: 13, name: "الجزء 13", range: "يوسف (53) \u2192 إبراهيم (52)" },
  { number: 14, name: "الجزء 14", range: "الحجر (1) \u2192 النحل (128)" },
  { number: 15, name: "الجزء 15", range: "الإسراء (1) \u2192 الكهف (74)" },
  { number: 16, name: "الجزء 16", range: "الكهف (75) \u2192 طه (135)" },
  { number: 17, name: "الجزء 17", range: "الأنبياء (1) \u2192 الحج (78)" },
  { number: 18, name: "الجزء 18", range: "المؤمنون (1) \u2192 الفرقان (20)" },
  { number: 19, name: "الجزء 19", range: "الفرقان (21) \u2192 النمل (55)" },
  { number: 20, name: "الجزء 20", range: "النمل (56) \u2192 العنكبوت (45)" },
  { number: 21, name: "الجزء 21", range: "العنكبوت (46) \u2192 الأحزاب (30)" },
  { number: 22, name: "الجزء 22", range: "الأحزاب (31) \u2192 يس (27)" },
  { number: 23, name: "الجزء 23", range: "يس (28) \u2192 الزمر (31)" },
  { number: 24, name: "الجزء 24", range: "الزمر (32) \u2192 فصلت (46)" },
  { number: 25, name: "الجزء 25", range: "فصلت (47) \u2192 الجاثية (37)" },
  { number: 26, name: "الجزء 26", range: "الأحقاف (1) \u2192 الذاريات (30)" },
  { number: 27, name: "الجزء 27", range: "الذاريات (31) \u2192 الحديد (29)" },
  { number: 28, name: "الجزء 28", range: "المجادلة (1) \u2192 التحريم (12)" },
  { number: 29, name: "الجزء 29", range: "الملك (1) \u2192 المرسلات (50)" },
  { number: 30, name: "الجزء 30", range: "النبأ (1) \u2192 الناس (6)" }
];

// ============================================
// STATE — anonymous, no personal data stored
// ============================================
let myClaimedJuz = parseInt(localStorage.getItem('myClaimedJuz')) || null;
let takenJuz     = {};  // { juzNumber: { count, time } }

// ============================================
// DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', function () {

  // ─────────────────────────────────────────
  // SPLASH SCREEN
  // Dismissed after Firebase returns first data (or 3s timeout).
  // Hides the empty-grid flash on slow connections.
  // ─────────────────────────────────────────
  const splashEl     = document.getElementById('splashScreen');
  const splashStatus = document.getElementById('splashStatus');
  let splashDismissed = false;

  function dismissSplash() {
    if (splashDismissed) return;
    splashDismissed = true;
    if (splashEl) splashEl.classList.add('hidden');
  }

  // Safety timeout: always dismiss after 3s even if Firebase is slow
  setTimeout(dismissSplash, 3000);

  // ─────────────────────────────────────────
  // OFFLINE BANNER
  // Shows when connection drops, hides when restored.
  // ─────────────────────────────────────────
  const offlineBanner = document.getElementById('offlineBanner');

  function updateOnlineStatus() {
    if (!navigator.onLine) {
      offlineBanner?.classList.add('visible');
    } else {
      offlineBanner?.classList.remove('visible');
    }
  }
  window.addEventListener('online',  updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus(); // check on load

  // ─────────────────────────────────────────
  // INTRO
  // ─────────────────────────────────────────
  const introOverlay = document.querySelector('.intro-overlay');
  const introButton  = document.querySelector('.intro-button');
  if (introButton) {
    introButton.addEventListener('click', function () {
      introOverlay.style.opacity       = '0';
      introOverlay.style.transform     = 'scale(1.05)';
      introOverlay.style.pointerEvents = 'none';
      setTimeout(() => { introOverlay.style.display = 'none'; }, 1000);
    });
  }

  // ─────────────────────────────────────────
  // SMOOTH SCROLL
  // ─────────────────────────────────────────
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById(this.getAttribute('href').substring(1))
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ─────────────────────────────────────────
  // SECTION FADE-IN (IntersectionObserver)
  // ─────────────────────────────────────────
  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.id === 'dua') animateDuaCards();
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('section').forEach(s => sectionObs.observe(s));

  function animateDuaCards() {
    document.querySelectorAll('.dua-card').forEach((card, i) =>
      setTimeout(() => card.classList.add('animate-in'), i * 150)
    );
  }

  // ─────────────────────────────────────────
  // BUILD JUZ GRID
  // ─────────────────────────────────────────
  const quranGrid = document.getElementById('quranGrid');
  juzData.forEach(juz => {
    const btn = document.createElement('button');
    btn.className   = 'juz-button';
    btn.dataset.juz = juz.number;
    btn.innerHTML   = buildJuzHTML(juz, null, false);
    quranGrid.appendChild(btn);
  });

  // ─────────────────────────────────────────
  // JUZ BUTTON HTML BUILDER
  // Shows count + mine badge. No locking.
  // ─────────────────────────────────────────
  // Returns the glow class based on reader count
  function getGlowClass(count) {
    if (count === 0) return 'juz-waiting';
    if (count <= 2)  return 'juz-few';
    if (count <= 5)  return 'juz-some';
    return 'juz-many';
  }

  function buildJuzHTML(juz, info, isMine) {
    const count = info ? (info.count || 0) : 0;

    // Spiritual badge: waiting glyph when empty, reader count when occupied
    const badgeText = count === 0
      ? '✨ في انتظار قارئ'
      : `👥 ${count} ${count === 1 ? 'قارئ' : 'قرّاء'}`;
    const countBadge = `<span class="juz-count-badge">${badgeText}</span>`;

    if (isMine) {
      return `
        <div style="font-size:1.25rem;font-weight:700;">${juz.name}</div>
        <div style="font-size:0.88rem;line-height:1.6;opacity:0.8;">${juz.range}</div>
        <div style="position:absolute;top:8px;left:8px;background:#4CAF50;color:#fff;
             padding:0.25rem 0.65rem;border-radius:10px;font-size:0.72rem;font-weight:700;">
          ✓ اخترته
        </div>
        <button class="juz-share-btn" data-juz="${juz.number}" data-name="${juz.name}"
          onclick="event.stopPropagation();shareJuz(${juz.number},'${juz.name}')">
          <i class="fab fa-whatsapp"></i> شارك
        </button>
        ${countBadge}`;
    }
    return `
      <div style="font-size:1.25rem;font-weight:700;">${juz.name}</div>
      <div style="font-size:0.88rem;line-height:1.6;opacity:0.85;">${juz.range}</div>
      ${countBadge}`;
  }

  // ─────────────────────────────────────────
  // JUZ CLICK HANDLER
  //
  // Cases:
  //   A. Click own juz         → open cancel/switch modal
  //   B. Click different juz,
  //      user has selection    → open confirm-switch modal
  //   C. No selection yet      → open confirm modal
  // ─────────────────────────────────────────
  document.querySelectorAll('.juz-button').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const n = parseInt(this.dataset.juz);

      // Ripple effect — ink wave on tap
      const ripple = document.createElement('span');
      ripple.className = 'juz-ripple';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `width:${size}px;height:${size}px;` +
        `left:${e.clientX - rect.left - size/2}px;` +
        `top:${e.clientY - rect.top - size/2}px;`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);

      if (myClaimedJuz === n) {
        openCancelModal(n, null);
      } else if (myClaimedJuz) {
        openSwitchModal(myClaimedJuz, n);
      } else {
        openConfirmModal(n);
      }
    });
  });

  // ─────────────────────────────────────────
  // MODAL SYSTEM
  //
  // CSS class used: .modal-visible  (opacity:1 + pointer-events:auto)
  // Base state:                     (opacity:0 + pointer-events:none)
  // This allows smooth fade in AND out via CSS transition.
  // ─────────────────────────────────────────
  function openModal(id) {
    const m = document.getElementById(id);
    // requestAnimationFrame ensures display is ready before transition fires
    requestAnimationFrame(() => m.classList.add('modal-visible'));
  }

  function closeModal(id) {
    const m = document.getElementById(id);
    m.classList.remove('modal-visible');
    // No additional action needed — CSS handles opacity fade
    // pointer-events:none prevents interaction while fading
  }

  // CONFIRM: fresh selection (Case C)
  function openConfirmModal(juzNumber) {
    const juz = juzData.find(j => j.number === juzNumber);
    document.getElementById('confirmModalTitle').textContent = juz.name;

    // Clone yes-btn to clear any previous listener
    const oldYes = document.getElementById('confirmYesBtn');
    const newYes = oldYes.cloneNode(true);
    oldYes.parentNode.replaceChild(newYes, oldYes);

    newYes.addEventListener('click', () => {
      closeModal('confirmModal');
      claimJuz(juzNumber);
    });
    openModal('confirmModal');
  }

  // CANCEL: user clicked own juz (Case A)
  // switchTo = null means pure cancel
  function openCancelModal(juzNumber, switchTo) {
    const juz = juzData.find(j => j.number === juzNumber);
    document.getElementById('cancelModalJuzTitle').textContent = juz.name;
    document.getElementById('cancelModalDesc').textContent = 'هل تريد إلغاء اختيارك لهذا الجزء؟';
    document.getElementById('cancelModalIcon').textContent = '🔓';

    const oldBtn = document.getElementById('confirmCancelBtn');
    const newBtn = oldBtn.cloneNode(true);
    oldBtn.parentNode.replaceChild(newBtn, oldBtn);

    newBtn.addEventListener('click', () => {
      closeModal('cancelModal');
      releaseJuz(juzNumber, null); // pure cancel, no switch
    });
    openModal('cancelModal');
  }

  // SWITCH: user has selection and clicked a different juz (Case B)
  function openSwitchModal(oldJuz, newJuz) {
    const oldJuzData = juzData.find(j => j.number === oldJuz);
    const newJuzData = juzData.find(j => j.number === newJuz);
    document.getElementById('cancelModalJuzTitle').textContent = newJuzData.name;
    document.getElementById('cancelModalDesc').textContent =
      `هل تريد الانتقال من ${oldJuzData.name} إلى ${newJuzData.name}؟`;
    document.getElementById('cancelModalIcon').textContent = '🔄';

    const oldBtn = document.getElementById('confirmCancelBtn');
    const newBtn = oldBtn.cloneNode(true);
    oldBtn.parentNode.replaceChild(newBtn, oldBtn);

    newBtn.addEventListener('click', () => {
      closeModal('cancelModal');
      switchJuz(oldJuz, newJuz); // atomic switch
    });
    openModal('cancelModal');
  }

  // Wire close buttons
  document.getElementById('confirmModalClose')?.addEventListener('click', () => closeModal('confirmModal'));
  document.getElementById('confirmNoBtn')     ?.addEventListener('click', () => closeModal('confirmModal'));
  document.getElementById('cancelModalClose') ?.addEventListener('click', () => closeModal('cancelModal'));
  document.getElementById('keepJuzBtn')       ?.addEventListener('click', () => closeModal('cancelModal'));

  // Backdrop click
  ['confirmModal', 'cancelModal'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', function (e) {
      if (e.target === this) closeModal(id);
    });
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal('confirmModal'); closeModal('cancelModal'); }
  });

  // ─────────────────────────────────────────
  // CLAIM JUZ — Firebase atomic increment
  // ─────────────────────────────────────────
  function claimJuz(juzNumber) {
    const juzRef = ref(db, `takenJuz/${juzNumber}`);
    runTransaction(juzRef, current => ({
      count: current ? (current.count || 0) + 1 : 1,
      time:  Date.now()
    }))
    .then(result => {
      if (result.committed) {
        myClaimedJuz = juzNumber;
        localStorage.setItem('myClaimedJuz', String(juzNumber));
        showNotification('تقبل الله منك 🤍');
      } else {
        showNotification('حدث خطأ، حاول مرة أخرى');
      }
    })
    .catch(() => showNotification('حدث خطأ، حاول مرة أخرى'));
  }

  // ─────────────────────────────────────────
  // RELEASE JUZ — Firebase atomic decrement
  // switchToJuz = number → claim after release (switch)
  // switchToJuz = null   → pure cancel
  // ─────────────────────────────────────────
  function releaseJuz(juzNumber, switchToJuz) {
    const juzRef = ref(db, `takenJuz/${juzNumber}`);
    runTransaction(juzRef, current => {
      if (!current) return current;
      const newCount = (current.count || 1) - 1;
      return newCount <= 0 ? null : { count: newCount, time: current.time };
    })
    .then(() => {
      myClaimedJuz = null;
      localStorage.removeItem('myClaimedJuz');
      if (switchToJuz) {
        claimJuz(switchToJuz); // chain: claim new juz after releasing old
      } else {
        showNotification('تم إلغاء الاختيار 🔓');
      }
    })
    .catch(() => showNotification('حدث خطأ، حاول مرة أخرى'));
  }

  // ─────────────────────────────────────────
  // SWITCH JUZ — release old then claim new
  // Sequential: ensures count integrity
  // ─────────────────────────────────────────
  function switchJuz(oldJuz, newJuz) {
    releaseJuz(oldJuz, newJuz);
    // claimJuz(newJuz) is called inside releaseJuz after successful release
  }

  // ─────────────────────────────────────────
  // REAL-TIME LISTENER — takenJuz
  // ─────────────────────────────────────────
  onValue(ref(db, 'takenJuz'), snapshot => {
    takenJuz = snapshot.val() || {};
    updateJuzCounter();
    renderAllButtons();
    dismissSplash(); // Firebase responded — hide splash
  });

  function renderAllButtons() {
    document.querySelectorAll('.juz-button').forEach(btn => {
      const n     = parseInt(btn.dataset.juz);
      const juz   = juzData.find(j => j.number === n);
      const info  = takenJuz[n] || null;
      const mine  = myClaimedJuz === n;
      const count = info ? (info.count || 0) : 0;

      btn.classList.toggle('selected', mine);
      btn.style.opacity = '1';
      btn.disabled = false;

      // Apply spiritual glow class based on reader count
      btn.classList.remove('juz-waiting', 'juz-few', 'juz-some', 'juz-many');
      if (!mine) {
        // Only apply glow states to non-selected buttons
        // (selected uses its own green style)
        btn.classList.add(getGlowClass(count));
      }

      btn.innerHTML = buildJuzHTML(juz, info, mine);
    });
  }

  // ─────────────────────────────────────────
  // JUZ PROGRESS COUNTER
  // ─────────────────────────────────────────
  function updateJuzCounter() {
    const counter = document.getElementById('juzCounter');
    const fill    = document.getElementById('juzProgressFill');
    if (!counter || !fill) return;
    const taken = Object.values(takenJuz).filter(v => v && (v.count || 0) > 0).length;
    const pct   = Math.round((taken / 30) * 100);
    counter.textContent = `${taken} / 30 جزء تم اختياره — ${pct}%`;
    fill.style.width    = pct + '%';
  }

  // ─────────────────────────────────────────
  // NOTIFICATION (center pop)
  // ─────────────────────────────────────────
  const notifEl = document.getElementById('notification');
  let notifTimer;
  function showNotification(msg) {
    const el = notifEl.querySelector('.notification-text');
    if (el) el.innerHTML = `<i class="fas fa-heart"></i> ${msg}`;
    notifEl.classList.add('show');
    clearTimeout(notifTimer);
    notifTimer = setTimeout(() => notifEl.classList.remove('show'), 2800);
  }

  // ─────────────────────────────────────────
  // SHARE BUTTONS
  // ─────────────────────────────────────────
  document.getElementById('whatsappBtn')?.addEventListener('click', () => {
    const u = encodeURIComponent(window.location.href);
    const t = encodeURIComponent('شاركنا في ختمة القرآن — صدقة جارية 🤍\n');
    window.open(`https://wa.me/?text=${t}${u}`, '_blank');
  });
  document.getElementById('shareBtn')?.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({ title: 'أجر | Adjer', url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => showNotification('تم نسخ الرابط 🔗'));
    }
  });

  // ─────────────────────────────────────────
  // TASBIH COUNTER (local)
  // ─────────────────────────────────────────
  const tasbihDisplay = document.querySelector('.tasbih-display');
  const tasbihBtn     = document.querySelector('.tasbih-button');
  const resetBtn      = document.querySelector('.reset-button');
  const progFill      = document.querySelector('.progress-fill');
  const TASBIH_MAX    = 100;
  let tasbihCount     = parseInt(localStorage.getItem('tasbihCount')) || 0;
  syncTasbih();

  tasbihBtn.addEventListener('click', function () {
    tasbihCount++;
    localStorage.setItem('tasbihCount', tasbihCount);
    syncTasbih();
    playClick();
    this.style.transform = 'scale(0.95)';
    setTimeout(() => { this.style.transform = ''; }, 100);
    if (tasbihCount % TASBIH_MAX === 0) showNotification(`🌟 أتممت ${tasbihCount} تسبيحة`);
  });
  resetBtn.addEventListener('click', () => {
    tasbihCount = 0;
    localStorage.setItem('tasbihCount', 0);
    syncTasbih();
  });
  function syncTasbih() {
    tasbihDisplay.textContent = tasbihCount;
    const pct  = (tasbihCount % TASBIH_MAX) / TASBIH_MAX * 100;
    const done = tasbihCount > 0 && tasbihCount % TASBIH_MAX === 0;
    progFill.style.width      = pct + '%';
    progFill.style.background = done
      ? 'linear-gradient(90deg,#4CAF50,#8BC34A)'
      : 'linear-gradient(90deg,var(--gold),#ffd700)';
    tasbihDisplay.style.color = done ? '#4CAF50' : 'var(--gold)';
  }
  function playClick() {
    try {
      const ctx  = new (window.AudioContext || window.webkitAudioContext)();
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(820, ctx.currentTime);
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start(); osc.stop(ctx.currentTime + 0.12);
    } catch (_) {}
  }

  // ─────────────────────────────────────────
  // WEEKLY COUNTDOWN — Firebase Synced
  //
  // Firebase paths:
  //   weeklyCountdown/startTime → epoch ms when week began
  //   weeklyCountdown/resetting → boolean lock (race condition guard)
  //
  // Logic:
  //   1. Read startTime from Firebase (never overwrite if exists)
  //   2. If missing: write via transaction (only first user wins)
  //   3. If expired: trigger performWeeklyReset()
  //   4. Tick runs purely client-side (zero Firebase writes per second)
  //   5. On expiry: lock → clear takenJuz → write new startTime → unlock
  //
  // Safe behaviors:
  //   - No writes inside tick() loop (no infinite write issue)
  //   - Lock transaction prevents multiple simultaneous resets
  //   - Loser of lock race waits 3s then reads the new startTime
  //   - Fallback to localStorage if Firebase unreachable
  // ─────────────────────────────────────────
  const WEEK_MS  = 7 * 24 * 60 * 60 * 1000;
  const cdRef    = ref(db, 'weeklyCountdown/startTime');
  const lockRef  = ref(db, 'weeklyCountdown/resetting');

  const dayEl  = document.querySelector('.days');
  const hourEl = document.querySelector('.hours');
  const minEl  = document.querySelector('.minutes');
  const secEl  = document.querySelector('.seconds');
  const doneEl = document.querySelector('.completion-message');
  const dispEl = document.querySelector('.countdown-display');

  let cdInterval = null;

  // Step 1: Read startTime
  get(cdRef).then(snap => {
    if (snap.exists()) {
      const startTime = snap.val();
      const target    = startTime + WEEK_MS;
      if (Date.now() >= target) {
        performWeeklyReset(); // expired
      } else {
        startCountdown(target); // still running
      }
    } else {
      // First ever load — race-safe write via transaction
      runTransaction(cdRef, current => {
        if (current !== null) return undefined; // abort if someone beat us
        return Date.now();
      }).then(result => {
        if (result.committed) {
          startCountdown(result.snapshot.val() + WEEK_MS);
        } else {
          // Someone else wrote it — read their value
          get(cdRef).then(s => { if (s.exists()) startCountdown(s.val() + WEEK_MS); });
        }
      }).catch(fallbackCountdown);
    }
  }).catch(fallbackCountdown);

  function fallbackCountdown() {
    let stored = parseInt(localStorage.getItem('adjer_cdTarget')) || 0;
    if (!stored || stored <= Date.now()) {
      stored = Date.now() + WEEK_MS;
      localStorage.setItem('adjer_cdTarget', stored);
    }
    startCountdown(stored);
  }

  // Step 2: Pure client-side tick — ZERO Firebase writes here
  function startCountdown(targetMs) {
    if (cdInterval) clearInterval(cdInterval);
    tick();
    cdInterval = setInterval(tick, 1000);

    function tick() {
      const diff = targetMs - Date.now();
      if (diff <= 0) {
        clearInterval(cdInterval);
        cdInterval = null;
        dispEl.style.display = 'none';
        doneEl.style.display = 'block';
        performWeeklyReset(); // single call, transaction-protected
        return;
      }
      dayEl.textContent  = Math.floor(diff / 86400000);
      hourEl.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
      minEl.textContent  = String(Math.floor((diff % 3600000)  / 60000)).padStart(2, '0');
      secEl.textContent  = String(Math.floor((diff % 60000)    / 1000)).padStart(2, '0');
    }
  }

  // Step 3: Weekly reset — transaction lock prevents race conditions
  function performWeeklyReset() {
    runTransaction(lockRef, currentLock => {
      if (currentLock === true) return undefined; // lock held → abort
      return true; // acquire lock
    }).then(result => {

      if (!result.committed) {
        // Another user is resetting — wait then read new startTime
        setTimeout(() => {
          get(cdRef).then(snap => {
            if (snap.exists()) {
              doneEl.style.display = 'none';
              dispEl.style.display = 'grid';
              startCountdown(snap.val() + WEEK_MS);
            }
          });
        }, 3500);
        return;
      }

      // We hold the lock — perform the full reset
      const newStartTime = Date.now();

      remove(ref(db, 'takenJuz'))           // clear all juz selections
        .then(() => set(cdRef, newStartTime)) // write new week start
        .then(() => set(lockRef, false))      // release lock
        .then(() => {
          myClaimedJuz = null;
          localStorage.removeItem('myClaimedJuz');
          setTimeout(() => {
            doneEl.style.display = 'none';
            dispEl.style.display = 'grid';
            startCountdown(newStartTime + WEEK_MS);
          }, 5000);
        })
        .catch(() => set(lockRef, false)); // always release lock on failure

    }).catch(fallbackCountdown);
  }

  // ─────────────────────────────────────────
  // VISITOR COUNTER
  //
  // Firebase path: visitors/total
  // Uses sessionStorage to count once per browser session (not per refresh).
  // runTransaction ensures atomic increment — no race conditions.
  // Non-blocking: does not affect page load or any other feature.
  // ─────────────────────────────────────────
  initVisitorCounter();

  function initVisitorCounter() {
    const visitorCountEl = document.getElementById('visitorCount');
    if (!visitorCountEl) return;

    const visitorsRef = ref(db, 'visitors/total');

    // Live display: always show latest count
    onValue(visitorsRef, snap => {
      const total = snap.exists() ? snap.val() : 0;
      visitorCountEl.textContent = total.toLocaleString('ar-EG');
    });

    // Increment only once per session (sessionStorage prevents double-count on refresh)
    if (!sessionStorage.getItem('adjer_visited')) {
      sessionStorage.setItem('adjer_visited', '1');
      runTransaction(visitorsRef, current => (current || 0) + 1)
        .catch(() => {}); // silent fail — counter is non-critical
    }
  }

  // ─────────────────────────────────────────
  // STARS PARALLAX
  // ─────────────────────────────────────────
  const starsEl = document.querySelector('.stars-container');
  for (let i = 0; i < 100; i++) {
    const s  = document.createElement('div');
    s.className = 'star';
    const sz = Math.random() * 2.5 + 0.5;
    s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;`
                    + `animation-delay:${Math.random()*3}s;animation-duration:${Math.random()*3+2}s;`;
    starsEl.appendChild(s);
  }
  document.addEventListener('mousemove', e => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    starsEl.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
  });

  // ─────────────────────────────────────────
  // CURSOR HALO
  // ─────────────────────────────────────────
  const halo = document.querySelector('.cursor-halo');
  document.addEventListener('mousemove', e => {
    halo.style.left = (e.clientX - 20) + 'px';
    halo.style.top  = (e.clientY - 20) + 'px';
    let near = false;
    document.querySelectorAll('button, .nav-link, .dua-card').forEach(el => {
      const r = el.getBoundingClientRect();
      if (Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)) < 90)
        near = true;
    });
    halo.style.transform = near ? 'scale(1.5)' : 'scale(1)';
    halo.style.opacity   = near ? '1' : '0.7';
  });

  // ─────────────────────────────────────────
  // BOTTOM NAVIGATION BAR
  // Highlights the active section as user scrolls.
  // Uses IntersectionObserver for performance (no scroll event).
  // ─────────────────────────────────────────
  const bottomNavItems = document.querySelectorAll('.bottom-nav-item');

  function setActiveNav(sectionId) {
    bottomNavItems.forEach(item => {
      item.classList.toggle('active', item.dataset.section === sectionId);
    });
  }

  // Set first item active on load
  if (bottomNavItems.length) setActiveNav('quran');

  // Track which section is most visible
  const navSectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveNav(entry.target.id);
      }
    });
  }, { threshold: 0.35 });

  document.querySelectorAll('section[id]').forEach(s => navSectionObs.observe(s));

  // Smooth scroll on tap
  bottomNavItems.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.getElementById(this.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ─────────────────────────────────────────
  // FEEDBACK
  // ─────────────────────────────────────────
  const starBtns   = document.querySelectorAll('.star-btn');
  const ratingText = document.getElementById('ratingText');
  const fbSubmit   = document.getElementById('feedbackSubmit');
  const fbThanks   = document.getElementById('feedbackThanks');
  const labels     = ['', 'ممتاز 🌟', 'جيد جداً', 'جيد', 'مقبول', 'ضعيف'];
  let rating = 0;

  starBtns.forEach(s => {
    s.addEventListener('mouseenter', function () {
      const v = +this.dataset.value;
      starBtns.forEach(x => x.classList.toggle('hovered', +x.dataset.value >= v));
      ratingText.textContent = labels[v];
      ratingText.classList.add('active');
    });
    s.addEventListener('mouseleave', () => {
      starBtns.forEach(x => x.classList.remove('hovered'));
      ratingText.textContent = rating ? labels[rating] : 'اختر تقييمك';
      if (!rating) ratingText.classList.remove('active');
    });
    s.addEventListener('click', function () {
      rating = +this.dataset.value;
      starBtns.forEach(x => x.classList.toggle('selected', +x.dataset.value >= rating));
      ratingText.textContent = labels[rating];
      ratingText.classList.add('active');
    });
  });

  fbSubmit?.addEventListener('click', async function () {
    if (!rating) {
      ratingText.textContent = 'يرجى اختيار تقييم أولاً ⭐';
      ratingText.classList.add('active');
      return;
    }
    const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwHfphB7fh1U9anvF9Y50GcZBXSwsHVs2b2BASvGj8O0Ae47GdS-W2HcaVZQyx694WaAw/exec';
    try {
      fbSubmit.textContent = '...جاري الإرسال';
      fbSubmit.disabled    = true;
      await fetch(SHEET_URL, {
        method: 'POST', mode: 'no-cors',
        body: JSON.stringify({
          rating,
          feedback1: document.getElementById('feedback1').value || '—',
          feedback2: document.getElementById('feedback2').value || '—',
          feedback3: document.getElementById('feedback3').value || '—'
        })
      });
      fbSubmit.style.display = 'none';
      fbThanks.style.display = 'block';
    } catch {
      fbSubmit.textContent = 'حدث خطأ، حاول مرة أخرى';
      fbSubmit.disabled    = false;
    }
  });

  console.log('🌟 أجر | Adjer — v4 loaded');
  console.log('🤲 In memory of your beloved father and brother');

}); // end DOMContentLoaded

// ─────────────────────────────────────────
// SHARE JUZ — global (called from inline onclick)
// Sends a ready-made WhatsApp message with the chosen juz.
// ─────────────────────────────────────────
function shareJuz(juzNumber, juzName) {
  const msg = `🤍 اخترت ${juzName} في ختمة هذا الأسبوع\nشارك معنا في إتمام ختمة القرآن صدقة جارية\n${window.location.href}`;
  const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}
