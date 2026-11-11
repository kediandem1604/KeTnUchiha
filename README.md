# 🎓 Thư mời tốt nghiệp · Nguyễn Tiến Quốc

Thiệp mời online phong cách **gia tộc Uchiha**: tông mực đen, ngà, đỏ trầm, vân giấy và dấu triện.

- **Bìa quét mống mắt:** màn hình tối, một con mắt đang nhắm. Khách chạm vào thì mắt mở, vạch đỏ quét mống mắt, Sharingan thức tỉnh và hiện "Thân gửi [tên khách]". Bấm *Mở thư mời* thì Mangekyō xoay, mực đỏ loang kín màn hình, rồi lộ thiệp. Nhạc nền phát lúc này.
- **Năm nhân vật giữ năm phần:**
  - Itachi: lời mời, có bầy quạ.
  - Obito: thời gian, xoáy Kamui sau đồng hồ đếm ngược.
  - Shisui: địa điểm, nút "Thuấn Thân tới đây".
  - Sasuke: xác nhận tham dự, tia Chidori.
  - Madara: sổ lời chúc, trăng Nguyệt Độc.

  Mọi hình đều vẽ bằng vector, không dùng ảnh anime.
- **Chất IT kín đáo:** chú thích kiểu code, dòng `T−14d 12:19:15`, tọa độ trường. Mở F12 sẽ thấy gia huy vẽ bằng ký tự kèm lời mời dành cho dân code.
- **Cảm xúc nét đơn:** Thương, Katon, Sharingan, Vỗ tay, Tốt nghiệp. Bấm là icon bay lên; giữ để bay liên tục. Người khác thả cảm xúc hay gửi lời chúc thì máy bạn cũng thấy.
- **Trang quản lí `/quan-li`:** nhập tên là ra link mời riêng, copy kèm lời mời soạn sẵn, xem ai đã mở thiệp, ai sẽ đến, xoá lời chúc không phù hợp, tạo ảnh QR có tên.

---

## Chạy trên máy

Cần [Node.js](https://nodejs.org) bản 20 trở lên. Mở terminal trong thư mục này:

```bash
npm install
```

```bash
npm run dev -- --port 5174
```

- Thiệp: `http://localhost:5174`
- Trang quản lí: `http://localhost:5174/quan-li`. Mật khẩu mặc định khi chạy trên máy là **`thiep-dev`**.

Dùng cổng 5174 để chạy song song được với thiệp của Thắm (cổng 5173). Muốn đổi mật khẩu khi chạy trên máy: chép `.env.example` thành `.env.local` rồi điền `ADMIN_PASSWORD=...`.

Dữ liệu thử (khách, lời chúc) khi chạy trên máy được lưu trong thư mục `.data/`. Xoá thư mục này là sạch dữ liệu. Thư mục này không được đưa lên mạng.

---

## Điền nội dung

### Cách nhanh: tab Cài đặt trong trang quản lí

Vào `…/quan-li` → tab **Cài đặt**. Sửa xong bấm **Lưu** là khách mở thiệp thấy ngay, không cần deploy lại. Sửa được:

- **Thời gian:** ngày, giờ bắt đầu, giờ kết thúc, ghi chú.
- **Địa điểm:** tên nơi tổ chức, địa chỉ, chữ tìm trên bản đồ, link chỉ đường.
- **Tên & lời văn:** tên hiển thị, tên gọi ngắn, câu dưới tên, lời mời, lời kết, mẫu tin nhắn gửi khách.
- **Nhạc & liên hệ:** link YouTube, link Spotify, tên bài hát, điện thoại, Zalo, Facebook (dán link trang cá nhân).

Ô để trống thì phần đó trên thiệp tự ẩn. Nút **Khôi phục mặc định** đưa mọi thứ về như trong `content.js`. Ảnh xem trước khi gửi link (Zalo, Messenger) là ảnh cố định, không ghi ngày giờ nên không bao giờ hiện giờ cũ.

### Sửa trong code: `content.js`

Mọi chữ trên thiệp có giá trị mặc định trong **`content.js`**, mỗi dòng đều có chú thích. Ô nào để trống thì phần đó tự ẩn. Sửa xong phải deploy lại. Các thứ sau chỉ sửa được ở đây:
- ảnh, album;
- ngành, trường;
- phiên âm katakana dưới tên;
- tọa độ dưới bản đồ;
- file nhạc `.mp3`;
- lời chúc gợi ý.

Những ô đã lưu trong tab Cài đặt được ưu tiên hơn `content.js`.

| Muốn thêm | Làm thế này |
|---|---|
| **Nhạc nền** | Khách bật/tắt nhạc bằng nút Sharingan nhỏ ở góc dưới. **Cách 1 (nên dùng):** chép file `.mp3` vào `public/nhac/`, rồi ghi `music.src: '/nhac/ten-file.mp3'`. Nên dùng file nhỏ hơn 5 MB; nhạc phát trọn bài khi khách bấm *Mở thư mời*, kể cả trên iPhone. **Cách 2:** dán link YouTube vào `music.youtube` (hoặc ô Link YouTube trong tab Cài đặt). Trên iPhone, YouTube không cho tự bật tiếng nên một trình phát nhỏ hiện ở góc để khách bấm ▶. **Cách 3:** link Spotify (khách chưa đăng nhập Spotify chỉ nghe được 30 giây). Ưu tiên: `.mp3` → YouTube → Spotify. Trống cả 3 thì không có nút nhạc. |
| **Ảnh chân dung** | Đang dùng `public/anh/chan-dung.jpg`. Muốn đổi: chép ảnh dọc tỉ lệ 3:4 (dài khoảng 1600px) vào `public/anh/` rồi sửa `photos.hero`. Ảnh lỗi thì khung tự hiện gia huy thay thế. |
| **Album ảnh** | `photos.gallery: ['/anh/1.jpg', '/anh/2.jpg']`. Trống thì phần Khoảnh khắc tự ẩn. |
| **Ngành, trường** | `graduate.degree`, `graduate.major`, `graduate.school`. |
| **Phiên âm dưới tên** | `graduate.katakana` (đang là `グエン・ティエン・クオック`). Để trống thì ẩn. |
| **Liên hệ** | `contact.phone`, `contact.zalo` (số điện thoại), `contact.messenger` (Facebook: link trang cá nhân hoặc tên người dùng). |
| **Mẫu tin nhắn mời** | `texts.shareTemplate`. Trong đó `{ten}` là tên khách, `{link}` là link riêng của người đó, `{gio}` là giờ bắt đầu (vd. "10:00 sáng"), `{ngay}` là ngày (vd. "Thứ Năm, 26/11/2026"). |

> Trình duyệt không cho tự phát nhạc khi chưa bấm gì, nên nhạc bắt đầu khi khách bấm **Mở thư mời**. Trên iPhone, âm lượng theo nút âm lượng của máy.

### Ảnh xem trước khi gửi link

Ảnh `public/og.png` (1200×630) được chụp từ `scripts/og.html`. Sửa file đó xong thì chụp lại bằng Edge chạy ngầm (chạy trong Git Bash):

```bash
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --disable-gpu --hide-scrollbars --window-size=1200,630 --virtual-time-budget=8000 --screenshot="$(cygpath -w "$PWD/public/og.png")" "file:///$(cygpath -m "$PWD/scripts/og.html")"
```

---

## Đưa lên mạng (Netlify, miễn phí)

Thiệp này là một trang Netlify **riêng**, tách hẳn với thiệp của Thắm: khách, lời chúc và mật khẩu không lẫn vào nhau.

**Lần đầu:**

1. Đăng nhập (trình duyệt sẽ mở để bạn xác nhận):
   ```bash
   npx netlify login
   ```
2. Deploy lần đầu. Khi được hỏi, chọn **Create & configure a new project** và đặt tên, ví dụ `tienquoc-totnghiep`:
   ```bash
   npm run deploy
   ```
3. Đặt mật khẩu cho trang quản lí. Thay `mat-khau-cua-ban` bằng mật khẩu khó đoán:
   ```bash
   npx netlify env:set ADMIN_PASSWORD "mat-khau-cua-ban"
   ```
4. Deploy lại để mật khẩu có hiệu lực:
   ```bash
   npm run deploy
   ```
5. Netlify in ra link dạng `https://tienquoc-totnghiep.netlify.app`. Vào `…/quan-li`, đăng nhập rồi thêm khách.
6. Kiểm tra nhanh phần lưu dữ liệu. Thay bằng link của bạn; kết quả phải là chữ dạng `{"wishes":[...]}`, không phải trang HTML:
   ```bash
   curl https://tienquoc-totnghiep.netlify.app/api/wishes
   ```
7. Mở thử thiệp trên **iPhone** (Safari và trong Zalo) để chắc nhạc phát khi bấm *Mở thư mời*.

**Những lần sau** (sửa `content.js`, thêm ảnh, đổi nhạc):

```bash
npm run deploy
```

Khách mời, lời chúc và xác nhận được lưu trên Netlify (Netlify Blobs), nên deploy lại **không làm mất dữ liệu**.

---

## Gửi thiệp

1. Vào trang quản lí và nhập tên khách. Tên ghi thế nào thì bìa hiện đúng như vậy sau "Thân gửi"; lời nhắn riêng có thể bỏ trống.
2. Bấm **Copy kèm lời mời** rồi dán vào Zalo/Messenger. Trên điện thoại có thể bấm **Chia sẻ**.
3. Có nhiều người thì bấm **Thêm nhiều người cùng lúc**, dán danh sách mỗi dòng một tên.
4. Muốn xem trước thiệp của ai thì bấm biểu tượng 👁. Mở bằng nút này **không** bị tính là khách đã mở.
5. Bấm **Ảnh QR** để có thiệp QR mang tên khách theo kiểu Uchiha:
   - nền mực, gia huy, mắt Sharingan, "Thân gửi [tên]";
   - mã QR trên nền ngà, mở đúng link của người đó;
   - kèm tên lễ và ngày giờ theo tab Cài đặt.

   Bấm **Tải ảnh** để lưu, hoặc **Chia sẻ** (trên điện thoại) để gửi thẳng qua Zalo.

Link không có tên (`https://ten-trang.netlify.app`) vẫn mở được, bìa ghi "Thân gửi bạn". Dùng link này khi đăng lên mạng xã hội. Dòng **Link chung** trong tab Khách mời có nút copy và **Ảnh QR** để in hoặc đăng lên mạng.

---

## Lưu ý

- Trang có gắn thẻ để Google **không** đưa vào kết quả tìm kiếm.
- Link khách dạng `/minh-anh` dễ đoán. Người đoán trúng chỉ thấy tên và lời nhắn trên thiệp, không xem được gì khác.
- Mật khẩu quản lí chỉ nằm trong cài đặt Netlify, không có trong code.
- Ai cũng gửi được lời chúc, nên thỉnh thoảng bạn vào tab **Lời chúc** của trang quản lí để xoá tin không phù hợp.
- Máy nào bật chế độ giảm chuyển động thì bìa mở nhanh, không quét, không xoay, không loang mực.
- Nếu `/api` báo lỗi sau khi deploy, kiểm tra mục *Functions* trong trang Netlify của dự án xem có hàm `api` chưa.

## Lệnh hữu ích

| Lệnh | Việc |
|---|---|
| `npm run dev -- --port 5174` | Chạy trên máy để xem và sửa |
| `npm test` | Chạy test tự động |
| `npm run build` | Build ra thư mục `dist/` |
| `npm run deploy` | Build và đưa lên Netlify |
