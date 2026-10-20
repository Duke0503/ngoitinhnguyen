"use client"

import { useState } from "react"

import { Section } from "@/shared/layout/section"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/lib/utils"

import { PAGE_SIZE, type Post } from "../domain/post"
import { PostCard } from "./post-card"

type NewsListProps = { posts: Post[]; topics: { tag: string; count: number }[] }

const ALL = "all"

/** Topic filter + “load more”. Everything is already on the page, so filtering is instant and needs no request. */
function NewsList({ posts, topics }: NewsListProps) {
  const [topic, setTopic] = useState(ALL)
  const [shown, setShown] = useState(PAGE_SIZE)

  const matching = topic === ALL ? posts : posts.filter((p) => p.tag === topic)
  const visible = matching.slice(0, shown)
  const options = [{ tag: ALL, label: "Tất cả", count: posts.length }, ...topics.map((t) => ({ ...t, label: t.tag }))]

  const choose = (next: string) => {
    setTopic(next)
    setShown(PAGE_SIZE)
  }

  return (
    <Section spacing="none" tone="white" className="pt-8 pb-14 md:pt-12 md:pb-24" aria-label="Danh sách bài viết" containerClassName="flex flex-col gap-8 md:gap-12">
      <div role="group" aria-label="Lọc theo chủ đề" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
        {options.map((o) => {
          const on = o.tag === topic
          return (
            <button
              key={o.tag}
              type="button"
              aria-pressed={on}
              onClick={() => choose(o.tag)}
              className={cn(
                "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-navy/20",
                on ? "border-navy bg-navy text-white" : "border-field bg-white text-navy hover:border-navy/50"
              )}
            >
              {o.label}
              <span className={cn("text-xs tabular-nums", on ? "text-white/70" : "text-muted-ink")}>{o.count}</span>
            </button>
          )
        })}
      </div>

      <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 md:gap-y-14">
        {visible.map((p, i) => (
          <li key={p.slug}>
            <PostCard post={p} priority={i < 3} />
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-center gap-3">
        <p role="status" className="text-sm text-muted-ink">
          Đang hiển thị {visible.length} / {matching.length} bài viết
        </p>
        {visible.length < matching.length && (
          <Button variant="outline" size="lg" onClick={() => setShown((n) => n + PAGE_SIZE)}>
            Xem thêm bài viết
          </Button>
        )}
      </div>
    </Section>
  )
}

export { NewsList }
