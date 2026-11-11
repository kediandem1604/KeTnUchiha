/** Tách họ (chữ đầu) và phần còn lại; tên một chữ thì để hết vào `rest`. */
export function splitName(fullName) {
  const words = String(fullName ?? '').trim().split(/\s+/).filter(Boolean)
  if (words.length < 2) return { first: '', rest: words.join('') }
  return { first: words[0], rest: words.slice(1).join(' ') }
}

const HAN = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九']

/** 2026 → "二〇二六" */
export function hanYear(year) {
  return String(year).replace(/\d/g, (d) => HAN[d])
}
