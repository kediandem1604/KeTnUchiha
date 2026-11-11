// Gia huy Uchiha: quạt tròn uchiwa (nửa trên đỏ, nửa dưới ngà, cán ngà).

/** Gia huy dạng chuỗi SVG; cao = rộng × 1,25. */
export function crestSvg({ size = 24 } = {}) {
  const height = +(size * 1.25).toFixed(2)
  return `<svg viewBox="-12 -14 24 30" width="${size}" height="${height}" aria-hidden="true">` +
    '<path d="M -11 -1 A 11 11 0 1 1 11 -1 Q 0 2.5 -11 -1 Z" fill="#a3141a"/>' +
    '<path d="M 11 -1 A 11 11 0 0 1 -11 -1 Q 0 2.5 11 -1 Z" fill="#ebe3d5"/>' +
    '<rect x="-1.7" y="8" width="3.4" height="7" rx="1" fill="#ebe3d5"/>' +
    '</svg>'
}
