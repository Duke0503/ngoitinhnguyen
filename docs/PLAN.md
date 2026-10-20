# Ngòi Tình Nguyện — Website + CMS + Donations

**Status:** planning only. No application code written yet.
**Owner:** Ngòi Tình Nguyện - Viết Cho Em
**Last updated:** 20/10/2026 (v2, aligned with `BUSINESS.md` v2)

`BUSINESS.md` is the source of truth for **what** the organisation needs and why; this document says **how** we build it. Requirement IDs (`BR-xx`) and decisions (`Dx`) refer to `BUSINESS.md`. If the two disagree, `BUSINESS.md` wins and this file gets fixed.

---

## 1. What we are building

A small full-stack web application with five jobs:

1. **Public site.** Who Ngòi is, every campaign it has run (where, for whom, what results, how much money), news, and ways to help.
2. **Campaign engine.** A campaign is not just a page with a progress bar. It is a structured record:
   - term → campaign → phases;
   - branches / field teams → locations → activities → results;
   - budget and funds (bank accounts) → financial summary.
   
   The next campaign is created in admin, not in code.
3. **Money in.** Donations (bank transfer + VietQR + proof + manual confirmation) and a fundraising **shop** (products now, workshop tickets next) with structured Vietnamese addresses.
4. **People.** Recruitment rounds with a multi-step pipeline. Accepted people become the public **volunteer roll of honour** (keeping the "ghi danh trên website" promise).
5. **Trust.** Impact numbers computed from results, published financial summaries, a public donor list, and a sponsor/partner **bảng vàng**.

It is **not**: a social network, a payment gateway, a general e-commerce store, or a member portal with logins for the public.

### Product principles

- **Vietnamese-first content, English URLs.** The public site and admin UI text are Vietnamese; URL paths are English (kebab-case) and defined once in `routes.ts`. Code, docs and comments are English.
- **Trust over flash.** Real photos, numbers computed from data rather than typed by hand, published money in and out.
- **Structured once, shown everywhere.** Dates, venues, results and bank details are entered once. Every page, post footer and proposal reads from that record, so posts can no longer contradict each other (BUSINESS §2, data warnings).
- **Small per role.** Each department sees only the few admin screens it needs.
- **Cheap to run.** Free tiers now, one small VPS later if needed.

---

## 2. Users and permissions

### 2.1 Audiences

| User | Needs | Access |
|---|---|---|
| Visitor / donor | Understand Ngòi, see campaigns and results, donate, buy, read news | Public |
| Applicant | Find open rounds, apply, confirm acceptance | Public + emailed links |
| Buyer | Order products, track the order | Public + order lookup |
| Sponsor / partner | Track record, packages, bảng vàng, contact | Public |
| BTC / department member | Run their part of the org | `/admin`, scoped by permission |

No public accounts. Donors, buyers and applicants never register. They use reference codes and emailed links.

### 2.2 Admin permissions (BUSINESS §12)

Permissions combine. Each grant is **org-wide or scoped to one campaign**, because campaign leads are often not in the term BTC.

| Permission | Allows | Typical holder |
|---|---|---|
| `owner` | Everything: users, settings, terms | Trưởng / Phó Trưởng BTC |
| `content` | Campaigns, phases, branches, locations, activities, results, posts, media | QLKH Dự án, Truyền thông, Sự kiện, campaign lead |
| `finance` | Funds and bank accounts, donations, order payments, expenses, financial summary | Tài chính – Đối ngoại, campaign lead |
| `sponsors` | Sponsors, partners, tiers | Tài chính – Đối ngoại |
| `shop` | Products, orders, delivery board | Campaign team |
| `recruitment` | Rounds, applications, interviews, results | Nhân sự, BTC Mùa tuyển |
| `people` | People directory, role assignments, consent | Nhân sự |

Every change to funds (bank accounts), financial summaries, donation status and permissions is written to `audit_logs`.

---

## 3. Scope

### Phase 1 — launch (M = must)

- **Public pages:**
  - home, about, campaigns archive and campaign detail (timeline, locations, activities, results, gallery, sponsors, donors, financial summary);
  - news;
  - impact numbers;
  - shop and order lookup;
  - recruitment (open rounds, department pages, apply);
  - roll of honour, bảng vàng;
  - partner/sponsor page, contact, privacy.
- **Campaign engine:**
  - terms, campaigns, phases;
  - branches, locations, activities, results;
  - budget lines, funds, contacts, status lifecycle.
- **Donations:** VietQR per fund, "Tôi đã chuyển khoản" (I've transferred) + proof, manual confirmation **[D2]**, donor list, offline/sponsor entries.
- **Financial summary per campaign:**
  - income by channel, computed;
  - expenses by budget line, entered;
  - published by finance.
- **Shop (products):**
  - variants, stock, open/close dates;
  - structured address (34 tỉnh/thành → phường/xã, the 2-level system since 01/07/2025);
  - delivery areas and methods;
  - transfer payment with order code;
  - order statuses, buyer lookup, admin delivery board and export.
- **Recruitment [D4]:**
  - rounds with windows, extensions, capacity and auto-close, region eligibility;
  - form builder;
  - pipeline: screening → interview → decision;
  - bulk result emails, confirmation links, published lists;
  - accepted people become role assignments.
- **People:** people directory, role assignments per term, campaign, branch or activity, public consent.
- **Sponsors:** sponsors and partners, per-campaign sponsorships (tier or custom title), tier packages with benefits.
- **Import:**
  - Facebook posts with a hand-curated mapping;
  - back-fill of structured history (campaigns since 2024 with locations, activities and results).
- **Ops:** transactional email (Resend free tier, needed for recruitment and order emails), SEO, sitemap, OpenGraph, responsive layout, Vietnamese typography, free-tier deploy, backups.

### Phase 1.1 (S = should)

- Change notices ("Cập nhật") on campaigns (BR-08).
- Goods wish list with regional drop-off contacts (BR-16).
- Duplicate a campaign from the previous edition (BR-17).
- Donation status lookup (BR-24).
- Shop promotions (BR-41) and **workshop tickets** (BR-47).
- **Certificates** [D3 deferred]: donor certificates with rules per campaign and verification; volunteer certificates (BR-30–33). The data model leaves room for them now (§6.10).

### Phase 2 (C = could)

- Auto bank matching (SePay/Casso) behind the same donation model.
- Online payment gateway.
- Bookable services, e.g. photo packages (BR-48).
- Letter box "Gói lời thương chúc" (BR-63).
- Proposal page/PDF generated from campaign data (BR-19).
- Sponsor-matched pledges.
- English toggle, 2FA, scheduled publishing.

### Out of scope

Comments, public user profiles, chat, mobile app, multi-tenant, accounting integration, recurring donations.

---

## 4. Site map

### Public (English paths; page content stays Vietnamese)

Paths live in one file, `web/src/shared/config/routes.ts`. `[built]` marks pages that exist.

```
/                              [built] Home: active campaign(s), impact numbers, open recruitment,
                               shop highlights, latest news, bảng vàng strip, CTAs
/campaigns                     [built] Campaigns: active and past (filter by series)
/campaigns/[slug]              [built] Story, phases timeline, branches → locations → activities → results,
                               ways to help (donate box per fund, shop, goods list),
                               sponsors & partners, donor list, financial summary (when published),
                               volunteers & BTC, related news, change notices
/news                          [built] News (filter by topic; 83 real fanpage posts imported by `npm run import:posts`)
/news/[slug]                   [built] Post: body, photos, link to its campaign, related posts
/about                         [built] Origin (Gia Lai 2020 → 2024), mission, VNV, board, timeline
/impact                        [built] Impact numbers + per-campaign results and financial reports
/donate                        [built] Donate to the campaign that is running: amount → VietQR → confirm
/shop                          [built] Shop: active products by campaign
/shop/[slug]                   Product detail + order form
/lookup                        Look up an order (code + phone) or a donation (reference code)
/recruitment                   [built] Open round (application form) or email sign-up for the next one
/recruitment/[slug]            Round detail, departments/teams + job descriptions, apply
/recruitment/confirm/[token]   Accepted applicant confirms
/honour                        Roll of honour: people by term / campaign / team (consented only)
/sponsors                      [built] For sponsors: track record, tiers & benefits, bảng vàng of all sponsors and partners, contact
/contact                       Contact (from settings — always current), socials
/privacy                       Privacy, donation & data-retention policy
```

### Admin (`/admin`)

```
/admin/login
/admin                         Dashboard: pending donations, pending order payments, open rounds,
                               campaigns missing a financial summary
/admin/terms                   Terms + departments (owner)
/admin/campaigns               Campaigns → tabs: info · phases · branches/locations/activities/results ·
                               budget · funds · contacts · sponsors · people · changes · financial summary
/admin/posts                   Posts (TipTap), linked to campaign/branch/location/activity
/admin/donations               Donation queue: confirm/reject, proof viewer, manual entries, CSV
/admin/shop                    Products & variants, delivery areas
/admin/orders                  Orders board: status, area filter, payment confirm, delivery-list export
/admin/recruitment             Rounds, form builder, applications pipeline, interviews, bulk results
/admin/people                  People directory, role assignments, consent
/admin/sponsors                Sponsors, partners, tiers & benefits
/admin/media                   Media library
/admin/settings                Org info, general contacts, socials, stamp/signature assets (owner)
/admin/users                   Admin users & permissions (owner)
/admin/audit-log               Audit log (owner)
```

---

## 5. Core flows

### 5.1 Set up a campaign (BR-10–18)

1. A `content` user creates the campaign, filling in:
   - code (e.g. `XTN27`), series and edition, title, slogan, story, cover;
   - the term it belongs to;
   - status `draft`.
2. They add phases (name + dates), branches/teams, and locations (structured address + access notes).
3. A `finance` user adds the budget lines. The totals are computed, and the goal = Σ budget unless overridden with a reason.
4. `finance` adds one or more **funds**: name, bank, account, owner, VietQR bank BIN, memo template (default `{TEN}-ungho{CODE}`).
5. They add contacts and link sponsors and partners.
6. Status moves `draft → announced → fundraising → on_site → closing → closed`.
   - Donation and shop boxes are open only during `fundraising` (and optionally `on_site`).
   - `closing` flags "financial summary pending" on the dashboard.
7. When a published date or venue changes, the editor adds a **change notice**, which is shown on the campaign page (S).

### 5.2 Record what happened (BR-02, BR-03)

During and after the trip, the editor adds activities under each location, each with **results**: a metric key + quantity + optional VND value. Examples: `gifts 100`, `lanterns 100`, `scholarship:ngoi-but-nho 5`, `meals 100`. Recap posts link to the activity. Impact numbers sum the results, so nobody types them by hand.

### 5.3 Donate (Option A, BR-20–25)

1. The campaign page shows each open fund's box:
   - preset amounts (20k/25k/50k/100k/tùy tâm, i.e. any amount);
   - account and owner;
   - a VietQR code with the amount and memo prefilled;
   - a **reference code** (e.g. `HT10-7K3Q`) embedded in the memo.
2. The donor transfers, then submits "Tôi đã chuyển khoản": name, amount, optional email/phone, message, proof, public/anonymous, consent.
3. The API validates (rate limit, honeypot, image type and size), stores the donation as `pending`, and returns the reference code.
4. `finance` opens the proof (signed URL) and checks the bank app, then confirms (editing the amount if needed) or rejects.
5. Confirmed donations update the totals and the donor list. Rejected ones are hidden and kept for audit.
6. Offline cash, sponsor money and benefactor gifts are entered by hand with `method`/`kind`.

### 5.4 Shop order (BR-40–46, BR-49)

1. The buyer picks variants. The cart is limited to one campaign's fund, so one QR code covers the order.
2. Delivery method: volunteer hand delivery (only if the address falls in the campaign's **delivery areas**), pickup point, or courier (fee shown).
3. Address entry:
   - **Tỉnh/thành select → phường/xã select** (searchable, from the seeded official list);
   - street/house text;
   - recipient name;
   - phone validated as VN mobile;
   - a summary for the buyer to confirm before submitting.
4. The order is created as `new` with an order code. The page shows a VietQR code with the order code in the memo.
5. The buyer submits proof, or `shop`/`finance` confirms from the bank app. The order moves to `paid`.
6. `shop` moves the order through `preparing → delivering → delivered` (or `cancelled`). The delivery board filters by area and exports a list per volunteer.
7. The buyer checks `/lookup` with the order code and phone.
8. Paid order income appears as its own line in the campaign's financial summary.

### 5.5 Recruitment (BR-50–56)

1. `recruitment` creates a round with these fields:
   - kind (`member` | `volunteer` | `ctv`);
   - term, or campaign + branches;
   - opens_at / closes_at;
   - capacity + auto-close;
   - eligible provinces;
   - options to choose from (departments or field teams);
   - a form, built from standard fields plus custom questions.
2. Applicants apply; each gets a confirmation email with their submission.
3. Extending a round changes `closes_at` and keeps the history. A full round auto-closes.
4. Pipeline: `applied → screening → interview → accepted | rejected | waitlist`. Each application has notes, an assignee and an interview time.
5. Bulk "hồi âm" emails (the results replies). Accepted applicants get a one-time **confirm link**, which moves them to `confirmed` or `declined` (with a deadline).
6. Confirmed applicants become `people` + `role_assignments`, scoped to the term/department or campaign/branch.
7. Publishing the round's result list shows confirmed names (with consent) on the round page and on `/honour`.
8. Applicant personal data is purged N months after the round closes [D11].

### 5.6 Close a campaign (BR-04)

1. `finance` enters expenses: item, amount, date, the budget line it belongs to (optional), and a private receipt image (optional).
2. The summary shows income computed by channel:
   - transfers (confirmed donations);
   - shop orders;
   - tickets;
   - sponsors' cash;
   - goods valued (manual);
   - other.
   
   It also shows expenses by budget line and the balance carried over.
3. `finance` publishes. The campaign status becomes `closed`. The dashboard nags if a campaign stays in `closing` for more than 30 days.

### 5.7 Publish a post

1. The editor writes the post in TipTap and links it to a campaign, branch, location or activity, plus tags.
2. A signed link lets them preview it.
3. **Publish** sets `published_at`, and the API calls the Next.js revalidation webhook.

### 5.8 Revalidation

```
Go API (publish/confirm/update) ──POST /api/revalidate (secret)──► Next.js
                                   revalidateTag('posts' | 'campaign:<slug>' | 'impact' | 'honour')
```

If the webhook fails, pages still refresh on the ISR interval (60 s). Confirming a donation or order revalidates `campaign:<slug>`, so the progress bar updates within seconds.

---

## 6. Data model (PostgreSQL)

Conventions:
- All ids are `uuid` (`gen_random_uuid()`).
- Tables have `created_at` and `updated_at`.
- Soft delete (`deleted_at`) applies to campaigns, posts, products and people.
- Money is `bigint` VND.
- Address codes reference `admin_units`.

### 6.1 Auth and audit

**admin_users**: `id, email citext unique, name, password_hash (argon2id), is_active, last_login_at`.

**admin_permissions**: `id, user_id → admin_users, permission (owner|content|finance|sponsors|shop|recruitment|people), campaign_id null → campaigns`. A null `campaign_id` means org-wide. The pair `(user_id, permission, campaign_id)` is unique.

**sessions**: `id, user_id, token_hash unique, user_agent, ip_hash, created_at, expires_at (7-day sliding), revoked_at`.

**audit_logs**: `id, actor_id, action, entity, entity_id, diff jsonb, created_at`. Phase 1 covers funds, donations, orders, financial reports, permissions and role assignments.

### 6.2 Media

**media**: `id, storage_key unique, public_url, bucket (public|private), mime, width, height, bytes, alt, uploaded_by null, created_at`.

### 6.3 Organisation

**terms**: `id, slug, name ("Mùa 2"), label ("2026 – 2027"), theme ("Hành trình của những vì sao"), slogan, starts_on, ends_on null`.

**departments**: `id, term_id, slug, name, job_description_html, display_order`. Departments change per term (BUSINESS §3.2).

**people**: `id, full_name, display_name, school, province_code null, avatar_media_id null, email null (private), phone null (private), public_consent bool default false, consent_at, notes (private)`.

**role_assignments**:

| column | notes |
|---|---|
| person_id | → people |
| scope_type | `term` \| `campaign` \| `branch` \| `activity` \| `round` |
| scope_id | id of that entity |
| title | free text as the org writes it: "Trưởng BTC", "Đội trưởng", "Đại sứ Sinh viên", "TNV" |
| department_id | null; for term-level members |
| display_order, is_public | |

### 6.4 Campaigns

**campaigns**

| column | notes |
|---|---|
| term_id | → terms, nullable for pre-2024 history |
| code | unique, e.g. `TTYT26`; used in tags and memos |
| slug | unique |
| series | e.g. `trung-thu`, `xuan`, `20-10`, `doc-sach`, `he`, `other` |
| edition_label | e.g. "Đèn Trăng 2" |
| title, subtitle, slogan | |
| body_html | sanitized |
| beneficiaries | text[]: `children`, `elderly`, `policy_families`, `street`, `patients`, `women`, `environment` |
| cover_media_id | |
| starts_on / ends_on | overall window |
| goal_amount | null = Σ budget_lines; set only with `goal_note` |
| status | `draft` \| `announced` \| `fundraising` \| `on_site` \| `closing` \| `closed` |
| published_at | |

**campaign_phases**: `id, campaign_id, name ("Gói đèn"), description, starts_on, ends_on, position`.

**campaign_changes** (S): `id, campaign_id, summary, changed_at, created_by`.

**branches**: `id, campaign_id, name ("Đội hình Xuân Gia Lai" / "Chi nhánh Hà Nội"), region_label, starts_on, ends_on, position`. The region label is independent of province; for example, Chùa Thiên Hương (Hưng Yên) sits under the "Hà Nội" branch.

**locations**: `id, branch_id, name, address_line, province_code, ward_code null, starts_on, ends_on, access_notes, position`.

**activities**: `id, location_id, title, happened_on, description, position`.

**activity_results**: `id, activity_id, metric, label null, quantity int, value_vnd bigint null, note`.
- `metric` is one of a fixed code list: `gifts`, `lanterns`, `scholarships`, `meals`, `books`, `people_served`, `banh_chung`, `other`.
- `label` holds sub-types, e.g. scholarship "Ngòi Bút Nhỏ" vs "Hoa Hướng Dương".

**contacts**: `id, campaign_id, branch_id null, role_label, name, phone, region, position`. The org-wide contact lives in `site_settings`.

**goods_needs** (S): `id, campaign_id, item, quantity_needed null, quantity_received, unit, note, drop_off_contact_id null`.

### 6.5 Money

**budget_lines**: `id, campaign_id, item, quantity numeric, unit, unit_price bigint, total bigint GENERATED (quantity*unit_price), category, position`.

**funds**:

| column | notes |
|---|---|
| campaign_id | |
| name | "Quỹ Dệt sắc xuân xanh", "Workshop Kết vòng đan tâm" |
| bank_name, bank_bin | bank BIN for VietQR |
| account_number, account_owner | |
| memo_template | e.g. `{TEN}-ungho{CODE}` |
| is_active | |
| opens_at / closes_at | null = follow campaign status |

Funds are never edited in place once they have money attached. A change creates a new fund and deactivates the old one, which keeps the account history (BR-14).

**donations**

| column | notes |
|---|---|
| fund_id | → funds |
| kind | `donation` \| `benefactor` \| `sponsor_cash` |
| donor_name | "Ẩn danh" allowed |
| donor_email / donor_phone | null, private |
| amount | > 0 |
| method | `bank_transfer` \| `cash` \| `other` |
| reference_code | unique, shown to donor, embedded in memo |
| transfer_note | donor-entered |
| proof_media_id | private bucket, null for cash |
| message, is_public | |
| status | `pending` \| `confirmed` \| `rejected` |
| admin_note, confirmed_by, confirmed_at | |
| certificate_* | reserved, see §6.10 |
| ip_hash | |

**expenses**: `id, campaign_id, budget_line_id null, item, amount, spent_on, receipt_media_id null (private), note`.

**income_manual**: `id, campaign_id, channel ('goods_valued'|'other'), description, amount, note`.

**financial_reports**: `id, campaign_id unique, status (draft|published), summary_note, published_at, published_by`. The figures are computed at read time from the tables above, plus a frozen JSON snapshot taken on publish.

### 6.6 Shop

**admin_units**: `code pk, name, level ('province'|'ward'), parent_code null`. Seeded from the official post-01/07/2025 list (34 provinces/cities + wards/communes) and versioned by `source_version`. **Built (web):** generated by `npm run build:address` from the MIT-licensed `vietnam-address-database` (34 provinces, 3,321 wards), cross-checked against provinces.open-api.vn v2 (identical province and ward codes), and committed as JSON under `web/src/shared/data/address/`; wards load per province on demand (`shared/address`). The Go API should load the same files.

**products**: `id, campaign_id, fund_id, kind (product|ticket|service), slug, name, description_html, cover_media_id, opens_at, closes_at, is_active`.

**product_variants**: `id, product_id, name ("Hoa Tulip"), price, stock null, session_at null, venue null, capacity null, position`. Ticket fields are used from Phase 1.1.

**delivery_areas**: `id, campaign_id, method (hand|pickup|courier), province_code null, ward_code null, pickup_label null, fee bigint default 0`.

**orders**

| column | notes |
|---|---|
| fund_id | payment target |
| code | unique, e.g. `HT10-D4F9`; in memo |
| buyer_name, phone, email null | |
| delivery_method | `hand` \| `pickup` \| `courier` |
| province_code, ward_code, address_line | required for hand/courier |
| pickup_area_id | for pickup |
| note | |
| subtotal, discount, shipping_fee, total | computed server-side |
| status | `new` \| `paid` \| `preparing` \| `delivering` \| `delivered` \| `cancelled` |
| proof_media_id | null, private |
| paid_confirmed_by / at, assignee_id null | volunteer handling delivery |

**order_items**: `order_id, variant_id, quantity, unit_price`.

**promotions** (S): `id, campaign_id, rule jsonb` (e.g. `{"type":"qty_discount","min_qty":3,"amount":5000}`).

### 6.7 Sponsors and partners

**sponsors**: `id, name, kind (company|group|individual), logo_media_id null, website_url null, is_partner_org bool`.

**sponsor_tiers**: `id, campaign_id, name ("Kim cương"), amount, benefits jsonb, cash_ratio_min (0.7), position`.

**sponsorships**: `id, sponsor_id, campaign_id, relation (sponsor|partner), tier_id null, custom_title null ("Nhà tài trợ Gấu bông", "Đơn vị Bảo trợ Pháp lý"), cash_amount null, in_kind_note null, display_order`. Sponsor cash also creates a `donations` row (`kind = sponsor_cash`), so the totals stay in one place.

### 6.8 Recruitment

**recruitment_rounds**

| column | notes |
|---|---|
| kind | `member` \| `volunteer` \| `ctv` |
| term_id / campaign_id | one of them |
| slug, title, description_html | |
| opens_at, closes_at | extensions keep history in `audit_logs` |
| capacity, auto_close | |
| eligible_provinces | text[] null = nationwide |
| form_schema | jsonb (standard + custom questions) |
| status | `draft` \| `open` \| `closed` \| `results_published` |
| confirm_deadline | |

**round_options**: `id, round_id, label, department_id null, branch_id null, description`. These are the options an applicant picks from.

**applications**: `id, round_id, full_name, dob, school, province_code, phone, email, facebook_url, answers jsonb, option_ids uuid[], status (applied|screening|interview|accepted|rejected|waitlist|confirmed|declined), assignee_id, interview_at, notes, confirm_token_hash, decided_at, person_id null, purge_after date`.

### 6.9 Content

**posts**: `id, slug, title, excerpt, body_html, cover_media_id, campaign_id null, branch_id null, location_id null, activity_id null, tags text[], status (draft|published|archived), published_at null, author_id null, source (manual|facebook), facebook_post_id unique null, facebook_url null`.

**post_media**: `(post_id, media_id, position)`.

**site_settings**: single row, jsonb. Holds org name, tagline, general email/phone/role, socials (main fanpage, parent fanpage, other pages), default memo template, stamp/signature media (for certificates later), and retention days.

### 6.10 Reserved for certificates [D3, deferred]

No tables yet. When decided: `certificate_rules (campaign_id, min_amount, require_share bool, deadline, template_media_id)` and `certificates (id, code unique, kind donor|volunteer, donation_id|person_id, issued_at, revoked_at)`. The donation form already collects what the rules need (amount, name, email, and an optional "đã chia sẻ" (shared) checkbox, hidden until enabled).

### 6.11 Derived values

All of these are computed in SQL views or queries, with no denormalised counters in Phase 1.

| Value | Computed from |
|---|---|
| Fund raised | `SUM(donations.amount WHERE confirmed)` + `SUM(paid orders.total)` |
| Campaign raised | Σ over its funds + `income_manual` |
| Impact | `SUM(activity_results.quantity) GROUP BY metric` (and label), across published campaigns |
| Donor list | `confirmed AND is_public`, newest first |
| Roll of honour | `role_assignments` joined with people `WHERE public_consent AND is_public` |

### 6.12 Indexes (key ones)

```sql
CREATE INDEX ON posts (status, published_at DESC);
CREATE UNIQUE INDEX ON posts (facebook_post_id) WHERE facebook_post_id IS NOT NULL;
CREATE INDEX ON donations (fund_id, status);
CREATE INDEX ON donations (status, created_at DESC);
CREATE INDEX ON orders (fund_id, status);
CREATE INDEX ON orders (status, province_code, ward_code);
CREATE INDEX ON applications (round_id, status);
CREATE INDEX ON activity_results (metric);
CREATE INDEX ON role_assignments (scope_type, scope_id);
CREATE INDEX ON admin_units (parent_code);
```

---

## 7. API (Go, REST, `/v1`)

All responses are JSON. Errors are `{ "error": { "code": "validation_failed", "message": "...", "fields": {...} } }`.

### Public (rate-limited, no auth)

| Method | Path | Purpose |
|---|---|---|
| GET | `/v1/public/site` | Settings subset |
| GET | `/v1/public/impact` | Impact numbers |
| GET | `/v1/public/campaigns?status=&series=` | List |
| GET | `/v1/public/campaigns/{slug}` | Full campaign: phases, branches → locations → activities → results, funds, contacts, sponsors, changes, financial summary if published |
| GET | `/v1/public/campaigns/{slug}/donations` | Donor list |
| POST | `/v1/public/funds/{id}/donations` | Submit donation + proof |
| GET | `/v1/public/donations/{ref}` | Status lookup (S) |
| GET | `/v1/public/products?campaign=` · `/v1/public/products/{slug}` | Shop |
| GET | `/v1/public/admin-units?parent=` | Province / ward pickers |
| POST | `/v1/public/orders` | Create order (server computes prices, fees, delivery eligibility) |
| POST | `/v1/public/orders/{code}/proof` | Upload payment proof |
| GET | `/v1/public/orders/{code}?phone=` | Order lookup |
| GET | `/v1/public/rounds?status=open` · `/v1/public/rounds/{slug}` | Recruitment |
| POST | `/v1/public/rounds/{slug}/applications` | Apply |
| POST | `/v1/public/applications/confirm` | Accept/decline with token |
| GET | `/v1/public/honour?term=&campaign=` | Roll of honour |
| GET | `/v1/public/sponsors` | Bảng vàng |
| GET | `/v1/public/posts` · `/v1/public/posts/{slug}` | News |

### Admin (session cookie; each route checks permission and campaign scope)

| Area | Endpoints |
|---|---|
| Auth | `POST /v1/auth/login`, `POST /v1/auth/logout`, `GET /v1/auth/me` (with permissions) |
| Org | CRUD `terms`, `departments` (owner) |
| Campaigns | CRUD `campaigns`, nested `phases`, `branches`, `locations`, `activities`, `results`, `contacts`, `changes`, `budget-lines`; `POST /campaigns/{id}/status` |
| Funds and money | CRUD `funds` (append-only once used); `GET/PATCH donations`, `POST donations` (manual), `GET donations.csv`; CRUD `expenses`, `income-manual`; `GET/POST /campaigns/{id}/financial-report` (+ `/publish`) |
| Shop | CRUD `products`, `variants`, `delivery-areas`; `GET/PATCH orders`, `POST orders/{id}/status`, `GET orders.csv?area=` |
| Recruitment | CRUD `rounds`, `round-options`; `GET/PATCH applications`; `POST rounds/{id}/send-results`; `POST rounds/{id}/publish-results` |
| People | CRUD `people`, `role-assignments` |
| Sponsors | CRUD `sponsors`, `sponsor-tiers`, `sponsorships` |
| Content | CRUD `posts`, `POST posts/{id}/publish`; `POST media/sign`, `POST media` |
| Admin | CRUD `users`, `permissions`; `GET/PATCH settings`; `GET audit-logs`; `GET dashboard` |

**Auth transport:**
- An httpOnly, Secure, SameSite=Lax cookie `sid`.
- Next.js proxies `/api/*` to the Go API on the same origin, so the cookie is first-party.
- Admin mutations require an `X-CSRF: 1` header plus an `Origin` check.

---

## 8. Architecture

```
Browser
  │  HTTPS (first-party)
  ▼
Next.js (public + /admin)  ── rewrites /api/* ──►  Go API (REST)
  │                                                     │
  │  ISR / revalidate webhook                           │ pgx + sqlc
  ▼                                                     ▼
Public pages                                      PostgreSQL (Supabase)
                                                        │
                                   S3 API / signed uploads │      Resend (email)
                                                        ▼
                                                  Object storage (public + private buckets)
```

- The browser talks only to the Next.js origin, so there are no cross-site cookies.
- Uploads go browser → signed URL → storage, then the metadata goes to the API.
- Public pages are rendered with SSR/ISR (60 s) plus on-demand revalidation. Admin pages use client-side fetches with no cache.
- The Go API sends email (recruitment receipts, results, confirm links, order confirmations) through Resend, with a simple outbox table and retries.

---

## 9. Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js 16 (App Router, Cache Components) + TypeScript | SSR/SEO, one app for public + admin; structure per `ARCHITECTURE.md` |
| Styling | Tailwind CSS v4 + shadcn/ui (Radix), brand tokens in `globals.css` | Components live in our repo, restyled to the design (not antd) |
| Data (admin) | TanStack Query + TanStack Table | Cache/refresh after mutations; donation/order/applicant tables |
| Editor | TipTap (sanitized HTML) | Friendly for non-technical staff |
| Forms | react-hook-form + zod; form-builder rendering from `form_schema` | Validation shared with the UI |
| Backend | Go 1.23+ + chi | Small, fast, easy deploy |
| DB access | pgx + sqlc | Typed SQL |
| Migrations | goose | Simple, versioned SQL |
| Auth | argon2id + DB sessions | No external auth dependency |
| Images | Go pipeline → WebP | Consistent sizes |
| QR | VietQR (Napas 247) payload generated server-side → PNG | No third-party image dependency |
| Email | Resend free tier (3,000/month) | Recruitment and orders need it at launch |
| DB | PostgreSQL 16 (Supabase free) | Managed, backups |
| Storage | Supabase Storage (S3-compatible), public + private buckets | Same vendor |
| Hosting FE | Netlify free | Commercial/charity use allowed |
| Hosting API | Cloud Run free tier (needs card) or Render free | Scale-to-zero |
| Local dev | docker-compose: Postgres + MinIO + Mailpit + API + Next | Reproducible |

### Brand tokens

- Taken from the official flame-quill logo and the navy uniform (full palette and rules in `DESIGN-BRIEF.md` §1):
  - Flame Gold `#FDB511`, Flame Orange `#F46A22`, CTA Ember `#C9361A`;
  - Ngòi Navy `#1F2A5C`, Night `#0B1233`;
  - Paper `#FFF8EF`, Ink `#1C1F2E`.
- Headings: a Vietnamese-capable serif (Lora / Playfair Display, `vietnamese` subset). Body: Be Vietnam Pro.
- Tone: warm, literary, honest. The site should read like a letter, matching the posts' voice. Each campaign can carry its own accent colour and slogan.
- **Font caveat:** verify each font ships a Vietnamese subset before committing to it. Fallbacks: `"Be Vietnam Pro", system-ui` and `"Lora", Georgia, serif`.

---

## 10. Hosting on free tiers

| Piece | Recommended | Caveat |
|---|---|---|
| Next.js | **Netlify free** | ~100 GB bandwidth |
| Go API | **Cloud Run** free allowance | Billing account with a card |
| Go API (no card) | Render free | Sleeps after 15 min idle; ping every 10 min |
| Postgres | **Supabase free** | 500 MB; pauses after 7 days idle (the uptime ping prevents this) |
| Storage | **Supabase Storage** | 1 GB free; 350 imported images ≈ 22 MB |
| Email | **Resend free** | 3,000/month, 100/day. Bulk result emails for a large round (~100+) must be batched across days or use a paid tier for that week |
| Uptime | UptimeRobot free | |

**Vercel warning:** Vercel Hobby is for non-commercial personal use. A site that takes donations and sells products should use Netlify free or a paid plan.

**Cost now:** $0. **Later:** domain ~$12/year; a $6–12/month VPS if free tiers become limiting.

---

## 11. Media pipeline

- Accepted formats: JPEG, PNG, WebP, HEIC (converted). Max 10 MB, max 4000 px on the long edge.
- Server side:
  - sniff MIME by magic bytes;
  - strip EXIF;
  - resize to max 2000 px, WebP q82;
  - generate a 600 px thumbnail.
- Public bucket: `campaigns/`, `posts/`, `products/`, `people/`, `sponsors/`.
- **Private bucket:** `proofs/` (donation + order payment proofs) and `receipts/` (expense receipts). Admins view these through 5-minute signed URLs.

---

## 12. Content migration

Source: `fanpage/pages/ngoitinhnguyenvolunteer/posts.json` + `content/` + `media/`. See BUSINESS §15.

### 12.1 Two separate imports

1. **Posts** (automated, `cmd/import-facebook`): 127 crawled posts → `posts` + `media`.
2. **Structured history** (hand-entered seed, `db/seed/history/*.yaml`): terms, campaigns since 2024, phases, branches, locations, activities, results, sponsors, partners and known funds, taken from BUSINESS §2 and §8. This drives the archive and impact numbers. The posts alone can't, because their dates and figures contradict each other.

### 12.2 Post mapping is curated, not inferred

The crawler's `campaign` tags are often wrong (BUSINESS §15), so the importer reads a hand-maintained **`import/mapping.csv`**:

| column | meaning |
|---|---|
| `post_id` | crawler id |
| `action` | `import` \| `skip_duplicate` \| `skip_external` \| `skip_empty` |
| `campaign_code` | e.g. `TTYT26`, blank for org-level posts |
| `branch` / `activity` | optional link to seeded entities |
| `tags` | e.g. `recap`, `tuyen-dung`, `tri-an`, `thong-bao` |
| `published_at` | override, for the 37 undated posts once the BTC supplies dates |

A dry run of the importer generates the first version of this file from the tags; a person then corrects it.

### 12.3 Rules

- **Skip:**
  - duplicate pairs (keep the longer post);
  - empty or title-only posts;
  - **other organisations' reposts**: `om5y494k` (VTV), `omxcg7sb` (VAMI).
- Keep same-title posts that have different bodies (`omv78kxh`/`om3id8qo`, `ikGoTkbl`/`omlrh0tn`).
- **Status:**
  - dated + mapped → `published`;
  - undated → `draft` until the BTC supplies a date;
  - media-only → `published` only if it has a cover.
- **Titles:** strip the `[TAG]` prefix and keep the tag as a tag.
- **Body:** preserve paragraphs and the original Vietnamese. Old bank details and phone numbers stay as historical text, but the live donation box reads only from `funds`.
- **Images:** keep the order; `01.jpg` is position 1.
- **Idempotent:** `facebook_post_id` is unique, and a re-run updates.
- Expected result: ~115 imported posts, ~37 of them drafts until dated, ~340 media. Exact numbers come after the mapping pass.

---

## 13. Security and privacy

- Passwords use argon2id with a minimum of 12 characters. Login is rate-limited (5/min/IP, 20/hour/account).
- Sessions use a random 32-byte token stored as SHA-256, with a 7-day sliding expiry, and can be revoked.
- CSRF protection: a same-origin proxy + an `X-CSRF` header + an `Origin` allowlist.
- **Authorization runs on the server for every admin route**, including the campaign scope (`admin_permissions.campaign_id`).
- sqlc parameterized queries only; validation on both client and server.
- Uploads: checked by magic bytes, size and dimensions; no SVG; EXIF stripped. Proofs and receipts go to the private bucket.
- Rate limits per IP: donations 5/hour, orders 10/hour, applications 3/hour per round, lookups 30/hour. Public forms add a honeypot and optional Cloudflare Turnstile.
- Headers: HSTS, CSP, `X-Content-Type-Options`, `Referrer-Policy`.
- **Personal data:**
  - donor email/phone, buyer address/phone and applicant data are never public;
  - names appear publicly only with consent (`is_public` for donors, `public_consent` for people);
  - retention [D11]: rejected proofs 90 days; applications purged per `purge_after` (default 12 months after the round closes); delivered orders anonymised after 12 months.
- **Money integrity:**
  - funds are append-only once used;
  - every bank-account, donation-status, order-payment and financial-report change goes into the audit log;
  - a published financial report is a frozen snapshot.
- Backups: nightly `pg_dump` to storage with 14-day retention. A restore is tested once before launch.
- Dependencies: `govulncheck`, `npm audit`, Renovate.

---

## 14. SEO, performance, accessibility

- Per-page metadata, canonical URLs, OpenGraph images from campaign covers.
- `sitemap.xml`, `robots.txt`, JSON-LD (`NGO`, `Event` per campaign/location, `Article`, `Product` for the shop); admin is noindex.
- Targets: Lighthouse mobile ≥ 90 performance, ≥ 95 accessibility, 100 SEO; LCP < 2.5 s on 4G.
- WCAG AA: contrast (orange/gold never as text on Paper), focus states, alt text, keyboard navigation, labelled form fields. Address pickers must be searchable and keyboard-friendly.
- Vietnamese typography: no faux-bold, correct line-height for diacritics, no all-caps for long text. The posts use ALL-CAPS titles, so imported titles get sentence-case display with the original kept.

---

## 15. Testing and quality gates

- **Go unit tests:**
  - state machines: donation, order, application, campaign status;
  - totals and impact sums, budget math;
  - delivery-area eligibility, order pricing and promotions;
  - permission and scope checks;
  - memo/reference generation, VietQR payload.
- **Go integration:** real Postgres via Testcontainers; migrations up and down; `admin_units` seed.
- **E2E (Playwright):**
  - create a campaign with phases, branches and a fund;
  - donate → confirm → progress updates;
  - order with hand delivery → pay → deliver → lookup;
  - open a round → apply → interview → accept → confirm → appears on `/honour`;
  - close a campaign → publish the financial summary.
- **Accessibility:** axe on the main pages and every public form.
- **Quality gate per milestone:** build + lint + tests green; no secrets in the repo.
- **Seed data:**
  - `dev`: 3 users with different permissions, 1 term, 2 campaigns (one closed with a report), products, a round with applications;
  - `history`: the real seed from §12.1.

---

## 16. Build order

| # | Milestone | Contents | Depends on |
|---|---|---|---|
| M0 | Sign-off | `BUSINESS.md` + this plan reviewed; BTC answers to the BUSINESS §14 money and people questions (D6, D9, D11, D12) | — |
| M1 | Foundations | Monorepo (`web/`, `api/`, `db/`, `docs/`), docker-compose, migrations, CI, `admin_units` seed, dev seed | M0 |
| M2 | Auth, permissions, media, audit | Sessions, scoped permissions, signed uploads (public/private), image pipeline, audit log, email outbox | M1 |
| M3 | Campaign engine | Terms, departments, campaigns, phases, branches/locations/activities/results, budget, funds, contacts, sponsors/partners, posts | M2 |
| M4 | Public site | Home, campaigns archive and detail, news, about, impact, bảng vàng, sponsor page, design system | M3 |
| M5 | Donations + finance | Donation box and VietQR, proof, confirmation queue, donor list, expenses, financial summary | M3 (+ M4 for public parts) |
| M6 | Shop | Products, address pickers, delivery areas, orders, payment confirmation, delivery board, lookup | M5 |
| M7 | Recruitment + people | Rounds, form builder, pipeline, interviews, result emails, confirmations, people and roles, `/honour` | M2, M4 |
| M8 | Import + history | Mapping pass, post import, structured history seed, curation with the BTC | M3 |
| M9 | Hardening + launch | SEO, a11y, e2e, backups/restore test, deploy, Vietnamese admin guide (per role), handover | M5–M8 |

Suggested order: M1 → M2 → M3 → (M4 ‖ M8) → M5 → (M6 ‖ M7) → M9.

**Timing to confirm with the BTC:** the next seasonal campaigns are Viết Cho Em 2026 and Xuân Tình Nguyện 2027. XYT26's volunteer recruitment opened about 19/12. If the site should carry XTN 2027's recruitment and fund, M7 and M5 must be live by early December 2026. Otherwise, launch with the archive and donations first and recruitment for the 2027–28 member round (~June 2027).

---

## 17. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Scope is much larger than v1 (shop + recruitment + finance) | Delay | Strict M/S/C priorities; ship M milestones in order; tickets, services and certificates are not in M |
| Personal bank accounts that change per campaign | Trust/legal concerns, stale info | Funds model with history; donation box only from active funds; push for one stable account [D6] |
| BTC never publishes financial summaries | Transparency promise stays unkept | Dashboard nag; summary mostly computed; publishing is one click |
| Inconsistent historical data | Wrong public numbers | Structured history seed reviewed by the BTC; posts are not used as the source of figures |
| Address data out of date (2025 reform) | Wrong pickers | Seed from the official list with `source_version`; one-file update |
| Resend free limit (100/day) | Bulk result emails stall | Batch sending; temporary paid tier during big rounds |
| Free-tier cold starts | Slow admin first load | Uptime ping; VPS later |
| Proof-image fraud | Wrong totals | Manual review against the bank app; duplicate image hash check; transparent ledger |
| Personal data (applicants, buyers, donors) | Privacy breach | Private by default, consent for public names, retention purge, scoped access |
| Rotating volunteers forget how admin works | Data stops being entered | Per-role Vietnamese guides; small per-role screens; duplicate-from-last-edition |

---

## 18. Open decisions

The full list lives in BUSINESS §13 and §14. The ones that block a milestone:

| Blocks | Decision |
|---|---|
| M0 / M5 | **D6:** one stable organisation account vs per-campaign personal accounts |
| M5 | **D12:** level of detail of the financial summary; back-fill of past campaigns? |
| M6 | **D9:** hand-delivery areas, courier, who pays shipping |
| M7 | **D11:** retention periods; consent wording for the roll of honour |
| M8 | **D10:** who curates the mapping and dates the 37 undated posts |
| M9 | **D7:** domain; **D8:** Vietnamese only at launch? |
| Phase 1.1 | **D3:** certificate rules, stamp, signature |
| Schedule | Must the site be live for XTN 2027 (early December 2026)? |

---

## 19. Definition of done (Phase 1)

- A visitor can see every campaign since 2024 with locations, activities, results and photos, and impact numbers computed from those results.
- A `content` user can create a campaign with phases, branches, locations, budget and a fund without a developer.
- A donor can give via VietQR + proof; `finance` confirms; progress and the donor list update.
- A buyer can order with a validated province/ward address and look up the order; `shop` can run deliveries from the board.
- A round can go from open → interview → results email → confirmation → names on `/honour`.
- At least one campaign has a published financial summary.
- The bảng vàng lists all known sponsors and partners.
- Facebook posts are imported through the curated mapping, with no duplicates and no external reposts.
- Lighthouse mobile ≥ 90/95/100; nightly backups with a tested restore.
- Each role has a Vietnamese admin guide, and the handover with the BTC is done.
