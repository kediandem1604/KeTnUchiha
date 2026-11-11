// Phần dùng chung cho các chibi kiểu "tem giấy": bảng màu, con dấu, mắt chớp, áo choàng Akatsuki.
// Hệ toạ độ: viewBox "-6 12 212 214", con dấu tâm (100, 118); đầu ~ y 18–140, thân ~ y 140–214.

export const P = {
  skin: '#f1e2cf',
  hair: '#1c1717',
  line: '#120d0d',
  cloak: '#151111',
  red: '#a3141a',
  bone: '#ebe3d5',
  seal: '#f6f1e7',
  faint: '#9a7c70',
  white: '#fbf6ee',
  mouth: '#5b4038',
}

/** Thuộc tính nét viền chung. */
export const ST = `stroke="${P.line}" stroke-width="1.5" stroke-linejoin="round"`

/** Khuôn mặt tròn kiểu chibi. */
export const FACE = 'M 52 94 C 52 60 74 44 100 44 C 126 44 148 60 148 94 C 148 122 128 138 100 140 C 72 138 52 122 52 94 Z'

/** Mây Akatsuki (đặt bằng translate/scale). */
export const CLOUD = 'M 0 0 c -2 -6 4 -10 9 -7 c 2 -5 10 -5 12 0 c 5 -2 9 3 6 7 c 3 4 -1 9 -6 7 c -3 5 -10 4 -12 0 c -5 2 -10 -1 -9 -7 z'

export function seal() {
  return `<circle cx="100" cy="118" r="100" fill="${P.seal}"/><circle cx="100" cy="118" r="94" fill="none" stroke="${P.red}" stroke-width="3"/>`
}

/** Mắt Sharingan có mí chớp (`.lid`). `lidFill` = màu mí (da, hoặc màu mặt nạ). */
export function eye(cx, { cy = 100, lidFill = P.skin, white = P.white } = {}) {
  return `<g>
    <path d="M ${cx - 12} ${cy} Q ${cx} ${cy - 9} ${cx + 12} ${cy} Q ${cx} ${cy + 8} ${cx - 12} ${cy} Z" fill="${white}"/>
    <circle cx="${cx}" cy="${cy + 0.5}" r="6.4" fill="#c21d24"/>
    <circle cx="${cx}" cy="${cy + 0.5}" r="2.2" fill="#0a0505"/>
    <circle cx="${cx}" cy="${cy - 3.8}" r="1" fill="#0a0505"/><circle cx="${cx + 3.7}" cy="${cy + 2.6}" r="1" fill="#0a0505"/><circle cx="${cx - 3.7}" cy="${cy + 2.6}" r="1" fill="#0a0505"/>
    <circle cx="${cx - 2.4}" cy="${cy - 2}" r="1.3" fill="${P.white}" opacity=".9"/>
    <path d="M ${cx - 13} ${cy - 1} Q ${cx} ${cy - 10.5} ${cx + 13} ${cy - 1}" fill="none" stroke="${P.line}" stroke-width="2.4" stroke-linecap="round"/>
    <rect class="lid" x="${cx - 13}" y="${cy - 9}" width="26" height="16" rx="6" fill="${lidFill}"/>
  </g>`
}

export function feet(color = P.hair) {
  return `<ellipse cx="84" cy="209" rx="10" ry="5" fill="${color}" ${ST}/><ellipse cx="116" cy="209" rx="10" ry="5" fill="${color}" ${ST}/>`
}

/** Áo choàng Akatsuki thân ngắn, cổ cao lót đỏ, mây đỏ viền ngà. */
export function akatsukiCloak() {
  return `<path d="M 58 146 C 52 166 46 186 42 206 L 158 206 C 154 186 148 166 142 146 C 128 156 114 160 100 160 C 86 160 72 156 58 146 Z" fill="${P.cloak}" ${ST}/>
    <path d="M 100 162 L 100 206" stroke="#2c2626" stroke-width="1.2"/>
    <path transform="translate(60 186) scale(.85)" d="${CLOUD}" fill="${P.red}" stroke="${P.bone}" stroke-width="1.6"/>
    <path transform="translate(118 194) scale(.75)" d="${CLOUD}" fill="${P.red}" stroke="${P.bone}" stroke-width="1.7"/>
    <path d="M 60 126 C 68 142 84 148 100 148 C 116 148 132 142 140 126 L 150 152 C 136 162 118 164 100 164 C 82 164 64 162 50 152 Z" fill="${P.cloak}" ${ST}/>
    <path d="M 70 134 C 80 144 92 147 100 147 C 108 147 120 144 130 134 L 133 142 C 122 152 108 154 100 154 C 92 154 78 152 67 142 Z" fill="${P.red}"/>`
}

/** Khung SVG chung: con dấu + nhóm thở (`.breathe`) + phần nằm ngoài nhóm thở (vd. quạ bay). */
export function frame(id, inner, outside = '') {
  return `<svg class="chibi chibi--${id}" viewBox="-6 12 212 214" aria-hidden="true">${seal()}<g class="breathe">${inner}</g>${outside}</svg>`
}
