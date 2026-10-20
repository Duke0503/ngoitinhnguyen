// Imports the crawled fanpage posts (../fanpage/.../posts/*.md) into src/modules/content/infrastructure/data/posts.json
// and copies up to 5 images per post to public/images/posts/<slug>/. Re-runnable; output is committed.
// Rules: undated posts are skipped, [TAG] in the post's own title decides the campaign, same-day same-title
// duplicates keep the longest, near-empty posts and reposts of other organisations' articles are skipped.
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"

import { classify, excerptOf, parsePost, parseTag, slugify, wordCount } from "../src/modules/content/infrastructure/facebook/clean.ts"

const postsDir = resolve("../fanpage/pages/ngoitinhnguyenvolunteer/content/posts")
const outJson = "src/modules/content/infrastructure/data/posts.json"
const outImages = "public/images/posts"
const MAX_IMAGES = 5
const MIN_WORDS = 30
const REPOST_IDS = new Set(["5y494k", "xcg7sb"]) // VTV and VAMI articles shared by the page (suffixes of om5y494k, omxcg7sb)

const files = readdirSync(postsDir).filter((f) => f.endsWith(".md"))
const skipped = { undated: 0, empty: 0, repost: 0, duplicate: 0, noImage: 0 }
const candidates = []

for (const f of files) {
  const md = readFileSync(join(postsDir, f), "utf8")
  if (!/^date:\s*20\d\d-/m.test(md)) {
    skipped.undated++
    continue
  }
  const p = parsePost(md)
  const suffix = p.id.slice(-8)
  if ([...REPOST_IDS].some((r) => suffix.endsWith(r))) {
    skipped.repost++
    continue
  }
  if (wordCount(p.blocks) < MIN_WORDS) {
    skipped.empty++
    continue
  }
  const images = p.images.map((rel) => resolve(postsDir, rel)).filter(existsSync)
  if (images.length === 0) {
    skipped.noImage++
    continue
  }
  const tag = parseTag(p.rawFirstLine)
  const { topic, campaignSlug } = classify(tag, p.title, p.date)
  candidates.push({ id: suffix, date: p.date, title: p.title, blocks: p.blocks, images, topic, campaignSlug })
}

// Same date + same normalised title → keep the longest version.
const key = (c) => `${c.date}|${slugify(c.title, 80)}`
const best = new Map()
for (const c of candidates) {
  const k = key(c)
  const cur = best.get(k)
  if (!cur || wordCount(c.blocks) > wordCount(cur.blocks)) best.set(k, c)
  skipped.duplicate += cur ? 1 : 0
}

const used = new Set()
const posts = [...best.values()]
  .sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id))
  .map((c) => {
    let slug = slugify(c.title)
    if (used.has(slug)) slug = `${slug}-${c.id.toLowerCase()}`
    used.add(slug)
    return { ...c, slug }
  })

rmSync(outImages, { recursive: true, force: true })
const out = posts.map((c) => {
  const dir = join(outImages, c.slug)
  mkdirSync(dir, { recursive: true })
  const images = c.images.slice(0, MAX_IMAGES).map((src, i) => {
    const name = `${String(i + 1).padStart(2, "0")}.jpg`
    copyFileSync(src, join(dir, name))
    return `/images/posts/${c.slug}/${name}`
  })
  return {
    slug: c.slug,
    sourceId: c.id,
    title: c.title,
    excerpt: excerptOf(c.blocks),
    topic: c.topic,
    ...(c.campaignSlug ? { campaignSlug: c.campaignSlug } : {}),
    publishedOn: c.date,
    images,
    blocks: c.blocks,
  }
})

mkdirSync("src/modules/content/infrastructure/data", { recursive: true })
writeFileSync(outJson, `${JSON.stringify(out, null, 1)}\n`)
const byTopic = Object.entries(Object.groupBy(out, (p) => p.topic)).map(([t, l]) => `${t}: ${l.length}`)
console.log(`${files.length} files → ${out.length} posts`, skipped, "\n" + byTopic.join("\n"))
