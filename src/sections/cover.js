import { gsap } from 'gsap'
import { h } from '../lib/dom.js'
import { crestSvg } from '../art/crest.js'
import { createEye } from '../art/eye.js'
import { createInk } from '../fx/ink.js'
import { COVER, coverNext, nameSizeClass } from '../lib/cover-state.js'
import { displayName } from '../lib/text.js'
import { eventRange } from '../lib/time.js'

const RED = '#a3141a'
const wait = (s) => new Promise((r) => setTimeout(r, s * 1000))
const play = (tween) => new Promise((resolve) => tween.eventCallback('onComplete', resolve))

/** "Công nghệ Thông tin" → "CNTT"; ngành một chữ thì giữ nguyên. */
function shortMajor(major) {
  const words = String(major || '').trim().split(/\s+/).filter(Boolean)
  return words.length > 1 ? words.map((w) => w[0]).join('').toUpperCase() : words[0] || ''
}

/** Màn hình bìa: chạm vào mắt để "quét mống mắt", Sharingan thức tỉnh, rồi mở thư mời. */
export function renderCover(host, ctx) {
  const { content, reducedMotion } = ctx
  const { graduate } = content
  const year = eventRange(content.event).start.getUTCFullYear()

  const eye = createEye()
  const eyeBtn = h('button', { class: 'cover__eye', attrs: { type: 'button', 'aria-label': 'Chạm để mở thư mời' } }, eye.el)
  const scan = h('span', { class: 'cover__scan' })
  const hud = h('div', { class: 'cover__hud', attrs: { 'aria-hidden': 'true' } }, h('i'), h('i'), h('i'), h('i'), scan)
  const status = h('p', { class: 'cover__status mono', attrs: { 'aria-live': 'polite' }, text: '[ Chạm vào mắt để xác thực ]' })
  const nameEl = h('p', { class: 'cover__name serif' })
  const greet = h('div', { class: 'cover__greet' }, h('p', { class: 'cover__to serif', text: 'Thân gửi' }), nameEl)
  const openBtn = h('button', { class: 'cover__open', attrs: { type: 'button', tabindex: '-1' }, text: 'Mở thư mời' })
  const degree = [graduate.degree, shortMajor(graduate.major)].filter(Boolean).join(' ')
  const cover = h('div', { class: 'cover', attrs: { role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Thư mời tốt nghiệp' } },
    h('div', { class: 'cover__top' },
      h('span', { html: crestSvg({ size: 22 }) }),
      h('p', { class: 'mono', text: `Thư mời tốt nghiệp · ${year}` }),
    ),
    h('div', { class: 'cover__eyewrap' }, hud, eyeBtn),
    status,
    greet,
    openBtn,
    h('p', { class: 'cover__foot mono', text: [graduate.fullName, degree].filter(Boolean).join(' · ') }),
  )

  host.append(cover)
  document.documentElement.classList.add('is-locked')

  let state = COVER.IDLE
  const go = (event) => {
    const next = coverNext(state, event)
    if (next === state) return false
    state = next
    return true
  }

  // Tomoe xoay theo tốc độ (độ/giây); dừng hẳn khi bìa bị gỡ.
  const view = { spin: 0, speed: 0 }
  const spinTick = (_t, deltaMs) => {
    if (!view.speed) return
    view.spin = (view.spin + (view.speed * deltaMs) / 1000) % 360
    eye.set({ spin: view.spin })
  }
  gsap.ticker.add(spinTick)

  async function showGreeting() {
    const name = displayName(await ctx.guestReady)
    nameEl.textContent = name
    nameEl.className = `cover__name serif ${nameSizeClass(name)}`.trim()
    status.classList.add('is-ok')
    status.textContent = '✓ Đã xác thực'
    cover.classList.add('is-authed')
    openBtn.removeAttribute('tabindex')
    go('scanDone')
  }

  async function scanSequence() {
    if (reducedMotion) {
      eye.set({ open: 1, iris: RED, ring: 1, tomoe: 3 })
      return showGreeting()
    }
    const lids = { open: 0 }
    await play(gsap.to(lids, { open: 1, duration: 0.5, ease: 'power2.out', onUpdate: () => eye.set({ open: lids.open }) }))

    cover.classList.add('is-scanning')
    const progress = { p: 0 }
    const travel = hud.clientHeight
    await Promise.all([
      play(gsap.fromTo(scan, { y: 0 }, { y: travel, duration: 0.7, ease: 'sine.inOut', yoyo: true, repeat: 1 })),
      play(gsap.to(progress, {
        p: 100,
        duration: 1.4,
        ease: 'none',
        onUpdate: () => (status.innerHTML = `Đang quét mống mắt · <b>${Math.round(progress.p)}%</b>`),
      })),
    ])
    cover.classList.remove('is-scanning')

    eye.set({ iris: RED, ring: 1 })
    for (let i = 1; i <= 3; i++) {
      await wait(i === 1 ? 0.25 : 0.18)
      eye.set({ tomoe: i })
    }
    await wait(0.35)
    view.speed = 30
    await showGreeting()
  }

  function finish() {
    gsap.ticker.remove(spinTick)
    document.documentElement.classList.remove('is-locked')
    window.scrollTo(0, 0)
    ctx.emitOpen()
  }

  async function enterSequence() {
    openBtn.disabled = true
    eyeBtn.disabled = true
    if (reducedMotion) {
      gsap.to(cover, { autoAlpha: 0, duration: 0.4, onComplete: () => cover.remove() })
      finish()
      go('enterDone')
      return
    }
    await play(gsap.to(view, { speed: 840, duration: 0.7, ease: 'power2.in' }))
    eye.set({ mangekyo: 1 })
    gsap.to(view, { speed: 72, duration: 0.5, ease: 'power2.out' })
    await wait(0.45)

    const r = eyeBtn.getBoundingClientRect()
    const ink = createInk()
    await ink.spread({ x: r.left + r.width / 2, y: r.top + r.height / 2, duration: 1.1 })
    cover.remove()
    finish()
    await ink.fadeOut(0.7)
    go('enterDone')
  }

  function onTap() {
    if (state === COVER.IDLE && go('tap')) {
      scanSequence()
    } else if (state === COVER.AUTHED && go('tap')) {
      ctx.emitTap() // phát nhạc ngay trong cú chạm (iPhone chặn nếu gọi muộn hơn)
      enterSequence()
    }
  }

  eyeBtn.addEventListener('click', onTap)
  openBtn.addEventListener('click', onTap)
}
