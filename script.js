// ============================================
// FIREBASE SETUP
// ============================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, remove, onValue }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCdbtCNYY-NJK6zNRhUe6Sduz31R8Q3XtA",
  authDomain: "sadaqah-jariyah-cac9b.firebaseapp.com",
  databaseURL: "https://sadaqah-jariyah-cac9b-default-rtdb.firebaseio.com",
  projectId: "sadaqah-jariyah-cac9b",
  storageBucket: "sadaqah-jariyah-cac9b.firebasestorage.app",
  messagingSenderId: "744079593545",
  appId: "1:744079593545:web:1491548dad4c207cb12f98"
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // JUZ DATA
  // ============================================
  const juzData = [
    { number: 1,  name: "الجزء 1",  range: "الفاتحة (من الآية 1 إلى الآية 7) → البقرة (من الآية 1 إلى الآية 141)" },
    { number: 2,  name: "الجزء 2",  range: "البقرة (من الآية 142 إلى الآية 252)" },
    { number: 3,  name: "الجزء 3",  range: "البقرة (من الآية 253) → آل عمران (من الآية 92)" },
    { number: 4,  name: "الجزء 4",  range: "آل عمران (من الآية 93) → النساء (من الآية 23)" },
    { number: 5,  name: "الجزء 5",  range: "النساء (من الآية 24 إلى الآية 147)" },
    { number: 6,  name: "الجزء 6",  range: "النساء (من الآية 148) → المائدة (من الآية 81)" },
    { number: 7,  name: "الجزء 7",  range: "المائدة (من الآية 82) → الأنعام (من الآية 110)" },
    { number: 8,  name: "الجزء 8",  range: "الأنعام (من الآية 111) → الأعراف (من الآية 87)" },
    { number: 9,  name: "الجزء 9",  range: "الأعراف (من الآية 88) → الأنفال (من الآية 40)" },
    { number: 10, name: "الجزء 10", range: "الأنفال (من الآية 41) → التوبة (من الآية 92)" },
    { number: 11, name: "الجزء 11", range: "التوبة (من الآية 93) → هود (من الآية 5)" },
    { number: 12, name: "الجزء 12", range: "هود (من الآية 6) → يوسف (من الآية 52)" },
    { number: 13, name: "الجزء 13", range: "يوسف (من الآية 53) → إبراهيم (من الآية 52)" },
    { number: 14, name: "الجزء 14", range: "الحجر (من الآية 1) → النحل (من الآية 128)" },
    { number: 15, name: "الجزء 15", range: "الإسراء (من الآية 1) → الكهف (من الآية 74)" },
    { number: 16, name: "الجزء 16", range: "الكهف (من الآية 75) → طه (من الآية 135)" },
    { number: 17, name: "الجزء 17", range: "الأنبياء (من الآية 1) → الحج (من الآية 78)" },
    { number: 18, name: "الجزء 18", range: "المؤمنون (من الآية 1) → الفرقان (من الآية 20)" },
    { number: 19, name: "الجزء 19", range: "الفرقان (من الآية 21) → النمل (من الآية 55)" },
    { number: 20, name: "الجزء 20", range: "النمل (من الآية 56) → العنكبوت (من الآية 45)" },
    { number: 21, name: "الجزء 21", range: "العنكبوت (من الآية 46) → الأحزاب (من الآية 30)" },
    { number: 22, name: "الجزء 22", range: "الأحزاب (من الآية 31) → يس (من الآية 27)" },
    { number: 23, name: "الجزء 23", range: "يس (من الآية 28) → الزمر (من الآية 31)" },
    { number: 24, name: "الجزء 24", range: "الزمر (من الآية 32) → فصلت (من الآية 46)" },
    { number: 25, name: "الجزء 25", range: "فصلت (من الآية 47) → الجاثية (من الآية 37)" },
    { number: 26, name: "الجزء 26", range: "الأحقاف (من الآية 1) → الذاريات (من الآية 30)" },
    { number: 27, name: "الجزء 27", range: "الذاريات (من الآية 31) → الحديد (من الآية 29)" },
    { number: 28, name: "الجزء 28", range: "المجادلة (من الآية 1) → التحريم (من الآية 12)" },
    { number: 29, name: "الجزء 29", range: "الملك (من الآية 1) → المرسلات (من الآية 50)" },
    { number: 30, name: "الجزء 30", range: "النبأ (من الآية 1) → الناس (من الآية 6)" }
  ];

  // ============================================
  // INTRO OVERLAY
  // ============================================
  const introOverlay = document.querySelector('.intro-overlay');
  const introButton  = document.querySelector('.intro-button');

  if (introButton) {
    introButton.addEventListener('click', function() {
      introOverlay.classList.add('fade-out');
      setTimeout(() => { introOverlay.style.display = 'none'; }, 1000);
    });
  }

  // ============================================
  // SMOOTH SCROLL
  // ============================================
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.getElementById(this.getAttribute('href').substring(1));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ============================================
  // FADE-IN ON SCROLL
  // ============================================
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.id === 'dua') animateDuaCards();
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('section').forEach(s => observer.observe(s));

  function animateDuaCards() {
    document.querySelectorAll('.dua-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('animate-in'), i * 200);
    });
  }

  // ============================================
  // QURAN JUZ SYSTEM — FIREBASE REALTIME SYNC
  // ============================================
  const quranGrid    = document.querySelector('.quran-grid');
  const notification = document.getElementById('notification');

  let myClaimedJuz = parseInt(localStorage.getItem('myClaimedJuz')) || null;
  let myUserName   = localStorage.getItem('myUserName') || null;
  let takenJuz     = {};

  // Generate 30 buttons
  juzData.forEach(juz => {
    const btn = document.createElement('button');
    btn.className   = 'juz-button';
    btn.dataset.juz = juz.number;
    btn.innerHTML   = `
      <div style="font-size:1.5rem;font-weight:bold;margin-bottom:0.5rem;">${juz.name}</div>
      <div style="font-size:1rem;line-height:1.6;opacity:0.9;">${juz.range}</div>
    `;
    quranGrid.appendChild(btn);
  });

  // Click handler
  document.querySelectorAll('.juz-button').forEach(button => {
    button.addEventListener('click', function() {
      const juzNumber = parseInt(this.dataset.juz);

      if (myClaimedJuz === juzNumber) {
        openCancelModal(juzNumber);
        return;
      }
      if (myClaimedJuz) {
        showNotification('لقد اخترت جزءاً من قبل، لا يمكنك تغييره 🕌');
        return;
      }
      if (takenJuz[juzNumber]) {
        showNotification('هذا الجزء محجوز من شخص آخر 🕌');
        return;
      }
      openNameModal(juzNumber);
    });
  });

  // ============================================
  // NAME MODAL
  // ============================================
  function openNameModal(juzNumber) {
    const modal      = document.getElementById('nameModal');
    const nameInput  = document.getElementById('userNameInput');
    const confirmBtn = document.getElementById('nameConfirmBtn');
    const juz        = juzData.find(j => j.number === juzNumber);

    document.getElementById('nameModalJuzTitle').textContent = juz.name;
    nameInput.value             = myUserName || '';
    nameInput.style.borderColor = '';
    modal.style.display         = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
    nameInput.focus();

    const newBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);

    newBtn.addEventListener('click', function() {
      const name = nameInput.value.trim();
      if (!name) {
        nameInput.style.borderColor = '#e74c3c';
        nameInput.placeholder       = 'يرجى إدخال اسمك أولاً...';
        return;
      }
      myUserName = name;
      localStorage.setItem('myUserName', name);
      closeModal('nameModal');
      claimJuz(juzNumber, name);
    });

    nameInput.onkeypress = (e) => { if (e.key === 'Enter') newBtn.click(); };
  }

  // ============================================
  // CANCEL MODAL
  // ============================================
  function openCancelModal(juzNumber) {
    const modal      = document.getElementById('cancelModal');
    const confirmBtn = document.getElementById('confirmCancelBtn');
    const juz        = juzData.find(j => j.number === juzNumber);

    document.getElementById('cancelModalJuzTitle').textContent = juz.name;
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);

    const newBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
    newBtn.addEventListener('click', function() {
      releaseJuz(juzNumber);
      closeModal('cancelModal');
    });
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove('show');
    setTimeout(() => { modal.style.display = 'none'; }, 400);
  }

  document.getElementById('nameModalClose')  ?.addEventListener('click', () => closeModal('nameModal'));
  document.getElementById('cancelModalClose')?.addEventListener('click', () => closeModal('cancelModal'));
  document.getElementById('keepJuzBtn')      ?.addEventListener('click', () => closeModal('cancelModal'));

  ['nameModal', 'cancelModal'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', function(e) {
      if (e.target === this) closeModal(id);
    });
  });

  // ============================================
  // CLAIM / RELEASE JUZ
  // ============================================
  function claimJuz(juzNumber, userName) {
    set(ref(db, 'takenJuz/' + juzNumber), { taken: true, name: userName, time: Date.now() })
      .then(() => {
        myClaimedJuz = juzNumber;
        localStorage.setItem('myClaimedJuz', juzNumber);
        showNotification('تقبل الله منك 🤍');
      })
      .catch(() => showNotification('حدث خطأ، حاول مرة أخرى'));
  }

  function releaseJuz(juzNumber) {
    remove(ref(db, 'takenJuz/' + juzNumber))
      .then(() => {
        myClaimedJuz = null;
        localStorage.removeItem('myClaimedJuz');
        showNotification('تم إلغاء الحجز 🔓');
      })
      .catch(() => showNotification('حدث خطأ، حاول مرة أخرى'));
  }

  // ============================================
  // REAL-TIME LISTENER
  // ============================================
  onValue(ref(db, 'takenJuz'), (snapshot) => {
    takenJuz = snapshot.val() || {};
    updateJuzCounter();

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
          <div style="font-size:1.5rem;font-weight:bold;margin-bottom:0.5rem;">${juz.name}</div>
          <div style="font-size:1rem;line-height:1.6;opacity:0.9;">${juz.range}</div>
          <div style="position:absolute;top:10px;left:10px;background:#4CAF50;color:white;padding:0.4rem 0.8rem;border-radius:15px;font-size:0.8rem;font-weight:bold;">جزؤك ✓ — ${myUserName || ''}</div>
          <div style="position:absolute;bottom:8px;right:50%;transform:translateX(50%);font-size:0.75rem;color:rgba(76,175,80,0.7);white-space:nowrap;">انقر للإلغاء</div>
        `;
      } else if (info) {
        btn.classList.remove('selected');
        btn.classList.add('taken');
        btn.disabled      = true;
        btn.style.opacity = '0.4';
        const takerName = (typeof info === 'object' && info.name) ? info.name : 'محجوز';
        btn.innerHTML = `
          <div style="font-size:1.5rem;font-weight:bold;margin-bottom:0.5rem;">${juz.name}</div>
          <div style="font-size:1rem;line-height:1.6;">${juz.range}</div>
          <div style="position:absolute;top:10px;left:10px;background:#e74c3c;color:white;padding:0.4rem 0.8rem;border-radius:15px;font-size:0.8rem;font-weight:bold;">🔒 ${takerName}</div>
        `;
      } else {
        btn.classList.remove('selected', 'taken');
        btn.style.opacity = '1';
        btn.disabled      = !!myClaimedJuz;
        btn.innerHTML = `
          <div style="font-size:1.5rem;font-weight:bold;margin-bottom:0.5rem;">${juz.name}</div>
          <div style="font-size:1rem;line-height:1.6;opacity:0.9;">${juz.range}</div>
        `;
      }
    });
  });

  // ============================================
  // JUZ COUNTER
  // ============================================
  function updateJuzCounter() {
    const counter = document.getElementById('juzCounter');
    const fill    = document.getElementById('juzProgressFill');
    if (!counter || !fill) return;
    const taken = Object.keys(takenJuz).length;
    const pct   = Math.round((taken / 30) * 100);
    counter.textContent = `${taken} / 30 جزء محجوز — ${pct}%`;
    fill.style.width    = pct + '%';
  }

  function showNotification(message) {
    const notifText = notification.querySelector('.notification-text');
    if (notifText) notifText.innerHTML = `<i class="fas fa-heart"></i> ${message}`;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 2500);
  }

  // ============================================
  // SHARE BUTTONS
  // ============================================
  document.getElementById('whatsappBtn')?.addEventListener('click', function() {
    const url  = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('شاركنا في ختمة القرآن الكريم — صدقة جارية 🤍\n');
    window.open(`https://wa.me/?text=${text}${url}`, '_blank');
  });

  document.getElementById('shareBtn')?.addEventListener('click', function() {
    if (navigator.share) {
      navigator.share({ title: 'صدقة جارية', url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => showNotification('تم نسخ الرابط 🔗'));
    }
  });

  // ============================================
  // TASBIH COUNTER
  // ============================================
  const tasbihDisplay = document.querySelector('.tasbih-display');
  const tasbihButton  = document.querySelector('.tasbih-button');
  const resetButton   = document.querySelector('.reset-button');
  const progressFill  = document.querySelector('.progress-fill');
  const maxCount      = 100;
  let tasbihCount     = parseInt(localStorage.getItem('tasbihCount')) || 0;

  updateTasbihDisplay();

  tasbihButton.addEventListener('click', function() {
    tasbihCount++;
    localStorage.setItem('tasbihCount', tasbihCount);
    updateTasbihDisplay();
    playClickSound();
    this.style.transform = 'scale(0.95)';
    setTimeout(() => { this.style.transform = ''; }, 100);
    if (tasbihCount % 100 === 0) {
      showNotification(`🌟 أتممت ${tasbihCount} تسبيحة`);
    }
  });

  resetButton.addEventListener('click', function() {
    tasbihCount = 0;
    localStorage.setItem('tasbihCount', tasbihCount);
    updateTasbihDisplay();
  });

  function updateTasbihDisplay() {
    tasbihDisplay.textContent = tasbihCount;
    const percentage = (tasbihCount % maxCount) / maxCount * 100;
    progressFill.style.width = percentage + '%';
    if (tasbihCount > 0 && tasbihCount % maxCount === 0) {
      progressFill.style.background = 'linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%)';
      tasbihDisplay.style.color     = '#4CAF50';
    } else {
      progressFill.style.background = 'linear-gradient(90deg, var(--gold) 0%, #ffd700 100%)';
      tasbihDisplay.style.color     = 'var(--gold)';
    }
  }

  function playClickSound() {
    try {
      const ctx  = new (window.AudioContext || window.webkitAudioContext)();
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch(e) {}
  }

  // ============================================
  // WEEKLY COUNTDOWN — FIX: persists across refresh
  // ============================================
  const dayDisplay        = document.querySelector('.days');
  const hourDisplay       = document.querySelector('.hours');
  const minuteDisplay     = document.querySelector('.minutes');
  const secondDisplay     = document.querySelector('.seconds');
  const completionMessage = document.querySelector('.completion-message');
  const countdownDisplay  = document.querySelector('.countdown-display');

  let targetDate;
  const stored = localStorage.getItem('weeklyCountdownTarget');
  if (stored) {
    targetDate = new Date(parseInt(stored));
    if (targetDate <= new Date()) {
      targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 7);
      targetDate.setHours(0, 0, 0, 0);
      localStorage.setItem('weeklyCountdownTarget', targetDate.getTime());
    }
  } else {
    targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    targetDate.setHours(0, 0, 0, 0);
    localStorage.setItem('weeklyCountdownTarget', targetDate.getTime());
  }

  function updateCountdown() {
    const diff = targetDate - new Date();
    if (diff <= 0) {
      countdownDisplay.style.display  = 'none';
      completionMessage.style.display = 'block';
      return;
    }
    dayDisplay.textContent    = Math.floor(diff / 86400000);
    hourDisplay.textContent   = String(Math.floor((diff % 86400000) / 3600000)).padStart(2,'0');
    minuteDisplay.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0');
    secondDisplay.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2,'0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ============================================
  // PARALLAX STARS
  // ============================================
  const starsContainer = document.querySelector('.stars-container');
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.cssText = `
      width:${Math.random()*3}px;
      height:${Math.random()*3}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      animation-delay:${Math.random()*3}s;
      animation-duration:${Math.random()*3+2}s;
    `;
    starsContainer.appendChild(star);
  }

  document.addEventListener('mousemove', function(e) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    starsContainer.style.transform = `translate(${x*10}px, ${y*10}px)`;
  });

  // ============================================
  // GLOWING CURSOR HALO
  // ============================================
  const cursorHalo = document.querySelector('.cursor-halo');

  document.addEventListener('mousemove', function(e) {
    cursorHalo.style.left = (e.clientX - 20) + 'px';
    cursorHalo.style.top  = (e.clientY - 20) + 'px';

    let near = false;
    document.querySelectorAll('button, .nav-link, .dua-card').forEach(el => {
      const r = el.getBoundingClientRect();
      const d = Math.sqrt(Math.pow(e.clientX-(r.left+r.width/2),2)+Math.pow(e.clientY-(r.top+r.height/2),2));
      if (d < 100) {
        near = true;
        cursorHalo.style.transform = 'scale(1.5)';
        cursorHalo.style.opacity   = '1';
      }
    });

    if (!near) {
      cursorHalo.style.transform = 'scale(1)';
      cursorHalo.style.opacity   = '0.7';
    }
  });

  // ============================================
  // FEEDBACK — FIX: single listener only
  // ============================================
  const starBtns       = document.querySelectorAll('.star-btn');
  const ratingText     = document.getElementById('ratingText');
  const feedbackSubmit = document.getElementById('feedbackSubmit');
  const feedbackThanks = document.getElementById('feedbackThanks');
  const ratingLabels   = ['', 'ممتاز 🌟', 'جيد جداً', 'جيد', 'مقبول', 'ضعيف'];
  let selectedRating   = 0;

  starBtns.forEach(star => {
    star.addEventListener('mouseenter', function() {
      const val = parseInt(this.dataset.value);
      starBtns.forEach(s => s.classList.toggle('hovered', parseInt(s.dataset.value) >= val));
      ratingText.textContent = ratingLabels[val];
      ratingText.classList.add('active');
    });
    star.addEventListener('mouseleave', function() {
      starBtns.forEach(s => s.classList.remove('hovered'));
      ratingText.textContent = selectedRating ? ratingLabels[selectedRating] : 'اختر تقييمك';
      if (!selectedRating) ratingText.classList.remove('active');
    });
    star.addEventListener('click', function() {
      selectedRating = parseInt(this.dataset.value);
      starBtns.forEach(s => s.classList.toggle('selected', parseInt(s.dataset.value) >= selectedRating));
      ratingText.textContent = ratingLabels[selectedRating];
      ratingText.classList.add('active');
    });
  });

  if (feedbackSubmit) {
    feedbackSubmit.addEventListener('click', async function() {
      if (!selectedRating) {
        ratingText.textContent = 'يرجى اختيار تقييم أولاً ⭐';
        ratingText.classList.add('active');
        return;
      }

      const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwHfphB7fh1U9anvF9Y50GcZBXSwsHVs2b2BASvGj8O0Ae47GdS-W2HcaVZQyx694WaAw/exec';

      const data = {
        rating:    selectedRating,
        feedback1: document.getElementById('feedback1').value || '—',
        feedback2: document.getElementById('feedback2').value || '—',
        feedback3: document.getElementById('feedback3').value || '—'
      };

      try {
        feedbackSubmit.textContent = '...جاري الإرسال';
        feedbackSubmit.disabled    = true;

        await fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(data) });

        feedbackSubmit.style.display = 'none';
        feedbackThanks.style.display = 'block';

      } catch (error) {
        feedbackSubmit.textContent = 'حدث خطأ، حاول مرة أخرى';
        feedbackSubmit.disabled    = false;
      }
    });
  }

  // ============================================
  // PREVENT WHITE FLASH
  // ============================================
  document.body.style.opacity    = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 100);

  console.log('🌟 Sadaqah Jariyah Website Loaded - Firebase Connected');
  console.log('🤲 In memory of your beloved father and brother');

});
