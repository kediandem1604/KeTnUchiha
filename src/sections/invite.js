import { h } from '../lib/dom.js'
import { characterIntro } from './section-head.js'

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

/** 01 · Lời mời — Itachi giữ, bầy quạ ở góc. */
export function renderInvite(root, ctx) {
  const { texts } = ctx.content
  const name = capitalize(ctx.displayName)
  const note = ctx.guest?.note

  // append() gốc biến null thành chữ "null" nên phải lọc bỏ phần trống.
  const parts = [
    characterIntro({ n: 1, label: 'Lời mời', character: 'itachi', title: h('h2', { class: 'section-title', attrs: { 'data-reveal': '' } },
      h('span', { text: texts.inviteLead }),
      h('br'),
      h('span', { class: 'invite__guest', text: name }),
    ) }),
    h('p', { class: 'prose', attrs: { 'data-reveal': '' }, text: texts.inviteBody }),
    note
      ? h('figure', { class: 'invite__note', attrs: { 'data-reveal': '' } },
          h('blockquote', { class: 'serif', text: `“${note}”` }),
          h('figcaption', { class: 'mono', text: `— Lời nhắn riêng cho ${name}` }),
        )
      : null,
  ]
  root.append(...parts.filter(Boolean))
}
