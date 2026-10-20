# What we learned from bluedragon.org (and how Ngòi applies it)

Studied on 2026-10-20: home, donate, work-and-impact, a story page, menus. Aim: understand the *purpose* behind each choice, then use the principle with Ngòi's own brand (navy, flame, Lora + Be Vietnam Pro, paper cream), photos and Vietnamese copy. We copy reasoning, not pixels.

## Why Blue Dragon looks the way it does

| # | What they do | Purpose | Ngòi version |
|---|---|---|---|
| 1 | Every page opens on a full-width photo of a child's face, looking at the camera, with one short headline | Emotion and trust before words; the photo is the page's identity; visitors decide in seconds | Hero = crowd of children and volunteers with lanterns, headline on a navy fade so text stays legible (theirs is hard to read) |
| 2 | One idea per band; the band's background changes at each topic shift (white, tint, gradient, colour) | Rhythm makes a long page scannable; colour change = "new thought" | paper → white → navy→flame slanted band → white; never two similar bands in a row |
| 3 | Few colours with fixed jobs: blue = information, orange = the action | Donors always know what is clickable; the ask stays the loudest thing | Navy = information, flame-orange = emphasis, **ember red-orange = Ủng hộ only** |
| 4 | Centred, single-column copy; very short sentences; big coloured headings | Readable by people who skim, on phones, in a second language | Same: centred statements, 1-2 line subtitles, one CTA per band |
| 5 | Photo cards with the caption on the picture; photos overlap with label tabs | Information carried by images, editorial feel instead of a box grid | 2×2 photo cards with caption on a navy shade; (next) overlapping collage with gold label tabs on About/Impact |
| 6 | Counters directly before "Donate Today" | Proof, then ask | Counters (count-up) then Ủng hộ ngay |
| 7 | Rounded corners and soft shadows on photos | Warmth, approachability | 16–20px radius, soft navy shadow |
| 8 | Diagonal band edges and scroll-in motion | Break the box grid; guide the eye down; feel alive | Slanted gradient band; calm fade-up on scroll |
| 9 | Story page: one 700px reading column, full-column photos with captions, big pull quotes, tinted background, short narrative headings ("Another day", "Same spot") | Long reads stay comfortable; a story arc humanises the cause | `/news/[slug]` becomes a story layout: tinted page, pull quote from the post, photo + caption after each section |
| 10 | Donate page is nearly empty: hero, three bullets "your donation will…", one choice (once / monthly) | Fewer choices = more gifts | `/donate`: hero photo, three bullets, then amount → VietQR |
| 11 | Persistent orange Donate + blue Fundraiser pills in the header | Two priority actions always visible | Ủng hộ (ember) + Tình nguyện (navy outline) in the header |
| 12 | Trust seals and safeguarding policies in the footer | A charity that works with children must prove safety and honesty | Legal patron (VNV) decision letter, financial report link, **child-safeguarding page** (needs BTC text) |

## What not to copy

- Pop-up over the hero and cookie wall on first paint.
- White text on busy photos without a shade.
- Tiny grey nav text; generic WordPress template feel.
- Multi-country structure, monthly giving (no payment gateway yet).

## Images: constraint and plan

All 339 unique photos downloaded from the fanpage are Facebook thumbnails (max 590 px; a few 1,400 px banners that are posters). Many carry the programme frame (XUÂN YÊU THƯƠNG / ĐÈN TRĂNG) along an edge.

- 30 photos were picked and cropped (frames cut off) into `design/assets/photos2/`: see names there.
- Wide heroes are masked by a dark fade and kept ≤ 960 px wide so 590 px sources are enlarged ≤ 1.6×.
- For BD-level quality, ask BTC for originals (≥ 1,920 px) of: hero, one per programme, community band, story covers.
