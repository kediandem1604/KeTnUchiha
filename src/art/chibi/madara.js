// Madara: tóc dài bờm xờm che một mắt, giáp đỏ có vai giáp, quạt gunbai cầm bên trái; tóc bay, quạt nghiêng.
import { P, ST, FACE, eye, feet, frame } from './common.js'

const ARMOR = '#8e1d22'
const ARMOR_DARK = '#5e1215'
const FAN = '#b9a07a'
const HANDLE = '#5a4632'

export function madara() {
  const inner = `<path class="hair-long" d="M 40 96 C 30 60 56 22 100 20 C 144 22 170 60 160 96 C 168 120 172 150 166 176 L 156 168 L 158 196 L 144 184 L 140 204 L 128 188 L 72 188 L 60 204 L 56 184 L 42 196 L 44 168 L 34 176 C 28 150 32 120 40 96 Z" fill="${P.hair}" ${ST}/>
    ${feet()}
    <g class="fan">
      <rect x="37" y="150" width="6" height="56" rx="2" fill="${HANDLE}" ${ST}/>
      <circle cx="40" cy="140" r="23" fill="${FAN}" ${ST}/>
      <circle cx="40" cy="140" r="16" fill="none" stroke="${HANDLE}" stroke-width="1.4"/>
      <circle cx="40" cy="132" r="3" fill="${ARMOR}"/><circle cx="47" cy="144" r="3" fill="${ARMOR}"/><circle cx="33" cy="144" r="3" fill="${ARMOR}"/>
    </g>
    <path d="M 58 146 C 52 166 46 186 44 206 L 156 206 C 154 186 148 166 142 146 C 128 154 114 158 100 158 C 86 158 72 154 58 146 Z" fill="${ARMOR}" ${ST}/>
    <path d="M 52 176 C 84 182 116 182 148 176 M 48 192 C 82 198 118 198 152 192" fill="none" stroke="${ARMOR_DARK}" stroke-width="1.6"/>
    <path d="M 50 150 C 52 140 64 136 74 142 L 72 164 C 62 166 52 162 50 150 Z" fill="${ARMOR_DARK}" ${ST}/>
    <path d="M 150 150 C 148 140 136 136 126 142 L 128 164 C 138 166 148 162 150 150 Z" fill="${ARMOR_DARK}" ${ST}/>
    <path d="M 70 140 C 80 150 92 152 100 152 C 108 152 120 150 130 140 L 132 148 C 120 158 108 160 100 160 C 92 160 80 158 68 148 Z" fill="${P.hair}" ${ST}/>
    <g class="head">
      <path d="${FACE}" fill="${P.skin}" ${ST}/>
      ${eye(79)}${eye(121)}
      <path d="M 94 123 Q 101 126 107 121" fill="none" stroke="${P.mouth}" stroke-width="1.5" stroke-linecap="round"/>
      <path class="sway-l" d="M 56 68 C 46 94 46 120 52 140 C 56 126 60 108 66 90 Z" fill="${P.hair}" ${ST}/>
      <path class="sway-r" d="M 118 60 C 142 68 152 96 148 124 C 140 112 132 102 114 98 C 122 88 122 74 118 60 Z" fill="${P.hair}" ${ST}/>
      <path d="M 46 92 C 40 50 68 24 100 24 C 132 24 160 50 154 92 L 150 70 L 140 78 L 136 62 L 124 72 L 118 56 L 106 68 L 100 52 L 92 68 L 82 56 L 76 72 L 64 62 L 60 78 L 50 70 Z" fill="${P.hair}" ${ST}/>
    </g>`
  return frame('madara', inner)
}
