// Orari di entrambe le sedi (lunedì → domenica), [oraInizio, min, oraFine, min]; fonte: sito e Google
const GIORNI = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
const FERIALE = [[9, 30, 12, 30], [15, 30, 19, 30]];
const H = [[], FERIALE, FERIALE, FERIALE, FERIALE, FERIALE, []];

const ora = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' }));
const oggi = (ora.getDay() + 6) % 7, min = ora.getHours() * 60 + ora.getMinutes();
const f = (h, m) => `${h}:${String(m).padStart(2, '0')}`;
const fascia = H[oggi].find(([a, b, c, d]) => min >= a * 60 + b && min < c * 60 + d);
const dopo = H[oggi].find(([a, b]) => min < a * 60 + b);
let prossimo = null;
for (let i = 1; i <= 7 && !dopo && !prossimo; i++) { const g = (oggi + i) % 7; if (H[g].length) prossimo = [g, H[g][0]]; }
const testo = fascia ? `Aperto ora, fino alle ${f(fascia[2], fascia[3])}` : dopo ? `Chiuso ora, apre alle ${f(dopo[0], dopo[1])}`
  : `Chiuso ora, riapre ${prossimo[0] === (oggi + 1) % 7 ? 'domani' : GIORNI[prossimo[0]].toLowerCase()} alle ${f(prossimo[1][0], prossimo[1][1])}`;
document.querySelectorAll('[data-stato]').forEach(e => { e.classList.add(fascia ? 'aperto' : 'chiuso'); e.textContent = testo; });
const tab = document.getElementById('orari');
if (tab) tab.innerHTML = H.map((sl, i) => `<tr class="${i === oggi ? 'oggi' : ''}"><td>${GIORNI[i]}</td><td>${sl.length ? sl.map(s => f(s[0], s[1]) + '–' + f(s[2], s[3])).join('<br>') : 'Chiuso'}</td></tr>`).join('');
