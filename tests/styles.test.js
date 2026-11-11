// Kiểm tra vài ràng buộc của spec nằm trong CSS: chữ Nhật tải theo mảnh, tương phản chữ ở trang quản lí,
// cỡ chữ và vùng bấm tối thiểu ở thiệp.
import { test, expect } from 'vitest'
import fs from 'node:fs'

const read = (p) => fs.readFileSync(p, 'utf8')

/** Khối khai báo của đúng bộ chọn `selector` (lần xuất hiện cuối cùng thắng, như CSS). */
function block(css, selector) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, '') // bỏ chú thích
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const all = [...css.matchAll(new RegExp(`(?:^|\\})\\s*${esc}\\s*\\{([^}]*)\\}`, 'g'))]
  if (!all.length) throw new Error('Không thấy bộ chọn ' + selector)
  return all.map((m) => m[1]).join(';')
}
const px = (decls, prop) => {
  const all = [...decls.matchAll(new RegExp(`(?:^|;|\\s)${prop}:\\s*([\\d.]+)px`, 'g'))]
  return all.length ? Number(all.at(-1)[1]) : NaN
}

test('chữ Nhật chỉ tải theo mảnh: mọi @font-face Noto Serif JP được nhập đều có unicode-range', () => {
  const files = [...read('src/styles/fonts.css').matchAll(/@import '@fontsource\/noto-serif-jp\/([^']+)'/g)].map((m) => m[1])
  expect(files.length).toBeGreaterThan(0)
  for (const f of files) {
    const faces = read(`node_modules/@fontsource/noto-serif-jp/${f}`).split('@font-face').slice(1)
    expect(faces.length).toBeGreaterThan(1)
    for (const face of faces) expect(face).toMatch(/unicode-range/)
  }
})

test('trang quản lí không dùng đỏ sẫm (#c21d24/#a3141a) làm màu chữ: dưới 4.5:1 trên nền mực', () => {
  const offenders = []
  for (const f of ['base', 'sections', 'rsvp', 'admin']) {
    read(`src/styles/admin/${f}.css`).split('\n').forEach((line, i) => {
      if (/(^|[^-])color:\s*var\(--(sky-(4|5|6|7)00|gold|gold-deep)\)/.test(line)) offenders.push(`${f}.css:${i + 1}`)
    })
  }
  expect(offenders).toEqual([])
})

test('thiệp: đoạn văn ≥ 15px, vùng bấm ≥ 44px', () => {
  const wishes = read('src/styles/wishes.css')
  expect(px(block(wishes, '.wish__msg'), 'font-size')).toBeGreaterThanOrEqual(15)
  expect(px(block(wishes, '.wall__empty,\n.wall__error p'), 'font-size')).toBeGreaterThanOrEqual(15)
  expect(px(block(wishes, '.wall__error .btn'), 'min-height')).toBeGreaterThanOrEqual(44)
  expect(px(block(read('src/styles/hero.css'), '.hero__cue'), 'min-height')).toBeGreaterThanOrEqual(44)
})

// ── Phần trong thiệp: tông "Mực trên giấy" ──────────────
const lum = (hex) => {
  const c = hex.replace('#', '').match(/\w\w/g).map((x) => parseInt(x, 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}
const contrast = (a, b) => {
  const [x, y] = [lum(a), lum(b)]
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}
const pageTokens = () => {
  const decls = block(read('src/styles/tokens.css'), '.page')
  return Object.fromEntries([...decls.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]))
}

test('phần trong thiệp dùng nền giấy ngà, chữ mực (bìa vẫn tối)', () => {
  const t = pageTokens()
  expect(t.ink).toBe('#ece5d7')
  expect(t.bone).toBe('#161212')
  expect(block(read('src/styles/tokens.css'), ':root')).toMatch(/--ink:\s*#0c0a0a/)
})

test('chữ trên nền giấy và nền thẻ đều đạt tương phản ≥ 4.5:1', () => {
  const t = pageTokens()
  for (const fg of ['bone', 'bone-soft', 'ash', 'red-bright'])
    for (const bg of ['ink', 'ink-2']) expect(contrast(t[fg], t[bg]), `${fg} trên ${bg}`).toBeGreaterThanOrEqual(4.5)
})

test('các phần thiệp không còn màu nền tối/viền ngà viết cứng', () => {
  const offenders = []
  for (const f of ['base', 'hero', 'invite', 'schedule', 'venue', 'rsvp', 'wishes', 'contact', 'closing']) {
    read(`src/styles/${f}.css`).split('\n').forEach((line, i) => {
      if (/rgba\(12, 10, 10|#121010|rgba\(235, 227, 213/.test(line)) offenders.push(`${f}.css:${i + 1}`)
    })
  }
  expect(offenders).toEqual([])
})
