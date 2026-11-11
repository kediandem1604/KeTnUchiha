// Gia huy Uchiha: quạt tròn uchiwa (nửa trên đỏ, nửa dưới ngà, cán ngà).

/** Gia huy dạng chuỗi SVG; cao = rộng × 1,25. `outline` thêm viền mực khi đặt trên nền giấy sáng. */
export function crestSvg({ size = 24, outline = false } = {}) {
  const height = +(size * 1.25).toFixed(2)
  const st = outline ? ' stroke="#161212" stroke-width=".9" stroke-linejoin="round"' : ''
  return `<svg viewBox="-12 -14 24 30" width="${size}" height="${height}" aria-hidden="true">` +
    `<path d="M -11 -1 A 11 11 0 1 1 11 -1 Q 0 2.5 -11 -1 Z" fill="#a3141a"${st}/>` +
    `<path d="M 11 -1 A 11 11 0 0 1 -11 -1 Q 0 2.5 11 -1 Z" fill="#ebe3d5"${st}/>` +
    `<rect x="-1.7" y="8" width="3.4" height="7" rx="1" fill="#ebe3d5"${st}/>` +
    '</svg>'
}
