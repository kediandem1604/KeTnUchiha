// Họa tiết cho từng phần: quạ (Itachi), xoáy Kamui (Obito), trăng Nguyệt Độc (Madara), tia Chidori (Sasuke).
import { TOMOE_PATH } from './mangekyo.js'

// Quạ đang bay, nhìn nghiêng: mỏ bên trái, cánh giơ lên, đuôi xoè.
const CROW =
  'M -13 0.6 L -10 -0.4 C -8.6 -2.2 -6 -2.6 -3.4 -1.6 L -0.6 -1.2 ' +
  'C 1.4 -5 4.4 -9.6 9.4 -13 L 8 -9.6 L 10.6 -11 L 8.8 -7.4 L 11.6 -8 L 7.2 -2.6 ' +
  'C 9.6 -1.8 12 -1.6 15 -2.4 L 13.4 -0.2 L 15.6 1.4 ' +
  'C 12 1.8 8.6 2.2 5.2 2.2 C 1 2.8 -3.2 2.6 -6.4 1.8 C -8.8 1.4 -11 1.1 -13 0.6 Z'

// [x, y, tỉ lệ, góc]
const CROWS = [[30, 30, 0.9, -8], [70, 18, 1.2, 6], [110, 40, 0.8, -4], [92, 72, 1.05, 10], [128, 88, 0.7, -12], [52, 60, 0.65, 4]]

export function crowsSvg() {
  const birds = CROWS.map(([x, y, s, r], i) =>
    `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><g class="crow" style="--i:${i}"><path d="${CROW}" fill="#ebe3d5"/></g></g>`,
  ).join('')
  return `<svg viewBox="0 0 150 120" aria-hidden="true">${birds}</svg>`
}

/** 3 nhánh xoắn ốc Archimedes. */
export function kamuiSvg() {
  let arms = ''
  for (let arm = 0; arm < 3; arm++) {
    let d = ''
    for (let i = 0; i <= 100; i++) {
      const t = i / 100
      const a = t * Math.PI * 4 + arm * ((Math.PI * 2) / 3)
      const r = 8 + t * 158
      d += `${i ? 'L' : 'M'}${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)} `
    }
    arms += `<path d="${d.trim()}" fill="none" stroke="#857a71" stroke-width="${(1.2 - arm * 0.25).toFixed(2)}" opacity="${(0.55 - arm * 0.12).toFixed(2)}"/>`
  }
  return `<svg viewBox="-170 -170 340 340" aria-hidden="true">${arms}</svg>`
}

/** Mặt trăng Nguyệt Độc (Rinne Sharingan): 4 vòng đồng tâm, 9 tomoe. */
export function tsukuyomiMoonSvg() {
  const D = '#2a0507'
  let s = '<circle r="148" fill="#7e1015"/>'
  for (const r of [28, 62, 96, 130]) s += `<circle r="${r}" fill="none" stroke="${D}" stroke-width="2.4"/>`
  s += `<circle r="12" fill="${D}"/>`
  ;[28, 62, 96].forEach((r, ring) => {
    for (let i = 0; i < 3; i++) {
      s += `<path fill="${D}" transform="rotate(${i * 120 + ring * 40}) translate(0 -${r}) rotate(-75) scale(1.6)" d="${TOMOE_PATH}"/>`
    }
  })
  return `<svg viewBox="-150 -150 300 300" aria-hidden="true">${s}</svg>`
}

export function chidoriSvg() {
  return '<svg class="chidori" viewBox="0 0 140 56" preserveAspectRatio="none" aria-hidden="true">' +
    '<polyline fill="none" stroke="#e6eef8" stroke-width="1.6" points="0,30 14,22 22,34 36,18 46,32 58,14 70,36 82,20 94,30 106,12 118,34 130,22 140,28"/>' +
    '<polyline fill="none" stroke="#e6eef8" stroke-width=".9" opacity=".7" points="0,40 18,46 30,36 44,48 60,38 76,50 92,40 110,48 126,38 140,44"/>' +
    '</svg>'
}
