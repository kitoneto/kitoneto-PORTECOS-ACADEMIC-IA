/**
 * script.js — PORTECOS ACADEMIC IA: World Clock
 *
 * Handles real-time clock updates for multiple time zones using
 * the built-in Intl.DateTimeFormat API. Supports 12h / 24h toggle.
 */

// ─── State ────────────────────────────────────────────────────────────────────
let use24h = true; // default: 24-hour format

// ─── Timezone abbreviation overrides ─────────────────────────────────────────
// Intl.DateTimeFormat sometimes returns long names; we supply short ones.
const TZ_ABBR = {
  'Africa/Luanda':    { std: 'WAT' },
  'Europe/Lisbon':    { std: 'WET', dst: 'WEST' },
  'America/Sao_Paulo':{ std: 'BRT', dst: 'BRST' },
  'America/New_York': { std: 'EST', dst: 'EDT' },
  'Europe/London':    { std: 'GMT', dst: 'BST' },
  'Asia/Dubai':       { std: 'GST' },
  'Asia/Tokyo':       { std: 'JST' },
};

// ─── Day/Month names (English) ────────────────────────────────────────────────
const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

// ─── DOM helpers ─────────────────────────────────────────────────────────────

/**
 * Returns all clock card elements on the page.
 * @returns {NodeListOf<HTMLElement>}
 */
function getAllCards() {
  return document.querySelectorAll('.clock-card');
}

// ─── Core clock logic ─────────────────────────────────────────────────────────

/**
 * Determines whether a given timezone is currently in DST by comparing
 * its UTC offset in January vs July (STD vs DST).
 * @param {string} timezone - IANA timezone identifier
 * @param {Date} now - current Date object
 * @returns {boolean}
 */
function isInDST(timezone, now) {
  const jan = new Date(now.getFullYear(), 0, 1);
  const jul = new Date(now.getFullYear(), 6, 1);

  const offsetJan = getUTCOffset(timezone, jan);
  const offsetJul = getUTCOffset(timezone, jul);

  if (offsetJan === offsetJul) return false; // no DST for this zone
  const currentOffset = getUTCOffset(timezone, now);
  // In the northern hemisphere the larger offset is summer (DST);
  // In the southern hemisphere it's the opposite — but max() works for both.
  return currentOffset === Math.max(offsetJan, offsetJul);
}

/**
 * Returns the UTC offset in minutes for a timezone at a given Date.
 * @param {string} timezone
 * @param {Date} date
 * @returns {number}
 */
function getUTCOffset(timezone, date) {
  // Format the date as a local string in the target timezone, then parse it
  // back to find the offset relative to UTC.
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzDate  = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
  return (tzDate - utcDate) / 60000; // ms → minutes
}

/**
 * Builds a time string (HH:MM:SS or h:MM:SS AM/PM) for the given timezone.
 * @param {string} timezone
 * @param {Date} now
 * @returns {{ time: string, ampm: string }}
 */
function getTimeString(timezone, now) {
  if (use24h) {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      hour:   '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    return { time: fmt.format(now), ampm: '' };
  } else {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour:   'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    const raw   = fmt.format(now);          // e.g. "3:05:09 PM"
    const parts = raw.split(' ');
    const ampm  = parts.pop();              // "AM" or "PM"
    // zero-pad hours for visual consistency
    const timeParts = parts.join(' ').split(':');
    timeParts[0] = timeParts[0].padStart(2, '0');
    return { time: timeParts.join(':'), ampm };
  }
}

/**
 * Builds a full date string for the given timezone.
 * @param {string} timezone
 * @param {Date} now
 * @returns {string}  e.g. "Saturday, 28 March 2026"
 */
function getDateString(timezone, now) {
  // Use Intl to get day-of-week, day, month, year in the target timezone
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone,
    weekday: 'long',
    day:     'numeric',
    month:   'long',
    year:    'numeric',
  }).formatToParts(now);

  const get = (type) => (parts.find(p => p.type === type) || {}).value || '';
  return `${get('weekday')}, ${get('day')} ${get('month')} ${get('year')}`;
}

/**
 * Returns the short timezone abbreviation for display.
 * Falls back to the data-abbr HTML attribute value.
 * @param {string} timezone
 * @param {Date} now
 * @param {string} fallback - value from data-abbr attribute
 * @returns {string}
 */
function getTZAbbr(timezone, now, fallback) {
  const entry = TZ_ABBR[timezone];
  if (!entry) return fallback;
  if (entry.dst && isInDST(timezone, now)) return entry.dst;
  return entry.std;
}

// ─── Update all clocks ────────────────────────────────────────────────────────

/**
 * Reads the current time and updates every clock card on the page.
 */
function updateAllClocks() {
  const now   = new Date();
  const cards = getAllCards();

  cards.forEach((card) => {
    const timezone = card.dataset.timezone;
    if (!timezone) return;

    const { time, ampm } = getTimeString(timezone, now);
    const dateStr        = getDateString(timezone, now);
    const tzAbbr         = getTZAbbr(timezone, now, card.dataset.abbr || '');

    // Update DOM elements within this card
    const timeEl  = card.querySelector('.card-time');
    const ampmEl  = card.querySelector('.card-ampm');
    const dateEl  = card.querySelector('.card-date');
    const tzEl    = card.querySelector('.card-tz');

    if (timeEl) timeEl.textContent = time;
    if (ampmEl) ampmEl.textContent = ampm;
    if (dateEl) dateEl.textContent = dateStr;
    if (tzEl)   tzEl.textContent   = tzAbbr;
  });
}

// ─── 12h / 24h toggle ────────────────────────────────────────────────────────

/**
 * Initialises the format toggle button and wires up its click handler.
 */
function initToggle() {
  const btn   = document.getElementById('toggleFormat');
  const label = document.getElementById('toggleLabel');
  if (!btn || !label) return;

  btn.addEventListener('click', () => {
    use24h = !use24h;
    label.textContent = use24h ? '24h' : '12h';
    updateAllClocks(); // immediate refresh so there's no visual lag
  });
}

// ─── Bootstrap ───────────────────────────────────────────────────────────────

/**
 * Entry point: render clocks immediately, then update every second.
 */
function init() {
  initToggle();
  updateAllClocks();
  setInterval(updateAllClocks, 1000);
}

// Run when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
