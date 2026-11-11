// Trứng phục sinh cho dân IT: mở F12 thấy gia huy vẽ bằng ký tự và lời mời.
import { eventRange, formatDateDots } from '../lib/time.js'

const CREST = [
  '        .-~~~~~~~-.',
  "     .'###########'.",
  '    /###############\\',
  '   |#################|',
  '   |#################|',
  '   |~~~~~~~~~~~~~~~~~|',
  '   |                 |',
  '    \\               /',
  "     '.           .'",
  "       '-._____.-'",
  '           | |',
  '           | |',
  '           |_|',
]

export function consoleArt({ shortName, dateText }) {
  return [...CREST, '', 'Ồ, bạn mở F12 à? Đúng là dân code.', `${shortName} tốt nghiệp ngày ${dateText}, nhớ ghé nhé.`].join('\n')
}

export function printEasterEgg(content) {
  const dateText = formatDateDots(eventRange(content.event).start)
  console.log('%c' + consoleArt({ shortName: content.graduate.shortName, dateText }), 'color:#c21d24;font-family:monospace')
}
