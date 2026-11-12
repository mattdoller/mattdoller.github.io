// Draws the keyboard and hands and runs the game. The rules live in core.js.

import {
  DEFAULT_MODE,
  HANDS,
  HANDS_WIDTH,
  KEYS,
  U,
  baseKey,
  createModes,
  createTypingClock,
  hintFor,
  poseFor,
  reachFor,
  rewardFor,
} from './core.js';

// ---------- Keyboard ----------

const GAP = 4;

const keyEls = {}; // char -> <g>
const shiftEls = {}; // 'left' | 'right' -> <g>

function buildKeyboard() {
  const svg = document.getElementById('keyboard');
  svg.setAttribute('viewBox', `0 0 ${15 * U} ${5 * U}`);

  let html = '';
  for (const key of KEYS) {
    const classes = ['key'];
    if (key.isMod) {
      classes.push('mod');
    }
    if (key.isHome) {
      classes.push('home');
    }

    let style = '';
    if (key.finger !== null) {
      style = ` style="--f: var(--f${key.finger})"`;
    }

    let data = '';
    if (key.char !== null) {
      data = ` data-char="${key.char}"`;
    } else if (key.shift !== null) {
      data = ` data-shift="${key.shift}"`;
    }

    let label = key.label;
    if (!key.isMod) {
      label = label.toUpperCase();
    }

    html += `<g class="${classes.join(' ')}"${style}${data}>`;
    html += `<rect x="${key.x + GAP}" y="${key.y + GAP}" width="${key.w - GAP * 2}" height="${U - GAP * 2}" rx="8"/>`;
    html += `<text x="${key.cx}" y="${key.cy}">${label}</text>`;
    if (key.char === 'f' || key.char === 'j') {
      html += `<line class="bump" x1="${key.cx - 6}" x2="${key.cx + 6}" y1="${key.cy + 17}" y2="${key.cy + 17}"/>`;
    }
    html += '</g>';
  }
  svg.innerHTML = html;

  svg.querySelectorAll('[data-char]').forEach((el) => {
    keyEls[el.dataset.char] = el;
  });
  svg.querySelectorAll('[data-shift]').forEach((el) => {
    shiftEls[el.dataset.shift] = el;
  });
}

// ---------- Hands ----------

const fingerEls = {}; // finger id -> <g class="finger">
const aimEls = {}; // finger id -> <g class="aim">
const handEls = {}; // 'left' | 'right' -> <g class="hand">

// Three nested groups per finger: the outer one sits at the knuckle, .aim
// turns and stretches the finger toward a key, and .move taps.
function fingerMarkup(f) {
  const nailY = -f.len + f.w * 0.55;

  return (
    `<g class="finger" data-finger="${f.id}" style="--f: var(--f${f.id})" ` +
    `transform="translate(${f.x} ${f.y})">` +
    `<g class="aim" style="transform: rotate(${f.angle}deg)">` +
    '<g class="move">' +
    `<rect class="skin" x="${-f.w / 2}" y="${-f.len}" width="${f.w}" height="${f.len + f.w / 2}" rx="${f.w / 2}"/>` +
    `<ellipse class="nail" cx="0" cy="${nailY}" rx="${f.w * 0.28}" ry="${f.w * 0.34}"/>` +
    '</g></g></g>'
  );
}

// Fingers first so the palm covers the knuckle ends.
function handMarkup(side, palmX) {
  return (
    `<g class="hand" data-hand="${side}">` +
    HANDS[side].map(fingerMarkup).join('') +
    `<rect class="skin" x="${palmX}" y="160" width="175" height="200" rx="55"/>` +
    '</g>'
  );
}

function buildHands() {
  const svg = document.getElementById('hands');
  svg.innerHTML = handMarkup('left', 143) + handMarkup('right', HANDS_WIDTH - 318);

  svg.querySelectorAll('.finger').forEach((el) => {
    fingerEls[el.dataset.finger] = el;
    aimEls[el.dataset.finger] = el.querySelector('.aim');
  });
  svg.querySelectorAll('.hand').forEach((el) => {
    handEls[el.dataset.hand] = el;
  });
}

function poseHands(char) {
  const pose = poseFor(char);
  for (const [id, { angle, stretch }] of Object.entries(pose.fingers)) {
    aimEls[id].style.transform = `rotate(${angle}deg) scaleY(${stretch})`;
  }
  for (const [side, { x, y }] of Object.entries(pose.hands)) {
    handEls[side].style.transform = `translate(${x}px, ${y}px)`;
  }
}

// ---------- Rewards ----------

// Fingers in left-to-right order, thumbs left out, for spark colours.
const SPARK_FINGERS = [0, 1, 2, 3, 6, 7, 8, 9];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Removes an element once its CSS animation ends, with a fallback in case
// the animation never runs (a background tab, say).
function removeWhenDone(el, fallbackMs) {
  el.addEventListener('animationend', () => el.remove(), { once: true });
  setTimeout(() => el.remove(), fallbackMs);
}

// Sparks flying out from a point on the screen, between two angles in
// degrees (0 is to the right, 90 is down).
function burst(x, y, count, distance, fromAngle = 0, toAngle = 360) {
  if (reducedMotion.matches) {
    return;
  }

  const spread = toAngle - fromAngle;
  for (let i = 0; i < count; i += 1) {
    const degrees = fromAngle + ((i + Math.random()) / count) * spread;
    const angle = (degrees * Math.PI) / 180;
    const reach = distance * (0.6 + Math.random() * 0.4);
    const spark = document.createElement('span');
    spark.className = 'spark';
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty('--dx', `${Math.cos(angle) * reach}px`);
    spark.style.setProperty('--dy', `${Math.sin(angle) * reach}px`);
    spark.style.setProperty('--c', `var(--f${SPARK_FINGERS[i % SPARK_FINGERS.length]})`);
    document.body.append(spark);
    removeWhenDone(spark, 1500);
  }
}

function showBanner(message) {
  bannerEl.textContent = message;
  bannerEl.classList.remove('show');
  void bannerEl.offsetWidth; // restart the animation if it's already showing
  bannerEl.classList.add('show');
}

// Space kept between the text and where the sparks start.
const SPARK_GAP = 16;

function celebrate(reward, clean) {
  // A clean finish throws sparks outward from both ends of the text, so
  // nothing crosses the next text as it appears.
  if (clean) {
    const rect = wordEl.getBoundingClientRect();
    const middle = rect.top + rect.height / 2;
    burst(rect.left - SPARK_GAP, middle, 6, 60, 135, 225);
    burst(rect.right + SPARK_GAP, middle, 6, 60, -45, 45);
  }

  if (reward.size === 'big') {
    showBanner(reward.message);
    const banner = bannerEl.getBoundingClientRect();
    burst(banner.left + banner.width / 2, banner.top + banner.height / 2, 32, 220);
  }
}

// ---------- Game ----------

const MODES = createModes();
const MODE_STORAGE_KEY = 'mode';

const wordEl = document.getElementById('word');
const hintEl = document.getElementById('hint');
const lightsEl = document.getElementById('lights');
const progressEl = document.getElementById('progress');
const modesEl = document.getElementById('modes');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');
const bannerEl = document.getElementById('banner');

let mode = null;
let item = null;
let rep = 0; // completed repetitions of the current item
let target = '';
let pos = 0;
let clock = createTypingClock();
let correct = 0;
let mistakes = 0;
let textMistakes = 0; // in the text on screen now
let streak = 0; // clean words in a row

// Finger ids 0-4 are the left hand and 5-9 the right, so they read in order.
const lightEls = [];
for (const ids of [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]]) {
  const group = document.createElement('div');
  group.className = 'light-group';
  for (const id of ids) {
    const light = document.createElement('span');
    light.className = 'light';
    light.dataset.finger = id;
    light.style.setProperty('--f', `var(--f${id})`);
    lightEls[id] = light;
    group.append(light);
  }
  lightsEl.append(group);
}

function showTarget() {
  document.querySelectorAll('.key.active, .finger.active, .light.active').forEach((el) => {
    el.classList.remove('active');
  });

  const char = target[pos];
  const reach = reachFor(char);

  wordEl.querySelectorAll('.letter').forEach((el, i) => {
    el.classList.toggle('done', i < pos);
    el.classList.toggle('current', i === pos);
    el.style.setProperty('--f', `var(--f${reach.fingers[0]})`);
  });

  keyEls[reach.key].classList.add('active');
  if (reach.shift !== null) {
    shiftEls[reach.shift].classList.add('active');
  }
  poseHands(char);
  for (const id of reach.fingers) {
    const el = fingerEls[id];
    void el.getBoundingClientRect(); // restart the tap when the same finger repeats
    el.classList.add('active');
    lightEls[id].classList.add('active');
  }

  hintEl.textContent = hintFor(char);
}

function showProgress() {
  const parts = [];
  if (item.label !== '') {
    parts.push(item.label);
  }
  if (item.reps > 1) {
    parts.push(`${rep + 1} of ${item.reps}`);
  }
  progressEl.textContent = parts.join(' · ');
}

function showText() {
  target = item.text;
  pos = 0;

  // Lets the stylesheet shrink long lines to fit the window.
  wordEl.style.setProperty('--chars', target.length);
  wordEl.replaceChildren(
    ...[...target].map((ch, i) => {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = ch;
      if (ch === ' ' && i === target.length - 1) {
        span.classList.add('space');
        span.textContent = '␣';
      }

      return span;
    }),
  );
  showTarget();
  showProgress();
}

function nextItem() {
  item = mode.next();
  rep = 0;
  showText();
}

function finishText() {
  rep += 1;
  const clean = textMistakes === 0;
  textMistakes = 0;
  if (item.kind === 'word') {
    if (clean) {
      streak += 1;
    } else {
      streak = 0;
    }
  }

  // Before the next text replaces this one, whose ends the sparks start from.
  celebrate(rewardFor({ item, repsDone: rep, streak }), clean);

  if (rep < item.reps) {
    showText();
  } else {
    nextItem();
  }
}

function setMode(id) {
  mode = MODES.find((m) => m.id === id) ?? MODES.find((m) => m.id === DEFAULT_MODE);
  try {
    localStorage.setItem(MODE_STORAGE_KEY, mode.id);
  } catch {
    // The mode still applies for this visit.
  }

  modesEl.querySelectorAll('button').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.mode === mode.id));
  });

  clock = createTypingClock();
  correct = 0;
  mistakes = 0;
  textMistakes = 0;
  streak = 0;
  wpmEl.textContent = '0';
  accuracyEl.textContent = '100';

  mode.start();
  nextItem();
}

function buildModes() {
  for (const m of MODES) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.mode = m.id;
    button.textContent = m.label;
    button.addEventListener('click', () => {
      setMode(m.id);
      button.blur(); // so Enter can't restart the mode mid-word
    });
    modesEl.append(button);
  }
}

function storedMode() {
  try {
    return localStorage.getItem(MODE_STORAGE_KEY);
  } catch {
    return null;
  }
}

function updateStats() {
  const total = correct + mistakes;
  if (total > 0) {
    accuracyEl.textContent = Math.round((correct / total) * 100);
  }

  const wpm = clock.wpm();
  if (wpm !== null) {
    wpmEl.textContent = wpm;
  }
}

function flashWrong(char) {
  wordEl.classList.remove('shake');
  void wordEl.offsetWidth;
  wordEl.classList.add('shake');

  const keyEl = keyEls[baseKey(char)];
  if (keyEl) {
    keyEl.classList.add('wrong');
    setTimeout(() => {
      keyEl.classList.remove('wrong');
    }, 220);
  }
}

function onKeyDown(event) {
  if (event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) {
    return;
  }

  event.preventDefault();
  if (event.repeat) {
    return;
  }

  // Outside passages nothing needs shift, so caps lock is forgiven.
  let char = event.key;
  if (!mode.exact) {
    char = char.toLowerCase();
  }

  const isCorrect = char === target[pos];
  clock.keystroke(performance.now(), isCorrect);

  if (isCorrect) {
    correct += 1;
    pos += 1;
    if (pos === target.length) {
      finishText();
    } else {
      showTarget();
    }
  } else {
    mistakes += 1;
    textMistakes += 1;
    flashWrong(char);
  }
  updateStats();
}

buildKeyboard();
buildHands();
buildModes();
setMode(storedMode());
window.addEventListener('keydown', onKeyDown);
