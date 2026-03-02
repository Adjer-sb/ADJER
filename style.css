/* ============================================
   SADAQAH JARIYAH - LUXURY SPIRITUAL THEME
   In Memory of Beloved Father & Brother
   ============================================ */

:root {
  --primary-dark: #0f2027;
  --secondary-dark: #203a43;
  --tertiary-dark: #2c5364;
  --gold: #f9e27d;
  --gold-glow: rgba(249, 226, 125, 0.5);
  --glass-bg: rgba(15, 32, 39, 0.6);
  --glass-border: rgba(249, 226, 125, 0.2);
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  font-family: 'Cairo', sans-serif;
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--secondary-dark) 50%, var(--tertiary-dark) 100%);
  color: #ffffff;
  overflow-x: hidden;
  position: relative;
  min-height: 100vh;
}

/* ============================================
   ANIMATED STARS BACKGROUND
   ============================================ */
.stars-container {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: -1;
  pointer-events: none;
}

.star {
  position: absolute;
  background: var(--gold);
  border-radius: 50%;
  animation: twinkle 3s infinite alternate;
  box-shadow: 0 0 10px var(--gold-glow);
}

@keyframes twinkle {
  0%   { opacity: 0.3; transform: scale(0.8); }
  100% { opacity: 1;   transform: scale(1.2); }
}

/* ============================================
   INTRO OVERLAY
   ============================================ */
.intro-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--secondary-dark) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 1s ease-out, transform 1s ease-out;
}

.intro-overlay.fade-out {
  opacity: 0;
  transform: scale(1.05);
  pointer-events: none;
}

.quran-verse {
  font-family: 'Amiri', serif;
  font-size: 2.5rem;
  text-align: center;
  color: var(--gold);
  text-shadow: 0 0 30px var(--gold-glow);
  margin-bottom: 2rem;
  padding: 0 2rem;
  line-height: 1.8;
  animation: gentleGlow 3s infinite alternate;
}

.quran-translation {
  font-size: 1.5rem;
  color: #ffffff;
  text-align: center;
  margin-bottom: 3rem;
  opacity: 0.9;
}

.intro-button {
  background: linear-gradient(135deg, var(--gold) 0%, #ffd700 100%);
  color: var(--primary-dark);
  border: none;
  padding: 1.5rem 4rem;
  font-size: 1.8rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 0 40px var(--gold-glow);
  position: relative;
  overflow: hidden;
}

.intro-button:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 0 60px var(--gold-glow);
}

.intro-button::after {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
  transform: rotate(45deg);
  transition: all 0.6s ease;
}

.intro-button:hover::after {
  transform: rotate(45deg) translate(50%, 50%);
}

@keyframes gentleGlow {
  0%   { text-shadow: 0 0 30px var(--gold-glow); }
  100% { text-shadow: 0 0 50px var(--gold-glow), 0 0 70px var(--gold-glow); }
}

/* ============================================
   NAVIGATION
   ============================================ */
nav {
  position: sticky;
  top: 0;
  background: var(--glass-bg);
  backdrop-filter: blur(15px);
  border-bottom: 1px solid var(--glass-border);
  padding: 1rem 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-link {
  color: var(--gold);
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, var(--gold-glow), transparent);
  transition: left 0.5s ease;
}

.nav-link:hover::before { left: 100%; }

.nav-link:hover {
  color: var(--primary-dark);
  background: var(--gold);
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 0 25px var(--gold-glow);
}

/* ============================================
   SECTIONS
   ============================================ */
section {
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease;
}

section.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  font-family: 'Amiri', serif;
  font-size: 3rem;
  text-align: center;
  color: var(--gold);
  margin-bottom: 3rem;
  text-shadow: 0 0 20px var(--gold-glow);
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px; left: 50%;
  transform: translateX(-50%);
  width: 200px; height: 3px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  border-radius: 3px;
}

/* ============================================
   QURAN SECTION
   ============================================ */
.quran-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.juz-button {
  background: var(--glass-bg);
  border: 2px solid var(--glass-border);
  color: var(--gold);
  padding: 2rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.4s ease;
  font-family: 'Cairo', sans-serif;
  position: relative;
  overflow: hidden;
  text-align: center;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.juz-button:hover:not(:disabled) {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px var(--gold-glow);
  border-color: var(--gold);
  background: rgba(249, 226, 125, 0.15);
}

.juz-button:disabled { cursor: not-allowed; opacity: 0.7; }

.juz-button::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, var(--gold-glow), transparent);
  transition: left 0.6s ease;
}

.juz-button:hover:not(:disabled)::before { left: 100%; }

/* ============================================
   DUA & ADHKAR SECTION
   ============================================ */
.dua-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.dua-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.6s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
}

.dua-card.animate-in {
  opacity: 1;
  transform: translateY(0);
  animation: cardFloat 4s infinite ease-in-out;
}

@keyframes cardFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%       { transform: translateY(-10px) rotate(0.5deg); }
}

.dua-card:hover {
  transform: translateY(-15px) rotate(1deg);
  box-shadow: 0 20px 40px var(--gold-glow);
  border-color: var(--gold);
}

.dua-text {
  font-family: 'Amiri', serif;
  font-size: 1.3rem;
  line-height: 1.8;
  color: #ffffff;
  text-align: center;
  margin-bottom: 1.5rem;
}

.dua-card::before {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: radial-gradient(circle, var(--gold-glow) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.dua-card:hover::before { opacity: 0.3; }

/* ============================================
   TASBIH COUNTER
   ============================================ */
.tasbih-container {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 30px;
  padding: 3rem;
  text-align: center;
  backdrop-filter: blur(10px);
  max-width: 600px;
  margin: 0 auto;
}

.tasbih-display {
  font-size: 5rem;
  font-weight: bold;
  color: var(--gold);
  text-shadow: 0 0 30px var(--gold-glow);
  margin-bottom: 1rem;
  font-family: 'Cairo', sans-serif;
  transition: all 0.3s ease;
}

.tasbih-button {
  background: linear-gradient(135deg, var(--gold) 0%, #ffd700 100%);
  color: var(--primary-dark);
  border: none;
  padding: 1.5rem 4rem;
  font-size: 1.8rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Cairo', sans-serif;
  box-shadow: 0 0 30px var(--gold-glow);
  margin: 1rem;
  display: block;
  width: 100%;
}

.tasbih-button:hover  { transform: translateY(-5px); box-shadow: 0 0 50px var(--gold-glow); }
.tasbih-button:active { transform: scale(0.95); }

.reset-button {
  background: transparent;
  border: 2px solid var(--gold);
  color: var(--gold);
  padding: 1rem 3rem;
  font-size: 1.5rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Cairo', sans-serif;
  margin-top: 1rem;
}

.reset-button:hover {
  background: var(--gold);
  color: var(--primary-dark);
  transform: translateY(-3px);
}

.progress-bar {
  width: 100%; height: 20px;
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
  overflow: hidden;
  margin: 2rem 0;
  border: 1px solid var(--glass-border);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--gold) 0%, #ffd700 100%);
  width: 0%;
  transition: width 0.5s ease;
  box-shadow: 0 0 20px var(--gold-glow);
}

/* ============================================
   COUNTDOWN TIMER
   ============================================ */
.countdown-container {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 30px;
  padding: 3rem;
  text-align: center;
  backdrop-filter: blur(10px);
  max-width: 800px;
  margin: 0 auto;
}

.countdown-display {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.time-unit {
  background: rgba(0,0,0,0.3);
  border: 2px solid var(--glass-border);
  border-radius: 20px;
  padding: 2rem 1rem;
  transition: all 0.4s ease;
}

.time-unit:hover {
  border-color: var(--gold);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px var(--gold-glow);
}

.time-value {
  font-size: 3.5rem;
  font-weight: bold;
  color: var(--gold);
  text-shadow: 0 0 20px var(--gold-glow);
  font-family: 'Cairo', sans-serif;
}

.time-label {
  font-size: 1.2rem;
  color: #ffffff;
  margin-top: 0.5rem;
}

.completion-message {
  font-family: 'Amiri', serif;
  font-size: 2.5rem;
  color: var(--gold);
  text-shadow: 0 0 30px var(--gold-glow);
  animation: messageGlow 2s infinite alternate;
  display: none;
}

@keyframes messageGlow {
  0%   { text-shadow: 0 0 30px var(--gold-glow); }
  100% { text-shadow: 0 0 50px var(--gold-glow), 0 0 70px var(--gold-glow); }
}

/* ============================================
   FEEDBACK SECTION
   ============================================ */
.feedback-container {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 30px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.feedback-block { display: flex; flex-direction: column; gap: 0.8rem; }

.feedback-label {
  font-family: 'Amiri', serif;
  font-size: 1.4rem;
  color: var(--gold);
  text-shadow: 0 0 10px var(--gold-glow);
  text-align: right;
}

.star-rating {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  gap: 0.5rem;
}

.star-btn {
  font-size: 3rem;
  color: rgba(249,226,125,0.25);
  cursor: pointer;
  transition: all 0.25s ease;
  line-height: 1;
  user-select: none;
}

.star-btn:hover,
.star-btn.hovered,
.star-btn.selected {
  color: var(--gold);
  text-shadow: 0 0 20px var(--gold-glow);
  transform: scale(1.2);
}

.rating-text {
  text-align: center;
  font-size: 1.1rem;
  color: rgba(255,255,255,0.7);
  min-height: 1.5rem;
  transition: all 0.3s ease;
}

.rating-text.active { color: var(--gold); text-shadow: 0 0 10px var(--gold-glow); }

.feedback-textarea {
  background: rgba(0,0,0,0.3);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 1.2rem 1.5rem;
  color: #ffffff;
  font-family: 'Cairo', sans-serif;
  font-size: 1.1rem;
  resize: vertical;
  min-height: 110px;
  direction: rtl;
  transition: all 0.3s ease;
  outline: none;
}

.feedback-textarea::placeholder { color: rgba(255,255,255,0.35); }

.feedback-textarea:focus {
  border-color: var(--gold);
  box-shadow: 0 0 20px var(--gold-glow);
  background: rgba(0,0,0,0.4);
}

.feedback-submit-btn {
  background: linear-gradient(135deg, var(--gold) 0%, #ffd700 100%);
  color: var(--primary-dark);
  border: none;
  padding: 1.2rem 3rem;
  font-size: 1.4rem;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.4s ease;
  font-family: 'Cairo', sans-serif;
  box-shadow: 0 0 25px var(--gold-glow);
  align-self: center;
}

.feedback-submit-btn:hover  { transform: translateY(-4px) scale(1.05); box-shadow: 0 0 40px var(--gold-glow); }
.feedback-submit-btn:active { transform: scale(0.97); }

.feedback-thanks {
  text-align: center;
  font-family: 'Amiri', serif;
  font-size: 1.8rem;
  color: var(--gold);
  text-shadow: 0 0 20px var(--gold-glow);
  display: none;
  animation: gentleGlow 2s infinite alternate;
}

/* ============================================
   SELECTED / TAKEN JUZ
   ============================================ */
.juz-button.selected {
  background: rgba(76,175,80,0.2);
  border-color: #4CAF50;
  color: #4CAF50;
  cursor: pointer;
}

.juz-button.selected:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(76,175,80,0.3);
  border-color: #4CAF50;
}

/* ============================================
   NOTIFICATION
   ============================================ */
.notification {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%) scale(0);
  z-index: 10000;
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.notification.show { transform: translate(-50%, -50%) scale(1); }

.notification-content {
  background: var(--glass-bg);
  border: 2px solid var(--gold);
  border-radius: 30px;
  padding: 2.5rem 4rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 50px var(--gold-glow);
  text-align: center;
}

.notification-text {
  font-family: 'Amiri', serif;
  font-size: 2.2rem;
  color: var(--gold);
  text-shadow: 0 0 25px var(--gold-glow);
  font-weight: bold;
  letter-spacing: 1px;
}

/* ============================================
   GLOWING CURSOR HALO
   ============================================ */
.cursor-halo {
  position: fixed;
  width: 40px; height: 40px;
  border: 2px solid var(--gold);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transition: all 0.1s ease;
  box-shadow: 0 0 20px var(--gold-glow);
  opacity: 0.7;
}

/* ============================================
   FOOTER
   ============================================ */
footer {
  background: var(--primary-dark);
  padding: 3rem 2rem;
  text-align: center;
  border-top: 2px solid var(--gold);
  margin-top: 5rem;
  position: relative;
}

.footer-text {
  font-family: 'Amiri', serif;
  font-size: 2rem;
  color: var(--gold);
  text-shadow: 0 0 25px var(--gold-glow);
  animation: footerGlow 3s infinite alternate;
}

@keyframes footerGlow {
  0%   { text-shadow: 0 0 25px var(--gold-glow); }
  100% { text-shadow: 0 0 40px var(--gold-glow), 0 0 60px var(--gold-glow); }
}

/* ============================================
   JUZ MODAL (original)
   ============================================ */
.juz-modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(10px);
  z-index: 9999;
  display: none;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.juz-modal-overlay.show { display: flex; opacity: 1; }

.juz-modal {
  background: var(--glass-bg);
  border: 2px solid var(--glass-border);
  border-radius: 25px;
  padding: 3rem;
  max-width: 500px;
  width: 90%;
  text-align: center;
  position: relative;
  backdrop-filter: blur(15px);
  box-shadow: 0 0 50px var(--gold-glow);
  transform: scale(0.9);
  transition: transform 0.4s ease;
}

.juz-modal-overlay.show .juz-modal { transform: scale(1); }

.modal-close {
  position: absolute;
  top: 1rem; left: 1rem;
  background: none; border: none;
  color: var(--gold);
  font-size: 2rem;
  cursor: pointer;
  width: 40px; height: 40px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.modal-close:hover { background: rgba(249,226,125,0.2); transform: rotate(90deg); }

.juz-modal-title {
  font-family: 'Amiri', serif;
  font-size: 2.5rem;
  color: var(--gold);
  margin-bottom: 1.5rem;
  text-shadow: 0 0 20px var(--gold-glow);
}

.juz-modal-range {
  font-size: 1.5rem; color: #ffffff;
  margin-bottom: 2rem; padding: 1rem;
  background: rgba(0,0,0,0.3);
  border-radius: 15px;
  border: 1px solid var(--glass-border);
}

.juz-modal-details {
  font-size: 1.2rem;
  color: rgba(255,255,255,0.9);
  margin-bottom: 2rem;
  line-height: 1.8;
}

.juz-select-btn {
  background: linear-gradient(135deg, var(--gold) 0%, #ffd700 100%);
  color: var(--primary-dark);
  border: none;
  padding: 1.2rem 3rem;
  font-size: 1.3rem;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.4s ease;
  margin: 0.5rem;
  box-shadow: 0 0 20px var(--gold-glow);
}

.juz-select-btn:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 0 30px var(--gold-glow); }
.juz-select-btn:disabled { background: rgba(128,128,128,0.5); color: rgba(255,255,255,0.5); cursor: not-allowed; box-shadow: none; transform: none; }

.juz-status { font-size: 1.1rem; color: #4CAF50; margin-top: 1rem; font-weight: bold; min-height: 1.5rem; }

/* ============================================
   ICON STYLING
   ============================================ */
.nav-link i      { margin-left: 8px;  color: #facc15; }
.section-title i { margin-left: 10px; color: #facc15; }
.notification-text i { margin-left: 8px; color: #ff6b6b; animation: pulse 1.5s infinite; }

@keyframes pulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.2); }
  100% { transform: scale(1); }
}

/* ============================================
   RESPONSIVE — ORIGINAL
   ============================================ */
@media (max-width: 768px) {
  section          { padding: 3rem 1rem; }
  .quran-verse     { font-size: 1.4rem; padding: 0 1rem; }
  .quran-translation { font-size: 1rem; padding: 0 1rem; }
  .intro-button    { font-size: 1.2rem; padding: 1rem 2rem; }
  .section-title   { font-size: 2rem; }
  .dua-cards       { grid-template-columns: 1fr; }
  .dua-text        { font-size: 1.1rem; }
  .dua-card        { padding: 1.8rem; }
  .tasbih-display  { font-size: 3.5rem; }
  .tasbih-button   { font-size: 1.5rem; padding: 1.2rem 3rem; }
  .tasbih-container { padding: 2rem 1rem; }
  .countdown-container { padding: 2rem 1rem; }
  .time-value      { font-size: 2.5rem; }
  .footer-text     { font-size: 1.5rem; }
  .notification-content { padding: 1.5rem 2rem; }
  .notification-text    { font-size: 1.4rem; }
  .juz-modal       { padding: 2rem 1.2rem; width: 95%; }
  .juz-modal-title { font-size: 1.6rem; }
  .juz-modal-range { font-size: 1rem; }
}

@media (max-width: 480px) {
  .section-title    { font-size: 1.6rem; }
  .tasbih-display   { font-size: 2.5rem; }
  .time-value       { font-size: 2rem; }
  .footer-text      { font-size: 1.2rem; }
  .cursor-halo      { display: none; }
  .quran-grid       { grid-template-columns: 1fr; gap: 1rem; }
  .countdown-display { grid-template-columns: repeat(2,1fr); }
}

/* ============================================
   ★ NEW: JUZ COUNTER
   ============================================ */
.juz-counter-box {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 1.5rem 2rem;
  text-align: center;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
}

.juz-counter-text {
  font-family: 'Amiri', serif;
  font-size: 1.6rem;
  color: var(--gold);
  margin-bottom: 1rem;
  text-shadow: 0 0 10px var(--gold-glow);
}

.juz-progress-bar {
  width: 100%; height: 14px;
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--glass-border);
}

.juz-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--gold) 0%, #ffd700 100%);
  width: 0%;
  transition: width 0.6s ease;
  box-shadow: 0 0 15px var(--gold-glow);
  border-radius: 10px;
}

/* ============================================
   ★ NEW: SHARE BUTTONS
   ============================================ */
.share-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.share-btn {
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Cairo', sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.share-whatsapp-btn {
  background: rgba(37,211,102,0.15);
  border: 2px solid rgba(37,211,102,0.5);
  color: #25D366;
}

.share-whatsapp-btn:hover {
  background: #25D366; color: white;
  transform: translateY(-3px);
  box-shadow: 0 0 20px rgba(37,211,102,0.4);
}

.share-link-btn {
  background: rgba(249,226,125,0.1);
  border: 2px solid var(--glass-border);
  color: var(--gold);
}

.share-link-btn:hover {
  background: var(--gold); color: var(--primary-dark);
  transform: translateY(-3px);
  box-shadow: 0 0 20px var(--gold-glow);
}

/* ============================================
   ★ NEW: NAME + CANCEL MODALS
   ============================================ */
.sadaqah-modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(12px);
  z-index: 10001;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.sadaqah-modal-overlay.show { opacity: 1; }

.sadaqah-modal-box {
  background: linear-gradient(135deg, var(--primary-dark), var(--secondary-dark));
  border: 2px solid var(--glass-border);
  border-radius: 25px;
  padding: 2.5rem 2rem;
  max-width: 420px; width: 90%;
  text-align: center;
  position: relative;
  box-shadow: 0 0 60px var(--gold-glow);
  transform: scale(0.88);
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.sadaqah-modal-overlay.show .sadaqah-modal-box { transform: scale(1); }

.sadaqah-modal-close {
  position: absolute;
  top: 1rem; left: 1rem;
  background: none; border: none;
  color: var(--gold); font-size: 1.8rem;
  cursor: pointer;
  width: 36px; height: 36px;
  border-radius: 50%;
  transition: all 0.3s ease; line-height: 1;
}

.sadaqah-modal-close:hover { background: rgba(249,226,125,0.2); transform: rotate(90deg); }

.sadaqah-modal-icon  { font-size: 3rem; margin-bottom: 1rem; }

.sadaqah-modal-title {
  font-family: 'Amiri', serif;
  font-size: 2rem; color: var(--gold);
  margin-bottom: 0.8rem;
  text-shadow: 0 0 15px var(--gold-glow);
}

.sadaqah-modal-desc {
  font-size: 1rem;
  color: rgba(255,255,255,0.7);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.sadaqah-modal-input {
  width: 100%;
  background: rgba(0,0,0,0.4);
  border: 2px solid var(--glass-border);
  border-radius: 15px;
  padding: 1rem 1.2rem;
  color: white;
  font-family: 'Cairo', sans-serif;
  font-size: 1.1rem;
  direction: rtl; text-align: center;
  outline: none;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
}

.sadaqah-modal-input:focus { border-color: var(--gold); box-shadow: 0 0 15px var(--gold-glow); }
.sadaqah-modal-input::placeholder { color: rgba(255,255,255,0.35); }

.sadaqah-modal-confirm-btn {
  background: linear-gradient(135deg, var(--gold), #ffd700);
  color: var(--primary-dark);
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.2rem; font-weight: bold;
  border-radius: 30px; cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Cairo', sans-serif;
  box-shadow: 0 0 20px var(--gold-glow);
  width: 100%; margin-bottom: 0.8rem; display: block;
}

.sadaqah-modal-confirm-btn:hover { transform: translateY(-3px); box-shadow: 0 0 35px var(--gold-glow); }

.sadaqah-modal-danger { background: linear-gradient(135deg, #e74c3c, #c0392b); box-shadow: 0 0 20px rgba(231,76,60,0.4); }
.sadaqah-modal-danger:hover { box-shadow: 0 0 35px rgba(231,76,60,0.5); }

.sadaqah-modal-keep-btn {
  background: transparent;
  border: 2px solid var(--glass-border);
  color: var(--gold);
  padding: 0.9rem 2.5rem;
  font-size: 1.1rem; font-weight: bold;
  border-radius: 30px; cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Cairo', sans-serif;
  width: 100%; display: block;
}

.sadaqah-modal-keep-btn:hover { background: var(--gold); color: var(--primary-dark); transform: translateY(-2px); }

/* ============================================
   ★ NEW: HAMBURGER MENU
   ============================================ */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 2px solid var(--glass-border);
  border-radius: 12px;
  padding: 0.6rem 0.8rem;
  cursor: pointer;
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1100;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.hamburger:hover {
  border-color: var(--gold);
  box-shadow: 0 0 15px var(--gold-glow);
  background: rgba(249,226,125,0.05);
}

.ham-line {
  display: block;
  width: 24px; height: 2px;
  background: var(--gold);
  border-radius: 4px;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1),
              opacity   0.3s ease,
              width     0.3s ease;
  box-shadow: 0 0 6px var(--gold-glow);
  transform-origin: center;
}

.hamburger.open .ham-line:nth-child(1) { transform: translateY(8px) rotate(45deg); }
.hamburger.open .ham-line:nth-child(2) { opacity: 0; width: 0; }
.hamburger.open .ham-line:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

/* Nav overlay */
.nav-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(2px);
  z-index: 1040;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.nav-overlay.open { display: block; opacity: 1; }

/* ============================================
   ★ MOBILE NAV — slide from right
   ============================================ */
@media (max-width: 768px) {

  nav {
    position: sticky;
    top: 0;
    padding: 1rem 1.5rem;
  }

  .hamburger { display: flex; }

  .nav-menu {
    flex-direction: column;
    position: fixed;
    top: 0;
    right: -100%;
    width: min(80vw, 300px);
    height: 100vh;
    background: linear-gradient(160deg,
      rgba(15,32,39,0.97) 0%,
      rgba(32,58,67,0.97) 100%);
    backdrop-filter: blur(20px);
    border-left: 1px solid var(--glass-border);
    box-shadow: -10px 0 40px rgba(0,0,0,0.5);
    padding: 5rem 1.5rem 2rem;
    gap: 0.5rem;
    z-index: 1050;
    transition: right 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    overflow-y: auto;
  }

  .nav-menu.open { right: 0; }

  .nav-menu li {
    opacity: 0;
    transform: translateX(30px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .nav-menu.open li                { opacity: 1; transform: translateX(0); }
  .nav-menu.open li:nth-child(1)   { transition-delay: 0.05s; }
  .nav-menu.open li:nth-child(2)   { transition-delay: 0.10s; }
  .nav-menu.open li:nth-child(3)   { transition-delay: 0.15s; }
  .nav-menu.open li:nth-child(4)   { transition-delay: 0.20s; }
  .nav-menu.open li:nth-child(5)   { transition-delay: 0.25s; }

  .nav-link {
    display: block;
    width: 100%;
    padding: 1rem 1.5rem;
    font-size: 1.2rem;
    border-radius: 15px;
    border: 1px solid transparent;
  }

  .nav-link:hover {
    border-color: var(--glass-border);
    background: rgba(249,226,125,0.08);
    color: var(--gold);
    transform: translateX(-5px);
    box-shadow: 0 0 15px var(--gold-glow);
  }

  .share-buttons    { flex-direction: column; align-items: center; }
  .share-btn        { width: 100%; max-width: 300px; justify-content: center; }
  .juz-counter-text { font-size: 1.2rem; }
}
