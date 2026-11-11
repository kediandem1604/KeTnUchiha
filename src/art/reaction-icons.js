// Icon cảm xúc nét đơn (viewBox 0 0 24 24, tô theo màu chữ).

export const REACTION_ICONS = {
  tim: '<path d="M12 20s-7-4.4-7-9.5A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.5C19 15.6 12 20 12 20z"/>',
  katon: '<path d="M12 21c-3.9 0-6-2.6-6-5.6 0-3.4 3-5.2 3.4-8.9 2.3 1.4 3.4 3.4 3.3 5.4 1-.6 1.7-1.8 1.8-3 2 1.6 3.5 3.9 3.5 6.5 0 3-2.1 5.6-6 5.6z"/>',
  sharingan: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.2"/><circle cx="12" cy="6.8" r="1" fill="currentColor"/><circle cx="16.5" cy="14.6" r="1" fill="currentColor"/><circle cx="7.5" cy="14.6" r="1" fill="currentColor"/>',
  votay: '<path d="M8 13l4-6 1.6 1.1L12 11l4.2-4.6 1.4 1.2-3 4.1 3.3-2.6 1.1 1.4-5 5.5c-2 2.2-5 2.4-7 .6s-1.9-4.6 0-6.6z"/>',
  mu: '<path d="M2 9l10-4 10 4-10 4-10-4z"/><path d="M6 11v4c3 2 9 2 12 0v-4"/>',
}

export function reactionIconSvg(key, size = 18) {
  if (!Object.hasOwn(REACTION_ICONS, key)) throw new Error('Không có icon cảm xúc: ' + key)
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${REACTION_ICONS[key]}</svg>`
}
