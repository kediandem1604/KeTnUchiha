import { test, expect } from 'vitest'
import { splitName, hanYear } from '../src/lib/names.js'

test.each([
  ['Nguyễn Tiến Quốc', { first: 'Nguyễn', rest: 'Tiến Quốc' }],
  ['  Tiến   Quốc ', { first: 'Tiến', rest: 'Quốc' }],
  ['Quốc', { first: '', rest: 'Quốc' }],
  ['', { first: '', rest: '' }],
])('splitName(%j)', (input, out) => expect(splitName(input)).toEqual(out))

test('năm viết bằng số Hán', () => {
  expect(hanYear(2026)).toBe('二〇二六')
  expect(hanYear(2030)).toBe('二〇三〇')
})
