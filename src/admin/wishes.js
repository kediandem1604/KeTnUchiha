import { h, toast } from '../lib/dom.js'
import { icons } from '../lib/icons.js'
import { formatWishTime } from '../lib/time.js'

/** "3 lời chúc" hoặc "3 lời chúc · 1 đang ẩn". */
function countText(wishes) {
  const hidden = wishes.filter((w) => w.hidden).length
  return `${wishes.length} lời chúc${hidden ? ` · ${hidden} đang ẩn` : ''}`
}

export function renderWishesTab(root, state) {
  /** Nút Ẩn/Hiện: ẩn thì khách không thấy lời chúc trên thiệp, vẫn hiện lại được. */
  function hideButton(w) {
    const btn = h('button', {
      class: 'btn btn--ghost btn--small admin-wish__toggle',
      attrs: { type: 'button', 'aria-pressed': String(Boolean(w.hidden)), title: w.hidden ? 'Hiện lại trên thiệp' : 'Ẩn khỏi thiệp' },
      html: `${w.hidden ? icons.eye : icons.eyeOff}<span>${w.hidden ? 'Hiện' : 'Ẩn'}</span>`,
      on: {
        async click() {
          btn.disabled = true
          try {
            await state.api.setWishHidden(w.id, !w.hidden)
            toast(w.hidden ? 'Đã hiện lại lời chúc trên thiệp' : 'Đã ẩn lời chúc khỏi thiệp', 'success')
            await state.reload()
          } catch (err) {
            toast(err.message, 'error')
            btn.disabled = false
          }
        },
      },
    })
    return btn
  }

  function paint() {
    const { wishes, guests } = state.data
    const bySlug = new Map(guests.map((g) => [g.slug, g]))
    root.replaceChildren(
      h('section', { class: 'card' },
        h('div', { class: 'list-head' }, h('h2', { class: 'card-title', text: 'Lời chúc' }), h('span', { class: 'muted', text: countText(wishes) })),
        wishes.length
          ? h('div', { class: 'admin-wishes' },
              wishes.map((w) =>
                h('article', { class: `admin-wish${w.hidden ? ' is-hidden' : ''}` },
                  h('div', { class: 'admin-wish__head' },
                    h('span', { class: 'admin-wish__emoji', text: w.emoji }),
                    h('div', { class: 'admin-wish__who' },
                      h('b', { text: w.name }),
                      h('small', { class: 'muted', text: [formatWishTime(w.at), w.slug && bySlug.get(w.slug) ? `từ link /${w.slug}` : ''].filter(Boolean).join(' · ') }),
                      w.hidden ? h('span', { class: 'badge badge--hidden', text: 'Đang ẩn' }) : null,
                    ),
                    hideButton(w),
                    h('button', {
                      class: 'btn btn--ghost btn--small btn--danger',
                      attrs: { type: 'button', title: 'Xoá lời chúc', 'aria-label': 'Xoá lời chúc' },
                      html: icons.trash,
                      on: {
                        async click() {
                          if (!window.confirm(`Xoá lời chúc của "${w.name}"?`)) return
                          try {
                            await state.api.deleteWish(w.id)
                            toast('Đã xoá lời chúc', 'success')
                            await state.reload()
                          } catch (err) {
                            toast(err.message, 'error')
                          }
                        },
                      },
                    }),
                  ),
                  h('p', { class: 'admin-wish__msg', text: w.message }),
                ),
              ),
            )
          : h('p', { class: 'empty', text: 'Chưa có lời chúc nào' }),
      ),
    )
  }
  paint()
  return { update: paint }
}

export function renderRsvpTab(root, state) {
  function paint() {
    const { rsvps, guests } = state.data
    const fromGuests = guests.filter((g) => g.rsvp)
    const row = (name, attending, at, sub) =>
      h('div', { class: 'rsvp-row' },
        h('div', {}, h('b', { text: name }), sub ? h('small', { class: 'muted', text: ` · ${sub}` }) : null),
        h('div', { class: 'rsvp-row__right' },
          h('span', { class: `badge badge--${attending ? 'yes' : 'no'}`, text: attending ? 'Sẽ đến' : 'Không đến' }),
          h('small', { class: 'muted', text: formatWishTime(at) }),
        ),
      )
    root.replaceChildren(
      h('section', { class: 'card' },
        h('div', { class: 'list-head' }, h('h2', { class: 'card-title', text: 'Khách mời đã trả lời' }), h('span', { class: 'muted', text: `${fromGuests.length} người` })),
        fromGuests.length
          ? h('div', { class: 'rsvp-list' }, fromGuests.map((g) => row(g.name,g.rsvp.attending, g.rsvp.at, `/${g.slug}`)))
          : h('p', { class: 'empty', text: 'Chưa có khách mời nào trả lời' }),
      ),
      h('section', { class: 'card' },
        h('div', { class: 'list-head' }, h('h2', { class: 'card-title', text: 'Trả lời từ link chung' }), h('span', { class: 'muted', text: `${rsvps.length} người` })),
        rsvps.length
          ? h('div', { class: 'rsvp-list' }, rsvps.map((r) => row(r.name, r.attending, r.at)))
          : h('p', { class: 'empty', text: 'Chưa có ai trả lời qua link chung' }),
      ),
    )
  }
  paint()
  return { update: paint }
}
