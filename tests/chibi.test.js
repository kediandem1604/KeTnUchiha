import { test, expect } from 'vitest'
import { CHIBI_IDS, chibiSvg } from '../src/art/chibi/index.js'

// Động tác riêng của từng nhân vật: phải có phần tử mang class này để CSS cho chuyển động.
const SIGNATURE = { itachi: 'crow', obito: 'kamui', shisui: 'ghost', sasuke: 'chidori-spark', madara: 'fan' }

test('đủ 5 nhân vật theo thứ tự các phần thiệp', () => {
  expect(CHIBI_IDS).toEqual(['itachi', 'obito', 'shisui', 'sasuke', 'madara'])
})

test.each(['itachi', 'obito', 'shisui', 'sasuke', 'madara'])('chibi %s: SVG tem giấy, có thở/chớp mắt/động tác riêng', (id) => {
  const s = chibiSvg(id)
  expect(s.startsWith('<svg')).toBe(true)
  expect(s.trim().endsWith('</svg>')).toBe(true)
  expect(s).toContain(`class="chibi chibi--${id}"`)
  expect(s).toContain('aria-hidden="true"')
  expect(s).toContain('fill="#f6f1e7"') // con dấu giấy, sáng hơn nền trang một chút
  expect(s).toContain('stroke="#a3141a"') // viền đỏ của con dấu
  expect(s).toContain('class="breathe"')
  expect(s).toContain('class="head"')
  expect(s).toMatch(/class="lid"/)
  expect(s).toContain(`class="${SIGNATURE[id]}"`)
  expect(s).not.toMatch(/\sid="/) // không dùng id: nhiều SVG trên một trang không được trùng
})

test('nhân vật lạ thì báo lỗi', () => {
  expect(() => chibiSvg('kakashi')).toThrow('Không có chibi: kakashi')
})
