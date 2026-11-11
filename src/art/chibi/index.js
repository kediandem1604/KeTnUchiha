// Chibi kiểu tem giấy cho 5 nhân vật giữ 5 phần thiệp.
import { itachi } from './itachi.js'
import { obito } from './obito.js'
import { shisui } from './shisui.js'
import { sasuke } from './sasuke.js'
import { madara } from './madara.js'

const DRAW = { itachi, obito, shisui, sasuke, madara }

/** Thứ tự theo các phần thiệp: lời mời, thời gian, địa điểm, xác nhận, lời chúc. */
export const CHIBI_IDS = Object.keys(DRAW)

export function chibiSvg(id) {
  if (!Object.hasOwn(DRAW, id)) throw new Error('Không có chibi: ' + id)
  return DRAW[id]()
}
