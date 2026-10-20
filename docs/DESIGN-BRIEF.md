# Design Brief: Landing Website (first showcase)

**Goal:** a showcase of the public site to share with the BTC, volunteers and sponsors. It should feel like Ngòi: warm, literary, honest, more like a letter than a startup landing page.
**Sources:** `BUSINESS.md` (facts), `PLAN.md` §4 (site map), §9 (brand tokens).
**Frames:** every page at **Desktop 1440 px** and **Mobile 390 px**. The two must share the same components and differ only in layout.

## 1. Visual direction (taken from Ngòi's own brand, not invented)

### 1.1 Where the brand comes from
- **Official logo** (announced 12/08/2024, designed by Quỳnh Anh): a **quill pen shaped like a flame**, with a gradient from golden yellow to orange-red. Meaning: the pen stands for learning and writing; the flame for the desire and enthusiasm of young people.
- **The volunteer uniform** is a **navy polo** with the white quill, and it appears in almost every photo.
- **Recurring visual world** across the organisation's own graphics:
  - deep night-sky navy with a golden quill and stars (BTC 26–27, "Hành trình của những vì sao", the planet department cards);
  - a moonlit night for Đèn Trăng;
  - spring yellow-green for Xuân;
  - soft pink for HT10.
- An older blue wordmark lockup ("NGÒI TÌNH NGUYỆN — 'Viết cho em'") exists. It is **not** the official mark; don't use it.

### 1.2 Palette (sampled from the logo, the uniform and the night-sky graphics)

| Token | Hex | Source | Use |
|---|---|---|---|
| Flame Gold | `#FDB511` | Logo, base of the quill | Highlights, stars, numbers on navy |
| Flame Orange | `#F46A22` | Logo, middle | Accent lines, icons, hover |
| Ember | `#E5391F` | Logo, tip | Logo gradient only, never text |
| **CTA Ember** | `#C9361A` | Darkened ember | Primary button (white text, 5.2:1 AA) |
| **Ngòi Navy** | `#1F2A5C` | Uniform polo | Headings, nav, secondary buttons, footer |
| Night | `#0B1233` | Night-sky graphics | Dark hero/sections, impact band |
| Paper | `#FFF8EF` | Warm paper (writing project) | Page background |
| White | `#FFFFFF` | — | Cards |
| Ink | `#1C1F2E` | — | Body text (15.5:1 on Paper) |
| Muted | `#5B6075` | — | Secondary text |
| Line | `#EEE3D3` | — | Borders, dividers |
| Campaign accents | Trung Thu moon `#F2C14E`; Xuân leaf `#6BA539`; HT10 blossom `#EF8FB0` | Campaign key visuals | Small chips and tints only, never page backgrounds |

- **Flame gradient** (`#FDB511 → #F46A22 → #E5391F`): only on the logo, one thin rule under a hero heading, and the progress bar fill. Nowhere else; overused gradients are what make a site look generated.
- Checked contrast: Navy on Paper 12.9:1; Gold on Night 10.3:1; Orange on Night 6.0:1; white on CTA Ember 5.2:1.

### 1.3 Logo assets (`design/assets/logo/`)
- `quill-flame.png`: transparent, the full-colour quill. Use on Paper or White.
- `quill-white.png`: transparent, white. Use on Navy, Night or over photos.
- The wordmark is set in type next to the quill: "Ngòi Tình Nguyện" in the heading serif + "Viết Cho Em" in small caps. It is not baked into an image.
- **Ask the BTC for the original vector or high-res logo.** The crawled file is only 526 px.

### 1.4 Type
- Headings: **Lora** (serif, a literary feel that fits a writing project) or Playfair Display. Body: **Be Vietnam Pro**. Check the Vietnamese subset for every weight used.
- Desktop scale: 56 / 40 / 28 / 20 / 16 / 14. Mobile scale: 34 / 28 / 22 / 18 / 16 / 14.
- Use sentence case; the posts' ALL-CAPS titles are not carried over. One handwritten touch is allowed (e.g. the slogan in a script face, as the org already does on its posters), at most once per page.

### 1.5 Look like a designer made it, not AI
**Avoid:**
- purple/blue gradients, glassmorphism, glowing blobs;
- identical 3-up icon cards everywhere, emoji icons;
- centre-aligned everything;
- stock photos or illustrations;
- vague copy ("Empowering communities…");
- random shadows, drop shadows on everything.

**Do:**
- An editorial layout: asymmetric grid, generous white space, a strong type hierarchy, left-aligned text.
- Real photos as the hero material, cropped with intent (faces, hands, lanterns). Mix sizes in a collage, the way a magazine would.
- A small set of components used consistently. Cards are flat, with a 1 px Line border and 12 px radius; shadows only on the floating donate box.
- Real copy from the posts (slogans, real places, real numbers) in Vietnamese with full diacritics.
- One signature motif: the **flame quill + thin hand-drawn underline** (from the logo), used for section headings. The night sky with gold stars is used only for the impact band and the recruitment section ("Hành trình của những vì sao").
- Numbers set large in the serif, like a printed annual report.
- **Grid:**
  - desktop: 12 columns, 1200 px content width, 24 px gutters;
  - mobile: 4 columns, 16 px side padding.
- **Accessibility:** Flame Orange and Gold are for accents only, never body text on Paper; body text stays Ink or Navy. Tap targets are at least 44 px.

### 1.6 Photo assets (`design/assets/photos/`)
These are cropped from the fanpage images to remove the burned-in campaign frames:

| File | Content | Suggested use |
|---|---|---|
| `ttyt26-lantern-gift.jpg` | Volunteer in the navy polo handing out a lantern gift | **Home hero, main photo** |
| `ttyt25-gialai-children.jpg` | Crowd of children in Ia Băng | Hero collage / impact |
| `ttyt26-thiengliengroup.jpg` | Big group photo at Thiềng Liềng with gifts | Current campaign / TTYT26 |
| `ttyt26-volunteer-kids.jpg` | Volunteer smiling with kids | Recruitment |
| `ttyt26-island-cleanup.jpg`, `-2` | "Ấp Đảo Xanh" clean-up | Timeline: TTYT26 |
| `ttyt25-hanoi-street.jpg` | Night gift to a street worker in Hà Nội | Timeline: TTYT25 / "who we help" |
| `ttyt25-vihoang-elderly.jpg` | Elderly residents at Vị Hoàng | "Who we help" |
| `xyt26-gialai-children.jpg` | Cheering children in Gia Lai | Timeline: XYT26 |
| `xyt26-banh-chung.jpg`, `xyt26-banh-chung-team.jpg` | Wrapping bánh chưng | Timeline: XYT26 |
| `xyt26-paint-school.jpg` | Painting the school with a local woman | "Ways to help" / impact |
| `xyt26-gialai-craft.jpg`, `xyt26-incense.jpg`, `xyt26-school-forum.jpg` | Activities in Gia Lai | Campaign detail gallery |
| `ct01-reading-day.jpg` | 2024 reading day, "Trạm gửi tri thức" | Timeline: 2024 |

**Known limits:**
- All images are **≤ 590 px** (Facebook crawl). Use them at card or collage size, never as a single full-bleed 1440 px hero.
- A few crops still show tiny watermarks.
- **Ask the BTC for the original photos** (Drive) before launch.

Other sources in `fanpage/.../media/`, kept as they are:
- sponsor/partner logos (VNV, Đồng phục H&P, Nhóm Thiện nguyện Vọng, Vàng Studio, Mei Mei) inside their thank-you cards;
- the BTC 26–27 portraits;
- the HT10 key visual.

Re-crop these as needed and keep the source path noted.

## 2. Pages, in priority order

### P1. Home `/` (most important)
1. **Header:** logo "Ngòi Tình Nguyện – Viết Cho Em" and nav (Chương trình · Tin tức · Về chúng mình · Tuyển thành viên · Đồng hành), plus a CTA Ember "Ủng hộ" button. On mobile: logo, hamburger and the "Ủng hộ" button.
2. **Hero:**
   - tagline "Vì nụ cười của các em trên con đường tìm con chữ";
   - one line of story (student-founded in Gia Lai in 2020, volunteering since 2024, a member unit of VNV);
   - CTAs "Ủng hộ chương trình" and "Trở thành tình nguyện viên";
   - a photo collage.
3. **Impact strip:** 4–6 numbers, e.g. 5 chương trình · 4 tỉnh/thành · 600+ phần quà · 100+ lồng đèn · 25+ suất học bổng · 100+ tình nguyện viên. Placeholder figures, marked "computed".
4. **Current campaign card:**
   - HT10 or the next one;
   - slogan, dates, location;
   - progress bar (raised vs goal, donor count);
   - buttons "Ủng hộ" and "Xem chương trình".
5. **Journey timeline:** 2024 Trang sách nhỏ → TTYT25 Đèn Trăng → XYT26 Xuân Yêu Thương → TTYT26 Đèn Trăng 2 → HT10. Each stop has a photo, a date, places and one result. Horizontal on desktop, vertical on mobile.
6. **Ways to help:** 4 cards: Góp quỹ (VietQR) · Ủng hộ hiện vật · Mua sản phẩm gây quỹ · Trở thành TNV.
7. **Transparency block:** a sample "Báo cáo tài chính" (income by channel, spending by item) with a "Minh bạch từng đồng" message.
8. **Latest news:** 3 cards.
9. **Recruitment banner:** open round, deadline, CTA.
10. **Bảng vàng strip:** sponsor and partner logos (VNV, Đồng phục H&P, Nhóm Thiện nguyện Vọng, MXH Duyên dáng Việt Nam, Vàng Studio…).
11. **Footer (navy):** contacts, socials (3 fanpages), bank info note, "Đơn vị trực thuộc VNV".

### P2. Campaign detail `/campaigns/[slug]` (example: TTYT26 "Đèn Trăng 2")
1. **Hero:** campaign name, slogan "Gói đèn mơ ước – Ngòi dệt mùa trăng", status chip and dates.
2. **Sticky donate box:** right column on desktop, bottom sheet on mobile. It contains:
   - amount presets 20k/50k/100k/tùy tâm;
   - the VietQR code;
   - account and owner;
   - memo with a copy button;
   - a "Tôi đã chuyển khoản" button.
3. **Story.**
4. **Phase timeline:** Gói đèn → Ngòi dệt → Trông trăng.
5. **Locations:** branch tabs (TP.HCM / Hà Nội) → location cards (Thiềng Liềng, Vị Hoàng, Thánh Tâm, Chùa Thiên Hương) → activity results.
6. **Gallery.**
7. **Budget and financial summary table.**
8. **Donor list:** name, amount, message, "Ẩn danh" for anonymous donors.
9. **Sponsors and partners:** with their custom titles.
10. **Team:** BTC and volunteers.
11. **Related news.**

### P3. About `/about`
Origin story (2020 Ngòi Bút Nhỏ → 2024 → VNV 06/2026), mission "Viết – Đọc – Ghi nhớ", beneficiaries, BTC 2026–2027 (6 people with roles), the 6 departments drawn as "planets", awards and press, and the full timeline.

### P4. Recruitment `/recruitment`
Open round hero (deadline countdown), why join (certificate, skills, listed on the roll of honour), departments as planet cards with a job description, process steps (Nộp đơn → Phỏng vấn → Hồi âm → Xác nhận), FAQ, apply CTA. Include a mobile form state.

### P5. Sponsors `/sponsors`
Why Ngòi (numbers, track record), a tier table (Kim cương 15M → Đồng hành 2M) with the benefits matrix, the bảng vàng, past sponsors, and a contact CTA.

### P6. Shop product + order (`/shop/[slug]`)
Product (velvet-wire flower: Tulip 35k / Lily 37k) and an order form showing the **structured address**:
- Tỉnh/thành dropdown → Phường/xã dropdown (searchable);
- street text and phone number;
- delivery method;
- order summary, then a VietQR payment step.

This page shows sponsors and the BTC how the address problem gets fixed.

## 3. Shared components
Header, footer, button (primary, secondary, ghost), campaign card, progress bar, stat tile, timeline item, news card, sponsor logo tile, donate box, VietQR card, location card, person chip, section heading with a star motif, form fields (text, select, searchable select), status chip.

## 4. Copy rules
- Vietnamese with full diacritics.
- Use real names and facts from `BUSINESS.md`. Anything not yet confirmed is labelled "(minh hoạ)" (illustrative).
- Never invent money figures without the "minh hoạ" label. Transparency is the brand.
