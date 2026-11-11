# Thiệp mời tốt nghiệp Nguyễn Tiến Quốc (phong cách Uchiha): Thiết kế

Ngày: 2026-11-11 · Trạng thái: đã duyệt thiết kế trong chat, chờ duyệt bản viết

Bản phác đã duyệt (mở bằng trình duyệt): [`mockups/bia-quet-mong-mat.html`](mockups/bia-quet-mong-mat.html) (bìa) và [`mockups/ben-trong-nhan-vat.html`](mockups/ben-trong-nhan-vat.html) (bên trong). Hai file này dùng khung của công cụ phác thảo nên mở trực tiếp sẽ thiếu vài kiểu chữ của khung, phần điện thoại vẫn xem được.

## 1. Mục tiêu

Thiệp mời online dự lễ tốt nghiệp của **Nguyễn Tiến Quốc** (Cử nhân Công nghệ Thông tin, ĐH Khoa học Tự nhiên), **phong cách gia tộc Uchiha** (Naruto): con mắt Sharingan, gia huy quạt uchiwa, năm nhân vật nổi tiếng của gia tộc. Thiệp phải:

- **Không "nhựa":** màu phẳng, không bóng loáng, không viền phát sáng, không rải emoji màu. Chất liệu lấy từ vân giấy, nét mực, dấu triện.
- **Cho thấy người học IT:** có vài chi tiết kiểu code và một "trứng phục sinh" cho dân lập trình, nhưng không màu mè và người lớn tuổi vẫn đọc dễ.
- **Khác hoàn toàn** giao diện thiệp của Lý Ngọc Thắm. Phần máy chủ và trang quản lí thì dùng lại như bên đó.

**Thành công khi:**
- Mở `…/minh-anh` thấy bìa tối có con mắt nhắm; chạm vào thì quét mống mắt, Sharingan thức tỉnh, hiện "Thân gửi Minh Anh"; bấm "Mở thư mời" thì Mangekyō xoay, mực đỏ loang, vào thiệp, nhạc phát (khi đã có file nhạc).
- Cuộn hết thiệp trên điện thoại tầm trung không giật.
- Trang quản lí làm được mọi việc như bên Thắm (thêm khách, link riêng, copy lời mời, ai đã mở, ai sẽ đến, lời chúc, cài đặt, ảnh QR).
- Thiệp của Thắm không bị thay đổi gì.

**Thông tin sự kiện:** Thứ Năm 26/11/2026, 10:00–12:00 (giờ Việt Nam, UTC+7), Trường ĐH Khoa học Tự nhiên – ĐHQG TP.HCM, 227 Nguyễn Văn Cừ, Chợ Quán, TP. Hồ Chí Minh (giống thiệp Thắm). Sửa được trong tab Cài đặt.

**Ngoài phạm vi:** phần riêng "Gia tộc Uchiha" với thẻ hồ sơ (đã cân nhắc và bỏ); vẽ mặt nhân vật kiểu anime; dùng ảnh anime có sẵn trên mạng; tự đăng nhập Netlify (người dùng đăng nhập, sau đó chạy lệnh deploy); xuất CSV.

## 2. Dự án

- Thư mục mới **`C:\Users\quocn\OneDrive\Máy tính\ThiepTotNghiep-Quoc`**, nằm cạnh `ThiepTotNghiep` (thiệp Thắm), có git riêng.
- Trang Netlify mới, ví dụ `tienquoc-totnghiep`. Mật khẩu quản lí riêng (`ADMIN_PASSWORD`). Kho dữ liệu Netlify Blobs gắn theo trang nên tách hẳn với thiệp Thắm.
- Không sửa file nào trong thư mục `ThiepTotNghiep`.

## 3. Ngôn ngữ hình ảnh

### 3.1 Màu
| Tên | Mã | Dùng cho |
|---|---|---|
| Mực | `#0c0a0a` | nền chính |
| Mực 2 | `#151111` | thẻ, ô nhập |
| Ngà | `#ebe3d5` | chữ chính, mí mắt, quạ |
| Ngà dịu | `#d7cfc1` | đoạn văn |
| Tro | `#857a71` | chữ phụ, chú thích |
| Đỏ Uchiha | `#a3141a` | mống mắt, trăng, nút chính, dấu triện |
| Đỏ sáng | `#c21d24` | viền nút, chữ nhấn, vạch quét |
| Đường kẻ | `rgba(235,227,213,.1)` | viền mảnh, ngăn cách phần |

Không dùng chuyển màu bóng, không đổ bóng phát sáng. Trăng đỏ dùng chuyển màu tròn rất nhẹ (`#9b161c → #5c0b0f`). Toàn trang phủ một lớp nhiễu hạt (SVG `feTurbulence`, độ mờ ~7%) để có cảm giác giấy.

### 3.2 Chữ
Tất cả đóng gói qua `@fontsource`, chỉ các độ đậm dùng tới:
- **Noto Serif Display** 500/700 + nghiêng 400: tên, tiêu đề, "Thân gửi".
- **Be Vietnam Pro** 400/500/600: nội dung, nút.
- **JetBrains Mono** 400/600: chú thích kiểu code (in hoa, giãn chữ), số đếm ngược, tọa độ, giờ lời chúc.
- **Noto Serif JP** 500/700: chữ Nhật điểm xuyết (katakana tên, 卒業, tên nhân vật). Font chia theo dải ký tự nên trình duyệt chỉ tải vài mảnh nhỏ.

Trên điện thoại: đoạn văn tối thiểu 15px, chú thích mono tối thiểu 10px, vùng bấm tối thiểu 44×44px.

### 3.3 Hình vẽ
Mọi hình tự vẽ bằng SVG (không lấy ảnh anime):
- **Gia huy uchiwa:** quạt tròn, nửa trên đỏ, nửa dưới ngà, ranh giới cong nhẹ, cán ngà.
- **Con mắt:** mí trên/mí dưới là hai đường cong bậc ba có thể mở/nhắm; tròng ngà `#d9d0c1`; mống mắt r=38 (hệ toạ độ −40…40). Sharingan: vòng r=22.5 + 3 tomoe + đồng tử.
- **Năm mẫu Mangekyō** (vẽ phỏng theo, nét đen `#0a0505` trên nền đỏ):
  - Itachi: chong chóng 3 cánh quanh tâm tròn.
  - Obito: vòng rỗng + 3 lưỡi hái cong.
  - Shisui: chong chóng 4 cánh, tâm đỏ có đồng tử.
  - Sasuke: 3 hình thấu kính đan 60°, tâm đỏ có đồng tử.
  - Madara: vòng dày r=21 + 3 cánh cong + tâm tròn.
  - Dạng đường dẫn khởi điểm lấy từ bản phác `ben-trong-nhan-vat.html` (đối tượng `PAT`). Khi làm thật được tinh chỉnh cho đẹp hơn, giữ đúng tinh thần.
- **Quạ:** dáng quạ bay (thân, đuôi xoè, cánh nhọn), vẽ lại cho ra quạ; không dùng dáng chữ "M" như bản phác.
- **Xoáy Kamui:** 3 nhánh xoắn ốc Archimedes, nét tro mảnh.
- **Trăng Nguyệt Độc:** đĩa đỏ với 4 vòng đồng tâm và 9 tomoe (Rinne Sharingan), màu đỏ sẫm, mờ.
- **Tia Chidori:** 2 đường gấp khúc màu trắng xanh nhạt `#e6eef8`.
- **Icon cảm xúc nét đơn** (24×24, nét 1.4): Thương (tim), Katon (ngọn lửa), Sharingan (vòng + 3 chấm), Vỗ tay, Tốt nghiệp (mũ).

## 4. Trải nghiệm khách

### 4.1 Đường dẫn
Giữ như thiệp Thắm:

| Đường dẫn | Hiển thị |
|---|---|
| `/` | thiệp chung, "Thân gửi bạn" |
| `/<slug>` | thiệp của khách; slug không tồn tại → thiệp chung |
| `/<slug>?xem-thu=1` | như trên, không tính "đã mở" |
| `/quan-li/` | trang quản lí |

### 4.2 Bìa: quét mống mắt
Toàn màn hình, nền mực, trang chính bị khoá cuộn cho tới khi mở. Bố cục từ trên xuống: gia huy nhỏ, dòng mono "THƯ MỜI TỐT NGHIỆP · 2026", con mắt (rộng ~80% màn hình, tối đa 360px), dòng trạng thái mono, vùng "Thân gửi + tên", nút "Mở thư mời", chân trang mono "NGUYỄN TIẾN QUỐC · CỬ NHÂN CNTT".

Trình tự:
1. **Chờ:** mắt nhắm (mí trùng nhau, có 5 sợi mi). Trạng thái: `[ CHẠM VÀO MẮT ĐỂ XÁC THỰC ]`. Con mắt là một `<button aria-label="Chạm để mở thư mời">`; bấm phím Enter/Space cũng được.
2. **Chạm lần 1 (quét):**
   - Mắt mở trong 0,5 giây, mống mắt màu tối `#2a2321`.
   - Bốn góc khung ngắm hiện quanh mắt. Một vạch đỏ có vệt mờ phía sau quét xuống rồi lên trong 1,4 giây.
   - Trạng thái: `ĐANG QUÉT MỐNG MẮT · 0…100%`.
3. **Thức tỉnh:**
   - Mống mắt chuyển đỏ trong 0,7 giây. Vòng tomoe hiện ra, 3 tomoe lần lượt hiện cách nhau 0,18 giây, rồi xoay chậm (1 vòng / 12 giây).
   - Trạng thái chuyển `✓ ĐÃ XÁC THỰC`.
   - "Thân gửi" (nghiêng) và **tên khách** hiện lên, sau đó tới nút "Mở thư mời".
   - Nếu tên khách chưa tải xong lúc này thì chờ thêm, tổng cộng tối đa 2,5 giây kể từ lúc mở trang (như thiệp Thắm), quá thì ghi "bạn".
4. **Chạm lần 2 ("Mở thư mời", hoặc chạm lại con mắt):**
   - Trong chính cú chạm này phải gọi phát nhạc (iPhone chỉ cho phát lúc người dùng chạm).
   - Tomoe tăng tốc trong 0,7 giây, biến thành **Mangekyō của Itachi**, rồi chậm lại.
   - Mực đỏ loang từ tâm mắt ra kín màn hình trong 1,1 giây (vòng tròn có mép răng cưa nhờ `feTurbulence` + `feDisplacementMap`).
   - Bìa mờ đi, lớp mực mờ dần trong 0,7 giây, lộ trang chính. Mở khoá cuộn.
   - Tổng từ lúc chạm lần 2 tới khi thấy trang chính ≤ 3 giây.

**Giảm chuyển động** (`prefers-reduced-motion: reduce`): chạm lần 1 thì mắt mở ngay, không quét, Sharingan đứng yên, hiện lời chào luôn. Chạm lần 2 thì bìa mờ đi trong 0,4 giây, không xoay, không loang mực.

**Lỗi khi dựng bìa:** bỏ bìa, mở khoá, hiện trang chính (như thiệp Thắm).

### 4.3 Trang chính
Nền mực cố định, có lớp nhiễu hạt. Các khối hiện dần khi cuộn tới (dùng lại `initReveal`). Mỗi phần có nhân vật bắt đầu bằng **đầu mục**: Mangekyō của nhân vật (40px), dòng mono `0N · TÊN PHẦN`, dòng "Tên nhân vật · katakana · thuật". Chạm vào con mắt ở đầu mục thì mắt xoay một vòng (0,8 giây). Các phần ngăn cách bằng đường kẻ mảnh.

Thứ tự:
1. **Đầu thiệp:**
   - Trăng đỏ lớn lấn ra mép phải, phía trên.
   - Dòng mono `// LỄ TỐT NGHIỆP · 26.11.2026` (ngày lấy theo cài đặt).
   - Tên chia hai dòng ("Nguyễn" nhỏ hơn, "Tiến Quốc" lớn). Họ và tên được tách ở khoảng trắng đầu tiên; tên một chữ thì để một dòng.
   - Katakana `グエン・ティエン・クオック` (cố định trong `content.js`, ô `graduate.katakana`; để trống thì ẩn).
   - Câu dưới tên (`texts.heroQuote`, để trống thì ẩn).
   - Khung ảnh chân dung tỉ lệ 3:4 viền ngà mờ, dấu triện đỏ 卒 lấn góc dưới phải. Chưa có ảnh thì hiện gia huy mờ + chữ mono "ẢNH CHÂN DUNG".
   - Chữ dọc `卒業 二〇二六` ở mép phải (năm lấy theo ngày lễ, viết bằng số Hán).
   - Bằng cấp (`graduate.degree` + `graduate.major`) và trường (`graduate.school`). Dòng mono "↓ CUỘN XUỐNG".
2. **01 · Lời mời (Itachi · イタチ):**
   - Bầy 6 con quạ ở góc trên phải, bay lượn nhẹ khi phần này hiện ra.
   - "Thân mời" + **tên khách** (đỏ sáng, chữ có chân), rồi đoạn `texts.inviteBody`.
   - Khách có lời nhắn riêng thì hiện thêm ô viền mảnh chữ nghiêng, chân ô ghi "— LỜI NHẮN RIÊNG CHO [TÊN]".
3. **02 · Thời gian (Obito · オビト · Kamui):**
   - Xoáy Kamui xoay chậm phía sau, chỉ chạy khi phần này đang trên màn hình và tab đang mở.
   - Ngày dài ("Thứ Năm, 26 tháng 11, 2026"), giờ lớn ("10:00 sáng").
   - Đếm ngược 4 ô Ngày/Giờ/Phút/Giây (số mono). Dòng mono "KAMUI ĐANG HÚT THỜI GIAN" và `T−15d 04:12:33` (không in hoa).
   - Ghi chú `event.note` (để trống thì ẩn). Nút "＋ Thêm vào lịch" mở hai lựa chọn Google Calendar / tải file .ics, logic như thiệp Thắm.
   - Đang diễn ra: thay đếm ngược bằng "Lễ tốt nghiệp đang diễn ra". Sau giờ kết thúc: "Cảm ơn mọi người đã đến chung vui".
4. **03 · Địa điểm (Shisui · シスイ · Thuấn Thân):**
   - Tên nơi tổ chức, địa chỉ.
   - Bản đồ Google nhúng (dùng `mapEmbedUrl`, chỉ gắn khi phần này gần màn hình), phủ bộ lọc tông tối `filter: invert(.92) hue-rotate(180deg) saturate(.6) contrast(.9)`.
   - Dòng tọa độ mono (`venue.coords`, mặc định `10.7627° N · 106.6822° E`; để trống thì ẩn).
   - Nút đỏ "Thuấn Thân tới đây →" có 2 bóng mờ lệch trái, mở `directionsUrl` (hoặc link tự tạo từ `mapQuery`).
   - Chưa điền địa điểm: "Địa điểm sẽ được cập nhật sớm", không có bản đồ.
5. **Album** (không có nhân vật): chỉ hiện khi `photos.gallery` có ảnh. Lưới 2 cột khung viền mảnh, bấm xem lớn, logic như thiệp Thắm.
6. **04 · Xác nhận tham dự (Sasuke · サスケ · Chidori):**
   - "Bạn sẽ đến chứ?" + nút đỏ "Mình sẽ đến" và nút viền "Tiếc quá, mình bận".
   - Gửi "sẽ đến" thành công thì tia Chidori nháy 2 lần quanh nút (0,55 giây mỗi lần).
   - Dòng mono xác nhận "✓ ĐÃ GHI NHẬN · HẸN GẶP [TÊN] NHÉ" (không đến: "✓ ĐÃ GHI NHẬN · CẢM ƠN [TÊN] ĐÃ BÁO").
   - Link chung hỏi thêm tên. Nhớ câu trả lời, đổi ý được, lưu như thiệp Thắm.
7. **05 · Sổ lời chúc (Madara · マダラ · Nguyệt Độc):**
   - Trăng Nguyệt Độc mờ ở góc trên phải, tiêu đề "Mỗi lời chúc là một giấc mơ".
   - Form: tên (điền sẵn tên khách), lời chúc 1–500 ký tự có bộ đếm, nút "Gợi ý" chèn lời chúc mẫu, nút gửi. Không có ô chọn emoji (máy chủ tự gán emoji mặc định).
   - Thanh 5 nút cảm xúc icon nét đơn kèm số đếm. Bấm/giữ thì icon SVG (đỏ hoặc ngà) bay lên thay cho emoji.
   - Danh sách lời chúc: thẻ nền mực 2, viền trái đỏ, tên đậm, giờ mono, nội dung. Không hiện emoji của lời chúc.
   - Cập nhật như live mỗi 15 giây như thiệp Thắm.
8. **Liên hệ** (không có nhân vật): nút viền Gọi / Zalo / Facebook. Nút nào trống thì ẩn, trống hết thì ẩn cả phần.
9. **Lời kết:** gia huy lớn ở giữa, `texts.closing`, chữ ký `graduate.shortName` (nghiêng, chữ có chân), dòng mono `git commit -m "đã tốt nghiệp" ✓`.

**Nút nhạc:**
- Nút tròn 44px cố định góc dưới trái, nền mực, viền ngà mờ. Bên trong là Sharingan nhỏ: xoay khi đang phát, đứng yên và mờ khi tắt.
- Không có nguồn nhạc nào (mp3/YouTube/Spotify trống) thì không hiện nút.
- Logic phát (mp3 → YouTube → Spotify, dừng khi rời tab, iPhone) giữ nguyên từ thiệp Thắm, chỉ đổi phần hình của nút.

**Trứng phục sinh cho dân IT:** khi trang tải, `console.log` in gia huy vẽ bằng ký tự (khoảng 12 dòng) và lời nhắn, dạng:

```
Ồ, bạn mở F12 à? Đúng là dân code.
Quốc tốt nghiệp ngày 26.11.2026, nhớ ghé nhé.
```

Ngày trong lời nhắn lấy theo cài đặt.

### 4.4 Thẻ meta
- Tiêu đề tab: "Thư mời tốt nghiệp · Nguyễn Tiến Quốc", theo `graduate.fullName`.
- `theme-color #0c0a0a`, `noindex`.
- Open Graph: tiêu đề như trên. Mô tả "Trân trọng mời bạn đến dự lễ tốt nghiệp của Nguyễn Tiến Quốc. Mở thiệp để xem chi tiết và gửi lời chúc 🎓".
- `og.png` 1200×630: nền mực, con mắt Sharingan bên trái, gia huy, chữ "Thư mời tốt nghiệp" + "Nguyễn Tiến Quốc". Không ghi ngày giờ, để ảnh không bao giờ hiện giờ cũ.
- Favicon: gia huy SVG.

## 5. Trang quản lí

- Giữ nguyên toàn bộ chức năng, bố cục và API của thiệp Thắm.
- Đổi bảng màu sang tông mực–đỏ ở mục 3.1 (nền mực, thẻ mực 2, chữ ngà, nút chính đỏ) và đổi font sang Be Vietnam Pro / JetBrains Mono.
- Phải giữ tương phản chữ ≥ 4.5:1 cho chữ thường.

**Ảnh QR có tên** (1080×1350, vẽ trên canvas, chỉ tải khi bấm nút như cũ):
- Nền mực + nhiễu hạt.
- Gia huy ở giữa phía trên, dòng mono "THƯ MỜI TỐT NGHIỆP · 2026".
- Con mắt Sharingan mở (rộng ~520px).
- "Thân gửi" (nghiêng) + tên khách (chữ có chân, tự thu nhỏ cho vừa, dùng lại `fitFontSize`).
- Ô ngà bo góc nhẹ chứa mã QR đen, có vùng trắng quanh mã ≥ 4 ô.
- Dưới cùng: "Lễ tốt nghiệp · Nguyễn Tiến Quốc", ngày giờ theo cài đặt, và tên miền của link.
- QR chung (không tên) ghi "Thân gửi bạn".
- Mã QR phải quét được: test giải mã bằng `jsqr` như hiện có.

## 6. Kiến trúc

### 6.1 Công nghệ
Giống thiệp Thắm: Vite 8 (2 trang), JavaScript thuần, GSAP 3 (dùng cho chuỗi mở bìa), CSS thuần với biến, Netlify Functions v2 + `@netlify/blobs`, Vitest, `qrcode-generator`.

Thay font: bỏ Great Vibes / Playfair Display / Quicksand, thêm `@fontsource/noto-serif-display`, `@fontsource/be-vietnam-pro`, `@fontsource/jetbrains-mono`, `@fontsource/noto-serif-jp`.

### 6.2 Lấy gì từ thiệp Thắm
| Loại | File |
|---|---|
| Chép nguyên | `server/**`, `netlify/**`, `shared/slug.js`, `shared/settings.js`, `shared/facebook.js`, `vite-plugin-api.js`, `vite.config.js`, `vitest.config.js`, `netlify.toml`, `.gitignore`, `.gitattributes`, `.env.example`, `quan-li/index.html`, `src/lib/**` (trừ `icons.js`), `src/admin/**` (trừ `qr-card.js`), `src/fx/reveal.js`, `tests/**` |
| Chép rồi sửa | `shared/constants.js` (cảm xúc mới), `package.json` (tên, font), `src/lib/icons.js` (bỏ mũ/máy bay trời xanh, thêm icon mới), `src/sections/music.js` (hình nút), `src/sections/{schedule,venue,rsvp,wishes,gallery,contact}.js` (giữ logic, dựng lại giao diện), `src/admin/qr-card.js` (vẽ lại), `src/styles/admin.css` + biến màu, `README.md` (viết lại cho Quốc), `index.html` (meta) |
| Viết mới | `content.js`, `src/main.js`, `src/sections/{cover,hero,invite,closing}.js`, `src/art/*` (gia huy, con mắt, Mangekyō, quạ, Kamui, trăng, Chidori, icon cảm xúc), `src/fx/{ink,float-icons,easter-egg}.js`, toàn bộ `src/styles/*` của thiệp, `public/favicon.svg`, `public/og.png`, `scripts/og.svg` |
| Không lấy | `public/anh/tham-chibi.svg`, `public/nhac/syn-ke.mp3`, `src/fx/{sky,confetti,floaters}.js`, `docs/**` cũ, `.data/`, `dist/`, `node_modules/` |

### 6.3 Thư mục `src/art/`
Mỗi file xuất hàm trả về chuỗi SVG hoặc dựng phần tử SVG, không phụ thuộc DOM bên ngoài, để dùng chung cho thiệp, trang quản lí (QR) và ảnh xem trước:
- `crest.js`: `crestSvg({ size })`.
- `eye.js`: `createEye()` trả về `{ el, set({ open, iris, ring, tomoe, spin, mangekyo }) }` (chỉ ghi phần được truyền), dùng cho bìa.
- `mangekyo.js`: `MANGEKYO = { itachi, obito, shisui, sasuke, madara }` (chuỗi phần tử SVG trong hệ −40…40) và `eyeBadgeSvg(name, size)` (đĩa đỏ + mẫu).
- `motifs.js`: quạ, xoáy Kamui, trăng Nguyệt Độc, tia Chidori.
- `reaction-icons.js`: 5 icon cảm xúc.

### 6.4 Dữ liệu và API
Giống thiệp Thắm (kho Blobs `thiep`, các khoá `guests`, `rsvps`, `wishes`, `reactions`, cùng API công khai và quản lí). Chỉ đổi danh sách cảm xúc trong `shared/constants.js`:

```js
export const REACTIONS = [
  { key: 'tim', label: 'Thương' },
  { key: 'katon', label: 'Katon' },
  { key: 'sharingan', label: 'Sharingan' },
  { key: 'votay', label: 'Vỗ tay' },
  { key: 'mu', label: 'Tốt nghiệp' },
]
```

`WISH_EMOJIS` giữ nguyên để máy chủ vẫn nhận emoji mặc định `🎓`. Thiệp không gửi trường `emoji`.

Ô cài đặt (`shared/settings.js`) giữ nguyên. `graduate.katakana`, `graduate.degree/major/school`, `venue.coords`, `photos`, `music.src` chỉ sửa trong `content.js`.

## 7. Hiệu năng
- Chỉ animate `transform`, `opacity` và thuộc tính SVG của con mắt (bằng `requestAnimationFrame` chỉ trong lúc diễn hoạt).
- Xoáy Kamui và quạ chỉ chạy khi phần đó trên màn hình (`IntersectionObserver`) và tab đang mở. Tomoe ở bìa ngừng khi bìa đã mở.
- Lớp mực loang: một SVG phủ màn hình, bộ lọc chỉ gắn trong lúc loang rồi gỡ đi.
- Icon cảm xúc bay: tối đa 40 cùng lúc, xoá khi hết animation.
- Bản đồ, ảnh: tải lười.
- Mục tiêu: JS thiệp (gzip) ≤ 90 KB không tính font.

## 8. Xử lý lỗi
Giống thiệp Thắm:
- API khách lỗi → thiệp chung "Thân gửi bạn".
- Gửi lời chúc / xác nhận / cảm xúc lỗi → thông báo tiếng Việt, giữ dữ liệu đã nhập; cảm xúc gửi lỗi thì cộng dồn gửi lại.
- Một phần lỗi khi dựng → chỉ ẩn phần đó.
- Thiếu nhạc → ẩn nút nhạc. Thiếu ảnh → khung chờ có gia huy.

## 9. Nội dung mặc định (`content.js`)
```js
graduate: {
  fullName: 'Nguyễn Tiến Quốc',
  shortName: 'Quốc',
  katakana: 'グエン・ティエン・クオック',
  degree: 'Cử nhân',
  major: 'Công nghệ Thông tin',
  school: 'Trường ĐH Khoa học Tự nhiên – ĐHQG TP.HCM',
},
event: { date: '2026-11-26', start: '10:00', end: '12:00', note: '' },
venue: {
  name: 'Trường Đại học Khoa học Tự nhiên – ĐHQG TP.HCM',
  address: '227 Nguyễn Văn Cừ, Chợ Quán, TP. Hồ Chí Minh',
  mapQuery: 'Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM, 227 Nguyễn Văn Cừ, Chợ Quán, Hồ Chí Minh',
  directionsUrl: 'https://maps.app.goo.gl/XM9tDsqNQs2nFzrj6',
  coords: '10.7627° N · 106.6822° E',
},
music: { src: '', youtube: '', spotify: '', title: '' },
photos: { hero: '/anh/chan-dung.jpg', gallery: [] },
contact: { phone: '', zalo: '', messenger: '' },
texts: {
  heroQuote: 'Bốn năm biên dịch, hôm nay chạy thành công.',
  inviteLead: 'Thân mời',
  inviteBody: 'đến chung vui cùng Quốc trong ngày lễ tốt nghiệp. Khép lại bốn năm với những dòng code, những deadline và những đêm trắng, mở ra một chặng đường mới. Có mặt của bạn là món quà ý nghĩa nhất với Quốc.',
  closing: 'Một hành trình khép lại, một chặng đường mới mở ra.\nCảm ơn gia đình, thầy cô và bạn bè đã đồng hành cùng Quốc suốt những năm đại học. Rất mong được gặp mọi người trong ngày đặc biệt này.',
  shareTemplate: 'Quốc trân trọng mời {ten} đến dự lễ tốt nghiệp của Quốc lúc {gio} {ngay} 🎓\nThiệp mời: {link}',
},
```

**Lời chúc gợi ý** (11 câu):
1. Chúc mừng tân cử nhân CNTT! Ra trường code ít bug, lương nhiều số 0 nha 🎓
2. Bốn năm compile cuối cùng cũng build thành công. Chúc mừng Quốc!
3. Chúc Quốc deploy sự nghiệp lên production suôn sẻ, không phải rollback lần nào.
4. Chúc mừng tốt nghiệp! Mong Quốc luôn giữ được lửa đam mê như ngày đầu viết "Hello World".
5. Chúc tân cử nhân mạnh khoẻ, hạnh phúc, công danh thăng tiến và gặp thật nhiều may mắn 🍀
6. Tự hào về Quốc quá! Chúc bạn sớm tìm được công việc như ý, sếp hiền đồng nghiệp tốt.
7. Chúc Quốc mở mắt Sharingan nhìn thấu mọi cơ hội phía trước 👁
8. Một chương mới bắt đầu rồi! Chúc Quốc tự tin, dũng cảm theo đuổi ước mơ của mình.
9. Chúc mừng ngày tốt nghiệp! Mong mọi điều tốt đẹp nhất luôn đến với Quốc.
10. Cảm ơn Quốc vì những năm tháng cùng nhau chạy deadline. Chúc bạn thành công rực rỡ 🎉
11. Hành trình đại học khép lại thật đẹp. Chúc Quốc vững bước, luôn bình an và hạnh phúc.

**Ảnh chân dung** đã có: `C:\Users\quocn\Downloads\22120300_Nguyen Tien Quoc.JPG` (1086×1448, đúng tỉ lệ 3:4, không có dữ liệu vị trí GPS), chép thành `public/anh/chan-dung.jpg`. Ảnh tải lỗi thì khung chuyển về dạng chờ (gia huy mờ), không hiện biểu tượng ảnh vỡ.

Người dùng sẽ gửi sau: file nhạc `.mp3` (chép vào `public/nhac/`, ghi `music.src`).

## 10. Kiểm thử
- **Vitest (tự động):**
  - Toàn bộ test chép từ thiệp Thắm phải chạy qua. Test nào gắn với nội dung riêng của Thắm (tên, danh sách cảm xúc cũ) thì sửa theo nội dung mới.
  - Test mới:
    - danh sách cảm xúc mới được máy chủ chấp nhận, khoá cũ (`phao`, `hoa`) bị từ chối;
    - tách họ/tên cho đầu thiệp (2 chữ, 3 chữ, 1 chữ);
    - năm viết bằng số Hán (2026 → 二〇二六);
    - `eyeBadgeSvg` có đủ 5 nhân vật và trả về SVG hợp lệ;
    - trạng thái bìa (chờ → quét → đã xác thực → đang vào → đã mở; chạm lặp lại không chạy lại chuỗi) viết thành hàm thuần để test;
    - mã QR trên ảnh QR có tên giải mã được đúng link.
- **Trình duyệt (preview):**
  - Thử ở khổ 375×812 và máy tính.
  - Thiệp: bìa chạy đủ 4 bước; vào thiệp; cuộn hết; đếm ngược chạy; bản đồ tông tối; gửi xác nhận (thấy Chidori), gửi lời chúc, thả cảm xúc; không lỗi console (ngoài lời nhắn trứng phục sinh); thử chế độ giảm chuyển động.
  - Trang quản lí: đăng nhập, thêm khách, mở link khách thấy đúng tên trên bìa, ảnh QR tải về quét được.
- **Build:** `npm run build` thành công, kiểm tra kích thước JS.
