import { h } from '../lib/dom.js'
import { crestSvg } from '../art/crest.js'

export function renderClosing(root, ctx) {
  const { texts, graduate } = ctx.content

  root.append(
    h('div', { class: 'closing', attrs: { 'data-reveal': '' } },
      h('span', { class: 'closing__crest', html: crestSvg({ size: 46 }) }),
      texts.closing ? h('p', { class: 'prose closing__text', text: texts.closing }) : null,
      h('p', { class: 'closing__sign serif', text: graduate.shortName }),
      h('p', { class: 'closing__git mono', text: 'git commit -m "đã tốt nghiệp" ✓' }),
    ),
  )
}
