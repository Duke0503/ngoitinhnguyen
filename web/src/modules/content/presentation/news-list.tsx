"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"

import { routes } from "@/shared/config/routes"
import { Section } from "@/shared/layout/section"
import { formatDate } from "@/shared/lib/format"
import { pageCount, pageWindow } from "@/shared/lib/pagination"
import { cn } from "@/shared/lib/utils"
import { NativeSelect } from "@/shared/ui/native-select"

import { PAGE_SIZE, type Post } from "../domain/post"
import { PostCard } from "./post-card"

type NewsListProps = { posts: Post[]; topics: { tag: string; count: number }[]; /** Hand-picked story shown large on the first page (the latest posts are often posters, not photos). */ leadSlug?: string }

const MAIN_TOPICS = 4
const chipBase = "inline-flex h-10 shrink-0 items-center rounded-[4px] border px-4 text-sm font-semibold transition-colors outline-none focus-visible:ring-3 focus-visible:ring-navy/25"

const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/gi, "d")
    .toLowerCase()

/** Topic chips + search, a lead story on the first page, equal cards and numbered pages (filtering is local; it is all on the page already). */
function NewsList({ posts, topics, leadSlug }: NewsListProps) {
  const [topic, setTopic] = useState("")
  const [q, setQ] = useState("")
  const [page, setPage] = useState(1)

  const main = topics.slice(0, MAIN_TOPICS)
  const more = topics.slice(MAIN_TOPICS)
  const query = fold(q.trim())
  const matching = posts.filter((p) => (!topic || p.tag === topic) && (!query || fold(`${p.title} ${p.excerpt ?? ""} ${p.tag}`).includes(query)))
  const last = pageCount(matching.length, PAGE_SIZE)
  const current = Math.min(page, last)
  const leadPost = matching.find((p) => p.slug === leadSlug)
  const ordered = leadPost ? [leadPost, ...matching.filter((p) => p !== leadPost)] : matching
  const slice = ordered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
  const lead = current === 1 ? slice[0] : undefined
  const cards = lead ? slice.slice(1) : slice
  const choose = (next: string) => {
    setTopic(next)
    setPage(1)
  }

  return (
    <Section spacing="none" tone="paper" className="pt-6 pb-16 md:pb-24" aria-label="Danh sách bài viết" containerClassName="flex flex-col items-center gap-8 md:gap-10">
      <div role="group" aria-label="Lọc theo chủ đề" className="-mx-5 flex w-[calc(100%+40px)] snap-x scroll-px-5 items-center gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:w-full md:flex-wrap md:justify-center md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
        {[{ tag: "", label: "Tất cả" }, ...main.map((t) => ({ tag: t.tag, label: t.tag }))].map((o) => (
          <button key={o.label} type="button" aria-pressed={topic === o.tag} onClick={() => choose(o.tag)} className={cn(chipBase, "snap-start", topic === o.tag ? "border-flame-orange bg-flame-orange text-night" : "border-field bg-white text-navy hover:border-navy/50")}>
            {o.label}
          </button>
        ))}
        {more.length > 0 && (
          <NativeSelect aria-label="Chủ đề khác" value={more.some((t) => t.tag === topic) ? topic : ""} onChange={(e) => e.target.value && choose(e.target.value)} className="h-10 w-auto shrink-0 rounded-[4px] bg-white text-sm font-semibold text-navy">
            <option value="">Chủ đề khác</option>
            {more.map((t) => (
              <option key={t.tag}>{t.tag}</option>
            ))}
          </NativeSelect>
        )}
        <label className="relative shrink-0">
          <span className="sr-only">Tìm bài viết</span>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-ink" />
          <input type="search" value={q} onChange={(e) => (setQ(e.target.value), setPage(1))} placeholder="Tìm…" className="h-10 w-32 rounded-[4px] border border-field bg-white pr-3 pl-9 text-sm outline-none focus-visible:ring-3 focus-visible:ring-navy/25 md:w-44" />
        </label>
      </div>

      {matching.length === 0 ? (
        <div role="status" className="flex w-full max-w-[520px] flex-col items-center gap-3 rounded-md border border-line bg-white p-10 text-center">
          <p className="font-head text-[22px] font-semibold text-navy">Không tìm thấy bài viết nào</p>
          <p className="text-[15px] text-muted-ink">Thử bỏ bớt bộ lọc hoặc tìm bằng từ khoá khác.</p>
          <button type="button" onClick={() => (setTopic(""), setQ(""), setPage(1))} className="h-11 rounded-full border-[1.5px] border-navy px-5 text-sm font-semibold text-navy hover:bg-navy/5">
            Xoá bộ lọc
          </button>
        </div>
      ) : (
        <>
          {lead && (
            <article className="w-full">
              <Link href={routes.post(lead.slug)} className="group/lead grid overflow-hidden rounded-lg bg-white shadow-[0_12px_30px_-10px_rgba(11,18,51,0.25)] md:grid-cols-[700px_1fr]">
                <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:h-[420px]">
                  <Image src={lead.cover.src} alt="" fill priority sizes="(min-width: 768px) 700px, 100vw" className="object-cover transition-transform duration-700 group-hover/lead:scale-[1.03] motion-reduce:transition-none" />
                  <span className="absolute top-0 left-0 bg-navy px-3.5 py-1.5 text-xs font-bold tracking-[0.1em] text-white uppercase">{lead.tag}</span>
                </div>
                <div className="flex flex-col justify-center gap-3.5 p-6 md:gap-4 md:p-11">
                  <p className="text-xs font-bold tracking-[0.12em] text-orange-ink uppercase">Nổi bật · {formatDate(lead.publishedOn)}</p>
                  <h2 className="font-head text-[26px] leading-tight font-semibold text-navy transition-colors group-hover/lead:text-cta md:text-4xl md:leading-[1.2]">{lead.title}</h2>
                  {lead.excerpt && <p className="text-[15px] leading-relaxed text-muted-ink md:text-[17px] md:leading-[1.6]">{lead.excerpt}</p>}
                  <span className="text-base font-bold text-cta">Đọc tiếp &gt;&gt;&gt;</span>
                </div>
              </Link>
            </article>
          )}
          {cards.length > 0 && (
            <ul className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-7">
              {cards.map((p, i) => (
                <li key={p.slug}>
                  <PostCard post={p} priority={i < 3 && !lead} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {last > 1 && (
        <nav aria-label="Phân trang" className="flex flex-wrap items-center justify-center gap-1.5">
          <PageButton disabled={current === 1} onClick={() => setPage(current - 1)} label="Trang trước">
            ‹
          </PageButton>
          {pageWindow(current, last).map((n, i) =>
            n === 0 ? (
              <span key={`gap-${i}`} aria-hidden className="px-1 text-muted-ink">
                …
              </span>
            ) : (
              <PageButton key={n} active={n === current} onClick={() => setPage(n)} label={`Trang ${n}`}>
                {n}
              </PageButton>
            )
          )}
          <PageButton disabled={current === last} onClick={() => setPage(current + 1)} label="Trang sau">
            ›
          </PageButton>
        </nav>
      )}
      <p role="status" className="-mt-4 text-[13px] text-muted-ink">
        Hiển thị {matching.length === 0 ? 0 : (current - 1) * PAGE_SIZE + 1}–{(current - 1) * PAGE_SIZE + slice.length} / {matching.length} bài viết
      </p>
    </Section>
  )
}

function PageButton({ children, active, disabled, onClick, label }: { children: React.ReactNode; active?: boolean; disabled?: boolean; onClick: () => void; label: string }) {
  return (
    <button type="button" aria-label={label} aria-current={active ? "page" : undefined} disabled={disabled} onClick={onClick} className={cn("h-10 min-w-10 rounded-[3px] border px-3 text-sm font-semibold outline-none focus-visible:ring-3 focus-visible:ring-navy/25 disabled:opacity-40", active ? "border-flame-orange bg-flame-orange text-night" : "border-field bg-white text-navy hover:border-navy/50")}>
      {children}
    </button>
  )
}

export { NewsList }
