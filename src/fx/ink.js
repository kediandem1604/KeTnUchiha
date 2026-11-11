// Mực đỏ loang từ một điểm ra kín màn hình, rồi mờ dần.
import { gsap } from 'gsap'

const NS = 'http://www.w3.org/2000/svg'

export function createInk() {
  const svg = document.createElementNS(NS, 'svg')
  svg.setAttribute('class', 'ink')
  svg.setAttribute('aria-hidden', 'true')
  svg.innerHTML = `<defs><filter id="ink-edge" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency=".022" numOctaves="3" seed="9"/>
      <feDisplacementMap in="SourceGraphic" scale="46"/>
    </filter></defs><circle r="0" fill="#a3141a"/>`
  const circle = svg.querySelector('circle')
  document.body.append(svg)

  /** Loang từ (x, y) tới khi phủ kín màn hình. Bộ lọc mép chỉ gắn trong lúc loang. */
  function spread({ x, y, duration = 1.1 }) {
    circle.setAttribute('cx', x)
    circle.setAttribute('cy', y)
    circle.setAttribute('filter', 'url(#ink-edge)')
    const far = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 80
    return new Promise((resolve) => {
      gsap.to(circle, {
        attr: { r: far },
        duration,
        ease: 'power2.in',
        onComplete() {
          circle.removeAttribute('filter')
          resolve()
        },
      })
    })
  }

  /** Mờ dần rồi tự xoá lớp mực. */
  function fadeOut(duration = 0.7) {
    return new Promise((resolve) => {
      gsap.to(svg, {
        opacity: 0,
        duration,
        ease: 'power1.out',
        onComplete() {
          svg.remove()
          resolve()
        },
      })
    })
  }

  return { spread, fadeOut }
}
