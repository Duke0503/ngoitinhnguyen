import { relatedPosts, topicsOf, type Post, type PostDetail } from "../domain/post"

/** Port: implemented by infrastructure (imported data today, the Go API later). Newest first. */
export interface PostRepository {
  all(): Promise<PostDetail[]>
  /** Hand-picked posts for the Home page, best first. */
  featured(limit: number): Promise<PostDetail[]>
}

const summary = (p: Post): Post => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, tag: p.tag, publishedOn: p.publishedOn, cover: p.cover })

export function makePostQueries(repo: PostRepository) {
  return {
    featured: async (limit = 3) => (await repo.featured(limit)).map(summary),
    latest: async (limit = 4) => (await repo.all()).slice(0, limit).map(summary),
    /** Everything for the news page (summaries only; bodies stay on the detail pages). */
    list: async () => {
      const posts = (await repo.all()).map(summary)
      return { posts, topics: topicsOf(posts) }
    },
    slugs: async () => (await repo.all()).map((p) => p.slug),
    bySlug: async (slug: string) => (await repo.all()).find((p) => p.slug === slug) ?? null,
    related: async (post: PostDetail, limit = 3) => relatedPosts(await repo.all(), post, limit).map(summary),
  }
}
