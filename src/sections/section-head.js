import { h, watchVisible } from '../lib/dom.js'
import { eyeBadgeSvg } from '../art/mangekyo.js'
import { chibiSvg } from '../art/chibi/index.js'

/**
 * Đầu mục của phần có nhân vật giữ: con mắt Mangekyō (chạm thì xoay một vòng)
 * và dòng "0N · TÊN PHẦN". Không ghi tên nhân vật: chibi bên cạnh đã cho biết là ai.
 */
export function characterHead({ n, label, character }) {
  const eye = h('span', { class: 'char-head__eye', html: eyeBadgeSvg(character, 40) })
  eye.addEventListener('click', () => {
    eye.classList.remove('is-spin')
    void eye.offsetWidth // chạy lại hiệu ứng nếu chạm liên tiếp
    eye.classList.add('is-spin')
  })
  eye.addEventListener('animationend', () => eye.classList.remove('is-spin'))

  return h('header', { class: 'char-head', attrs: { 'data-reveal': '' } },
    eye,
    h('div', {},
      h('p', { class: 'char-head__index mono', text: `0${n} · ${label}` }),
    ),
  )
}

/**
 * Đầu phần có chibi: bên trái là đầu mục + tiêu đề (`title`), bên phải là chibi của nhân vật.
 * Chibi chỉ chuyển động khi phần này đang trên màn hình; chạm vào thì nhún một cái.
 */
export function characterIntro({ n, label, character, title }) {
  const chibi = h('span', { class: 'char-chibi', attrs: { 'aria-hidden': 'true' }, html: chibiSvg(character) })
  chibi.addEventListener('click', () => {
    chibi.classList.remove('is-poke')
    void chibi.offsetWidth // chạy lại nếu chạm liên tiếp
    chibi.classList.add('is-poke')
  })
  chibi.addEventListener('animationend', (e) => {
    if (e.target === chibi.firstElementChild) chibi.classList.remove('is-poke')
  })
  const intro = h('div', { class: 'char-intro' },
    h('div', { class: 'char-intro__main' }, characterHead({ n, label, character }), title),
    chibi,
  )
  watchVisible(intro)
  return intro
}
