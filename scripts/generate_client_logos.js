import fs from 'fs';
import path from 'path';

const dir = 'public/images/clients';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// 1. Reform Social & Grill
const reformSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" width="240" height="60">
  <g fill="#1a1a1a" font-family="Georgia, serif" text-anchor="middle">
    <text x="120" y="27" font-size="20" font-weight="900" letter-spacing="3">REFORM</text>
    <text x="120" y="43" font-size="9" font-weight="700" letter-spacing="2" fill="#444444">SOCIAL &amp; GRILL</text>
    <text x="120" y="54" font-size="7.5" font-weight="600" letter-spacing="1.5" fill="#777777">THE LAKES • DUBAI</text>
  </g>
</svg>`;

// 2. Tehreem Cleaning Services
const tehreemSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 60" width="260" height="60">
  <circle cx="28" cy="30" r="22" fill="#00833e" />
  <circle cx="28" cy="30" r="19" fill="#eaf6ee" />
  <path d="M 20 41 C 20 34 24 31 28 31 C 32 31 36 34 36 41 Z" fill="#0e3a6c" />
  <circle cx="28" cy="24" r="5.5" fill="#e0a370" />
  <path d="M 23 21 C 23 18 33 18 33 21 C 33 24 23 24 23 21 Z" fill="#1b2533" />
  <line x1="34" y1="14" x2="40" y2="38" stroke="#37a000" stroke-width="2" stroke-linecap="round"/>
  <rect x="31" y="12" width="7" height="3" rx="1" fill="#37a000"/>
  <path d="M 38 16 L 39 19 L 42 20 L 39 21 L 38 24 L 37 21 L 34 20 L 37 19 Z" fill="#00833e"/>

  <text x="58" y="24" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#00833e">مؤسسة تريم لخدمات التنظيف</text>
  <text x="58" y="39" font-family="Arial, sans-serif" font-size="10" font-weight="900" letter-spacing="0.5" fill="#0e3a6c">TEHREEM CLEANING SERVICES</text>
  <text x="58" y="51" font-family="Arial, sans-serif" font-size="7.5" font-weight="600" letter-spacing="0.8" fill="#556980">DUBAI • UAE</text>
</svg>`;

// 3. Cazajenica Luxury Apparel
const cazajenicaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" width="240" height="60">
  <defs>
    <linearGradient id="cazaGold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#d4af37"/>
      <stop offset="50%" stop-color="#b8860b"/>
      <stop offset="100%" stop-color="#996515"/>
    </linearGradient>
  </defs>
  <path d="M 120 7 L 124 13 L 131 9 L 129 17 L 111 17 L 109 9 L 116 13 Z" fill="url(#cazaGold)"/>
  <circle cx="120" cy="6" r="1.5" fill="#d4af37"/>
  <circle cx="109" cy="8" r="1.2" fill="#d4af37"/>
  <circle cx="131" cy="8" r="1.2" fill="#d4af37"/>
  <text x="120" y="38" font-family="Georgia, serif" font-style="italic" font-size="22" font-weight="700" text-anchor="middle" fill="url(#cazaGold)">Cazajenica</text>
  <path d="M 68 43 Q 120 48 172 43" stroke="#e04f85" stroke-width="2" fill="none" stroke-linecap="round"/>
  <text x="120" y="54" font-family="Arial, sans-serif" font-size="7" font-weight="700" letter-spacing="3" text-anchor="middle" fill="#8a6d25">APPAREL &amp; LUXURY</text>
</svg>`;

// 4. HSI Winning People
const hsiSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 60" width="230" height="60">
  <g transform="translate(12, 6)">
    <path d="M 22 2 C 34 2 40 8 40 18 C 40 34 22 44 22 44 C 22 44 4 34 4 18 C 4 8 10 2 22 2 Z" fill="#0d2b59" stroke="#ffffff" stroke-width="1.5"/>
    <path d="M 22 5 C 32 5 37 10 37 18 C 37 31 22 40 22 40 C 22 40 7 31 7 18 C 7 10 12 5 22 5 Z" fill="#0e3a75"/>
    <text x="22" y="27" font-family="Arial, sans-serif" font-weight="900" font-size="15" fill="#ffffff" text-anchor="middle" letter-spacing="1">HSI</text>
  </g>
  <text x="64" y="26" font-family="Arial, sans-serif" font-size="14" font-weight="800" fill="#0d2b59">Winning</text>
  <text x="125" y="26" font-family="Arial, sans-serif" font-size="14" font-weight="800" fill="#cc1414">People</text>
  <rect x="64" y="32" width="130" height="2" fill="#cc1414"/>
  <text x="64" y="47" font-family="Arial, sans-serif" font-size="8" font-weight="700" letter-spacing="1.2" fill="#4a5568">SINCE 1991 • CORPORATE</text>
</svg>`;

// 5. Hopson The Lakes
const hopsonSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" width="240" height="60">
  <g transform="translate(16, 12)" fill="#1e5f38">
    <polygon points="12,4 6,14 18,14"/>
    <polygon points="12,11 4,22 20,22"/>
    <polygon points="12,18 2,30 22,30"/>
    <rect x="10.5" y="30" width="3" height="5" fill="#4a3728"/>
    <polygon points="26,0 19,12 33,12"/>
    <polygon points="26,9 16,21 36,21"/>
    <polygon points="26,17 14,31 38,31"/>
    <rect x="24.5" y="31" width="3" height="5" fill="#4a3728"/>
    <polygon points="40,5 34,15 46,15"/>
    <polygon points="40,12 32,23 48,23"/>
    <polygon points="40,19 30,31 50,31"/>
    <rect x="38.5" y="31" width="3" height="5" fill="#4a3728"/>
  </g>
  <text x="74" y="27" font-family="Georgia, serif" font-size="13.5" font-weight="800" letter-spacing="1" fill="#144227">HOPSON THE LAKES</text>
  <text x="74" y="41" font-family="Arial, sans-serif" font-size="7.5" font-weight="700" letter-spacing="1" fill="#2d6a4f">FINANCIAL GROUP</text>
  <text x="74" y="52" font-family="Arial, sans-serif" font-size="7" font-weight="500" letter-spacing="0.5" fill="#6b7280">WEALTH &amp; ASSET SERVICES</text>
</svg>`;

// 6. Peroni Nastro Azzurro
const peroniSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 60" width="230" height="60">
  <path d="M 18 10 L 38 8 L 28 52 L 8 54 Z" fill="#003580"/>
  <path d="M 20 26 L 36 24 L 34 34 L 18 36 Z" fill="#cc1414"/>
  <text x="48" y="27" font-family="Georgia, serif" font-size="17" font-weight="900" letter-spacing="2" fill="#002244">PERONI</text>
  <text x="48" y="41" font-family="Arial, sans-serif" font-size="9" font-weight="800" letter-spacing="2.5" fill="#003580">NASTRO AZZURRO</text>
  <text x="48" y="52" font-family="Arial, sans-serif" font-size="6.5" font-weight="600" letter-spacing="1.5" fill="#b08d4b">ITALIA • EST. 1846</text>
</svg>`;

// 7. Lendepandans Sesel
const lendepandansSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" width="240" height="60">
  <defs>
    <linearGradient id="seselGold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e6b800"/>
      <stop offset="100%" stop-color="#b38600"/>
    </linearGradient>
  </defs>
  <text x="30" y="38" font-family="Georgia, serif" font-size="34" font-weight="900" fill="url(#seselGold)">50</text>
  <path d="M 48 14 Q 53 24 49 36" stroke="#003f87" stroke-width="2.5" fill="none"/>
  <path d="M 51 16 Q 56 25 52 36" stroke="#fcd116" stroke-width="2.5" fill="none"/>
  <path d="M 54 18 Q 59 26 55 36" stroke="#d21034" stroke-width="2.5" fill="none"/>
  <text x="66" y="26" font-family="Arial, sans-serif" font-size="11.5" font-weight="900" letter-spacing="1" fill="#111827">LENDEPANDANS SESEL</text>
  <text x="66" y="41" font-family="Georgia, serif" font-style="italic" font-size="8.5" font-weight="600" fill="#b38600">"Nou Pep, Nou Lidanite, Nou Destin"</text>
  <text x="66" y="52" font-family="Arial, sans-serif" font-size="7" font-weight="600" letter-spacing="1" fill="#4b5563">GOLDEN JUBILEE</text>
</svg>`;

// 8. 75outh Apparel
const south75Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" width="220" height="60">
  <g transform="translate(16, 12)" fill="#c59b27">
    <polygon points="18,0 21,13 34,13 23,19 27,32 18,24 9,32 13,19 2,13 15,13"/>
    <circle cx="18" cy="18" r="3" fill="#111827"/>
  </g>
  <text x="56" y="31" font-family="Georgia, serif" font-style="italic" font-size="24" font-weight="900" fill="#c59b27">75<tspan font-family="Arial, sans-serif" font-style="normal" font-size="16" fill="#111827">outh</tspan></text>
  <text x="56" y="44" font-family="Arial, sans-serif" font-size="8" font-weight="600" letter-spacing="1" fill="#555555">THE BEST OF SEYCHELLES</text>
  <text x="56" y="54" font-family="Arial, sans-serif" font-size="6.5" font-weight="700" letter-spacing="2" fill="#888888">LUXURY APPAREL</text>
</svg>`;

// 9. Jai Baniyas
const jaiBaniyasSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" width="240" height="60">
  <g transform="translate(16, 10)">
    <polygon points="16,2 30,8 30,22 16,34 2,22 2,8" fill="#0d47a1"/>
    <polygon points="16,5 27,10 27,20 16,30 5,20 5,10" fill="#1565c0"/>
    <path d="M 16 8 L 16 26 M 9 17 L 23 17" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
  </g>
  <text x="56" y="24" font-family="Arial, sans-serif" font-size="13" font-weight="900" letter-spacing="1" fill="#0d47a1">JAI BANIYAS</text>
  <text x="56" y="38" font-family="Arial, sans-serif" font-size="8.5" font-weight="800" letter-spacing="0.8" fill="#1565c0">CALLED • EMPOWERED • CHOSEN</text>
  <text x="56" y="50" font-family="Georgia, serif" font-style="italic" font-size="7.5" fill="#616161">"For His Purpose" — Judges 6:12</text>
</svg>`;

// 10. Trust The Process (US Athletics)
const trustProcessSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 60" width="230" height="60">
  <g transform="translate(16, 11)">
    <rect x="0" y="0" width="34" height="36" rx="6" fill="#c62828"/>
    <text x="17" y="24" font-family="Arial, sans-serif" font-size="16" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">US</text>
  </g>
  <text x="60" y="26" font-family="Arial, sans-serif" font-size="13.5" font-weight="900" letter-spacing="1" fill="#111827">TRUST THE PROCESS</text>
  <text x="60" y="39" font-family="Arial, sans-serif" font-size="8" font-weight="700" letter-spacing="2" fill="#c62828">ATHLETIC WEAR</text>
  <text x="60" y="50" font-family="Arial, sans-serif" font-size="7" font-weight="600" letter-spacing="1" fill="#6b7280">CUSTOM MERCHANDISE</text>
</svg>`;

fs.writeFileSync(path.join(dir, 'reform.svg'), reformSvg);
fs.writeFileSync(path.join(dir, 'tehreem.svg'), tehreemSvg);
fs.writeFileSync(path.join(dir, 'cazajenica.svg'), cazajenicaSvg);
fs.writeFileSync(path.join(dir, 'hsi.svg'), hsiSvg);
fs.writeFileSync(path.join(dir, 'hopson.svg'), hopsonSvg);
fs.writeFileSync(path.join(dir, 'peroni.svg'), peroniSvg);
fs.writeFileSync(path.join(dir, 'lendepandans.svg'), lendepandansSvg);
fs.writeFileSync(path.join(dir, '75outh.svg'), south75Svg);
fs.writeFileSync(path.join(dir, 'jaibaniyas.svg'), jaiBaniyasSvg);
fs.writeFileSync(path.join(dir, 'trustprocess.svg'), trustProcessSvg);

console.log('All 10 SVGs written successfully!');
