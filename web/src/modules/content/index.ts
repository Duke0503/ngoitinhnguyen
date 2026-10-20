// Public API of the Content module (composition root: wires the default repository).
import { makePostQueries } from "./application/post-queries"
import { jsonPostRepository } from "./infrastructure/json-post-repository"

export const postQueries = makePostQueries(jsonPostRepository)

export type { Post, PostDetail } from "./domain/post"
export { NewsSection } from "./presentation/news-section"
export { NewsList } from "./presentation/news-list"
export { PostBody } from "./presentation/post-body"
export { PostCard } from "./presentation/post-card"
export { PostGallery } from "./presentation/post-gallery"
