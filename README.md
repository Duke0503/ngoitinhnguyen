# Ngòi Tình Nguyện – Viết Cho Em

Website for a Vietnamese student volunteer non-profit: campaigns, news, donations, recruitment, sponsors and a fundraising shop.

- `web/` – Next.js 16 app (Tailwind v4, shadcn/ui, react-hook-form + zod). Domain-driven modules in `src/modules`, shared kit in `src/shared`.
- `docs/` – `PLAN.md` (site map), `BUSINESS.md` (decision log), `ARCHITECTURE.md`, `DESIGN-BRIEF.md`.
- `design/` – Pencil design file, brand assets and previews.

## Run locally

```bash
cd web
npm install
npm run dev        # http://localhost:3000
npm test           # unit tests
npm run build
```

Other scripts: `npm run build:address` (Vietnamese provinces/wards data), `npm run import:posts` (news posts from the crawled fanpage; needs the private `fanpage/` folder).

## Status

Donation, application, sign-up and order forms validate input but are **not persisted yet** (stub gateways until the Go API exists). Content is Vietnamese; URLs are English (see `web/src/shared/config/routes.ts`).
