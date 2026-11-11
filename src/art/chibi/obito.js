// Obito (Tobi): tóc ngắn dựng, mặt nạ xoáy cam một lỗ mắt, áo choàng Akatsuki; vòng Kamui quay quanh lỗ mắt.
import { P, ST, FACE, eye, feet, akatsukiCloak, frame } from './common.js'

const MASK = '#c8692b'
const MASK_LINE = '#7a3a14'
const HOLE = '#1a0f0a'
const EX = 118 // tâm lỗ mắt
const EY = 98

/** Đường xoáy ốc trên mặt nạ, tâm ở lỗ mắt. */
function spiral() {
  let d = ''
  for (let i = 0; i <= 90; i++) {
    const t = i / 90
    const a = -Math.PI / 2 + t * Math.PI * 5
    const r = 10 + t * 30
    d += `${i ? 'L' : 'M'}${(EX + Math.cos(a) * r).toFixed(1)} ${(EY + Math.sin(a) * r * 1.05).toFixed(1)} `
  }
  return d.trim()
}

export function obito() {
  const inner = `${feet()}${akatsukiCloak()}
    <g class="head">
      <path d="M 48 76 L 40 54 L 56 60 L 54 36 L 70 48 L 76 26 L 90 42 L 100 22 L 110 42 L 124 26 L 130 48 L 146 36 L 144 60 L 160 54 L 152 76 C 162 104 152 130 142 136 L 58 136 C 48 130 38 104 48 76 Z" fill="${P.hair}" ${ST}/>
      <path d="${FACE}" fill="${MASK}" ${ST}/>
      <path d="${spiral()}" fill="none" stroke="${MASK_LINE}" stroke-width="1.6" stroke-linecap="round" opacity=".85"/>
      <circle cx="${EX}" cy="${EY}" r="9.5" fill="${HOLE}" ${ST}/>
      <g transform="translate(${EX} ${EY}) scale(.62) translate(${-EX} ${-EY})">${eye(EX, { cy: EY, lidFill: HOLE, white: HOLE })}</g>
      <g class="kamui">
        <path d="M ${EX - 15} ${EY - 4} A 15.5 15.5 0 0 1 ${EX + 4} ${EY - 15}" fill="none" stroke="${HOLE}" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M ${EX + 15} ${EY + 4} A 15.5 15.5 0 0 1 ${EX - 4} ${EY + 15}" fill="none" stroke="${HOLE}" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M ${EX - 11} ${EY + 13} A 17 17 0 0 1 ${EX - 17} ${EY + 2}" fill="none" stroke="${HOLE}" stroke-width="1.1" stroke-linecap="round" opacity=".6"/>
      </g>
      <path class="sway-l" d="M 56 60 L 50 76 L 62 70 Z" fill="${P.hair}" ${ST}/>
      <path class="sway-r" d="M 144 60 L 150 76 L 138 70 Z" fill="${P.hair}" ${ST}/>
    </g>`
  return frame('obito', inner)
}
