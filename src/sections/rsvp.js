import { h, toast } from '../lib/dom.js'
import { LIMITS } from '../../shared/constants.js'
import { chidoriSvg } from '../art/motifs.js'
import { characterHead } from './section-head.js'

const STORE_KEY = 'thiep:rsvp'

const readStored = () => {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || null
  } catch {
    return null
  }
}
const writeStored = (v) => {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(v))
  } catch {
    /* trình duyệt chặn lưu: bỏ qua */
  }
}

/** 04 · Xác nhận tham dự — Sasuke giữ, tia Chidori khi bấm "Mình sẽ đến". */
export function renderRsvp(root, ctx) {
  const { guest, api } = ctx
  const short = ctx.content.graduate.shortName
  let stored = guest ? null : readStored()
  let attending = guest ? guest.rsvp?.attending ?? null : stored?.attending ?? null
  let sending = false

  const nameInput = guest
    ? null
    : h('input', {
        class: 'field rsvp__name',
        type: 'text',
        value: stored?.name || '',
        placeholder: 'Tên của bạn',
        maxLength: LIMITS.wishName,
        attrs: { 'aria-label': 'Tên của bạn', autocomplete: 'name' },
      })

  const yes = h('button', { class: 'btn btn--red rsvp__btn rsvp__yes', attrs: { type: 'button' }, html: `<span>Mình sẽ đến</span>${chidoriSvg()}` })
  const no = h('button', { class: 'btn btn--ghost rsvp__btn', attrs: { type: 'button' }, text: 'Tiếc quá, mình bận' })
  const thanks = h('p', { class: 'rsvp__thanks mono', attrs: { 'aria-live': 'polite' } })
  yes.addEventListener('animationend', () => yes.classList.remove('zap'))

  function paint() {
    yes.classList.toggle('is-on', attending === true)
    no.classList.toggle('is-on', attending === false)
    yes.setAttribute('aria-pressed', String(attending === true))
    no.setAttribute('aria-pressed', String(attending === false))
    thanks.textContent =
      attending === true ? `✓ Đã ghi nhận · Hẹn gặp ${ctx.displayName} nhé`
        : attending === false ? `✓ Đã ghi nhận · Cảm ơn ${ctx.displayName} đã báo`
          : ''
  }

  async function choose(value) {
    if (sending) return
    const body = { attending: value }
    if (guest) body.slug = guest.slug
    else {
      const name = nameInput.value.trim()
      if (!name) {
        nameInput.focus()
        toast(`Bạn nhập tên giúp ${short} nhé`, 'error')
        return
      }
      body.name = name
      if (stored?.id) body.id = stored.id
    }
    sending = true
    yes.disabled = no.disabled = true
    try {
      const res = await api.sendRsvp(body)
      attending = value
      if (!guest) {
        stored = { id: res?.id || stored?.id, name: body.name, attending: value }
        writeStored(stored)
      }
      paint()
      if (value) {
        yes.classList.remove('zap')
        void yes.offsetWidth // chạy lại tia điện nếu bấm lần nữa
        yes.classList.add('zap')
      }
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      sending = false
      yes.disabled = no.disabled = false
    }
  }

  yes.addEventListener('click', () => choose(true))
  no.addEventListener('click', () => choose(false))
  paint()

  root.append(
    characterHead({ n: 4, label: 'Xác nhận tham dự', character: 'sasuke' }),
    h('h2', { class: 'section-title', attrs: { 'data-reveal': '' }, text: 'Bạn sẽ đến chứ?' }),
    h('div', { class: 'rsvp', attrs: { 'data-reveal': '' } },
      nameInput,
      h('div', { class: 'rsvp__choices' }, yes, no),
      thanks,
    ),
  )
}
