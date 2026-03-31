/**
 * PORTECOS ACADEMIC IA — Relógio Mundial
 * script.js — Lógica dos relógios com múltiplos fusos horários
 *
 * Utiliza a API Intl.DateTimeFormat nativa do navegador para
 * obter a hora correta em cada fuso horário sem dependências externas.
 * Atualiza todos os relógios a cada segundo via setInterval.
 */

'use strict';

/* -------------------------------------------------------
   Configuração dos fusos horários
   ------------------------------------------------------- */
const CLOCKS = [
  {
    id:       'luanda',
    timezone: 'Africa/Luanda',
    tzLabel:  'WAT',  // West Africa Time (UTC+1)
    primary:  true,
  },
  {
    id:       'lisbon',
    timezone: 'Europe/Lisbon',
    tzLabel:  'WET/WEST', // Western European (Summer) Time
  },
  {
    id:       'saopaulo',
    timezone: 'America/Sao_Paulo',
    tzLabel:  'BRT', // Brasília Time (UTC-3)
  },
  {
    id:       'newyork',
    timezone: 'America/New_York',
    tzLabel:  'EST/EDT', // Eastern (Standard/Daylight) Time
  },
  {
    id:       'london',
    timezone: 'Europe/London',
    tzLabel:  'GMT/BST', // Greenwich Mean / British Summer Time
  },
  {
    id:       'dubai',
    timezone: 'Asia/Dubai',
    tzLabel:  'GST', // Gulf Standard Time (UTC+4)
  },
  {
    id:       'tokyo',
    timezone: 'Asia/Tokyo',
    tzLabel:  'JST', // Japan Standard Time (UTC+9)
  },
];

/* -------------------------------------------------------
   Estado global
   ------------------------------------------------------- */
let use24h = true; // Começa em formato 24h

/* -------------------------------------------------------
   Utilitários
   ------------------------------------------------------- */

/**
 * Retorna um objeto com as partes de data/hora para um fuso horário.
 * @param {Date}   now      — instância de Date atual
 * @param {string} timezone — identificador IANA (ex: 'Africa/Luanda')
 * @param {boolean} h24     — true = formato 24h, false = 12h
 * @returns {{ hours, minutes, seconds, day, month, year, ampm, tzAbbr }}
 */
function getTimeParts(now, timezone, h24) {
  const fmtTime = new Intl.DateTimeFormat('pt-PT', {
    timeZone: timezone,
    hour:     '2-digit',
    minute:   '2-digit',
    second:   '2-digit',
    hour12:   !h24,
  });

  const fmtDate = new Intl.DateTimeFormat('pt-PT', {
    timeZone: timezone,
    day:      '2-digit',
    month:    'long',
    year:     'numeric',
  });

  // Extract individual parts for fine-grained control
  const timeParts = fmtTime.formatToParts(now);
  const dateParts = fmtDate.formatToParts(now);

  const get = (parts, type) => {
    const part = parts.find(p => p.type === type);
    return part ? part.value : '';
  };

  const hours   = get(timeParts, 'hour');
  const minutes = get(timeParts, 'minute');
  const seconds = get(timeParts, 'second');
  const ampm    = !h24 ? (get(timeParts, 'dayPeriod') || '').toUpperCase() : '';

  const day   = get(dateParts, 'day');
  const month = get(dateParts, 'month');
  const year  = get(dateParts, 'year');

  return { hours, minutes, seconds, day, month, year, ampm };
}

/**
 * Aplica a animação de tick num elemento de tempo.
 * @param {HTMLElement} el
 */
function triggerTickAnimation(el) {
  el.classList.remove('tick');
  // Força reflow para reiniciar a animação CSS
  void el.offsetWidth;
  el.classList.add('tick');
}

/* -------------------------------------------------------
   Atualização dos relógios
   ------------------------------------------------------- */

/**
 * Atualiza todos os cards de relógio com a hora atual.
 */
function updateAllClocks() {
  const now = new Date();

  CLOCKS.forEach(clock => {
    const parts = getTimeParts(now, clock.timezone, use24h);

    // Elementos do DOM
    const timeEl  = document.getElementById(`time-${clock.id}`);
    const ampmEl  = document.getElementById(`ampm-${clock.id}`);
    const dateEl  = document.getElementById(`date-${clock.id}`);
    const tzEl    = document.getElementById(`tz-${clock.id}`);

    if (!timeEl) return; // Segurança: elemento não encontrado

    // Formatar hora como HH:MM:SS
    const timeStr = `${parts.hours}:${parts.minutes}:${parts.seconds}`;

    // Só anima quando o segundo muda (evita piscar continuamente)
    if (timeEl.textContent !== timeStr) {
      triggerTickAnimation(timeEl);
      timeEl.textContent = timeStr;
    }

    // AM/PM (visível apenas no modo 12h)
    if (ampmEl) {
      ampmEl.textContent = parts.ampm;
    }

    // Data por extenso: "28 de março de 2026"
    if (dateEl) {
      dateEl.textContent = `${parts.day} de ${parts.month} de ${parts.year}`;
    }

    // Abreviação do fuso horário
    if (tzEl) {
      tzEl.textContent = clock.tzLabel;
    }
  });
}

/* -------------------------------------------------------
   Toggle 12h / 24h
   ------------------------------------------------------- */

/**
 * Alterna entre formato de 24h e 12h e atualiza a label do botão.
 */
function toggleFormat() {
  use24h = !use24h;

  const label = document.getElementById('toggleLabel');
  if (label) {
    label.textContent = use24h ? 'Mudar para 12h' : 'Mudar para 24h';
  }

  // Atualiza imediatamente sem esperar o próximo tick
  updateAllClocks();
}

/* -------------------------------------------------------
   Inicialização
   ------------------------------------------------------- */

/**
 * Configura os event listeners e inicia o intervalo de atualização.
 */
function init() {
  // Botão de toggle de formato
  const toggleBtn = document.getElementById('toggleFormat');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleFormat);
  }

  // Primeira atualização imediata (sem esperar 1 segundo)
  updateAllClocks();

  // Atualiza a cada segundo
  setInterval(updateAllClocks, 1000);
}

// Aguarda o DOM estar pronto antes de inicializar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
