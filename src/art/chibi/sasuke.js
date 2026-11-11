// Sasuke (thời Taka): tóc dựng sau gáy, mái dài hai bên, áo trắng cổ rộng, dây thừng tím thắt nơ, kiếm sau lưng;
// tay giơ lên có tia Chidori lấp lánh.
import { P, ST, FACE, eye, feet, frame } from './common.js'

const SHIRT = '#f4efe6'
const PANTS = '#232838'
const ROPE = '#6e5a8a'
const HAIR = '#1d2030' // đen ánh xanh
const SPARK = '#3d6fb8'

export function sasuke() {
  const inner = `${feet(PANTS)}
    <g transform="rotate(-38 150 140)">
      <rect x="147" y="92" width="6" height="44" rx="2" fill="#2a2430" ${ST}/>
      <rect x="143.5" y="132" width="13" height="4.5" rx="1" fill="#8a7a5a" ${ST}/>
    </g>
    <path d="M 62 180 L 58 206 L 142 206 L 138 180 Z" fill="${PANTS}" ${ST}/>
    <path d="M 60 146 C 54 160 50 172 48 186 L 152 186 C 150 172 146 160 140 146 C 128 154 114 158 100 158 C 86 158 72 154 60 146 Z" fill="${SHIRT}" ${ST}/>
    <path d="M 86 150 L 100 176 L 114 150 C 108 154 104 155 100 155 C 96 155 92 154 86 150 Z" fill="${P.skin}" ${ST}/>
    <path d="M 50 178 C 80 186 120 186 150 178 L 151 187 C 120 195 80 195 49 187 Z" fill="${ROPE}" ${ST}/>
    <path d="M 100 189 c -12 -7 -17 4 -8 9 Z M 100 189 c 12 -7 17 4 8 9 Z" fill="${ROPE}" ${ST}/>
    <path d="M 98 192 L 94 203 M 102 192 L 106 203" stroke="${ROPE}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M 136 152 C 146 146 156 142 162 143 L 165 153 C 157 155 147 160 140 163 Z" fill="${SHIRT}" ${ST}/>
    <circle cx="168" cy="146" r="6.5" fill="${P.skin}" ${ST}/>
    <g class="chidori-spark" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="162,138 168,130 166,124 174,118" stroke="${SPARK}" stroke-width="1.8"/>
      <polyline points="174,146 182,142 186,148 194,144" stroke="${SPARK}" stroke-width="1.8"/>
      <polyline points="170,154 176,162 172,168 180,174" stroke="${SPARK}" stroke-width="1.6"/>
      <polyline points="162,138 168,130 166,124 174,118" stroke="#e6eef8" stroke-width=".7"/>
      <polyline points="174,146 182,142 186,148 194,144" stroke="#e6eef8" stroke-width=".7"/>
    </g>
    <g class="head">
      <path d="M 48 96 C 40 70 46 44 64 34 L 58 22 L 76 30 L 80 14 L 94 26 L 104 12 L 112 28 L 128 16 L 128 34 L 148 30 L 142 46 C 158 60 160 84 152 100 L 160 128 L 144 120 L 138 136 L 62 136 L 56 120 L 42 126 Z" fill="${HAIR}" ${ST}/>
      <path d="${FACE}" fill="${P.skin}" ${ST}/>
      ${eye(79)}${eye(121)}
      <path d="M 66 86 L 90 91 M 134 86 L 110 91" stroke="${P.line}" stroke-width="2" stroke-linecap="round"/>
      <path d="M 95 124 L 105 123" stroke="${P.mouth}" stroke-width="1.5" stroke-linecap="round"/>
      <path class="sway-l" d="M 56 64 C 48 90 48 116 54 134 C 58 120 60 104 66 86 Z" fill="${HAIR}" ${ST}/>
      <path class="sway-r" d="M 144 64 C 152 90 152 116 146 134 C 142 120 140 104 134 86 Z" fill="${HAIR}" ${ST}/>
      <path d="M 60 66 L 70 90 L 80 64 L 92 88 L 100 62 L 108 88 L 120 64 L 130 90 L 140 66 C 130 50 116 44 100 44 C 84 44 70 50 60 66 Z" fill="${HAIR}" ${ST}/>
    </g>`
  return frame('sasuke', inner)
}
