// Mỗi phần có nhân vật dùng đầu mục kèm chibi (characterIntro) đúng nhân vật của mình.
import { test, expect } from 'vitest'
import fs from 'node:fs'

test.each([
  ['invite', 1, 'itachi'],
  ['schedule', 2, 'obito'],
  ['venue', 3, 'shisui'],
  ['rsvp', 4, 'sasuke'],
  ['wishes', 5, 'madara'],
])('phần %s dùng chibi của nhân vật số %i (%s)', (file, n, character) => {
  const src = fs.readFileSync(`src/sections/${file}.js`, 'utf8')
  expect(src).toMatch(new RegExp('characterIntro\\(\\{ n: ' + n + ", label: '[^']+', character: '" + character + "'"))
  expect(src).not.toMatch(/characterHead\(/)
})

test('trang thiệp nạp CSS chibi; bầy quạ đứng yên ở lời mời đã bỏ', () => {
  expect(fs.readFileSync('src/main.js', 'utf8')).toContain("import './styles/chibi.css'")
  expect(fs.readFileSync('src/sections/invite.js', 'utf8')).not.toContain('crowsSvg')
})
