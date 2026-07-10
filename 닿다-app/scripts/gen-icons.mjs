/**
 * 셀라 브랜드 래스터 자산 생성기.
 *
 * '숨 쉬는 빛' 마크(SVG)를 새 나이트 인디고 타일 위에 렌더해
 * PWA 아이콘 · apple-touch · favicon · og-image · symbol-transparent 를
 * 다시 만든다. 텍스트가 필요한 og-image는 폰트 의존을 피하려고 라틴
 * 로마자(SELAH)만 사용한다.
 *
 *   node scripts/gen-icons.mjs
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUB = join(__dirname, "..", "public");

const NIGHT = "#14162b";
const NIGHT2 = "#20233d";
const AMBER = "#f0b274";

/** '숨 쉬는 빛' 마크를 주어진 캔버스 중앙에 배치한 group. */
function markGroup(canvas, coverage = 0.62, strokeScale = 1) {
  const size = canvas * coverage;
  const s = size / 100; // viewBox 0..100 → size
  const off = (canvas - size) / 2;
  const sw1 = 1.5 * strokeScale;
  const sw2 = 1.8 * strokeScale;
  return `
    <g transform="translate(${off} ${off}) scale(${s})">
      <circle cx="50" cy="50" r="34" stroke="${AMBER}" stroke-width="${sw1}" opacity="0.4"/>
      <circle cx="50" cy="50" r="22" stroke="${AMBER}" stroke-width="${sw2}" opacity="0.78"/>
      <circle cx="50" cy="50" r="8.5" fill="${AMBER}"/>
    </g>`;
}

/** 정사각 아이콘 타일 (불투명 나이트 배경 + 은은한 앰버 글로우 + 마크). */
function tileSVG(n) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${n}" viewBox="0 0 ${n} ${n}">
    <defs>
      <radialGradient id="g" cx="50%" cy="46%" r="52%">
        <stop offset="0%" stop-color="${AMBER}" stop-opacity="0.16"/>
        <stop offset="70%" stop-color="${AMBER}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${n}" height="${n}" fill="${NIGHT}"/>
    <rect width="${n}" height="${n}" fill="url(#g)"/>
    ${markGroup(n, 0.6, 1)}
  </svg>`;
}

/** 투명 배경 심볼 (마크만, 조금 굵은 스트로크). */
function transparentSVG(n) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${n}" viewBox="0 0 ${n} ${n}">
    ${markGroup(n, 0.72, 1.4)}
  </svg>`;
}

/** 소셜 카드 1200x630 — 나이트 그라디언트 + 마크 + SELAH. */
function ogSVG() {
  const W = 1200, H = 630;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${NIGHT2}"/>
        <stop offset="100%" stop-color="${NIGHT}"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="38%" r="40%">
        <stop offset="0%" stop-color="${AMBER}" stop-opacity="0.18"/>
        <stop offset="72%" stop-color="${AMBER}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    <g transform="translate(${W / 2 - 90} 150) scale(1.8)">
      <circle cx="50" cy="50" r="34" stroke="${AMBER}" stroke-width="1.4" opacity="0.4"/>
      <circle cx="50" cy="50" r="22" stroke="${AMBER}" stroke-width="1.7" opacity="0.78"/>
      <circle cx="50" cy="50" r="8.5" fill="${AMBER}"/>
    </g>
    <text x="${W / 2}" y="440" text-anchor="middle" fill="${AMBER}"
      font-family="Georgia, 'Times New Roman', serif" font-size="86"
      letter-spacing="26" font-weight="500">SELAH</text>
    <text x="${W / 2}" y="500" text-anchor="middle" fill="#cbc6e0"
      font-family="Georgia, serif" font-size="27" letter-spacing="3" font-style="italic">Pause, and set your heart down.</text>
  </svg>`;
}

async function png(svg, out, size) {
  let img = sharp(Buffer.from(svg));
  if (size) img = img.resize(size, size);
  await img.png().toFile(join(PUB, out));
  console.log("✓", out);
}

await png(tileSVG(512), "icon-512.png", 512);
await png(tileSVG(512), "icon-192.png", 192);
await png(tileSVG(512), "apple-touch-icon.png", 180);
await png(tileSVG(512), "favicon.png", 48);
await png(transparentSVG(512), "symbol-transparent.png", 512);
await png(ogSVG(), "og-image.png");
console.log("done.");
