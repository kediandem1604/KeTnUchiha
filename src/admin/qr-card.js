// Thiệp QR có tên: ảnh 1080×1350 kiểu Uchiha (nền mực, gia huy, Sharingan, "Thân gửi [tên]", mã QR trên nền ngà).
// File này chỉ được tải khi bấm nút QR, nên trang quản lí mở nhanh như cũ.
import { h, toast } from '../lib/dom.js'
import { icons } from '../lib/icons.js'
import { qrMatrix, qrCardTexts, qrFileName, fitFontSize } from '../lib/qr.js'
import { crestSvg } from '../art/crest.js'
import { eyeBadgeSvg } from '../art/mangekyo.js'

const W = 1080
const H = 1350
const INK = '#0c0a0a'
const BONE = '#ebe3d5'
const ASH = '#857a71'
const DISPLAY = '"Noto Serif Display", Georgia, serif'
const BODY = '"Be Vietnam Pro", system-ui, sans-serif'
const MONO = '"JetBrains Mono", ui-monospace, monospace'

/** Nạp sẵn font (kèm bảng chữ tiếng Việt) trước khi vẽ lên canvas. */
async function loadFonts(t) {
  const all = Object.values(t).join(' ')
  try {
    await Promise.all([
      document.fonts.load(`500 96px ${DISPLAY}`, t.name),
      document.fonts.load(`italic 400 44px ${DISPLAY}`, t.lead),
      document.fonts.load(`500 36px ${DISPLAY}`, t.title),
      document.fonts.load(`400 28px ${BODY}`, all),
      document.fonts.load(`400 26px ${MONO}`, `${t.eyebrow} ${t.link} ${t.hint}`),
    ])
  } catch {
    /* thiếu font thì vẽ bằng font dự phòng */
  }
}

/** Chuỗi SVG → ảnh để vẽ lên canvas. */
export function svgImage(svg) {
  const src = svg.includes('xmlns=') ? svg : svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ')
  const url = URL.createObjectURL(new Blob([src], { type: 'image/svg+xml' }))
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('svg'))
    }
    img.src = url
  })
}

function text(ctx, str, y, font, color, maxWidth = 960) {
  ctx.font = font
  ctx.fillStyle = color
  ctx.fillText(str, W / 2, y, maxWidth)
}

function spaced(ctx, px) {
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${px}px`
}

/** Vẽ thiệp QR lên canvas. `art` = { crest, eye } (ảnh đã nạp). */
export function drawQrCard(canvas, t, matrix, art) {
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'

  // Nền mực + nhiễu hạt
  ctx.fillStyle = INK
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = 'rgba(235, 227, 213, 0.05)'
  for (let i = 0; i < 6000; i++) ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1)

  // Đầu thiệp: gia huy, dòng mono, con mắt
  ctx.drawImage(art.crest, W / 2 - 32, 56, 64, 80)
  spaced(ctx, 8)
  text(ctx, t.eyebrow, 190, `400 26px ${MONO}`, ASH)
  spaced(ctx, 0)
  ctx.drawImage(art.eye, W / 2 - 90, 222, 180, 180)

  // Thân gửi + tên
  text(ctx, t.lead, 468, `italic 400 44px ${DISPLAY}`, ASH)
  const size = fitFontSize((s, px) => {
    ctx.font = `500 ${px}px ${DISPLAY}`
    return ctx.measureText(s).width
  }, t.name, 900, 96, 48)
  text(ctx, t.name, 558, `500 ${size}px ${DISPLAY}`, BONE)

  // Ô ngà chứa mã QR (vùng trắng quanh mã ≥ 4 ô)
  const box = 560
  const bx = (W - box) / 2
  const by = 598
  ctx.fillStyle = BONE
  ctx.beginPath()
  ctx.roundRect(bx, by, box, box, 24)
  ctx.fill()
  const n = matrix.length
  const cell = Math.floor(box / (n + 8))
  const qx = bx + Math.round((box - cell * n) / 2)
  const qy = by + Math.round((box - cell * n) / 2)
  ctx.fillStyle = INK
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++) if (matrix[r][c]) ctx.fillRect(qx + c * cell, qy + r * cell, cell, cell)

  // Chân thiệp
  spaced(ctx, 4)
  text(ctx, t.hint.toUpperCase(), 1196, `400 20px ${MONO}`, ASH)
  spaced(ctx, 0)
  text(ctx, t.title, 1246, `500 34px ${DISPLAY}`, BONE)
  text(ctx, t.date, 1288, `400 26px ${BODY}`, ASH)
  text(ctx, t.link, 1326, `400 20px ${MONO}`, ASH)
}

/** Mở hộp xem thiệp QR với nút Tải ảnh / Chia sẻ. `slug` null = link chung. */
export async function openQrCard({ name, slug, link, content }) {
  const t = qrCardTexts({ name, content, link })
  const [art] = await Promise.all([
    Promise.all([svgImage(crestSvg({ size: 64 })), svgImage(eyeBadgeSvg('sharingan', 180))]).then(([crest, eye]) => ({ crest, eye })),
    loadFonts(t),
  ])
  const canvas = document.createElement('canvas')
  drawQrCard(canvas, t, qrMatrix(link), art)
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
  if (!blob) throw new Error('canvas')
  const url = URL.createObjectURL(blob)
  const fileName = qrFileName(slug)
  const file = new File([blob], fileName, { type: 'image/png' })
  const canShareFile = typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] })

  const dialog = h('dialog', { class: 'qr-dialog', attrs: { 'aria-label': `Thiệp QR cho ${t.name}` } },
    h('img', { class: 'qr-dialog__img', src: url, alt: `Thiệp QR mời ${t.name}, quét để mở ${t.link}` }),
    h('div', { class: 'qr-dialog__actions' },
      h('a', { class: 'btn btn--primary btn--small', href: url, download: fileName, html: `${icons.download}<span>Tải ảnh</span>` }),
      canShareFile
        ? h('button', {
            class: 'btn btn--ghost btn--small',
            attrs: { type: 'button' },
            html: `${icons.share}<span>Chia sẻ</span>`,
            on: {
              async click() {
                try {
                  await navigator.share({ files: [file], title: 'Thư mời tốt nghiệp' })
                } catch (err) {
                  if (err?.name !== 'AbortError') toast('Không chia sẻ được, bạn bấm Tải ảnh nhé', 'error')
                }
              },
            },
          })
        : null,
      h('button', { class: 'btn btn--ghost btn--small', attrs: { type: 'button' }, text: 'Đóng', on: { click: () => dialog.close() } }),
    ),
  )
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close() // bấm ra ngoài ảnh để đóng
  })
  dialog.addEventListener('close', () => {
    URL.revokeObjectURL(url)
    dialog.remove()
  })
  document.body.append(dialog)
  dialog.showModal()
}
