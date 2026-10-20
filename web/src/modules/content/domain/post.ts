// Content bounded context: news posts (imported from Facebook or written in the CMS).

export type Post = {
  slug: string
  title: string
  excerpt?: string
  /** Topic shown in the meta line and used as the list filter (“Đèn Trăng 2”, “Tuyển thành viên”). */
  tag: string
  publishedOn: string
  cover: { src: string; alt: string }
}

export type PostBlock = { type: "p"; text: string } | { type: "hr" }

export type PostDetail = Post & {
  blocks: PostBlock[]
  /** Photos after the cover. */
  gallery: { src: string; alt: string }[]
  /** Campaign the post belongs to, when it is about one. */
  campaignSlug?: string
}

export const PAGE_SIZE = 12

const byNewest = (a: Post, b: Post) => b.publishedOn.localeCompare(a.publishedOn)

/** First post with a cover and an excerpt leads the section; the rest are listed. */
export function splitFeatured(posts: Post[]): { featured: Post | null; rest: Post[] } {
  const featured = posts.find((p) => p.excerpt) ?? posts[0] ?? null
  return { featured, rest: posts.filter((p) => p !== featured).sort(byNewest) }
}

/** Topics with their post counts, most posts first (ties: newest topic first). */
export function topicsOf(posts: Post[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const p of posts) counts.set(p.tag, (counts.get(p.tag) ?? 0) + 1)
  return [...counts].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count)
}

/** Other posts of the same campaign, else of the same topic; newest first. */
export function relatedPosts(all: (Post & { campaignSlug?: string })[], current: PostDetail, limit = 3): Post[] {
  const same = (p: Post & { campaignSlug?: string }) => (current.campaignSlug ? p.campaignSlug === current.campaignSlug : p.tag === current.tag)
  return all
    .filter((p) => p.slug !== current.slug && same(p))
    .sort(byNewest)
    .slice(0, limit)
}
