import { routes } from "@/shared/config/routes"

import { Section } from "@/shared/layout/section"
import { Button } from "@/shared/ui/button"
import { SectionHeading } from "@/shared/ui/section-heading"
import Link from "next/link"

import type { Post } from "../domain/post"
import { PostCard } from "./post-card"

/** Home: the three latest posts as cards, topic chip on the photo. */
function NewsSection({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null
  return (
    <Section spacing="lg" aria-labelledby="news-title" containerClassName="flex flex-col items-center gap-10 md:gap-14">
      <SectionHeading id="news-title" eyebrow="Tin tức" title="Chuyện từ các địa bàn" className="items-center text-center" />
      <ul className="grid w-full gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((p, i) => (
          <li key={p.slug} className="reveal" style={{ "--i": i } as React.CSSProperties}>
            <PostCard post={p} />
          </li>
        ))}
      </ul>
      <Button asChild size="lg" variant="outline">
        <Link href={routes.news}>Tất cả bài viết</Link>
      </Button>
    </Section>
  )
}

export { NewsSection }
