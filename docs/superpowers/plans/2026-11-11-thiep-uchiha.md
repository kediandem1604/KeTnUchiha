# Thiệp Uchiha của Nguyễn Tiến Quốc: Kế hoạch làm

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dựng thiệp mời tốt nghiệp phong cách Uchiha cho Nguyễn Tiến Quốc trong thư mục mới `ThiepTotNghiep-Quoc`. Phần máy chủ và trang quản lí lấy từ thiệp Thắm, giao diện thiệp làm mới hoàn toàn.

**Architecture:** Chép nguyên dự án Thắm (Vite + JS thuần + Netlify Functions/Blobs) làm nền rồi thay từng phần:
- bộ hình vẽ SVG dùng chung `src/art/`;
- bộ khung giao diện mới (màu, chữ, đầu mục nhân vật);
- bìa quét mống mắt;
- dựng lại các phần thiệp;
- đổi tông trang quản lí và ảnh QR.

Logic thuần (trạng thái bìa, tách tên, số Hán, định dạng T−, chữ QR, chữ console) viết thành hàm có test Vitest. Phần hình kiểm tra trong trình duyệt.

**Tech Stack:** Node 24, Vite 8, JavaScript ES modules, GSAP 3, Vitest 5 (môi trường `node`, không có DOM), `@netlify/blobs`, `qrcode-generator`, `jsqr` (test), `@fontsource/{noto-serif-display,be-vietnam-pro,jetbrains-mono,noto-serif-jp}` 5.3.x.

**Spec:** [`docs/superpowers/specs/2026-11-11-thiep-uchiha-design.md`](../specs/2026-11-11-thiep-uchiha-design.md). Bản phác: `docs/superpowers/specs/mockups/bia-quet-mong-mat.html`, `docs/superpowers/specs/mockups/ben-trong-nhan-vat.html`.

## Global Constraints

- **Đường dẫn:**
  - Đầu mỗi phiên shell (Git Bash) chạy: `SRC="/c/Users/quocn/OneDrive/Máy tính/ThiepTotNghiep"; DST="/c/Users/quocn/OneDrive/Máy tính/ThiepTotNghiep-Quoc"; cd "$DST"`.
  - Không sửa, không commit gì trong `SRC`.
  - Mọi lệnh dưới đây chạy trong `DST`, trừ khi ghi khác.
- **Màu (chỉ dùng các giá trị này):** mực `#0c0a0a`, mực 2 `#151111`, ngà `#ebe3d5`, ngà dịu `#d7cfc1`, tro `#857a71`, đỏ Uchiha `#a3141a`, đỏ sáng `#c21d24`, đường kẻ `rgba(235,227,213,.1)`.
  - Trong hình vẽ còn dùng thêm: nét Mangekyō `#0a0505`, viền mống mắt `#120708`, tròng `#d9d0c1`, mống mắt tối `#2a2321`, Chidori `#e6eef8`, trăng `#9b161c → #5c0b0f`.
- **Font:** Noto Serif Display 500/700 + nghiêng 400 (tiêu đề, tên); Be Vietnam Pro 400/500/600 (nội dung); JetBrains Mono 400/600 (chú thích kiểu code, in hoa, giãn chữ); Noto Serif JP 500/700 (chữ Nhật).
- **Kích thước:** trên điện thoại, đoạn văn ≥ 15px, chữ mono ≥ 10px, vùng bấm ≥ 44×44px. Bố cục chạy tốt từ 320px.
- **Không "nhựa":**
  - Không chuyển màu bóng, không đổ bóng phát sáng.
  - Không emoji màu trong giao diện thiệp. Được dùng emoji ở: chữ người dùng nhập, mẫu tin nhắn mời, mô tả Open Graph, lời chúc gợi ý.
- **Hình vẽ:** tự vẽ SVG, không lấy ảnh anime.
- **Chuyển động:**
  - Chỉ animate `transform`, `opacity` và thuộc tính SVG.
  - `prefers-reduced-motion: reduce` → bỏ xoay, quét, loang mực.
  - Hiệu ứng lặp (Kamui, quạ, tomoe) chỉ chạy khi phần tử trên màn hình và tab đang mở.
- **Tiếng Việt:** mọi chữ hiện ra đều là tiếng Việt, theo đúng chữ trong spec.
- **Commit:** mỗi task một commit, tiêu đề tiếng Việt kiểu `feat: …` / `chore: …`, cuối thông điệp có dòng `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- **Lệnh kiểm tra:** `npx vitest run` (toàn bộ test), `npm run build`, xem thử bằng preview `quoc` (Task 1 tạo) ở khổ 375×812.

## Review Focus

1. **Tên khách rất dài** (vd. "Nguyễn Thị Thanh Hương Trần Ngọc Bảo Anh") trên bìa, lời mời và ảnh QR: chữ phải thu nhỏ hoặc xuống dòng, không tràn khung 320px. Test: `nameSizeClass` (Task 4); QR dùng `fitFontSize` (đã có test).
2. **Chạm dồn dập** vào mắt/nút "Mở thư mời" trong lúc đang quét hoặc đang chuyển cảnh: chuỗi chỉ chạy một lần, không nhảy cóc. Test: bảng chuyển trạng thái `coverNext` có các lượt chạm lặp (Task 4).
3. **Lễ đang diễn ra hoặc đã qua:** không hiện số âm, dòng T− không chạy lùi. Test: `formatTMinus` với 0 và với số âm (Task 6).
4. **Ảnh chân dung tải lỗi** (sai đường dẫn): khung chuyển về dạng chờ có gia huy, không hiện biểu tượng ảnh vỡ. Kiểm tra trình duyệt có bước riêng (Task 5).
5. **Màn hình hẹp 320px:** đầu thiệp (tên, katakana, chữ dọc, trăng) và đếm ngược không tràn ngang. Kiểm tra trình duyệt ở 320×568 (Task 5, Task 6).

---

### Task 1: Dự án nền chép từ thiệp Thắm

**Files:**
- Create (chép): mọi file git đang theo dõi trong `SRC`, trừ `docs/`, `public/anh/`, `public/nhac/`, `public/og.png`, `README.md`.
- Create: `public/anh/chan-dung.jpg` (chép từ `C:\Users\quocn\Downloads\22120300_Nguyen Tien Quoc.JPG`).
- Modify: `package.json` (`"name": "thiep-tot-nghiep-quoc"`), `content.js`, `.claude/launch.json`, `index.html`.
- Test: toàn bộ `tests/**` chép sang.

**Interfaces:**
- Produces: dự án chạy được (giao diện cũ của Thắm, nội dung của Quốc). `content.js` mặc định như mục 9 của spec, thêm `graduate.katakana` và `venue.coords`.

- [ ] **Step 1: Chép file và khởi tạo git**

```bash
cd "$SRC" && git ls-files | grep -vE '^(docs/|public/anh/|public/nhac/|public/og\.png|README\.md)' | tar -cf - -T - | (cd "$DST" && tar -xf -)
cd "$DST" && mkdir -p public/anh && cp "/c/Users/quocn/Downloads/22120300_Nguyen Tien Quoc.JPG" public/anh/chan-dung.jpg && git init -b main
```
Kết quả: `ls "$DST"` có `server/ src/ tests/ content.js netlify.toml package.json`.

- [ ] **Step 2: Viết `content.js` theo mục 9 của spec**

Giữ nguyên chú thích hướng dẫn của file cũ, thay giá trị. Sửa thêm:
- Thêm `katakana` vào `graduate` và `coords` vào `venue`.
- `photos.hero: '/anh/chan-dung.jpg'`.
- Nhạc để trống cả 3 ô.
- `wishSuggestions` là 11 câu trong spec.

Đổi trong `.claude/launch.json` để chạy song song với thiệp Thắm không đụng cổng:
- `{ "name": "quoc", "runtimeExecutable": "npm", "runtimeArgs": ["run", "dev", "--", "--port", "5174", "--strictPort"], "port": 5174 }`
- `{ "name": "quoc-build", "runtimeExecutable": "npm", "runtimeArgs": ["run", "preview", "--", "--port", "4174"], "port": 4174 }`

Đổi trong `index.html`:
- `<title>` và `og:title`: "Thư mời tốt nghiệp · Nguyễn Tiến Quốc".
- `description`: "Trân trọng mời bạn đến dự lễ tốt nghiệp của Nguyễn Tiến Quốc."
- `og:description`: như spec mục 4.4.
- `theme-color`: `#0c0a0a`.

- [ ] **Step 3: Cài thư viện và chạy test**

Run: `npm install && npx vitest run`
Expected: mọi test PASS (test cấu hình đọc `content.js` mới vẫn hợp lệ).

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: xong không lỗi, có `dist/index.html` và `dist/quan-li/index.html`.

- [ ] **Step 5: Commit (kèm spec, plan, bản phác)**

```bash
git add -A && git commit -m "chore: dự án nền chép từ thiệp Thắm, nội dung của Quốc"
```

---

### Task 2: Bộ hình vẽ `src/art/`

**Files:**
- Create: `src/art/crest.js`, `src/art/mangekyo.js`, `src/art/motifs.js`, `src/art/reaction-icons.js`
- Test: `tests/art.test.js`

**Interfaces:**
- Produces:
  - `crestSvg({ size = 24 } = {}): string`: `<svg viewBox="-12 -14 24 30" width={size} height={size*1.25} aria-hidden="true">`. Ba hình: nửa trên đỏ `M -11 -1 A 11 11 0 1 1 11 -1 Q 0 2.5 -11 -1 Z`, nửa dưới ngà `M 11 -1 A 11 11 0 0 1 -11 -1 Q 0 2.5 11 -1 Z`, cán `rect x=-1.7 y=8 w=3.4 h=7 rx=1`.
  - `TOMOE_PATH: string` = `'M 5.2 0 A 5.2 5.2 0 1 1 -5.2 0 C -5.2 -6 -1.5 -11 6.5 -13 C 2.8 -9.5 5.2 -5 5.2 0 Z'`. Đặt tomoe thứ i bằng `rotate(i*120) translate(0 -22.5) rotate(-75)`.
  - `PATTERNS: { sharingan, itachi, obito, shisui, sasuke, madara }`: chuỗi phần tử SVG trong hệ −40…40, nét `#0a0505`. Hình khởi điểm lấy từ đối tượng `PAT` trong `mockups/ben-trong-nhan-vat.html`, `sharingan` = `PAT.tomoe`. Riêng `itachi` dùng đúng hình đã duyệt (`BLADE` trong `mockups/bia-quet-mong-mat.html`).
  - `CHARACTERS`:
    ```
    {
      itachi: { name: 'Itachi', katakana: 'イタチ', technique: '' },
      obito:  { name: 'Obito',  katakana: 'オビト', technique: 'Kamui' },
      shisui: { name: 'Shisui', katakana: 'シスイ', technique: 'Thuấn Thân' },
      sasuke: { name: 'Sasuke', katakana: 'サスケ', technique: 'Chidori' },
      madara: { name: 'Madara', katakana: 'マダラ', technique: 'Nguyệt Độc' },
    }
    ```
  - `eyeBadgeSvg(pattern, size = 40): string`: `<svg viewBox="-40 -40 80 80" width height aria-hidden="true">`, gồm `<circle r="38" fill="#a3141a"/>`, viền `<circle r="38" fill="none" stroke="#120708" stroke-width="2.4"/>`, rồi `PATTERNS[pattern]`. Mẫu không có trong `PATTERNS` → `throw new Error('Không có mẫu mắt: ' + pattern)`.
  - `crowsSvg(): string`: `viewBox="0 0 150 120"`, 6 con quạ (toạ độ/tỉ lệ/góc như bản phác). Mỗi con là `<g class="crow" style="--i:{0..5}">` bọc một `path` dáng quạ bay (thân thon, đuôi xoè, hai cánh nhọn), tô `#ebe3d5`.
  - `kamuiSvg(): string`: `viewBox="-170 -170 340 340"`, 3 nhánh xoắn Archimedes. Bán kính `8 + t*158`, góc `t*4π + arm*2π/3`, `t` bước 0.01. Nét `#857a71`, độ rộng `1.2 − arm*0.25`, độ mờ `0.55 − arm*0.12`.
  - `tsukuyomiMoonSvg(): string`: `viewBox="-150 -150 300 300"`. Đĩa `r=148 #7e1015`, 4 vòng `r=28,62,96,130` nét `#2a0507` rộng 2.4, tâm `r=12`, 9 tomoe (3 trên mỗi vòng 28/62/96, lệch 40° giữa các vòng, phóng ×1.6).
  - `chidoriSvg(): string`: `viewBox="0 0 140 56" preserveAspectRatio="none"`, 2 polyline `#e6eef8` như bản phác.
  - `REACTION_ICONS: { tim, katon, sharingan, votay, mu }` (phần tử bên trong `viewBox 0 0 24 24`, như `ic` trong bản phác).
  - `reactionIconSvg(key, size = 18): string`: `fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"`. Key lạ → `throw`.

- [ ] **Step 1: Viết test hỏng `tests/art.test.js`**

```js
import { test, expect } from 'vitest'
import { crestSvg } from '../src/art/crest.js'
import { PATTERNS, CHARACTERS, eyeBadgeSvg, TOMOE_PATH } from '../src/art/mangekyo.js'
import { crowsSvg, kamuiSvg, tsukuyomiMoonSvg, chidoriSvg } from '../src/art/motifs.js'
import { REACTION_ICONS, reactionIconSvg } from '../src/art/reaction-icons.js'

test('đủ mẫu mắt và nhân vật', () => {
  expect(Object.keys(PATTERNS).sort()).toEqual(['itachi', 'madara', 'obito', 'sasuke', 'sharingan', 'shisui'])
  expect(Object.keys(CHARACTERS)).toEqual(['itachi', 'obito', 'shisui', 'sasuke', 'madara'])
  expect(CHARACTERS.obito).toEqual({ name: 'Obito', katakana: 'オビト', technique: 'Kamui' })
})

test.each(['sharingan', 'itachi', 'obito', 'shisui', 'sasuke', 'madara'])('eyeBadgeSvg(%s) là SVG đĩa đỏ', (p) => {
  const s = eyeBadgeSvg(p, 34)
  expect(s.startsWith('<svg')).toBe(true)
  expect(s).toContain('viewBox="-40 -40 80 80"')
  expect(s).toContain('width="34"')
  expect(s).toContain('fill="#a3141a"')
  expect(s).toContain(PATTERNS[p])
  expect(s.trim().endsWith('</svg>')).toBe(true)
})

test('mẫu mắt lạ thì báo lỗi', () => {
  expect(() => eyeBadgeSvg('kakashi')).toThrow('Không có mẫu mắt: kakashi')
})

test('gia huy và họa tiết là SVG đúng khung', () => {
  expect(crestSvg({ size: 40 })).toContain('width="40" height="50"')
  expect(crowsSvg().match(/class="crow"/g)).toHaveLength(6)
  expect(kamuiSvg().match(/<path/g)).toHaveLength(3)
  expect(tsukuyomiMoonSvg()).toContain('viewBox="-150 -150 300 300"')
  expect(tsukuyomiMoonSvg().split(TOMOE_PATH).length - 1).toBe(9)
  expect(chidoriSvg().match(/<polyline/g)).toHaveLength(2)
})

test('icon cảm xúc', () => {
  expect(Object.keys(REACTION_ICONS)).toEqual(['tim', 'katon', 'sharingan', 'votay', 'mu'])
  expect(reactionIconSvg('katon', 20)).toContain('width="20"')
  expect(() => reactionIconSvg('phao')).toThrow()
})
```

- [ ] **Step 2: Chạy test**

Run: `npx vitest run tests/art.test.js`
Expected: FAIL (không tìm thấy module `src/art/...`).

- [ ] **Step 3: Viết 4 file `src/art/*` theo Interfaces**

- [ ] **Step 4: Chạy test**

Run: `npx vitest run tests/art.test.js`
Expected: PASS.

- [ ] **Step 5: Xem hình bằng mắt**

Tạo tạm `public/_art.html`, nạp các hàm qua `<script type="module">` từ `/src/art/*.js` và in mọi hình cỡ lớn trên nền `#0c0a0a`. Mở preview `quoc` tại `/_art.html` để xem.

Cần thấy:
- 5 Mangekyō khác nhau, nhận ra được.
- Quạ ra dáng quạ (không phải chữ "M").
- Không có hình nào bị lệch khỏi đĩa.

Xem xong thì xoá `public/_art.html`.

- [ ] **Step 6: Commit**

```bash
git add src/art tests/art.test.js && git commit -m "feat: bộ hình vẽ gia huy, Mangekyō, quạ, Kamui, trăng, Chidori"
```

---

### Task 3: Khung giao diện mới (màu, chữ, đầu mục nhân vật)

**Files:**
- Move: `src/styles/{tokens,base,sections,rsvp,admin,fonts}.css` → `src/styles/admin/` (trang quản lí dùng tạm bộ cũ cho tới Task 9).
- Modify: `src/admin/main.js` (đường dẫn import CSS sang `../styles/admin/…`).
- Create: `src/styles/fonts.css`, `src/styles/tokens.css`, `src/styles/base.css`, `src/sections/section-head.js`, `public/favicon.svg`.
- Modify: `src/main.js` (import CSS mới; bỏ `initSky`).
- Delete: `src/styles/sky.css`, `src/fx/sky.js`.

**Interfaces:**
- Consumes: `eyeBadgeSvg`, `CHARACTERS`, `crestSvg` (Task 2).
- Produces:
  - `characterHead({ n, label, character }): HTMLElement`, trong đó `n: number`, `label: string`, `character: keyof CHARACTERS`. Trả về `<header class="char-head" data-reveal>` gồm:
    - `<span class="char-head__eye">` chứa `eyeBadgeSvg(character, 40)`. Bấm vào thì thêm class `is-spin` (CSS xoay 360° trong 0,8 giây, gỡ class khi `animationend`).
    - Dòng mono `.char-head__index` = `` `0${n} · ${label}` ``.
    - Dòng `.char-head__who` = `name · katakana` (katakana trong `<span class="jp">`), thêm `` ` · ${technique}` `` nếu có.
  - Lớp CSS dùng chung:
    - Section và chữ: `.section` (padding 44px 22px 40px, viền trên `--line`), `.section-title` (serif 500, 25–30px), `.prose` (15px, line-height 1.7, ngà dịu).
    - Kiểu chữ: `.mono`, `.serif`, `.jp`.
    - Nút: `.btn`, `.btn--red`, `.btn--ghost`, cao tối thiểu 44px.
    - Ô nhập: `.field` (nền mực 2, viền `--line`, chữ ngà).
    - Hiệu ứng hiện dần: `[data-reveal]` / `.is-in` (trượt 16px + hiện rõ).
    - Nền: lớp nhiễu hạt `body::after` (cố định, `pointer-events:none`, độ mờ .07, SVG `feTurbulence` như bản phác).
  - Biến CSS: `--ink --ink-2 --bone --bone-soft --ash --red --red-bright --line --font-display --font-body --font-mono --font-jp --gutter: 22px --content-w: 520px`.
  - `watchVisible(el): void` (thêm vào `src/lib/dom.js`): gắn class `is-visible` khi `el` đang giao màn hình **và** `document.hidden === false`, gỡ class khi ngược lại (`IntersectionObserver` + `visibilitychange`). Không có `IntersectionObserver` thì gắn luôn. Mọi hiệu ứng lặp (Kamui, quạ) dùng `.is-visible` để bật `animation-play-state: running`, mặc định `paused`.

- [ ] **Step 1: Chuyển CSS cũ cho trang quản lí**

```bash
mkdir -p src/styles/admin && git mv src/styles/tokens.css src/styles/base.css src/styles/sections.css src/styles/rsvp.css src/styles/admin.css src/styles/fonts.css src/styles/admin/
```
Sửa 6 dòng import đầu `src/admin/main.js` thành `../styles/admin/<tên>.css`.

- [ ] **Step 2: Kiểm tra trang quản lí còn nguyên**

Run: `npm run build`
Expected: build xong. Mở preview `quoc` tại `/quan-li/`, giao diện trời xanh như cũ, đăng nhập được bằng `thiep-dev`.

- [ ] **Step 3: Cài font mới, viết `src/styles/fonts.css`**

Run: `npm install @fontsource/noto-serif-display @fontsource/be-vietnam-pro @fontsource/jetbrains-mono @fontsource/noto-serif-jp`

Rồi `ls node_modules/@fontsource/{noto-serif-display,be-vietnam-pro,jetbrains-mono,noto-serif-jp}/*.css` để lấy đúng tên file. Import:
- Latin + tiếng Việt cho 3 font đầu, đúng các độ đậm trong Global Constraints.
- `@fontsource/noto-serif-jp/500.css` và `700.css`. Các file này chia theo dải ký tự, trình duyệt chỉ tải mảnh cần.

- [ ] **Step 4: Viết `tokens.css`, `base.css`, `section-head.js`, `favicon.svg`**

- `favicon.svg` = `crestSvg({ size: 64 })` ghi ra file tĩnh.
- `src/main.js` import `fonts.css`, `tokens.css`, `base.css` thay cho bộ cũ. Bỏ `initSky`, `import './styles/sky.css'`, và import hai file đã chuyển (`sections.css`, `rsvp.css`).
- Xoá `src/fx/sky.js`, `src/styles/sky.css`.
- Các file CSS của từng phần cũ (`cover.css`, `hero.css`, `info.css`, `schedule.css`, `venue.css`, `rsvp.css`(đã chuyển), `wishes.css`, `sections.css`(đã chuyển)): giữ import những file còn lại tới khi task tương ứng thay.

- [ ] **Step 5: Kiểm tra trình duyệt**

Run: preview `quoc` (khổ 375×812).
Expected: nền mực có nhiễu hạt, chữ Be Vietnam Pro, không lỗi console. Các phần cũ có thể lệch màu, sẽ thay ở task sau.

- [ ] **Step 6: Chạy test và commit**

Run: `npx vitest run` → PASS.

```bash
git add -A && git commit -m "feat: khung giao diện Uchiha (màu, chữ, đầu mục nhân vật)"
```

---

### Task 4: Bìa quét mống mắt

**Files:**
- Create: `src/lib/cover-state.js`, `src/art/eye.js`, `src/fx/ink.js`, `src/styles/cover.css` (thay file cũ)
- Modify: `src/sections/cover.js` (viết lại)
- Test: `tests/cover-state.test.js`

**Interfaces:**
- Consumes:
  - `TOMOE_PATH`, `PATTERNS.itachi`, `crestSvg` (Task 2).
  - Từ `ctx` (như `src/main.js` đang dựng): `ctx.content`, `ctx.route`, `ctx.guestReady`, `ctx.reducedMotion`, `ctx.emitTap()`, `ctx.emitOpen()`.
  - `displayName` từ `src/lib/text.js`.
- Produces:
  - `COVER = { IDLE: 'idle', SCANNING: 'scanning', AUTHED: 'authed', ENTERING: 'entering', OPEN: 'open' }`.
  - `coverNext(state, event): string`, với `event ∈ 'tap' | 'scanDone' | 'enterDone'`. Chỉ đổi trạng thái ở 4 chuyển: idle+tap→scanning, scanning+scanDone→authed, authed+tap→entering, entering+enterDone→open. Mọi cặp khác giữ nguyên trạng thái.
  - `nameSizeClass(name): '' | 'is-long' | 'is-very-long'`: độ dài (sau `trim`) ≤ 16 → `''`, 17–28 → `'is-long'`, > 28 → `'is-very-long'`. CSS giảm cỡ tên tương ứng 34px / 26px / 21px và cho xuống dòng (`overflow-wrap:anywhere`).
  - `createEye(): { el: SVGSVGElement, set(state) }`:
    - `state` gồm `open: 0..1`, `iris: string`, `ring: 0..1`, `tomoe: 0..3`, `spin: number(độ)`, `mangekyo: 0..1`.
    - `set` chỉ ghi phần được truyền.
    - Hình mí, đường cắt, sợi mi lấy theo hàm `drawEye` trong `mockups/bia-quet-mong-mat.html` (mí trên `lerp(16,-60,open)`, mí dưới `lerp(16,50,open)`).
  - `createInk(): { spread({ x, y, duration }): Promise<void>, fadeOut(duration): Promise<void> }`:
    - Lớp SVG cố định phủ màn hình (`z-index` trên bìa).
    - Vòng tròn `#a3141a`, bán kính từ 0 đến `Math.hypot(innerWidth, innerHeight)`.
    - Bộ lọc mép (`feTurbulence baseFrequency .022` + `feDisplacementMap scale 46`) gắn lúc bắt đầu, gỡ khi xong.
    - `fadeOut` xong thì tự xoá lớp.
  - `renderCover(host, ctx)`: cùng tên và cách gọi với bản cũ.

- [ ] **Step 1: Viết test hỏng `tests/cover-state.test.js`**

```js
import { test, expect } from 'vitest'
import { COVER, coverNext, nameSizeClass } from '../src/lib/cover-state.js'

const { IDLE, SCANNING, AUTHED, ENTERING, OPEN } = COVER

test.each([
  [IDLE, 'tap', SCANNING],
  [SCANNING, 'scanDone', AUTHED],
  [AUTHED, 'tap', ENTERING],
  [ENTERING, 'enterDone', OPEN],
  [SCANNING, 'tap', SCANNING],
  [ENTERING, 'tap', ENTERING],
  [OPEN, 'tap', OPEN],
  [IDLE, 'scanDone', IDLE],
  [AUTHED, 'enterDone', AUTHED],
])('%s + %s → %s', (s, e, next) => {
  expect(coverNext(s, e)).toBe(next)
})

test('chạm dồn dập chỉ đi đúng một đường', () => {
  let s = IDLE
  for (const e of ['tap', 'tap', 'tap', 'scanDone', 'tap', 'tap', 'enterDone', 'tap']) s = coverNext(s, e)
  expect(s).toBe(OPEN)
})

test('cỡ tên theo độ dài', () => {
  expect(nameSizeClass('Minh Anh')).toBe('')
  expect(nameSizeClass('  bạn  ')).toBe('')
  expect(nameSizeClass('Nguyễn Thị Thanh Hương')).toBe('is-long')
  expect(nameSizeClass('Nguyễn Thị Thanh Hương Trần Ngọc Bảo Anh')).toBe('is-very-long')
})
```

- [ ] **Step 2: Chạy test**

Run: `npx vitest run tests/cover-state.test.js`
Expected: FAIL (thiếu module).

- [ ] **Step 3: Viết `src/lib/cover-state.js`**

- [ ] **Step 4: Chạy test**

Run: `npx vitest run tests/cover-state.test.js`
Expected: PASS.

- [ ] **Step 5: Viết `src/art/eye.js`, `src/fx/ink.js`, `src/sections/cover.js`, `src/styles/cover.css`**

Cover dựng theo spec mục 4.2:
- Con mắt là `<button class="cover__eye" aria-label="Chạm để mở thư mời">`. Nút "Mở thư mời" là `<button>`.
- Mỗi chạm gọi `coverNext`. Chuyển `idle→scanning` chạy chuỗi quét. Chuyển `authed→entering` gọi `ctx.emitTap()` ngay trong handler (trước mọi `await`), rồi chạy chuỗi vào thiệp.
- Chuỗi dùng `gsap.timeline` trên một đối tượng `{ open, spin, ... }` với `onUpdate` gọi `eye.set`.
- Thời lượng: mở mắt 0,5s; quét 1,4s (vạch đi xuống rồi lên, % chạy 0→100); đổi màu mống 0,7s; tomoe cách nhau 0,18s; tăng tốc 0,7s; loang 1,1s; mờ lớp mực 0,7s.
- Trước khi hiện lời chào: `await ctx.guestReady`, tên = `displayName(guest)`, gắn `nameSizeClass(tên)`.
- Tomoe xoay 30°/giây khi `authed`; dừng hẳn khi bìa bị gỡ.
- Kết thúc: gỡ class `is-locked` trên `<html>`, `window.scrollTo(0,0)`, `ctx.emitOpen()`, xoá bìa.
- `reducedMotion`: chạm 1 thì `eye.set({ open:1, iris:'#a3141a', ring:1, tomoe:3 })` và hiện lời chào luôn; chạm 2 thì bìa mờ 0,4s, không loang mực.

Trong `src/main.js`:
- bỏ `createConfetti` và xoá `src/fx/confetti.js`;
- đặt `ctx.fx.burst = () => {}` tạm thời (`rsvp.js` cũ còn gọi, Task 7 bỏ);
- giữ `ctx.fx.floatEmoji = floatEmoji` tới Task 7.

- [ ] **Step 6: Kiểm tra trình duyệt**

Run: preview `quoc`. Thêm khách "Nguyễn Thị Thanh Hương Trần Ngọc Bảo Anh" ở `/quan-li/`, rồi mở `/<slug>?xem-thu=1` ở 375×812 và 320×568.

Expected:
- Đủ 4 bước như bản phác, tên dài thu nhỏ và không tràn.
- Bấm nhanh 5 lần vào mắt chỉ chạy một chuỗi.
- `/` ghi "Thân gửi bạn".
- Bật giảm chuyển động (DevTools → Rendering → `prefers-reduced-motion`) thì không quét, không loang.
- Không lỗi console.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: bìa quét mống mắt, Sharingan thức tỉnh, mực đỏ loang"
```

---

### Task 5: Đầu thiệp, lời mời (Itachi), lời kết, trứng phục sinh

**Files:**
- Create: `src/lib/names.js`, `src/fx/easter-egg.js`, `src/styles/hero.css` (thay), `src/styles/invite.css`, `src/styles/closing.css`
- Modify: `src/sections/hero.js`, `src/sections/invite.js`, `src/sections/closing.js` (viết lại), `src/main.js` (gọi `printEasterEgg(content)` sau khi có cài đặt)
- Test: `tests/names.test.js`, `tests/easter-egg.test.js`

**Interfaces:**
- Consumes:
  - `characterHead` (Task 3); `crestSvg`, `crowsSvg` (Task 2).
  - `eventRange`, `formatDateDots` (`src/lib/time.js`).
- Produces:
  - `splitName(fullName): { first: string, rest: string }`:
    - gộp khoảng trắng, `trim`, tách ở khoảng trắng đầu tiên;
    - một chữ → `{ first: '', rest: chữ đó }`; rỗng → `{ first: '', rest: '' }`.
  - `hanYear(year: number): string`: mỗi chữ số → `〇一二三四五六七八九`.
  - `consoleArt({ shortName, dateText }): string`: khoảng 12 dòng gia huy vẽ bằng ký tự, rồi một dòng trống và 2 dòng lời nhắn. Dòng thứ hai là `` `${shortName} tốt nghiệp ngày ${dateText}, nhớ ghé nhé.` ``.
  - `printEasterEgg(content): void`: `console.log('%c' + consoleArt(...), 'color:#c21d24;font-family:monospace')`, với `dateText = formatDateDots(eventRange(content.event).start)`.

- [ ] **Step 1: Viết test hỏng**

```js
// tests/names.test.js
import { test, expect } from 'vitest'
import { splitName, hanYear } from '../src/lib/names.js'

test.each([
  ['Nguyễn Tiến Quốc', { first: 'Nguyễn', rest: 'Tiến Quốc' }],
  ['  Tiến   Quốc ', { first: 'Tiến', rest: 'Quốc' }],
  ['Quốc', { first: '', rest: 'Quốc' }],
  ['', { first: '', rest: '' }],
])('splitName(%j)', (input, out) => expect(splitName(input)).toEqual(out))

test('năm viết bằng số Hán', () => {
  expect(hanYear(2026)).toBe('二〇二六')
  expect(hanYear(2030)).toBe('二〇三〇')
})
```

```js
// tests/easter-egg.test.js
import { test, expect } from 'vitest'
import { consoleArt } from '../src/fx/easter-egg.js'

test('lời nhắn trong console theo tên và ngày', () => {
  const s = consoleArt({ shortName: 'Quốc', dateText: '26.11.2026' })
  expect(s).toContain('Ồ, bạn mở F12 à? Đúng là dân code.')
  expect(s).toContain('Quốc tốt nghiệp ngày 26.11.2026, nhớ ghé nhé.')
  expect(s.split('\n').length).toBeGreaterThanOrEqual(14)
})
```

- [ ] **Step 2: Chạy test**

Run: `npx vitest run tests/names.test.js tests/easter-egg.test.js`
Expected: FAIL (thiếu module).

- [ ] **Step 3: Viết `src/lib/names.js` và `src/fx/easter-egg.js`**

- [ ] **Step 4: Chạy test**

Run: `npx vitest run tests/names.test.js tests/easter-egg.test.js`
Expected: PASS.

- [ ] **Step 5: Viết lại hero, invite, closing và CSS theo spec mục 4.3 (phần 1, 2, 9)**

- **Hero:**
  - Ảnh: `<img>` có `decoding="async" fetchpriority="high"`, `object-fit: cover`, `object-position: 50% 30%`.
  - Ảnh lỗi (`error`) hoặc `photos.hero` rỗng → thay bằng khung chờ: `crestSvg` mờ + chữ mono "ẢNH CHÂN DUNG".
  - Chữ dọc: `` `卒業 ${hanYear(năm lễ)}` ``.
  - Thứ tự hiển thị và hành vi khi trống theo đúng spec.
  - Giữ khối trình phát Spotify của hero cũ: có `ctx.music?.slot` thì đặt `<div class="hero__player">` dưới dòng trường và gọi `ctx.music.attach(player, { height: 80 })`. Chữ dẫn không emoji: "{shortName} gửi bạn bài “{title}”" (không có tên bài thì "{shortName} gửi bạn một bài hát").
- **Invite:**
  - `characterHead({ n: 1, label: 'Lời mời', character: 'itachi' })` + `crowsSvg()`.
  - Quạ dùng CSS keyframes lượn nhẹ. Gọi `watchVisible(section)` để chỉ chạy khi `.is-visible`; tắt hẳn khi reduced motion.
  - "Thân mời" + tên khách (`ctx.displayName`, viết hoa chữ đầu) + `texts.inviteBody`.
  - Có `ctx.guest?.note` thì thêm ô lời nhắn, chân ô "— Lời nhắn riêng cho {tên}".
- **Closing:** gia huy 46px, đoạn kết (giữ xuống dòng), chữ ký `graduate.shortName`, dòng mono `git commit -m "đã tốt nghiệp" ✓`. Bỏ máy bay giấy và footer cũ.

- [ ] **Step 6: Kiểm tra trình duyệt**

Run: preview `quoc` ở 375×812 và 320×568.

Expected:
- Đầu thiệp giống bản phác, có ảnh thật; không tràn ngang ở 320px.
- Mở DevTools thấy gia huy ký tự và lời nhắn.
- Sửa tạm `photos.hero` thành `'/anh/khong-co.jpg'` → thấy khung chờ gia huy, không thấy ảnh vỡ. Đổi lại xong mới commit.
- Khách có lời nhắn riêng thì thấy ô lời nhắn.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: đầu thiệp có ảnh chân dung, lời mời Itachi, lời kết, trứng phục sinh"
```

---

### Task 6: Thời gian (Obito) và địa điểm (Shisui)

**Files:**
- Modify: `src/lib/time.js` (thêm `formatTMinus`), `src/sections/schedule.js`, `src/sections/venue.js`
- Create: `src/styles/schedule.css`, `src/styles/venue.css` (thay file cũ; xoá `info.css` nếu không còn phần nào dùng)
- Test: `tests/time.test.js` (thêm)

**Interfaces:**
- Consumes:
  - `characterHead` (Task 3); `kamuiSvg` (Task 2).
  - Có sẵn: `countdown`, `eventPhase`, `eventRange`, `longDateVi`, `timeOfDay`, `googleCalendarUrl`, `buildIcs`, `mapEmbedUrl`, `whenNear`.
- Produces:
  - `formatTMinus({ days, hours, minutes, seconds }): string` → `` `T−${days}d ${hh}:${mm}:${ss}` `` (dấu trừ U+2212, giờ/phút/giây đủ 2 chữ số). Số âm coi như 0.
  - `longDateWords(date: Date): string` → "Thứ Năm, 26 tháng 11, 2026". Theo giờ Việt Nam, dùng `weekdayVi` và hàm `vn()` nội bộ của `time.js`; ngày không thêm số 0.

- [ ] **Step 1: Thêm test hỏng vào `tests/time.test.js`**

```js
import { formatTMinus, longDateWords, eventRange } from '../src/lib/time.js'

test('dòng T− kiểu code', () => {
  expect(formatTMinus({ days: 15, hours: 4, minutes: 12, seconds: 33 })).toBe('T−15d 04:12:33')
  expect(formatTMinus({ days: 0, hours: 0, minutes: 0, seconds: 0 })).toBe('T−0d 00:00:00')
  expect(formatTMinus({ days: -1, hours: -2, minutes: 0, seconds: -5 })).toBe('T−0d 00:00:00')
})

test('ngày viết bằng chữ theo giờ Việt Nam', () => {
  expect(longDateWords(eventRange({ date: '2026-11-26', start: '10:00', end: '12:00' }).start)).toBe('Thứ Năm, 26 tháng 11, 2026')
  expect(longDateWords(eventRange({ date: '2026-12-01', start: '06:30', end: '08:00' }).start)).toBe('Thứ Ba, 1 tháng 12, 2026')
})
```

- [ ] **Step 2: Chạy test**

Run: `npx vitest run tests/time.test.js`
Expected: FAIL (`formatTMinus`, `longDateWords` không tồn tại).

- [ ] **Step 3: Thêm `formatTMinus` và `longDateWords` vào `src/lib/time.js`**

- [ ] **Step 4: Chạy test**

Run: `npx vitest run tests/time.test.js`
Expected: PASS.

- [ ] **Step 5: Viết lại schedule và venue theo spec mục 4.3 (phần 3, 4)**

- **Schedule:**
  - `characterHead({ n: 2, label: 'Thời gian', character: 'obito' })`.
  - Ngày dài `longDateWords(range.start)`.
  - Giờ lớn `timeOfDay(event.start)`.
  - 4 ô đếm ngược, dòng mono "Kamui đang hút thời gian", dòng `formatTMinus` (không in hoa).
  - Câu thay thế theo pha: "Lễ tốt nghiệp đang diễn ra" / "Cảm ơn mọi người đã đến chung vui".
  - Nút "＋ Thêm vào lịch" mở 2 lựa chọn (Google Calendar, tải .ics) giữ logic cũ.
  - `event.note` nếu có. Bỏ lịch tháng.
  - Xoáy Kamui xoay bằng CSS (`animation: spin 120s linear infinite reverse`). `watchVisible(section)` để chỉ chạy khi `.is-visible`; tắt hẳn khi reduced motion.
  - Đồng hồ chỉ chạy khi phần trên màn hình (giữ `IntersectionObserver` cũ).
- **Venue:**
  - `characterHead({ n: 3, label: 'Địa điểm', character: 'shisui' })`.
  - Tên, địa chỉ.
  - Bản đồ lười như cũ, thêm lớp `.venue__map iframe { filter: invert(.92) hue-rotate(180deg) saturate(.6) contrast(.9) }`.
  - `venue.coords` nếu có.
  - Nút `.btn--red .flicker` "Thuấn Thân tới đây →" có 2 bóng mờ (`::before`/`::after` lệch −7px/−14px).
  - Trường hợp trống giữ chữ "Địa điểm sẽ được cập nhật sớm".

- [ ] **Step 6: Kiểm tra trình duyệt**

Run: preview `quoc` ở 375×812 và 320×568.

Expected:
- Đếm ngược chạy, dòng T− khớp 4 ô, 4 ô không tràn ở 320px.
- Bản đồ tông tối hiện trường KHTN; nút chỉ đường mở link `maps.app.goo.gl`.
- Đổi tạm giờ lễ trong tab Cài đặt sang hôm nay (đang diễn ra) và hôm qua (đã qua) → thấy câu thay thế, không có số âm. Đổi lại sau khi xem.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: thời gian với xoáy Kamui, địa điểm với Thuấn Thân và bản đồ tông tối"
```

---

### Task 7: Xác nhận (Sasuke), sổ lời chúc (Madara), cảm xúc mới

**Files:**
- Modify: `shared/constants.js` (`REACTIONS` theo spec mục 6.4), `src/sections/rsvp.js`, `src/sections/wishes.js`, `src/main.js` (`ctx.fx.floatIcon = floatIcon`), `tests/api-public.test.js`
- Create: `src/fx/float-icons.js`, `src/styles/rsvp.css`, `src/styles/wishes.css` (thay file cũ)
- Delete: `src/fx/floaters.js`
- Test: `tests/api-public.test.js`, `tests/art.test.js` (thêm)

**Interfaces:**
- Consumes: `characterHead` (Task 3); `chidoriSvg`, `tsukuyomiMoonSvg`, `reactionIconSvg`, `REACTION_ICONS` (Task 2).
- Produces: `floatIcon(key, { x, y, size }): void`. `src/main.js` đặt `ctx.fx = { floatIcon }`, bỏ `burst` và `floatEmoji`.
  - Cùng cách bay và giới hạn 40 phần tử với `floatEmoji` cũ (lấy logic từ `src/fx/floaters.js`).
  - Phần tử bay chứa `reactionIconSvg(key, size ?? rand(22, 32))`, màu ngẫu nhiên `#c21d24` hoặc `#ebe3d5`.

- [ ] **Step 1: Sửa và thêm test (hỏng)**

Trong `tests/api-public.test.js`, đổi `toEqual({ tim: 0, phao: 0, votay: 0, xucdong: 0, mu: 0, hoa: 0 })` thành `toEqual({ tim: 0, katon: 0, sharingan: 0, votay: 0, mu: 0 })`. Thêm:

```js
test('cảm xúc mới được nhận, khoá cũ bị từ chối', async () => {
  const ok = await call(r, 'POST', '/api/reactions', { counts: { katon: 3, sharingan: 2 } })
  expect(ok.status).toBe(200)
  expect(ok.body.counts).toMatchObject({ katon: 3, sharingan: 2 })
  expect((await call(r, 'POST', '/api/reactions', { counts: { phao: 1 } })).status).toBe(400)
  expect((await call(r, 'POST', '/api/reactions', { counts: { hoa: 1 } })).status).toBe(400)
})
```

(Dùng router `r` và cách dựng như các test cùng file. Nếu file dựng router trong `beforeEach`, đặt test này cùng chỗ.)

Trong `tests/art.test.js` thêm:

```js
import { REACTION_KEYS } from '../shared/constants.js'
test('mỗi cảm xúc có icon', () => expect(Object.keys(REACTION_ICONS)).toEqual(REACTION_KEYS))
```

- [ ] **Step 2: Chạy test**

Run: `npx vitest run tests/api-public.test.js tests/art.test.js`
Expected: FAIL (danh sách cảm xúc vẫn là bản cũ).

- [ ] **Step 3: Đổi `REACTIONS` trong `shared/constants.js`**

- [ ] **Step 4: Chạy toàn bộ test**

Run: `npx vitest run`
Expected: PASS.

- [ ] **Step 5: Viết `float-icons.js`, sửa rsvp và wishes theo spec mục 4.3 (phần 6, 7)**

- **RSVP:**
  - `characterHead({ n: 4, label: 'Xác nhận tham dự', character: 'sasuke' })`, tiêu đề "Bạn sẽ đến chứ?".
  - Nút `.btn--red` "Mình sẽ đến" chứa `chidoriSvg()` (lớp `.chidori`), nút `.btn--ghost` "Tiếc quá, mình bận".
  - Gửi "sẽ đến" thành công → thêm class `zap` (2 nháy × 0,55s), thay cho `ctx.fx.burst`.
  - Dòng xác nhận mono: "✓ Đã ghi nhận · Hẹn gặp {tên} nhé" / "✓ Đã ghi nhận · Cảm ơn {tên} đã báo".
  - Logic gửi, nhớ câu trả lời, hỏi tên ở link chung: giữ nguyên.
- **Wishes:**
  - `characterHead({ n: 5, label: 'Sổ lời chúc', character: 'madara' })` + `tsukuyomiMoonSvg()` mờ góc phải + tiêu đề "Mỗi lời chúc là một giấc mơ".
  - Bỏ `WISH_EMOJIS`, `chosen`, `emojiBtns`; `api.sendWish` không gửi `emoji`.
  - `wishCard` bỏ ô emoji.
  - Nút gợi ý ghi chữ "Gợi ý" kèm `icons.bulb`.
  - Nút cảm xúc hiện `reactionIconSvg(r.key)` + số + `r.label`.
  - Mọi chỗ gọi `fx.floatEmoji(...)` đổi sang `fx.floatIcon(r.key, ...)`. Gửi lời chúc xong thì bay 10 icon `tim`.
  - Vòng cập nhật 15 giây, gom cảm xúc gửi sau 1,5 giây, giữ để bay liên tục: giữ nguyên.

- [ ] **Step 6: Kiểm tra trình duyệt**

Run: preview `quoc`.

Expected:
- Bấm "Mình sẽ đến" thấy Chidori nháy và dòng xác nhận; đổi ý được.
- Gửi một lời chúc → thẻ mới lên đầu, icon tim bay.
- Giữ nút Katon → icon lửa bay liên tục, số tăng; tải lại trang số vẫn còn.
- Trang quản lí tab Lời chúc thấy lời vừa gửi.
- Không lỗi console.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: xác nhận với Chidori, sổ lời chúc Nguyệt Độc, cảm xúc nét đơn"
```

---

### Task 8: Album, liên hệ, nút nhạc Sharingan, dọn phần cũ

**Files:**
- Modify: `src/sections/gallery.js`, `src/sections/contact.js`, `src/sections/music.js` (chỉ phần hình nút), `src/lib/icons.js` (bỏ `planeSvg`), `src/main.js`
- Create: `src/styles/gallery.css`, `src/styles/contact.css`, `src/styles/music.css`
- Delete: mọi file CSS cũ của thiệp không còn import (`info.css`, `sections.css` cũ nếu còn ở `src/styles/`, …)

**Interfaces:**
- Consumes: `eyeBadgeSvg('sharingan', 26)` (Task 2).
- Produces:
  - Nút nhạc `.music` 44px, cố định góc dưới trái, chứa `eyeBadgeSvg('sharingan', 26)`.
  - Class `is-off`: mờ .55, không xoay. Khi phát: xoay `5s linear infinite`.
  - `aria-label` / `aria-pressed` giữ như cũ. Bỏ `DISC` và `.music__bars`.

- [ ] **Step 1: Sửa gallery và contact**

- **Gallery:** tiêu đề `.section-title` "Khoảnh khắc", lưới 2 cột khung viền mảnh `--line`, không nghiêng, lightbox giữ nguyên.
- **Contact:** tiêu đề "Liên hệ", nút viền Gọi / Zalo / Facebook (icon có sẵn). Trống hết thì ẩn như cũ.
- Cả hai không có nhân vật.

- [ ] **Step 2: Sửa hình nút nhạc**

Thay `DISC` bằng `eyeBadgeSvg('sharingan', 26)`. CSS trong `music.css`.

- [ ] **Step 3: Dọn import và file thừa**

Chạy `grep -rn "sky\|confetti\|floaters\|planeSvg\|capSvg" src --include=*.js`.

Expected: chỉ còn `capSvg` trong `src/admin/login.js` và `src/lib/icons.js` (Task 9 xử lý).

Bỏ `sectionHead` và `DIVIDER` khỏi `src/lib/dom.js` nếu `grep -rn sectionHead src` không còn chỗ nào dùng.

Thứ tự phần trong `src/main.js` khớp spec mục 4.3: hero, invite, schedule, venue, gallery, rsvp, wishes, contact, closing.

- [ ] **Step 4: Kiểm tra**

Tạm điền `photos.gallery` 2 ảnh (dùng lại `chan-dung.jpg`), tạm đặt `music.src: '/nhac/thu.mp3'` với một file mp3 ngắn bất kỳ (nếu có trong máy) hoặc link YouTube tạm. Mở preview, rồi trả lại như cũ.

Expected:
- Album 2 ô, bấm xem lớn được.
- Nút nhạc là Sharingan, xoay khi phát.
- Nhạc trống → không thấy nút.
- Liên hệ trống → ẩn.

Run: `npx vitest run && npm run build`
Expected: PASS. Tổng gzip các file `.js` mà `dist/index.html` nạp (thẻ `script` + `modulepreload`) ≤ 90 KB, đo bằng `gzip -c <file> | wc -c` cho từng file.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: album, liên hệ, nút nhạc Sharingan; bỏ phần trời xanh cũ"
```

---

### Task 9: Trang quản lí tông mực–đỏ và ảnh QR kiểu Uchiha

**Files:**
- Modify: `src/styles/admin/tokens.css`, `src/styles/admin/{base,sections,rsvp,admin}.css` (màu cứng), `src/admin/main.js` (bỏ `../styles/admin/fonts.css`, dùng `../styles/fonts.css` mới), `src/admin/login.js` (`capSvg` → `crestSvg({ size: 44 })`), `src/lib/icons.js` (bỏ `capSvg`), `src/lib/qr.js`, `src/admin/qr-card.js`, `quan-li/index.html` (`theme-color #0c0a0a`), `package.json` (gỡ font cũ)
- Delete: `src/styles/admin/fonts.css`
- Test: `tests/qr.test.js`

**Interfaces:**
- Consumes: `crestSvg`, `eyeBadgeSvg` (Task 2); `qrMatrix`, `fitFontSize` (có sẵn).
- Produces:
  - `qrCardTexts({ name, content, link })`: như cũ, trừ `eyebrow` = `` `THƯ MỜI TỐT NGHIỆP · ${năm lễ}` `` và `lead: 'Thân gửi'`.
  - `drawQrCard(canvas, t, matrix, art)` (`art = { crest: HTMLImageElement, eye: HTMLImageElement }`).
  - `svgImage(svg): Promise<HTMLImageElement>` (Blob URL `image/svg+xml`).

- [ ] **Step 1: Sửa test hỏng `tests/qr.test.js`**

Trong test "chữ trên thiệp QR…", đổi kỳ vọng:
- `eyebrow: 'THƯ MỜI TỐT NGHIỆP · 2026'`
- `lead: 'Thân gửi'`

Đổi `content.graduate.fullName` thành `'Nguyễn Tiến Quốc'`, `title` thành `'Lễ tốt nghiệp · Nguyễn Tiến Quốc'`. Các link mẫu đổi sang `https://tienquoc-totnghiep.netlify.app/…`, kỳ vọng `link` đổi theo.

- [ ] **Step 2: Chạy test**

Run: `npx vitest run tests/qr.test.js`
Expected: FAIL ở `eyebrow`/`lead`.

- [ ] **Step 3: Sửa `qrCardTexts`**

- [ ] **Step 4: Chạy test**

Run: `npx vitest run tests/qr.test.js`
Expected: PASS.

- [ ] **Step 5: Vẽ lại ảnh QR theo spec mục 5**

Canvas 1080×1350, căn giữa ngang. Toạ độ y là đường chân chữ, hoặc mép trên với hình:
- Nền `#0c0a0a` + nhiễu hạt: vẽ 6000 điểm 1px ngẫu nhiên, ngà, alpha .05.
- Gia huy 64×80 ở y=56.
- Eyebrow mono 26px, giãn 8px, tro, y=190.
- Mắt `eyeBadgeSvg('sharingan', 180)` ở y=222.
- "Thân gửi": nghiêng serif 44px tro, y=468.
- Tên: serif 500 ngà, cỡ `fitFontSize(…, 900, 96, 48)`, y=558.
- Ô ngà `#ebe3d5` 560×560 bo 24px ở y=598. QR `#0c0a0a` bên trong, vùng trắng ≥ 4 ô.
- Title serif 36px ngà y=1226; ngày giờ 28px tro y=1272; link mono 22px tro y=1316.

`openQrCard` nạp font mới (`Noto Serif Display`, `Be Vietnam Pro`, `JetBrains Mono`) và tạo `art` bằng `svgImage` trước khi vẽ.

- [ ] **Step 6: Đổi tông trang quản lí**

Gán lại biến trong `src/styles/admin/tokens.css`:

| Biến | Giá trị |
|---|---|
| `--sky-50` | `#151111` |
| `--sky-100` | `#1d1717` |
| `--sky-200` | `#2b2424` |
| `--sky-300` | `#4a3f3a` |
| `--sky-400`, `--sky-500`, `--sky-600` | `#c21d24` |
| `--sky-700` | `#a3141a` |
| `--ink` | `#ebe3d5` |
| `--ink-soft` | `#b9ae9f` |
| `--ink-faint` | `#857a71` |
| `--gold`, `--gold-deep` | `#c21d24` |
| `--blush` | `#2a1416` |
| `--card`, `--card-strong` | `#151111` |
| `--card-border`, `--line` | `rgba(235,227,213,.1)` |
| `--shadow-*` | `none` |
| `--font-display`, `--font-script` | `'Noto Serif Display', Georgia, serif` |
| `--font-body` | `'Be Vietnam Pro', system-ui, sans-serif` |

Sau đó:
- `grep -nE "#[0-9a-fA-F]{3,6}\b|rgba?\(" src/styles/admin/*.css`, thay từng màu cứng sáng (nền trắng, chuyển màu trời) bằng biến phù hợp.
- Riêng nền `body` trong `admin.css` → `#0c0a0a`.
- Nút chính: nền `#a3141a`, chữ ngà.
- Gỡ font cũ: `npm uninstall @fontsource/great-vibes @fontsource/playfair-display @fontsource/quicksand`.

- [ ] **Step 7: Kiểm tra trình duyệt**

Run: preview `quoc` tại `/quan-li/`.

Expected:
- Nền mực, chữ ngà dễ đọc, nút đỏ.
- Đăng nhập, thêm khách, tab Cài đặt, tab Lời chúc đều dùng được.
- Bấm "Ảnh QR" của một khách: ảnh đúng bố cục, chữ không chồng.
- Tải ảnh về rồi mở bằng điện thoại quét (hoặc kiểm bằng `jsqr` trong DevTools) ra đúng link.
- Không lỗi console.

Run: `npx vitest run && npm run build` → PASS.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: trang quản lí tông mực đỏ, ảnh QR kiểu Uchiha"
```

---

### Task 10: Ảnh xem trước, README, kiểm tra cuối

**Files:**
- Create: `scripts/og.html`, `public/og.png`, `README.md`
- Delete: `scripts/og.svg` (bản trời xanh cũ)

**Interfaces:**
- Consumes: `eyeBadgeSvg`, `crestSvg` (dán SVG tĩnh đã sinh vào `og.html`).

- [ ] **Step 1: Viết `scripts/og.html` (1200×630)**

- `body { margin:0; width:1200px; height:630px; background:#0c0a0a }` + nhiễu hạt.
- Mắt Sharingan 360px bên trái (x≈120).
- Gia huy nhỏ, mono "THƯ MỜI TỐT NGHIỆP" tro, "Nguyễn Tiến Quốc" serif 84px ngà, "Cử nhân Công nghệ Thông tin · ĐH Khoa học Tự nhiên" 28px tro.
- Không ghi ngày giờ. Font lấy từ Google Fonts bằng `<link>`.

- [ ] **Step 2: Chụp thành PNG bằng Edge chạy ngầm**

```bash
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --disable-gpu --hide-scrollbars --window-size=1200,630 --virtual-time-budget=6000 --screenshot="$(cygpath -w "$PWD/public/og.png")" "file:///$(cygpath -m "$PWD/scripts/og.html")"
node -e "const b=require('fs').readFileSync('public/og.png');console.log(b.readUInt32BE(16),b.readUInt32BE(20))"
```
Expected: in ra `1200 630`. Mở `public/og.png` bằng Read để xem: chữ tiếng Việt đủ dấu, không bị cắt.

- [ ] **Step 3: Viết `README.md`**

Theo bố cục README của thiệp Thắm (`$SRC/README.md`), đổi:
- Tiêu đề "Thư mời tốt nghiệp · Nguyễn Tiến Quốc", mô tả phong cách Uchiha (bìa quét mống mắt, 5 nhân vật, cảm xúc nét đơn, trứng phục sinh F12).
- Cổng chạy trên máy `5174`.
- Phần nhạc: hướng dẫn chép `.mp3` vào `public/nhac/` và ghi `music.src`.
- Ví dụ tên trang Netlify `tienquoc-totnghiep`.
- Mô tả ảnh QR mới.
- Các phần khác giữ ý nhưng sửa tên cho đúng.

- [ ] **Step 4: Kiểm tra cuối**

Run: `npx vitest run && npm run build`
Expected: mọi test PASS, build xong, gzip JS thiệp ≤ 90 KB.

Trình duyệt (preview `quoc-build` từ bản build), khổ 375×812:
- mở `/`, rồi một link khách;
- chạy hết bìa, cuộn hết thiệp;
- gửi xác nhận, gửi lời chúc, thả cảm xúc;
- `/quan-li/` đăng nhập, xem khách vừa mở có trạng thái "Đã mở";
- không lỗi console;
- chụp màn hình bìa (đã xác thực) và đầu thiệp làm bằng chứng.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "docs: README, ảnh xem trước Uchiha"
```

Đưa lên Netlify **không** nằm trong kế hoạch này. Người dùng chạy `npx netlify login` trước, sau đó mới làm theo README: `npm run deploy`, đặt `ADMIN_PASSWORD`, deploy lại.
