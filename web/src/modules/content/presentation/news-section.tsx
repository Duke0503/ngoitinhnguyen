import { routes } from "@/shared/config/routes"
import Image from "next/image"
import Link from "next/link"

import { Section } from "@/shared/layout/section"
import { formatDate } from "@/shared/lib/format"
import { MetaLine } from "@/shared/ui/meta"
import { SectionHeading } from "@/shared/ui/section-heading"
import { TextLink } from "@/shared/ui/text-link"

import { splitFeatured, type Post } from "../domain/post"

function NewsSection({ posts }: { posts: Post[] }) {
  const { featured, rest } = splitFeatured(posts)
  if (!featured) return null

  return (
    <Section spacing="lg" aria-labelledby="news-title" containerClassName="flex flex-col gap-8 md:gap-11">
      <div className="flex items-end justify-between gap-4">
        <SectionHeading id="news-title" eyebrow="Tin tức" title="Chuyện từ các địa bàn" />
        <TextLink href={routes.news} className="shrink-0 max-md:hidden">
          Tất cả bài viết
        </TextLink>
      </div>

      <div className="grid gap-8 md:grid-cols-[680px_1fr] md:gap-12">
        <article>
          <Link href={routes.post(featured.slug)} className="group/news flex flex-col gap-3.5 md:gap-5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-md md:aspect-[17/10]">
              <Image src={featured.cover.src} alt={featured.cover.alt} fill sizes="(min-width: 768px) 680px, 100vw" className="object-cover" />
            </div>
            <MetaLine tag={featured.tag} date={formatDate(featured.publishedOn)} />
            <h3 className="font-head text-[22px] leading-snug font-semibold text-navy transition-colors group-hover/news:text-cta md:text-[28px]">
              {featured.title}
            </h3>
            {featured.excerpt && <p className="hidden leading-relaxed text-muted-ink md:block">{featured.excerpt}</p>}
          </Link>
        </article>

        <ul className="flex flex-col">
          {rest.map((p, i) => (
            <li key={p.slug} className={i > 0 ? "border-t border-line" : "max-md:border-t max-md:border-line"}>
              <Link href={routes.post(p.slug)} className="group/news flex gap-3.5 py-4 md:gap-5 md:py-6">
                <div className="relative h-[76px] w-24 shrink-0 overflow-hidden rounded-md md:h-[104px] md:w-[140px]">
                  <Image src={p.cover.src} alt={p.cover.alt} fill sizes="140px" className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-col gap-1.5 md:gap-2.5">
                  <MetaLine tag={p.tag} date={formatDate(p.publishedOn)} />
                  <h3 className="font-head text-base leading-snug font-semibold text-navy transition-colors group-hover/news:text-cta md:text-[19px]">
                    {p.title}
                  </h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <TextLink href={routes.news} className="md:hidden">
        Tất cả bài viết
      </TextLink>
    </Section>
  )
}

export { NewsSection }
