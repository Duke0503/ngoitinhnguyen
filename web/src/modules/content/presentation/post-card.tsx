import Image from "next/image"
import Link from "next/link"

import { routes } from "@/shared/config/routes"
import { formatDate } from "@/shared/lib/format"
import { Chip } from "@/shared/ui/chip"

import type { Post } from "../domain/post"

/** Grid card used by the news list and “related posts”. */
function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <article>
      <Link href={routes.post(post.slug)} className="group/post flex h-full flex-col gap-3.5 md:gap-4">
        <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-navy/5">
          <Image
            src={post.cover.src}
            alt=""
            fill
            sizes="(min-width: 1200px) 384px, (min-width: 768px) 33vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-300 group-hover/post:scale-[1.03] motion-reduce:transition-none"
          />
          <Chip tone="navy" size="sm" className="absolute top-3 left-3 shadow-sm">
            {post.tag}
          </Chip>
        </div>
        <time className="text-xs text-muted-ink">{formatDate(post.publishedOn)}</time>
        <h3 className="line-clamp-3 font-head text-lg leading-snug font-semibold text-navy transition-colors group-hover/post:text-cta md:text-xl">{post.title}</h3>
        {post.excerpt && <p className="line-clamp-2 text-[15px] leading-relaxed text-muted-ink">{post.excerpt}</p>}
      </Link>
    </article>
  )
}

export { PostCard }
