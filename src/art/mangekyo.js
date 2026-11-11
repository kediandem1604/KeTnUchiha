// Các mẫu mắt (vẽ phỏng theo, hệ toạ độ −40…40, mống mắt r = 38).

const K = '#0a0505'

/** Một tomoe: chấm tròn + đuôi cong. Đặt quanh vòng r = 22.5. */
export const TOMOE_PATH = 'M 5.2 0 A 5.2 5.2 0 1 1 -5.2 0 C -5.2 -6 -1.5 -11 6.5 -13 C 2.8 -9.5 5.2 -5 5.2 0 Z'

const around = (n, step, fn) => Array.from({ length: n }, (_, i) => fn(i * step)).join('')

const tomoe = (angle) => `<path fill="${K}" transform="rotate(${angle}) translate(0 -22.5) rotate(-75)" d="${TOMOE_PATH}"/>`

export const PATTERNS = {
  sharingan: `<circle r="22.5" fill="none" stroke="${K}" stroke-width="1.4"/>${around(3, 120, tomoe)}<circle r="8.5" fill="${K}"/>`,
  // Chong chóng 3 cánh quanh tâm tròn
  itachi: `<circle r="12" fill="${K}"/>` +
    around(3, 120, (a) => `<path fill="${K}" transform="rotate(${a})" d="M -6 -6 C -4 -21 8 -31 24 -27 C 11 -24 6 -15 7 -5 Z"/>`),
  // Vòng rỗng + 3 lưỡi hái cong
  obito: `<circle r="10" fill="none" stroke="${K}" stroke-width="3.4"/>` +
    around(3, 120, (a) => `<path fill="${K}" transform="rotate(${a})" d="M 2 -10 C 12 -13 20 -21 20 -31 C 15 -23 8 -19 -6 -18 Z"/>`) +
    `<circle r="4" fill="${K}"/>`,
  // Chong chóng 4 cánh, tâm đỏ có đồng tử
  shisui: around(4, 90, (a) => `<path fill="${K}" transform="rotate(${a})" d="M -4 -7 C 1 -18 11 -26 26 -24 C 15 -20 9 -11 7 -3 Z"/>`) +
    `<circle r="9" fill="${K}"/><circle r="5.5" fill="#a3141a"/><circle r="2.6" fill="${K}"/>`,
  // 3 hình thấu kính đan 60°, tâm đỏ có đồng tử
  sasuke: around(3, 60, (a) => `<path fill="${K}" transform="rotate(${a})" d="M -36 0 Q 0 -13 36 0 Q 0 13 -36 0 Z"/>`) +
    `<circle r="10" fill="#a3141a"/><circle r="10" fill="none" stroke="${K}" stroke-width="1.4"/><circle r="4.6" fill="${K}"/>`,
  // Vòng dày + 3 cánh cong + tâm tròn
  madara: `<circle r="21" fill="none" stroke="${K}" stroke-width="3.2"/>` +
    around(3, 120, (a) => `<path fill="${K}" transform="rotate(${a})" d="M 0 -6 C 9 -14 11 -27 3 -36 C 4 -28 -2 -20 -9 -14 Z"/>`) +
    `<circle r="8.5" fill="${K}"/>`,
}

export const CHARACTERS = {
  itachi: { name: 'Itachi', katakana: 'イタチ', technique: '' },
  obito: { name: 'Obito', katakana: 'オビト', technique: 'Kamui' },
  shisui: { name: 'Shisui', katakana: 'シスイ', technique: 'Thuấn Thân' },
  sasuke: { name: 'Sasuke', katakana: 'サスケ', technique: 'Chidori' },
  madara: { name: 'Madara', katakana: 'マダラ', technique: 'Nguyệt Độc' },
}

/** Con mắt tròn (đĩa đỏ + mẫu) dạng chuỗi SVG. */
export function eyeBadgeSvg(pattern, size = 40) {
  if (!Object.hasOwn(PATTERNS, pattern)) throw new Error('Không có mẫu mắt: ' + pattern)
  return `<svg viewBox="-40 -40 80 80" width="${size}" height="${size}" aria-hidden="true">` +
    '<circle r="38" fill="#a3141a"/><circle r="38" fill="none" stroke="#120708" stroke-width="2.4"/>' +
    PATTERNS[pattern] +
    '</svg>'
}
