import { h } from '../lib/dom.js'
import { CHARACTERS, eyeBadgeSvg } from '../art/mangekyo.js'

/**
 * Đầu mục của phần có nhân vật giữ: con mắt Mangekyō (chạm thì xoay một vòng),
 * dòng "0N · TÊN PHẦN" và dòng "Tên · katakana · thuật".
 */
export function characterHead({ n, label, character }) {
  const c = CHARACTERS[character]
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
      h('p', { class: 'char-head__who' },
        h('b', { text: c.name }),
        ' · ',
        h('span', { class: 'jp', text: c.katakana }),
        c.technique ? ` · ${c.technique}` : null,
      ),
    ),
  )
}
