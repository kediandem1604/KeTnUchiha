import { h } from '../lib/dom.js'
import { crestSvg } from '../art/crest.js'
import { splitName, hanYear } from '../lib/names.js'
import { eventRange, formatDateDots } from '../lib/time.js'

/** Khung chờ khi chưa có ảnh hoặc ảnh tải lỗi: gia huy mờ + chữ "Ảnh chân dung". */
function placeholder() {
  return h('div', { class: 'hero__placeholder' },
    h('span', { class: 'hero__placeholder-crest', html: crestSvg({ size: 48, outline: true }) }),
    h('span', { class: 'mono', text: 'Ảnh chân dung' }),
  )
}

export function renderHero(root, ctx) {
  const { graduate, photos, texts, event, music } = ctx.content
  const start = eventRange(event).start
  const { first, rest } = splitName(graduate.fullName)

  const frame = h('figure', { class: 'hero__frame' })
  if (photos.hero) {
    const img = h('img', {
      src: photos.hero,
      alt: `Ảnh ${graduate.fullName}`,
      attrs: { decoding: 'async', fetchpriority: 'high' },
    })
    img.addEventListener('error', () => img.replaceWith(placeholder()), { once: true })
    frame.append(img)
  } else {
    frame.append(placeholder())
  }
  frame.append(h('span', { class: 'hero__hanko jp', attrs: { 'aria-hidden': 'true' }, text: '卒' }))

  const degree = [graduate.degree, graduate.major].filter(Boolean).join(' ')

  // Trình phát Spotify (khi chỉ có link Spotify) nằm dưới dòng trường.
  const player = ctx.music?.slot ? h('div', { class: 'hero__player' }) : null
  const song = player
    ? h('div', { class: 'hero__song' },
        h('p', { class: 'hero__song-lead', text: music?.title ? `${graduate.shortName} gửi bạn bài “${music.title}”` : `${graduate.shortName} gửi bạn một bài hát` }),
        player,
      )
    : null

  root.append(
    h('div', { class: 'hero' },
      h('div', { class: 'hero__moon', attrs: { 'aria-hidden': 'true' } }),
      h('p', { class: 'hero__meta mono', text: `// Lễ tốt nghiệp · ${formatDateDots(start)}` }),
      h('h1', { class: 'hero__name serif', attrs: { 'aria-label': graduate.fullName } },
        first ? h('span', { class: 'hero__first', attrs: { 'aria-hidden': 'true' }, text: first }) : null,
        h('span', { class: 'hero__rest', attrs: { 'aria-hidden': 'true' }, text: rest }),
      ),
      graduate.katakana ? h('p', { class: 'hero__kana jp', attrs: { lang: 'ja' }, text: graduate.katakana }) : null,
      texts.heroQuote ? h('p', { class: 'hero__quote', text: texts.heroQuote }) : null,
      h('div', { class: 'hero__row' },
        frame,
        h('p', { class: 'hero__vert jp', attrs: { 'aria-hidden': 'true' }, text: `卒業 ${hanYear(start.getUTCFullYear())}` }),
      ),
      degree || graduate.school
        ? h('div', { class: 'hero__deg' },
            degree ? h('p', { class: 'hero__deg-title', text: degree }) : null,
            graduate.school ? h('p', { class: 'hero__deg-school', text: graduate.school }) : null,
          )
        : null,
      song,
      h('a', { class: 'hero__cue mono', href: '#s-invite', text: '↓ Cuộn xuống' }),
    ),
  )

  if (player) ctx.music.attach(player, { height: 80 })
}
