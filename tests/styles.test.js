// Kiểm tra vài ràng buộc của spec nằm trong CSS: chữ Nhật tải theo mảnh, tương phản chữ ở trang quản lí,
// cỡ chữ và vùng bấm tối thiểu ở thiệp.
import { test, expect } from 'vitest'
import fs from 'node:fs'

const read = (p) => fs.readFileSync(p, 'utf8')

/** Khối khai báo của đúng bộ chọn `selector` (lần xuất hiện cuối cùng thắng, như CSS). */
function block(css, selector) {
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
