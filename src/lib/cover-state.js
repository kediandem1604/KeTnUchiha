// Trạng thái bìa quét mống mắt. Hàm thuần để test được và để chạm dồn dập không chạy lại chuỗi.

export const COVER = { IDLE: 'idle', SCANNING: 'scanning', AUTHED: 'authed', ENTERING: 'entering', OPEN: 'open' }

const NEXT = {
  [`${COVER.IDLE}:tap`]: COVER.SCANNING,
  [`${COVER.SCANNING}:scanDone`]: COVER.AUTHED,
  [`${COVER.AUTHED}:tap`]: COVER.ENTERING,
  [`${COVER.ENTERING}:enterDone`]: COVER.OPEN,
}

/** Trạng thái kế tiếp; sự kiện không hợp lệ ở trạng thái hiện tại thì giữ nguyên. */
export function coverNext(state, event) {
  return NEXT[`${state}:${event}`] ?? state
}

/** Lớp cỡ chữ cho tên khách trên bìa: tên càng dài chữ càng nhỏ. */
export function nameSizeClass(name) {
  const n = String(name ?? '').trim().length
  if (n <= 16) return ''
  if (n <= 28) return 'is-long'
  return 'is-very-long'
}
