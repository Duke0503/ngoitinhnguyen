import Image from "next/image"
import Link from "next/link"

import { routes } from "@/shared/config/routes"
import { formatDate } from "@/shared/lib/format"

import type { Post } from "../domain/post"

/** Equal-height card: photo with the topic on its corner, date, centred title, excerpt, “Đọc tiếp >>>”. Used by the news list and related posts. */
function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <article className="h-full">
      <Link href={routes.post(post.slug)} className="group/post flex h-full flex-col items-center gap-3 rounded-md bg-white p-3.5 text-center shadow-[0_8px_22px_-8px_rgba(11,18,51,0.2)] transition-shadow hover:shadow-[0_14px_30px_-8px_rgba(11,18,51,0.3)] md:p-5">
        <div className="relative h-[180px] w-full overflow-hidden md:h-[200px]">
          <Image src={post.cover.src} alt="" fill priority={priority} sizes="(min-width: 1200px) 340px, (min-width: 640px) 45vw, 100vw" className="object-cover transition-transform duration-500 group-hover/post:scale-[1.04] motion-reduce:transition-none" />
          <span className="absolute top-0 left-0 bg-navy px-3 py-1.5 text-[11px] font-bold tracking-[0.1em] text-white uppercase">{post.tag}</span>
        </div>
        <time className="text-[13px] font-semibold text-muted-ink">{formatDate(post.publishedOn)}</time>
        <h3 className="line-clamp-3 font-head text-[21px] leading-tight font-semibold text-navy transition-colors group-hover/post:text-cta">{post.title}</h3>
        {post.excerpt && <p className="line-clamp-3 flex-1 text-[15px] leading-normal text-muted-ink">{post.excerpt}</p>}
        <span className="text-[15px] font-bold text-cta">Đọc tiếp &gt;&gt;&gt;</span>
      </Link>
    </article>
  )
}

export { PostCard }
