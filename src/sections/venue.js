import { h, whenNear } from '../lib/dom.js'
import { mapEmbedUrl } from '../lib/maps.js'
import { characterHead } from './section-head.js'

/** 03 · Địa điểm — Shisui giữ, nút "Thuấn Thân tới đây". */
export function renderVenue(root, ctx) {
  const { venue } = ctx.content
  const query = venue.mapQuery || [venue.name, venue.address].filter(Boolean).join(', ')

  root.append(characterHead({ n: 3, label: 'Địa điểm', character: 'shisui' }))

  if (!query) {
    root.append(
      h('h2', { class: 'section-title venue__name', attrs: { 'data-reveal': '' }, text: 'Địa điểm sẽ được cập nhật sớm' }),
      h('p', { class: 'prose', attrs: { 'data-reveal': '' }, text: 'Bạn mở lại thiệp này gần ngày lễ để xem bản đồ nhé.' }),
    )
    return
  }

  const directions = venue.directionsUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`
  const label = 'Thuấn Thân tới đây →'
  const map = venue.mapQuery
    ? h('div', { class: 'venue__map', attrs: { 'aria-label': 'Bản đồ địa điểm', 'data-reveal': '' } },
        h('span', { class: 'venue__map-loading mono', text: 'Đang tải bản đồ…' }))
    : null

  // append() gốc biến null thành chữ "null" nên phải lọc bỏ phần trống.
  const parts = [
    venue.name ? h('h2', { class: 'section-title venue__name', attrs: { 'data-reveal': '' }, text: venue.name }) : null,
    venue.address ? h('p', { class: 'prose venue__addr', attrs: { 'data-reveal': '' }, text: venue.address }) : null,
    map,
    venue.coords ? h('p', { class: 'venue__coords mono', text: venue.coords }) : null,
    h('div', { class: 'btn-row', attrs: { 'data-reveal': '' } },
      h('a', {
        class: 'btn btn--red flicker',
        href: directions,
        dataset: { t: label },
        attrs: { target: '_blank', rel: 'noopener' },
        text: label,
      }),
    ),
  ]
  root.append(...parts.filter(Boolean))

  // Chỉ gắn bản đồ khi khách cuộn gần tới để trang tải nhanh.
  if (map) {
    whenNear(map, () => {
      const iframe = h('iframe', {
        src: mapEmbedUrl(venue.mapQuery),
        title: `Bản đồ: ${venue.name || venue.mapQuery}`,
        attrs: { loading: 'lazy', referrerpolicy: 'no-referrer-when-downgrade', allowfullscreen: true },
      })
      iframe.addEventListener('load', () => map.classList.add('is-loaded'))
      map.append(iframe)
    }, '100% 0px')
  }
}
