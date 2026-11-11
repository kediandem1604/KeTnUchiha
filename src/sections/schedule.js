import { h, watchVisible } from '../lib/dom.js'
import { icons } from '../lib/icons.js'
import { kamuiSvg } from '../art/motifs.js'
import { characterIntro } from './section-head.js'
import {
  eventRange, eventPhase, countdown, longDateWords, timeOfDay, googleCalendarUrl, buildIcs, formatTMinus,
} from '../lib/time.js'

const pad = (n) => String(n).padStart(2, '0')
const UNITS = [['days', 'Ngày'], ['hours', 'Giờ'], ['minutes', 'Phút'], ['seconds', 'Giây']]

/** 02 · Thời gian — Obito giữ, xoáy Kamui sau đồng hồ đếm ngược. */
export function renderSchedule(root, ctx) {
  const { event, graduate, venue } = ctx.content
  const range = eventRange(event)

  // ── Đếm ngược ─────────────────────────────────────────
  const numbers = {}
  const tiles = h('div', { class: 'cd', attrs: { 'data-reveal': '', 'aria-live': 'off' } },
    UNITS.map(([key, label]) => {
      numbers[key] = h('b', { text: '00' })
      return h('div', { class: 'cd__tile' }, numbers[key], h('span', { class: 'mono', text: label }))
    }),
  )
  const tCode = h('b')
  const tminus = h('p', { class: 'schedule__tminus mono' }, h('span', { text: 'Kamui đang hút thời gian' }), h('br'), tCode)
  const phaseMsg = h('p', { class: 'schedule__phase serif' })

  let lastPhase
  function tick() {
    const now = new Date()
    const phase = eventPhase(now, range)
    if (phase !== lastPhase) {
      lastPhase = phase
      tiles.hidden = tminus.hidden = phase !== 'before'
      phaseMsg.hidden = phase === 'before'
      phaseMsg.textContent = phase === 'during' ? 'Lễ tốt nghiệp đang diễn ra' : 'Cảm ơn mọi người đã đến chung vui'
    }
    if (phase !== 'before') return
    const left = countdown(now, range.start)
    for (const [key] of UNITS) numbers[key].textContent = pad(left[key])
    tCode.textContent = formatTMinus(left)
  }
  tick()

  // Chỉ chạy đồng hồ khi phần này đang trên màn hình.
  let timer
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver(([entry]) => {
        clearInterval(timer)
        if (entry.isIntersecting) {
          tick()
          timer = setInterval(tick, 1000)
        }
      })
    : null

  // ── Thêm vào lịch ─────────────────────────────────────
  const title = `Lễ tốt nghiệp của ${graduate.fullName}`
  const location = [venue.name, venue.address].filter(Boolean).join(', ')
  const details = `Thư mời dự lễ tốt nghiệp của ${graduate.fullName}. Thiệp: ${window.location.href.split('?')[0]}`
  const gcal = h('a', {
    class: 'btn',
    href: googleCalendarUrl({ title, details, location, ...range }),
    attrs: { target: '_blank', rel: 'noopener' },
    html: `${icons.calendar}<span>Google Calendar</span>`,
  })
  const ics = h('button', {
    class: 'btn',
    attrs: { type: 'button' },
    html: `${icons.download}<span>Tải file lịch (.ics)</span>`,
    on: {
      click() {
        const blob = new Blob([buildIcs({ title, details, location, uid: `tot-nghiep-${event.date}@thiep`, ...range })], { type: 'text/calendar;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = h('a', { href: url, download: 'le-tot-nghiep.ics' })
        document.body.append(a)
        a.click()
        a.remove()
        setTimeout(() => URL.revokeObjectURL(url), 2000)
      },
    },
  })
  const addCal = h('details', { class: 'schedule__add', attrs: { 'data-reveal': '' } },
    h('summary', { class: 'btn', text: '＋ Thêm vào lịch' }),
    h('div', { class: 'schedule__cal' }, gcal, ics),
  )

  // append() gốc biến null thành chữ "null" nên phải lọc bỏ phần trống.
  const parts = [
    h('div', { class: 'schedule__kamui', attrs: { 'aria-hidden': 'true' }, html: kamuiSvg() }),
    characterIntro({ n: 2, label: 'Thời gian', character: 'obito', title: h('div', { class: 'schedule__when', attrs: { 'data-reveal': '' } },
      h('p', { class: 'schedule__date', text: longDateWords(range.start) }),
      h('p', { class: 'schedule__time serif', text: timeOfDay(event.start) }),
    ) }),
    tiles,
    tminus,
    phaseMsg,
    event.note ? h('p', { class: 'prose schedule__note', attrs: { 'data-reveal': '' }, text: event.note }) : null,
    addCal,
  ]
  root.append(...parts.filter(Boolean))
  io?.observe(tiles)
  if (!io) timer = setInterval(tick, 1000)
  watchVisible(root)
}
