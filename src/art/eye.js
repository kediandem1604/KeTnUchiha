// Con mắt ở bìa: mí mở/nhắm được, mống mắt đổi màu, 3 tomoe, Mangekyō của Itachi.
import { PATTERNS, TOMOE_PATH } from './mangekyo.js'

const NS = 'http://www.w3.org/2000/svg'
const lerp = (a, b, t) => a + (b - a) * t
let uid = 0

/** Điểm trên đường cong mí (bậc ba từ (−110,0) tới (110,0), hai điểm điều khiển cùng độ cao c). */
function lidPoint(t, c) {
  const u = 1 - t
  return [u * u * u * -110 + 3 * u * u * t * -55 + 3 * u * t * t * 55 + t * t * t * 110, 3 * u * t * c]
}

export function createEye() {
  const id = `eye${++uid}`
  const tomoe = [0, 1, 2]
    .map((i) => `<path class="eye__t" fill="#0a0505" transform="rotate(${i * 120}) translate(0 -22.5) rotate(-75)" d="${TOMOE_PATH}"/>`)
    .join('')
  const wrap = document.createElement('div')
  wrap.innerHTML = `<svg class="eye" viewBox="-120 -70 240 140" aria-hidden="true">
    <defs>
      <clipPath id="${id}-clip"><path class="eye__clip"/></clipPath>
      <linearGradient id="${id}-shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".45" stop-color="#000" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <g clip-path="url(#${id}-clip)">
      <rect x="-120" y="-70" width="240" height="140" fill="#d9d0c1"/>
      <g>
        <circle class="eye__iris" r="38" style="fill:#2a2321"/>
        <circle r="38" fill="none" stroke="#120708" stroke-width="2.2"/>
        <circle class="eye__ring" r="22.5" fill="none" stroke="#120708" stroke-width="1.1" opacity="0"/>
        <g class="eye__tomoe">${tomoe}</g>
        <g class="eye__mange" opacity="0">${PATTERNS.itachi}</g>
        <circle class="eye__pupil" r="8.5" fill="#0a0505"/>
      </g>
      <rect x="-120" y="-70" width="240" height="140" fill="url(#${id}-shade)"/>
    </g>
    <path class="eye__lid-up" fill="none" stroke="#ebe3d5" stroke-width="3" stroke-linecap="round"/>
    <path class="eye__lid-lo" fill="none" stroke="#ebe3d5" stroke-width="1.3" stroke-linecap="round" opacity=".7"/>
    <g class="eye__lashes" stroke="#ebe3d5" stroke-width="1.6" stroke-linecap="round"></g>
  </svg>`
  const el = wrap.firstElementChild
  const $ = (sel) => el.querySelector(sel)
  const clip = $('.eye__clip')
  const lidUp = $('.eye__lid-up')
  const lidLo = $('.eye__lid-lo')
  const lashes = $('.eye__lashes')
  const iris = $('.eye__iris')
  const ring = $('.eye__ring')
  const tomoeG = $('.eye__tomoe')
  const tomoes = [...el.querySelectorAll('.eye__t')]
  const mange = $('.eye__mange')
  const pupil = $('.eye__pupil')

  // 5 sợi mi bám theo mí lúc nhắm
  const lashLines = [0.22, 0.36, 0.5, 0.64, 0.78].map((t) => {
    const [x, y] = lidPoint(t, 16)
    const l = document.createElementNS(NS, 'line')
    l.setAttribute('x1', x)
    l.setAttribute('y1', y + 1)
    l.setAttribute('x2', x + (t - 0.5) * 10)
    l.setAttribute('y2', y + 10)
    lashes.append(l)
    return l
  })

  const now = { open: 0, iris: '#2a2321', ring: 0, tomoe: 0, spin: 0, mangekyo: 0 }

  function paintOpen() {
    const up = lerp(16, -60, now.open)
    const lo = lerp(16, 50, now.open)
    lidUp.setAttribute('d', `M -110 0 C -55 ${up} 55 ${up} 110 0`)
    lidLo.setAttribute('d', `M -110 0 C -55 ${lo} 55 ${lo} 110 0`)
    clip.setAttribute('d', `M -110 0 C -55 ${up} 55 ${up} 110 0 C 55 ${lo} -55 ${lo} -110 0 Z`)
    const a = Math.max(0, 1 - now.open * 4)
    lashes.setAttribute('opacity', a)
    for (const l of lashLines) l.style.display = a > 0 ? '' : 'none'
  }

  function paintFaces() {
    const m = now.mangekyo
    ring.setAttribute('opacity', now.ring * (1 - m))
    tomoes.forEach((t, i) => (t.style.opacity = i < now.tomoe ? 1 : 0))
    tomoeG.setAttribute('opacity', 1 - m)
    pupil.setAttribute('opacity', 1 - m)
    mange.setAttribute('opacity', m)
  }

  /** Cập nhật một phần trạng thái: open 0..1, iris (màu), ring 0..1, tomoe 0..3, spin (độ), mangekyo 0..1. */
  function set(state) {
    Object.assign(now, state)
    if ('open' in state) paintOpen()
    if ('iris' in state) iris.style.fill = now.iris
    if ('ring' in state || 'tomoe' in state || 'mangekyo' in state) paintFaces()
    if ('spin' in state) {
      const r = `rotate(${now.spin.toFixed(2)})`
      tomoeG.setAttribute('transform', r)
      mange.setAttribute('transform', r)
    }
  }

  set({ ...now })
  return { el, set }
}
