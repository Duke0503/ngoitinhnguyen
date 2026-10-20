# Design changelog — `ngoi-website.pen`

## v2 — 20/10/2026 (UI/UX Pro Max audit)
Backup of the previous version: `archive/v1-2026-10-20/ngoi-website.v1.pen` (+ its `previews/`).

Audit run with the `ui-ux-pro-max` skill (pattern *Trust & Authority + Conversion*, accessibility rules). Its suggested palette (cyan) and fonts (Inter/Playfair) were **not** used: the brand (flame-quill gold→ember, navy, Lora + Be Vietnam Pro) is fixed.

| Check | v1 | v2 |
|---|---|---|
| Text contrast below 4.5:1 (3:1 large) | 0 | 0 |
| Text layers under 12px (excl. logo lockup) | 118 | 0 |
| Mobile interactive targets under 40px | 46 | 0 (header CTA, steppers, presets 44–48px; copy buttons 40px) |

Changes:
- All eyebrows, card kickers and small labels raised to 12px (all pages, desktop + mobile).
- Tap targets: header “Ủng hộ” 44px; quantity stepper cells 44×44; amount presets 48px; “Sao chép” 36/40px; mobile location tabs 40px; mobile “Báo cáo” 44px.
- Home (desktop + mobile), following the trust pattern Hero → Proof → Overview → CTA:
  - “Được bảo trợ và đồng hành bởi” partner strip moved up, directly under the impact numbers, now with real logos (VNV, Đồng phục H&P, Nhóm Thiện nguyện Vọng, Vàng Studio) plus wordmark tiles.
  - New closing CTA band before the footer: “Mỗi đóng góp nhỏ đều viết tiếp một câu chuyện cho các em.” + Ủng hộ / Trở thành tình nguyện viên.
