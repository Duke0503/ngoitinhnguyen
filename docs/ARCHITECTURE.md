# Architecture: DDD + Clean Architecture

**Status:** v1, 20/10/2026. Companion to `BUSINESS.md` (what), `PLAN.md` (how / scope), `DESIGN-BRIEF.md` (look).

## 1. Bounded contexts

Taken from BUSINESS.md §4 and §11. Each context owns its language, data and rules. Contexts talk through IDs and application services, never through each other's tables or internals.

| Context | Owns (aggregates) | Key rules / invariants |
|---|---|---|
| **Organisation** | Term, Department, SiteSettings | One active term; departments belong to a term |
| **Campaigns** | Campaign (with Phases, Branches → Locations → Activities → Results, BudgetLines, ChangeNotices, Contacts) | Status lifecycle draft → announced → fundraising → on_site → closing → closed; budget totals computed; goal = Σ budget unless overridden with a reason |
| **Fundraising** | Fund, Donation, Expense, FinancialReport | Funds are append-only once used; only confirmed donations count; a published report is a frozen snapshot |
| **Shop** | Product (with Variants), Order, DeliveryArea | Prices are computed server-side; hand delivery only inside the campaign's delivery areas; order status machine |
| **Recruitment** | RecruitmentRound, Application | Window, capacity and auto-close; pipeline applied → screening → interview → accepted/rejected/waitlist → confirmed/declined |
| **People** | Person, RoleAssignment | Public listing only with consent |
| **Sponsorship** | Sponsor, Sponsorship, SponsorTier | Tier counts only when ≥ 70% of the package is cash |
| **Content** | Post, Media | Publish triggers revalidation |
| **Identity & Access** | AdminUser, Permission (scoped to a campaign), Session | Every admin action is checked against permission + campaign scope |
| *Shared kernel* | `Money` (VND), `Slug`, `DateRange`, `AdminUnit` (tỉnh/thành → phường/xã), `PhoneVN` | Pure value objects, no I/O |

## 2. Backend (Go): one module per context, clean layers

```
api/
  cmd/api/                 main: wiring only (config, DB, routers)
  internal/
    shared/                shared kernel: money, slug, daterange, adminunit, phone, errors
    campaigns/
      domain/              entities, value objects, domain errors, repository interfaces
      app/                 use cases (commands/queries) + ports (interfaces they need)
      adapters/
        http/              chi handlers, DTOs, request validation → calls app
        postgres/          sqlc queries implementing domain/app ports
    fundraising/  shop/  recruitment/  people/  sponsorship/  content/  identity/  organisation/
  db/migrations/           goose SQL
```

**Dependency rule:** `adapters → app → domain`. `domain` imports nothing outside the standard library and `shared`. Cross-context calls go through an app-level interface: e.g. Fundraising asks Campaigns "is this campaign accepting donations?" through a port and never reads campaign tables.

## 3. Frontend (Next.js): same contexts, clean layers

```
web/src/
  app/                       Next.js routes: thin; compose module presentation; no business logic
  shared/
    ui/                      design system primitives (no domain knowledge), see §4
    layout/                  site chrome: SiteHeader, SiteFooter, Section, Container, Breadcrumb
    lib/                     cn(), formatVnd(), formatDate(), small helpers
    config/                  site nav, contacts, brand constants
  modules/
    campaigns/
      domain/                TS types + pure functions (e.g. progress %, status labels)
      application/           use cases / query hooks (TanStack Query) depending on ports
      infrastructure/        API client implementing the ports (fetch → Go API)
      presentation/          domain components (CampaignFeature, LocationCard, …)
    fundraising/  shop/  recruitment/  people/  sponsorship/  content/  organisation/
```

**Dependency rule:**
- `app/` → `modules/*/presentation` → `application` → `domain`;
- `infrastructure` implements `application` ports;
- `presentation` may use `shared/ui` and `shared/layout`;
- `shared/*` never imports from `modules/*`;
- modules don't import each other's internals, only the other module's public `index.ts`.

ESLint import rules enforce this (`eslint-plugin-boundaries`).

## 4. Shared component inventory (scanned from the Pencil design)

Source: `design/ngoi-website.pen` (7 pages × desktop/mobile). "Used in" uses H=Home, C=Campaign, D=Donate, A=About, R=Recruitment, S=Sponsors, P=Shop.

### 4.1 Design tokens → Tailwind theme
| Token | Value |
|---|---|
| Colors | flame-gold `#FDB511`, flame-orange `#F46A22`, ember `#E5391F`, cta `#C9361A`, navy `#1F2A5C`, night `#0B1233`, paper `#FFF8EF`, ink `#1C1F2E`, muted `#5B6075`, line `#EEE3D3`, field-border `#D9CDBB`; campaign accents moon `#F2C14E`, leaf `#6BA539`, blossom `#EF8FB0` |
| Fonts | `font-head` Lora (500/600, italic), `font-body` Be Vietnam Pro (400–800) |
| Gradient | `flame`: 90° #FDB511 → #F46A22 (60%) → #E5391F |
| Radius | 6 (photos), 8 (inputs), 10–12 (cards), full (buttons, chips) |
| Section padding | desktop 96–104 × 120; mobile 48–56 × 20 |

### 4.2 Primitives: `shared/ui`
| Component | Variants / props | Used in |
|---|---|---|
| `Button` | `primary` (cta), `outline` (navy), `gold` (on dark), `ghost-light` (on dark); sizes sm/md/lg; `fullWidth`; leading/trailing icon | all |
| `TextLink` | arrow link (“Xem tất cả →”), underline link; light/dark | H C A S |
| `Chip` | tones neutral, navy (solid), success, warning, blossom, translucent (on dark); optional icon; selectable (for chip groups) | all |
| `Eyebrow` | uppercase tracked label; tone orange / gold / cta; leading dash or live dot | all |
| `SectionHeading` | eyebrow + title + sub; size lg/md/sm; `tone="dark"` | all |
| `FlameRule` | short gradient underline | H A |
| `Stat` | big serif number + label; light/dark; divider left/top | H C A S |
| `ProgressBar` | flame fill, track; value/max | H C |
| `MeterRow` | label, value, thin bar (report bars) | H C |
| `Card` | flat (white + 1px line); `paper`; `night`; padding sizes | all |
| `Photo` | next/image with radius, cover, aspect / fixed height, caption | all |
| `MetaItem` | icon + text (calendar, map-pin) | H C P |
| `MetaLine` | TAG • date | H |
| `Callout` | info / warning / success / blossom / navy; icon + text | C D P R |
| `Tabs` | underline tabs; pill tabs (`ChipTabs`) | C |
| `Steps` | horizontal numbered stepper (Donate); progress-bar steps (mobile) | D |
| `ProcessList` | numbered circles with title + description | R |
| `StatusTimeline` | horizontal/vertical dots with done/current/pending | P |
| `NumberedRow` | 01 · title · description · ↗ (ways to help) | H |
| `Field` | label, optional tag, hint, error; wraps the inputs below | D R P |
| `Input`, `Textarea` | default / focus / with trailing icon / valid | D R P |
| `Select` | native-styled select (Tỉnh/Thành) | R P |
| `Combobox` | searchable select with grouped hint (Phường/Xã) | P |
| `Switch`, `Checkbox` | brand navy | D |
| `SegmentedControl` | options with sub-label | P |
| `QuantityStepper` | − n + | P |
| `FileDropzone` | icon, title, hint | D |
| `CopyField` | label + value + “Sao chép” button | D |
| `Table` | simple table (donors) + `CompareTable` (tiers ✓ / text / —) | C S |
| `BrandMark` | flame quill + “Ngòi Tình Nguyện / VIẾT CHO EM”; light/dark; sm/md | header/footer/A |
| `Icon` | lucide-react re-export with brand defaults | all |

### 4.3 Layout: `shared/layout`
| Component | Notes |
|---|---|
| `SiteHeader` | logo, 5 nav items with active state, “Ủng hộ” CTA; mobile: CTA + menu sheet |
| `MobileNav` | sheet with nav + CTA |
| `SiteFooter` | brand + about, 3 link columns, bottom bar with tagline |
| `Section` | background tone (paper / white / night / navy), responsive padding, `Container` (max 1200) |
| `Breadcrumb` | light/dark |

### 4.4 Domain components (built later, with their pages, in `modules/*/presentation`)
| Module | Components |
|---|---|
| campaigns | CampaignFeature, JourneyStop, PhaseRow, LocationCard, ChangeNotice, CampaignHero, KeyStats |
| fundraising | DonateBox / AmountPresets, VietQRCard, ConfirmTransferForm, DonationSuccess, DonorList, FinancialReportCard |
| shop | ProductRow, OrderSummary, AddressFields (province → ward), DeliveryMethod, OrderTracking |
| recruitment | RecruitmentStatus, WayToJoinCard, DepartmentCard, ApplicationForm |
| people | PersonRow (BTC list) |
| sponsorship | SponsorTile, TierTable, TierCard (mobile), ProofPanel |
| content | NewsFeatured, NewsListItem |
| organisation | MissionTriad, OriginTimeline, LegalFacts |

## 5. Conventions
- Vietnamese UI text lives in the presentation layer (later in `messages/vi.json` if we add EN).
- Money is an integer number of VND end to end (`Money` value object); formatting only in presentation (`formatVnd`).
- Every shared component has a story on `/dev/components` (component gallery) to compare against the Pencil frames.
