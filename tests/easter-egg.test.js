import { test, expect } from 'vitest'
import { consoleArt } from '../src/fx/easter-egg.js'

test('lời nhắn trong console theo tên và ngày', () => {
  const s = consoleArt({ shortName: 'Quốc', dateText: '26.11.2026' })
  expect(s).toContain('Ồ, bạn mở F12 à? Đúng là dân code.')
  expect(s).toContain('Quốc tốt nghiệp ngày 26.11.2026, nhớ ghé nhé.')
  expect(s.split('\n').length).toBeGreaterThanOrEqual(14)
})
