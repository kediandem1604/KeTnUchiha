// Itachi: tóc dài mái hai bên, băng trán Konoha có vết gạch, quầng mắt, áo choàng Akatsuki; quạ bay ngang.
import { P, ST, FACE, eye, feet, akatsukiCloak, frame } from './common.js'

const CROW_BODY = 'M -13 0.6 L -10 -0.4 C -8.6 -2.2 -6 -2.6 -3.4 -1.6 L 2 -1 C 9.6 -1.8 12 -1.6 15 -2.4 L 13.4 -0.2 L 15.6 1.4 C 12 1.8 8.6 2.2 5.2 2.2 C 1 2.8 -3.2 2.6 -6.4 1.8 C -8.8 1.4 -11 1.1 -13 0.6 Z'
const CROW_WING = 'M -1 -1.2 C 1.4 -5 4.4 -9.6 9.4 -13 L 8 -9.6 L 10.6 -11 L 8.8 -7.4 L 11.6 -8 L 6 -1.4 Z'

export function itachi() {
  const inner = `${feet()}${akatsukiCloak()}
    <g class="head">
      <path d="M 40 98 C 34 46 66 18 100 18 C 134 18 166 46 160 98 L 164 144 C 156 150 146 146 142 136 L 58 136 C 54 146 44 150 36 144 Z" fill="${P.hair}" ${ST}/>
      <path d="${FACE}" fill="${P.skin}" ${ST}/>
      ${eye(79)}${eye(121)}
      <path d="M 70 108 Q 72 112 75 114" fill="none" stroke="${P.faint}" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M 130 108 Q 128 112 125 114" fill="none" stroke="${P.faint}" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M 94 123 Q 100 126 106 123" fill="none" stroke="${P.mouth}" stroke-width="1.5" stroke-linecap="round"/>
      <path class="sway-l" d="M 54 68 C 46 94 44 120 50 142 C 56 128 58 110 64 92 Z" fill="${P.hair}" ${ST}/>
      <path class="sway-r" d="M 146 68 C 154 94 156 120 150 142 C 144 128 142 110 136 92 Z" fill="${P.hair}" ${ST}/>
      <path d="M 64 70 L 72 91 L 80 70 Z M 94 70 L 100 92 L 106 70 Z M 120 70 L 128 91 L 136 70 Z" fill="${P.hair}" ${ST}/>
      <path d="M 47 90 C 42 42 70 22 100 22 C 130 22 158 42 153 90 L 149 62 L 51 62 Z" fill="${P.hair}" ${ST}/>
      <path d="M 50 59 Q 100 50 150 59 L 150 73 Q 100 64 50 73 Z" fill="#2b2833" ${ST}/>
      <path d="M 80 55.5 Q 100 52 120 55.5 L 120 68.5 Q 100 65 80 68.5 Z" fill="#b9b2a8" ${ST}/>
      <path d="M 96 62 c 0 -3 4 -4 5 -1 c 1 2 -1 4 -3 3 c 3 2 6 0 6 -3" fill="none" stroke="#4a4540" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M 82 66.5 L 118 56.5" stroke="#3a3434" stroke-width="1.6" stroke-linecap="round"/>
    </g>`
  const crow = `<g class="crow"><g transform="scale(.9)">
      <path d="${CROW_BODY}" fill="${P.hair}"/>
      <path class="wing" d="${CROW_WING}" fill="${P.hair}"/>
    </g></g>`
  return frame('itachi', inner, crow)
}
