// The app's logic with no DOM in it, so Node can test it. app.js draws what
// this file works out.

// Finger ids: 0-3 left pinky..index, 4 left thumb, 5 right thumb,
// 6-9 right index..pinky.
export const FINGER_NAMES = [
  'left pinky', 'left ring finger', 'left middle finger', 'left index finger',
  'left thumb', 'right thumb',
  'right index finger', 'right middle finger', 'right ring finger', 'right pinky',
];

// ---------- Practice content ----------

export const COMMON_WORDS = (
  'the and you that was for are with his they have this from one had word but not what all ' +
  'were when your can said there use each which she how their will other about out many then ' +
  'them these some her would make like him into time has look two more write see number way ' +
  'could people than first water been call who oil now find long down day did get come made ' +
  'may part over new sound take only little work know place year live back give most very ' +
  'after thing our just name good sentence man think say great where help through much before ' +
  'line right too mean old any same tell boy follow came want show also around form three ' +
  'small set put end does another well large must big even such because turn here why ask ' +
  'went men read need land different home move try kind hand picture again change off play ' +
  'spell air away animal house point page letter mother answer found study still learn ' +
  'quick jump lazy fox zebra quiz extra voice puzzle major equal exact size dozen jazz box'
).split(' ');

export const SHORT_WORDS = COMMON_WORDS.filter((word) => word.length >= 3 && word.length <= 7);

export const LONG_WORDS = (
  'absolutely adventure afternoon beautiful beginning boundary business calendar challenge ' +
  'character chemistry chocolate community comparison competition completely conscience ' +
  'continue convenient curiosity dangerous daughter decision definitely department describe ' +
  'different difficult discovery education electricity embarrass emergency environment ' +
  'especially excellent exercise experience explanation extraordinary familiar favourite ' +
  'february foreign frequently government guarantee happiness history hospital imagination ' +
  'immediately important independent information intelligence interesting journey keyboard ' +
  'knowledge language laboratory lightning literature mathematics mechanical necessary ' +
  'neighbour occasion opportunity particular permanent philosophy photograph population ' +
  'possible practice probably professor pronunciation question quickly recognise recommend ' +
  'restaurant rhythm schedule secretary sentence separate signature something strength ' +
  'successful surprise technology temperature themselves thorough together tomorrow ' +
  'umbrella unfortunately vegetable wednesday wonderful yesterday'
).split(' ');

// Each drill is typed `reps` times in a row before moving to the next.
// A trailing space is part of the drill.
export const DRILLS = [
  { name: 'left index', text: 'f', reps: 10 },
  { name: 'right index', text: 'j', reps: 10 },
  { name: 'index fingers', text: 'fj', reps: 8 },
  { name: 'middle fingers', text: 'dk', reps: 8 },
  { name: 'ring fingers', text: 'sl', reps: 8 },
  { name: 'pinkies', text: 'a;', reps: 8 },
  { name: 'home row, left hand', text: 'asdf', reps: 5 },
  { name: 'home row, right hand', text: 'jkl;', reps: 5 },
  { name: 'home row', text: 'asdf jkl; ', reps: 5 },
  { name: 'index stretch', text: 'fgf jhj ', reps: 5 },
  { name: 'top row, left hand', text: 'qwert', reps: 5 },
  { name: 'top row, right hand', text: 'yuiop', reps: 5 },
  { name: 'reach up', text: 'frf juj ded kik ', reps: 4 },
  { name: 'bottom row, left hand', text: 'zxcvb', reps: 5 },
  { name: 'bottom row, right hand', text: 'nm,./', reps: 5 },
  { name: 'reach down', text: 'fvf jmj dcd k,k ', reps: 4 },
  { name: 'numbers, left hand', text: '12345', reps: 5 },
  { name: 'numbers, right hand', text: '67890', reps: 5 },
];

// Passages are typed exactly, so they use plain quotes and no dashes. The
// source, when there is one, is shown while the passage is typed. Quotes come
// from public-domain works, with punctuation adapted to fit the keyboard.
const passage = (text, source = '') => ({ text, source });

export const PASSAGES = [
  passage('The morning train was late again, so Nora read her book on the platform. By the time ' +
    'it arrived, she had finished two chapters and a cold cup of coffee.'),
  passage('Good typing is mostly patience. Keep your eyes on the screen, let your fingers find ' +
    'their own way home, and the speed will come later.'),
  passage('Have you ever watched a river after heavy rain? It moves fast, carries everything ' +
    'with it, and still finds the same path to the sea.'),
  passage('Sam packed three things for the trip: a map, a warm jacket, and far too many snacks. ' +
    '"We might get hungry," he said. Nobody argued.'),
  passage('At 7:45 the bakery opens its doors. The first loaves sell out in minutes; the regulars ' +
    'know to come early, and they never complain about the queue.'),

  // Opening lines
  passage('It is a truth universally acknowledged, that a single man in possession of a good ' +
    'fortune, must be in want of a wife.', 'Austen, Pride and Prejudice'),
  passage('It was the best of times, it was the worst of times, it was the age of wisdom, it was ' +
    'the age of foolishness, it was the epoch of belief, it was the epoch of incredulity.',
  'Dickens, A Tale of Two Cities'),
  passage('Call me Ishmael. Some years ago, never mind how long precisely, having little or no ' +
    'money in my purse, and nothing particular to interest me on shore, I thought I would sail ' +
    'about a little and see the watery part of the world.', 'Melville, Moby-Dick'),
  passage('Happy families are all alike; every unhappy family is unhappy in its own way.',
    'Tolstoy, Anna Karenina'),
  passage('Alice was beginning to get very tired of sitting by her sister on the bank, and of ' +
    'having nothing to do: once or twice she had peeped into the book her sister was reading, ' +
    'but it had no pictures or conversations in it.', 'Carroll, Alice in Wonderland'),
  passage('Marley was dead: to begin with. There is no doubt whatever about that.',
    'Dickens, A Christmas Carol'),
  passage('You don\'t know about me without you have read a book by the name of The Adventures ' +
    'of Tom Sawyer; but that ain\'t no matter.', 'Twain, Huckleberry Finn'),
  passage('"Christmas won\'t be Christmas without any presents," grumbled Jo, lying on the rug.',
    'Alcott, Little Women'),

  // Books and plays
  passage('I went to the woods because I wished to live deliberately, to front only the ' +
    'essential facts of life, and see if I could not learn what it had to teach.',
  'Thoreau, Walden'),
  passage('Our life is frittered away by detail. Simplify, simplify.', 'Thoreau, Walden'),
  passage('To be, or not to be, that is the question: whether \'tis nobler in the mind to ' +
    'suffer the slings and arrows of outrageous fortune, or to take arms against a sea of ' +
    'troubles, and by opposing end them.', 'Shakespeare, Hamlet'),
  passage('All the world\'s a stage, and all the men and women merely players; they have their ' +
    'exits and their entrances, and one man in his time plays many parts.',
  'Shakespeare, As You Like It'),
  passage('I am no bird; and no net ensnares me: I am a free human being with an independent ' +
    'will.', 'Bronte, Jane Eyre'),
  passage('Beware; for I am fearless, and therefore powerful.', 'Shelley, Frankenstein'),
  passage('So we beat on, boats against the current, borne back ceaselessly into the past.',
    'Fitzgerald, The Great Gatsby'),
  passage('We are all in the gutter, but some of us are looking at the stars.',
    'Wilde, Lady Windermere\'s Fan'),
  passage('Believe me, my young friend, there is nothing, absolutely nothing, half so much worth ' +
    'doing as simply messing about in boats.', 'Grahame, The Wind in the Willows'),
  passage('"Why, sometimes I\'ve believed as many as six impossible things before breakfast."',
    'Carroll, Through the Looking-Glass'),
  passage('From so simple a beginning endless forms most beautiful and most wonderful have been, ' +
    'and are being, evolved.', 'Darwin, On the Origin of Species'),

  // Poems
  passage('Two roads diverged in a wood, and I, I took the one less traveled by, and that has ' +
    'made all the difference.', 'Frost, The Road Not Taken'),
  passage('Hope is the thing with feathers that perches in the soul, and sings the tune without ' +
    'the words, and never stops at all.', 'Dickinson'),
  passage('If you can keep your head when all about you are losing theirs and blaming it on you, ' +
    'if you can trust yourself when all men doubt you, but make allowance for their doubting ' +
    'too.', 'Kipling, If'),
  passage('A thing of beauty is a joy for ever: its loveliness increases; it will never pass ' +
    'into nothingness.', 'Keats, Endymion'),
  passage('I wandered lonely as a cloud that floats on high o\'er vales and hills, when all at ' +
    'once I saw a crowd, a host, of golden daffodils.', 'Wordsworth'),
  passage('Once upon a midnight dreary, while I pondered, weak and weary, over many a quaint and ' +
    'curious volume of forgotten lore.', 'Poe, The Raven'),

  // Speeches and letters
  passage('Four score and seven years ago our fathers brought forth on this continent, a new ' +
    'nation, conceived in Liberty, and dedicated to the proposition that all men are created ' +
    'equal.', 'Lincoln, Gettysburg Address'),
  passage('With malice toward none, with charity for all, with firmness in the right as God ' +
    'gives us to see the right, let us strive on to finish the work we are in.',
  'Lincoln, Second Inaugural'),
  passage('We hold these truths to be self-evident, that all men are created equal, that they ' +
    'are endowed by their Creator with certain unalienable Rights, that among these are Life, ' +
    'Liberty and the pursuit of Happiness.', 'Declaration of Independence'),
  passage('So, first of all, let me assert my firm belief that the only thing we have to fear ' +
    'is fear itself.', 'Franklin D. Roosevelt'),
  passage('It is not the critic who counts; not the man who points out how the strong man ' +
    'stumbles. The credit belongs to the man who is actually in the arena.',
  'Theodore Roosevelt'),
  passage('If there is no struggle, there is no progress.', 'Frederick Douglass'),
  passage('If I have seen further it is by standing on the shoulders of Giants.',
    'Isaac Newton'),

  // Sayings
  passage('Begin the morning by saying to thyself, I shall meet with the busy-body, the ' +
    'ungrateful, arrogant, deceitful, envious, unsocial.', 'Marcus Aurelius'),
  passage('No longer talk at all about the kind of man that a good man ought to be, but be ' +
    'such.', 'Marcus Aurelius'),
  passage('Men are disturbed not by the things which happen, but by the opinions about the ' +
    'things.', 'Epictetus'),
  passage('It is not that we have a short time to live, but that we waste a lot of it.',
    'Seneca'),
  passage('A journey of a thousand miles begins with a single step.', 'Lao Tzu'),
  passage('Trust thyself: every heart vibrates to that iron string.', 'Emerson, Self-Reliance'),
  passage('A foolish consistency is the hobgoblin of little minds.', 'Emerson, Self-Reliance'),
  passage('Early to bed and early to rise, makes a man healthy, wealthy and wise. Well done is ' +
    'better than well said.', 'Franklin, Poor Richard\'s Almanack'),
  passage('The best time to plant a tree was twenty years ago. The second best time is now.',
    'proverb'),
  passage('Fall seven times, stand up eight.', 'Japanese proverb'),

  // Pangrams use every letter
  passage('The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor ' +
    'jugs!', 'pangrams'),
];
export const PASSAGE_LINE_LENGTH = 32;

// ---------- Keyboard ----------

export const U = 60; // one key unit

const letters = (chars, fingers) => {
  return [...chars].map((ch, i) => ({ label: ch, w: 1, finger: Number(fingers[i]) }));
};
const mod = (label, w, finger = null) => ({ label, w, finger, mod: true });

const ROWS = [
  [...letters('`1234567890-=', '0012336678999'), mod('delete', 2, 9)],
  [mod('tab', 1.5, 0), ...letters('qwertyuiop[]', '012336678999'), { label: '\\', w: 1.5, finger: 9 }],
  [mod('caps', 1.75, 0), ...letters("asdfghjkl;'", '01233667899'), mod('return', 2.25, 9)],
  [mod('shift', 2.25, 0), ...letters('zxcvbnm,./', '0123366789'), mod('shift', 2.75, 9)],
  [
    mod('ctrl', 1.25), mod('opt', 1.25), mod('cmd', 1.25),
    { label: '', w: 6.25, finger: 4, char: ' ' },
    mod('cmd', 1.25), mod('opt', 1.25), mod('menu', 1.25), mod('ctrl', 1.25),
  ],
];

// The key each finger rests on. Thumbs rest on the space bar and never reach.
export const HOME_KEY = { 0: 'a', 1: 's', 2: 'd', 3: 'f', 6: 'j', 7: 'k', 8: 'l', 9: ';' };
const HOME_CHARS = new Set(Object.values(HOME_KEY));

// Characters typed with shift held, and the key each one is on.
export const SHIFTED = {
  '~': '`', '!': '1', '@': '2', '#': '3', '$': '4', '%': '5', '^': '6', '&': '7',
  '*': '8', '(': '9', ')': '0', '_': '-', '+': '=', '{': '[', '}': ']', '|': '\\',
  ':': ';', '"': "'", '<': ',', '>': '.', '?': '/',
};

// The unshifted key a character is typed on.
export function baseKey(char) {
  return SHIFTED[char] ?? char.toLowerCase();
}

// Every key, laid out: { label, isMod, isHome, finger, char, shift, x, y, w, cx, cy }.
// `char` is what the key types (null for modifiers); `shift` is 'left' or
// 'right' on the two shift keys. Positions are in keyboard units.
export const KEYS = [];
export const fingerOf = {}; // char -> finger id
export const keyCenter = {}; // char -> { x, y }
export const shiftCenter = {}; // 'left' | 'right' -> where the pinky lands on shift

ROWS.forEach((row, r) => {
  let x = 0;
  for (const key of row) {
    const w = key.w * U;
    const char = key.char ?? (key.mod ? null : key.label);
    const cx = x + w / 2;
    const cy = r * U + U / 2;

    let shift = null;
    if (key.label === 'shift') {
      // The pinky only reaches the near end of a shift key, not its middle.
      const reachIn = 0.6 * U;
      if (key.finger === 0) {
        shift = 'left';
        shiftCenter.left = { x: x + w - reachIn, y: cy };
      } else {
        shift = 'right';
        shiftCenter.right = { x: x + reachIn, y: cy };
      }
    }

    if (char !== null) {
      fingerOf[char] = key.finger;
      keyCenter[char] = { x: cx, y: cy };
    }

    KEYS.push({
      label: key.label,
      isMod: Boolean(key.mod),
      isHome: HOME_CHARS.has(char),
      finger: key.finger,
      char,
      shift,
      x,
      y: r * U,
      w,
      cx,
      cy,
    });
    x += w;
  }
});

// The key, fingers and shift side needed to type a character.
export function reachFor(char) {
  if (char === ' ') {
    return { key: ' ', fingers: [4, 5], shift: null };
  }

  const key = baseKey(char);
  const finger = fingerOf[key];
  if (key === char) {
    return { key, fingers: [finger], shift: null };
  }

  // Shift is held by the pinky of the hand that isn't pressing the key.
  if (finger <= 4) {
    return { key, fingers: [finger, 9], shift: 'right' };
  }

  return { key, fingers: [finger, 0], shift: 'left' };
}

// What to tell the typist about a character.
export function hintFor(char) {
  const reach = reachFor(char);
  if (char === ' ') {
    return 'space — either thumb';
  }
  if (reach.shift !== null) {
    return `${reach.shift} shift + ${FINGER_NAMES[reach.fingers[0]]}`;
  }

  return FINGER_NAMES[reach.fingers[0]];
}

// ---------- Hands ----------

// Left hand, seen from above; the right hand is mirrored.
// Each finger: knuckle position, length, width, and spread angle.
const LEFT_FINGERS = [
  { id: 0, x: 165, y: 205, len: 88, w: 32, angle: -24 },
  { id: 1, x: 205, y: 178, len: 118, w: 36, angle: -11 },
  { id: 2, x: 248, y: 168, len: 130, w: 38, angle: -1 },
  { id: 3, x: 291, y: 178, len: 116, w: 37, angle: 10 },
  { id: 4, x: 322, y: 262, len: 88, w: 44, angle: 52 },
];
const MIRROR_ID = { 0: 9, 1: 8, 2: 7, 3: 6, 4: 5 };
export const HANDS_WIDTH = 900;

export const HANDS = {
  left: LEFT_FINGERS,
  right: LEFT_FINGERS.map((f) => ({
    ...f,
    id: MIRROR_ID[f.id],
    x: HANDS_WIDTH - f.x,
    angle: -f.angle,
  })),
};

export const fingerGeo = {}; // finger id -> its geometry
for (const f of [...HANDS.left, ...HANDS.right]) {
  fingerGeo[f.id] = f;
}

// Hand drawing units per keyboard unit: one key over is about one finger over.
export const REACH_SCALE = 0.7;
// How much of a reach the whole hand travels; the finger stretches the rest.
export const HAND_SHARE = 0.4;

function handOf(finger) {
  if (finger <= 4) {
    return 'left';
  }

  return 'right';
}

// How the hands sit to type a character:
// { hands: { left, right }, fingers: { id: { angle, stretch } } }.
// Each hand is an { x, y } slide from rest. For a key off the home row the
// hand travels part of the way and the finger turns and stretches (or curls)
// to cover the rest. Everything not involved stays at rest.
export function poseFor(char) {
  const reach = reachFor(char);
  const moves = [];
  if (char !== ' ') {
    moves.push({ finger: reach.fingers[0], to: keyCenter[reach.key] });
  }
  if (reach.shift !== null) {
    moves.push({ finger: reach.fingers[1], to: shiftCenter[reach.shift] });
  }

  const hands = { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } };
  const fingers = {};
  for (const f of Object.values(fingerGeo)) {
    fingers[f.id] = { angle: f.angle, stretch: 1 };
  }

  for (const { finger, to } of moves) {
    const home = keyCenter[HOME_KEY[finger]];
    const dx = (to.x - home.x) * REACH_SCALE;
    const dy = (to.y - home.y) * REACH_SCALE;
    hands[handOf(finger)] = { x: dx * HAND_SHARE, y: dy * HAND_SHARE };

    // Fingertip relative to the knuckle: at rest, then moved by the rest of the reach.
    const f = fingerGeo[finger];
    const rest = (f.angle * Math.PI) / 180;
    const tipX = f.len * Math.sin(rest) + dx * (1 - HAND_SHARE);
    const tipY = -f.len * Math.cos(rest) + dy * (1 - HAND_SHARE);
    fingers[finger] = {
      angle: (Math.atan2(tipX, -tipY) * 180) / Math.PI,
      stretch: Math.hypot(tipX, tipY) / f.len,
    };
  }

  return { hands, fingers };
}

// ---------- Modes ----------

function pickOther(list, last, random) {
  let choice;
  do {
    choice = list[Math.floor(random() * list.length)];
  } while (choice === last && list.length > 1);

  return choice;
}

// Breaks a passage into lines short enough to show at a readable size.
export function wrap(text, maxLength) {
  const lines = [];
  let line = '';
  for (const word of text.split(' ')) {
    if (line !== '' && line.length + 1 + word.length > maxLength) {
      lines.push(line);
      line = word;
    } else if (line === '') {
      line = word;
    } else {
      line += ` ${word}`;
    }
  }
  lines.push(line);

  return lines;
}

// A mode hands out items to type, one at a time. An item is
// { kind, text, reps, label }: the text is typed `reps` times before the next
// item. `kind` is 'word', 'drill' or 'line' (of a passage); a line also says
// whether it's the passage's last.
function wordMode(id, label, words, random) {
  let last = '';

  return {
    id,
    label,
    exact: false,
    start() {},
    next() {
      last = pickOther(words, last, random);

      return { kind: 'word', text: `${last} `, reps: 1, label: '' };
    },
  };
}

function drillMode() {
  let index = 0;

  return {
    id: 'drills',
    label: 'drills',
    exact: false,
    start() {
      index = 0;
    },
    next() {
      const drill = DRILLS[index];
      index = (index + 1) % DRILLS.length;

      return { kind: 'drill', text: drill.text, reps: drill.reps, label: drill.name };
    },
  };
}

function passageMode(random) {
  let current = null;
  let lines = [];
  let index = 0;

  return {
    id: 'passages',
    label: 'passages',
    exact: true, // capitals and punctuation count
    start() {
      lines = [];
      index = 0;
    },
    next() {
      if (index >= lines.length) {
        current = pickOther(PASSAGES, current, random);
        lines = wrap(current.text, PASSAGE_LINE_LENGTH);
        index = 0;
      }

      const isLast = index === lines.length - 1;
      let text = lines[index];
      if (!isLast) {
        text += ' '; // the space that the line break replaced
      }
      index += 1;

      let label = `line ${index} of ${lines.length}`;
      if (current.source !== '') {
        label = `${current.source} · ${label}`;
      }

      return {
        kind: 'line',
        text,
        reps: 1,
        label,
        isLast,
      };
    },
  };
}

export const DEFAULT_MODE = 'short';

// `random` is swappable so tests can make the choices predictable.
export function createModes(random = Math.random) {
  return [
    drillMode(),
    wordMode('short', 'short words', SHORT_WORDS, random),
    wordMode('long', 'long words', LONG_WORDS, random),
    passageMode(random),
  ];
}

// ---------- Rewards ----------

// Clean words in a row that earn a big celebration.
export const STREAK_MILESTONE = 10;

// How to celebrate finishing a piece of text: { size, message }. `size` is
// 'big' for the end of a drill, the end of a passage, or every
// STREAK_MILESTONE clean words in a row, with a message to show; otherwise
// it's 'small' and there's no message. `repsDone` counts the finished text;
// `streak` is the clean words in a row, the finished one included.
export function rewardFor({ item, repsDone, streak }) {
  if (item.kind === 'drill' && repsDone === item.reps) {
    return { size: 'big', message: `drill complete · ${item.label}` };
  }
  if (item.kind === 'line' && item.isLast) {
    return { size: 'big', message: 'passage complete' };
  }
  if (item.kind === 'word' && streak > 0 && streak % STREAK_MILESTONE === 0) {
    return { size: 'big', message: `${streak} clean words in a row` };
  }

  return { size: 'small', message: null };
}

// ---------- Speed ----------

// Measures typing speed over the last stretch of actual typing. A pause
// longer than `idleMs` isn't counted at all, so walking away doesn't drag the
// score down.
export function createTypingClock({ windowMs = 30000, idleMs = 2000 } = {}) {
  let typingMs = 0; // time spent typing, pauses left out
  let lastKeyAt = null;
  let hits = []; // typingMs at each correct keystroke inside the window

  return {
    // Call for every keystroke, right or wrong, with a millisecond timestamp.
    keystroke(now, isCorrect) {
      if (lastKeyAt !== null && now - lastKeyAt <= idleMs) {
        typingMs += now - lastKeyAt;
      }
      lastKeyAt = now;
      if (isCorrect) {
        hits.push(typingMs);
      }
      hits = hits.filter((at) => at > typingMs - windowMs);
    },

    // Words per minute (five characters to a word), or null until there's
    // enough typing to say.
    wpm() {
      const span = Math.min(typingMs, windowMs);
      if (span <= 1200) {
        return null;
      }

      return Math.round(hits.length / 5 / (span / 60000));
    },
  };
}
