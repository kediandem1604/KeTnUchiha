import { test, expect } from 'vitest'
import { crestSvg } from '../src/art/crest.js'
import { PATTERNS, CHARACTERS, eyeBadgeSvg, TOMOE_PATH } from '../src/art/mangekyo.js'
import { crowsSvg, kamuiSvg, tsukuyomiMoonSvg, chidoriSvg } from '../src/art/motifs.js'
import { REACTION_ICONS, reactionIconSvg } from '../src/art/reaction-icons.js'

test('đủ mẫu mắt và nhân vật', () => {
  expect(Object.keys(PATTERNS).sort()).toEqual(['itachi', 'madara', 'obito', 'sasuke', 'sharingan', 'shisui'])
  expect(Object.keys(CHARACTERS)).toEqual(['itachi', 'obito', 'shisui', 'sasuke', 'madara'])
  expect(CHARACTERS.obito).toEqual({ name: 'Obito', katakana: 'オビト', technique: 'Kamui' })
})

test.each(['sharingan', 'itachi', 'obito', 'shisui', 'sasuke', 'madara'])('eyeBadgeSvg(%s) là SVG đĩa đỏ', (p) => {
  const s = eyeBadgeSvg(p, 34)
  expect(s.startsWith('<svg')).toBe(true)
  expect(s).toContain('viewBox="-40 -40 80 80"')
  expect(s).toContain('width="34"')
  expect(s).toContain('fill="#a3141a"')
  expect(s).toContain(PATTERNS[p])
  expect(s.trim().endsWith('</svg>')).toBe(true)
})

test('mẫu mắt lạ thì báo lỗi', () => {
  expect(() => eyeBadgeSvg('kakashi')).toThrow('Không có mẫu mắt: kakashi')
})

test('gia huy và họa tiết là SVG đúng khung', () => {
  expect(crestSvg({ size: 40 })).toContain('width="40" height="50"')
  expect(crowsSvg().match(/class="crow"/g)).toHaveLength(6)
  expect(kamuiSvg().match(/<path/g)).toHaveLength(3)
  expect(tsukuyomiMoonSvg()).toContain('viewBox="-150 -150 300 300"')
  expect(tsukuyomiMoonSvg().split(TOMOE_PATH).length - 1).toBe(9)
  expect(chidoriSvg().match(/<polyline/g)).toHaveLength(2)
})

test('icon cảm xúc', () => {
  expect(Object.keys(REACTION_ICONS)).toEqual(['tim', 'katon', 'sharingan', 'votay', 'mu'])
  expect(reactionIconSvg('katon', 20)).toContain('width="20"')
  expect(() => reactionIconSvg('phao')).toThrow()
})

import { REACTION_KEYS } from '../shared/constants.js'
test('mỗi cảm xúc có icon', () => expect(Object.keys(REACTION_ICONS)).toEqual(REACTION_KEYS))
