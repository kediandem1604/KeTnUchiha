import { test, expect } from 'vitest'
import { COVER, coverNext, nameSizeClass } from '../src/lib/cover-state.js'

const { IDLE, SCANNING, AUTHED, ENTERING, OPEN } = COVER

test.each([
  [IDLE, 'tap', SCANNING],
  [SCANNING, 'scanDone', AUTHED],
  [AUTHED, 'tap', ENTERING],
  [ENTERING, 'enterDone', OPEN],
  [SCANNING, 'tap', SCANNING],
  [ENTERING, 'tap', ENTERING],
  [OPEN, 'tap', OPEN],
  [IDLE, 'scanDone', IDLE],
  [AUTHED, 'enterDone', AUTHED],
])('%s + %s → %s', (s, e, next) => {
  expect(coverNext(s, e)).toBe(next)
})

test('chạm dồn dập chỉ đi đúng một đường', () => {
  let s = IDLE
  for (const e of ['tap', 'tap', 'tap', 'scanDone', 'tap', 'tap', 'enterDone', 'tap']) s = coverNext(s, e)
  expect(s).toBe(OPEN)
})

test('cỡ tên theo độ dài', () => {
  expect(nameSizeClass('Minh Anh')).toBe('')
  expect(nameSizeClass('  bạn  ')).toBe('')
  expect(nameSizeClass('Nguyễn Thị Thanh Hương')).toBe('is-long')
  expect(nameSizeClass('Nguyễn Thị Thanh Hương Trần Ngọc Bảo Anh')).toBe('is-very-long')
})
