// Shisui: tóc xoăn, áo giáp vải xanh rêu có túi cuộn giấy, áo trong xanh đen; bóng mờ nháy bên cạnh (Thuấn Thân).
import { P, ST, FACE, eye, feet, frame } from './common.js'

const SHIRT = '#1f2430'
const VEST = '#5d6b4f'
const VEST_DARK = '#4a563f'
const BODY = 'M 60 146 C 54 166 48 186 46 206 L 154 206 C 152 186 146 166 140 146 C 128 154 114 158 100 158 C 86 158 72 154 60 146 Z'
const HAIR_BACK = 'M 46 104 C 34 96 36 80 44 74 C 36 62 44 46 56 46 C 56 32 72 24 84 30 C 90 18 110 18 116 30 C 128 24 144 32 144 46 C 156 46 164 62 156 74 C 164 80 166 96 154 104 C 158 116 150 126 142 124 L 58 124 C 50 126 42 116 46 104 Z'

export function shisui() {
  const ghost = `<g class="ghost" opacity="0">
      <path d="${BODY}" fill="none" stroke="${P.red}" stroke-width="1.4"/>
      <path d="${HAIR_BACK}" fill="none" stroke="${P.red}" stroke-width="1.4"/>
    </g>`
  const inner = `${ghost}${feet(SHIRT)}
    <path d="${BODY}" fill="${SHIRT}" ${ST}/>
    <path d="M 64 150 C 60 168 56 186 54 204 L 146 204 C 144 186 140 168 136 150 C 126 156 113 158 100 158 C 87 158 74 156 64 150 Z" fill="${VEST}" ${ST}/>
    <rect x="68" y="166" width="18" height="15" rx="2" fill="${VEST_DARK}" ${ST}/>
    <rect x="114" y="166" width="18" height="15" rx="2" fill="${VEST_DARK}" ${ST}/>
    <path d="M 100 160 L 100 204" stroke="${VEST_DARK}" stroke-width="1.4"/>
    <path d="M 64 134 C 72 146 86 150 100 150 C 114 150 128 146 136 134 L 142 150 C 130 160 116 162 100 162 C 84 162 70 160 58 150 Z" fill="${VEST}" ${ST}/>
    <g class="head">
      <path d="${HAIR_BACK}" fill="${P.hair}" ${ST}/>
      <path d="${FACE}" fill="${P.skin}" ${ST}/>
      ${eye(79)}${eye(121)}
      <path d="M 93 122 Q 100 128 107 122" fill="none" stroke="${P.mouth}" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M 56 74 C 56 58 66 50 76 54 C 80 44 92 44 96 52 C 102 44 114 46 116 54 C 126 50 140 56 142 72 C 136 66 130 66 126 72 C 122 64 112 64 108 72 C 104 64 94 64 90 72 C 86 64 76 64 72 72 C 68 66 60 68 56 74 Z" fill="${P.hair}" ${ST}/>
      <path class="sway-l" d="M 54 76 C 46 88 48 104 54 114 C 58 104 60 92 62 82 Z" fill="${P.hair}" ${ST}/>
      <path class="sway-r" d="M 146 76 C 154 88 152 104 146 114 C 142 104 140 92 138 82 Z" fill="${P.hair}" ${ST}/>
    </g>`
  return frame('shisui', inner)
}
