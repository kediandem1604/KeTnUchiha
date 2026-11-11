// ─────────────────────────────────────────────────────────────
//  NỘI DUNG THIỆP — sửa chữ, ngày giờ, địa điểm, nhạc, ảnh ở đây.
//  Ô nào để trống ('' hoặc []) thì phần tương ứng tự ẩn hoặc hiện
//  thông báo thay thế, không làm hỏng trang.
// ─────────────────────────────────────────────────────────────

export default {
  // Người tốt nghiệp
  graduate: {
    fullName: 'Nguyễn Tiến Quốc',
    shortName: 'Quốc', // dùng trong lời mời, chữ ký
    katakana: 'グエン・ティエン・クオック', // phiên âm dưới tên ở đầu thiệp; để trống thì ẩn
    degree: 'Cử nhân',
    major: 'Công nghệ Thông tin',
    school: 'Trường ĐH Khoa học Tự nhiên – ĐHQG TP.HCM',
  },

  // Thời gian — ngày dạng 'YYYY-MM-DD', giờ dạng 'HH:mm' (giờ Việt Nam)
  event: {
    date: '2026-11-26',
    start: '10:00',
    end: '12:00',
    note: '', // vd. 'Mọi người đến sớm 15 phút để chụp ảnh cùng Quốc nha'
  },

  // Địa điểm
  venue: {
    name: 'Trường Đại học Khoa học Tự nhiên – ĐHQG TP.HCM', // thêm tên hội trường nếu có
    address: '227 Nguyễn Văn Cừ, Chợ Quán, TP. Hồ Chí Minh',
    // Chữ để tìm trên Google Maps (tên trường + địa chỉ là chắc nhất).
    // Có giá trị thì trang hiện bản đồ nhúng.
    mapQuery: 'Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM, 227 Nguyễn Văn Cừ, Chợ Quán, Hồ Chí Minh',
    // Link chỉ đường (tuỳ chọn). Để trống thì tự tạo từ mapQuery.
    // Lấy link: mở Google Maps → tìm trường → Chia sẻ → Sao chép đường liên kết.
    directionsUrl: 'https://maps.app.goo.gl/XM9tDsqNQs2nFzrj6',
    coords: '10.7627° N · 106.6822° E', // tọa độ hiện dưới bản đồ; để trống thì ẩn
  },

  // Nhạc nền — chọn 1 trong 3 (khách bật/tắt bằng nút Sharingan nhỏ ở góc dưới):
  // • File nhạc: chép .mp3 vào public/nhac/ rồi ghi src, vd. '/nhac/nhac-nen.mp3'.
  //   Phát trọn bài, tự bật khi khách bấm "Mở thư mời" (kể cả iPhone).
  // • Link YouTube: dán vào youtube. Phát trọn bài từ đầu (muốn bắt đầu ở giây khác thì
  //   thêm &t=30 vào link), trình phát được giấu đi. Tự bật khi bấm "Mở thư mời"; trên iPhone
  //   một trình phát nhỏ hiện ở góc để khách bấm ▶, nhạc chạy rồi thì tự ẩn.
  // • Link Spotify: dán vào spotify. Trình phát hiện ở phần đầu thiệp, ngay dưới tên trường.
  //   Khách chưa đăng nhập Spotify chỉ nghe được 30 giây do Spotify tự chọn đoạn.
  // Có nhiều cái thì ưu tiên: file nhạc → YouTube → Spotify. Trống cả 3 thì không có nút nhạc.
  music: {
    src: '',
    youtube: '',
    spotify: '',
    title: '',
  },

  // Ảnh: chép vào public/anh/ rồi ghi đường dẫn, vd. '/anh/chan-dung.jpg'
  // Nên dùng ảnh JPG/WebP chiều dài ~1600px để tải nhanh.
  photos: {
    hero: '/anh/chan-dung.jpg', // ảnh chân dung (dọc, tỉ lệ 3:4)
    gallery: [], // vd. ['/anh/1.jpg', '/anh/2.jpg']
  },

  // Liên hệ — ô nào trống thì nút đó ẩn
  contact: {
    phone: '', // vd. '0901234567'
    zalo: '', // số điện thoại Zalo, vd. '0901234567'
    messenger: '', // Facebook: link trang cá nhân hoặc tên người dùng
  },

  texts: {
    heroQuote: 'Bốn năm biên dịch, hôm nay chạy thành công.',
    inviteLead: 'Thân mời',
    inviteBody:
      'đến chung vui cùng Quốc trong ngày lễ tốt nghiệp. Khép lại bốn năm với những dòng code, những deadline và những đêm trắng, mở ra một chặng đường mới. Có mặt của bạn là món quà ý nghĩa nhất với Quốc.',
    closing:
      'Một hành trình khép lại, một chặng đường mới mở ra.\nCảm ơn gia đình, thầy cô và bạn bè đã đồng hành cùng Quốc suốt những năm đại học. Rất mong được gặp mọi người trong ngày đặc biệt này.',
    // Mẫu tin nhắn khi bấm "Copy kèm lời mời" ở trang quản lí.
    // {ten} = tên khách, {link} = link thiệp của khách đó,
    // {gio} = giờ bắt đầu (vd. "10:00 sáng"), {ngay} = ngày (vd. "Thứ Năm, 26/11/2026").
    shareTemplate: 'Quốc trân trọng mời {ten} đến dự lễ tốt nghiệp của Quốc lúc {gio} {ngay} 🎓\nThiệp mời: {link}',
  },

  // Lời chúc gợi ý khi khách bấm nút "Gợi ý"
  wishSuggestions: [
    'Chúc mừng tân cử nhân CNTT! Ra trường code ít bug, lương nhiều số 0 nha 🎓',
    'Bốn năm compile cuối cùng cũng build thành công. Chúc mừng Quốc!',
    'Chúc Quốc deploy sự nghiệp lên production suôn sẻ, không phải rollback lần nào.',
    'Chúc mừng tốt nghiệp! Mong Quốc luôn giữ được lửa đam mê như ngày đầu viết "Hello World".',
    'Chúc tân cử nhân mạnh khoẻ, hạnh phúc, công danh thăng tiến và gặp thật nhiều may mắn 🍀',
    'Tự hào về Quốc quá! Chúc bạn sớm tìm được công việc như ý, sếp hiền đồng nghiệp tốt.',
    'Chúc Quốc mở mắt Sharingan nhìn thấu mọi cơ hội phía trước 👁',
    'Một chương mới bắt đầu rồi! Chúc Quốc tự tin, dũng cảm theo đuổi ước mơ của mình.',
    'Chúc mừng ngày tốt nghiệp! Mong mọi điều tốt đẹp nhất luôn đến với Quốc.',
    'Cảm ơn Quốc vì những năm tháng cùng nhau chạy deadline. Chúc bạn thành công rực rỡ 🎉',
    'Hành trình đại học khép lại thật đẹp. Chúc Quốc vững bước, luôn bình an và hạnh phúc.',
  ],
}
