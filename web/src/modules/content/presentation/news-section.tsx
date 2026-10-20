import Image from "next/image"
import Link from "next/link"

import { routes } from "@/shared/config/routes"
import { Section } from "@/shared/layout/section"
import { formatDate } from "@/shared/lib/format"
import { Eyebrow } from "@/shared/ui/eyebrow"
import { TextLink } from "@/shared/ui/text-link"

import type { Post } from "../domain/post"

const meta = (p: Post) => `${p.tag} · ${formatDate(p.publishedOn)}`

/** Home: one lead story with a big photo and two smaller ones beside it, like a front page. */
function NewsSection({ posts }: { posts: Post[] }) {
  const [lead, ...side] = posts
  if (!lead) return null

  return (
    <Section spacing="lg" aria-labelledby="news-title" containerClassName="flex flex-col gap-8 md:gap-12">
      <div className="flex items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <Eyebrow tone="cta">Mới đăng trên fanpage</Eyebrow>
          <h2 id="news-title" className="font-head text-[30px] leading-[1.2] font-semibold text-balance text-navy md:text-[44px]">
            Chuyện từ ấp đảo Thiềng Liềng
          </h2>
        </div>
        <TextLink href={routes.news} underline className="shrink-0 max-md:hidden">
          Tất cả bài viết
        </TextLink>
      </div>

      <div className="grid gap-8 md:grid-cols-[700px_1fr] md:gap-12">
        <article className="reveal">
          <Link href={routes.post(lead.slug)} className="group/news flex flex-col gap-3.5 md:gap-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] md:aspect-auto md:h-[420px] md:rounded-md">
              <Image src={lead.cover.src} alt={lead.cover.alt} fill sizes="(min-width: 768px) 700px, 100vw" className="object-cover transition-transform duration-700 group-hover/news:scale-[1.03] motion-reduce:transition-none" />
            </div>
            <p className="text-xs font-bold tracking-[0.1em] text-cta uppercase">{meta(lead)}</p>
            <h3 className="font-head text-2xl leading-tight font-semibold text-navy transition-colors group-hover/news:text-cta md:text-[32px] md:leading-[1.2]">{lead.title}</h3>
            {lead.excerpt && <p className="leading-relaxed text-muted-ink md:text-base">{lead.excerpt}</p>}
          </Link>
        </article>

        <ul className="flex flex-col">
          {side.map((p, i) => (
            <li key={p.slug} className={i > 0 ? "border-t border-line pt-5 md:pt-7" : "pb-5 md:pb-7"}>
              <Link href={routes.post(p.slug)} className="group/news flex gap-3.5 md:gap-5">
                <div className="relative size-24 shrink-0 overflow-hidden rounded-lg md:size-[150px] md:rounded-md">
                  <Image src={p.cover.src} alt={p.cover.alt} fill sizes="150px" className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-col gap-1.5 md:gap-2">
                  <p className="text-xs font-bold tracking-[0.08em] text-cta uppercase">{meta(p)}</p>
                  <h3 className="font-head text-[17px] leading-snug font-semibold text-navy transition-colors group-hover/news:text-cta md:text-xl">{p.title}</h3>
                  {p.excerpt && <p className="line-clamp-3 text-sm leading-relaxed text-muted-ink max-md:hidden">{p.excerpt}</p>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <TextLink href={routes.news} underline className="md:hidden">
        Tất cả bài viết
      </TextLink>
    </Section>
  )
}

export { NewsSection }
