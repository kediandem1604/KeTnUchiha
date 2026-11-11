import { h, watchVisible } from '../lib/dom.js'
import { crowsSvg } from '../art/motifs.js'
import { characterHead } from './section-head.js'

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

/** 01 · Lời mời — Itachi giữ, bầy quạ ở góc. */
export function renderInvite(root, ctx) {
  const { texts } = ctx.content
  const name = capitalize(ctx.displayName)
  const note = ctx.guest?.note

  root.append(
    h('div', { class: 'invite__crows', attrs: { 'aria-hidden': 'true' }, html: crowsSvg() }),
    characterHead({ n: 1, label: 'Lời mời', character: 'itachi' }),
    h('h2', { class: 'section-title', attrs: { 'data-reveal': '' } },
      h('span', { text: texts.inviteLead }),
      h('br'),
      h('span', { class: 'invite__guest', text: name }),
    ),
    h('p', { class: 'prose', attrs: { 'data-reveal': '' }, text: texts.inviteBody }),
    note
      ? h('figure', { class: 'invite__note', attrs: { 'data-reveal': '' } },
          h('blockquote', { class: 'serif', text: `“${note}”` }),
          h('figcaption', { class: 'mono', text: `— Lời nhắn riêng cho ${name}` }),
        )
      : null,
  )
  watchVisible(root)
}
