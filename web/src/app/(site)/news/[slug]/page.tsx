import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { campaignQueries, displayTitle } from "@/modules/campaigns"
import { postQueries, PostBody, PostCard, PostGallery } from "@/modules/content"
import { routes } from "@/shared/config/routes"
import { Breadcrumb } from "@/shared/layout/breadcrumb"
import { Section } from "@/shared/layout/section"
import { formatDate } from "@/shared/lib/format"
import { Callout } from "@/shared/ui/callout"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await postQueries.slugs()).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await postQueries.bySlug((await params).slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: routes.post(post.slug) },
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.publishedOn, images: [{ url: post.cover.src }] },
  }
}

export default async function PostPage({ params }: Props) {
  const post = await postQueries.bySlug((await params).slug)
  if (!post) notFound()

  const [related, campaign] = await Promise.all([postQueries.related(post), post.campaignSlug ? campaignQueries.bySlug(post.campaignSlug) : null])

  return (
    <>
      <Section tone="paper" spacing="none" className="pt-6 pb-14 md:pt-10 md:pb-24" containerClassName="flex flex-col items-center gap-5 md:gap-8">
        <Breadcrumb className="w-full max-w-[760px]" items={[{ label: "Trang chủ", href: routes.home }, { label: "Tin tức", href: routes.news }, { label: post.tag }]} />

        <article className="flex w-full flex-col items-center gap-5 md:gap-8">
          <header className="flex w-full max-w-[760px] flex-col gap-3 md:gap-4">
            <p className="flex items-center gap-3">
              <span className="bg-navy px-3 py-1.5 text-xs font-bold tracking-[0.1em] text-white uppercase">{post.tag}</span>
              <time className="text-sm font-semibold text-muted-ink">{formatDate(post.publishedOn)}</time>
            </p>
            <h1 className="font-head text-[30px] leading-[1.13] font-semibold text-balance text-navy md:text-5xl">{post.title}</h1>
          </header>

          <div className="relative aspect-[3/2] w-full max-w-[1040px] overflow-hidden rounded-[10px] bg-navy/5 shadow-[0_16px_34px_-12px_rgba(11,18,51,0.35)] md:aspect-[13/7] md:rounded-[14px]">
            <Image src={post.cover.src} alt={post.cover.alt} fill priority sizes="(min-width: 1080px) 1040px, 100vw" className="object-cover" />
          </div>

          <div className="flex w-full max-w-[760px] flex-col gap-6 md:gap-8">
            <PostBody blocks={post.blocks} />
            <Callout tone="navy">
              Bài được đăng lại từ fanpage ngày {formatDate(post.publishedOn)}. Thông tin liên hệ, số tài khoản và hạn đăng ký có thể đã thay đổi — vui lòng xem trang{" "}
              <Link href={routes.donate} className="font-semibold underline underline-offset-2">
                Ủng hộ
              </Link>{" "}
              hoặc{" "}
              <Link href={routes.recruitment} className="font-semibold underline underline-offset-2">
                Tuyển thành viên
              </Link>{" "}
              để biết thông tin mới nhất.
            </Callout>
            {campaign && (
              <Link href={routes.campaign(campaign.slug)} className="text-[15px] font-bold text-cta">
                Thuộc chương trình {displayTitle(campaign)} &gt;&gt;&gt;
              </Link>
            )}
          </div>

          {post.gallery.length > 0 && (
            <div className="w-full max-w-[1040px]">
              <PostGallery photos={post.gallery} />
            </div>
          )}
        </article>
      </Section>

      {related.length > 0 && (
        <Section tone="paper" spacing="lg" className="bg-sand" aria-labelledby="related-title" containerClassName="flex flex-col items-center gap-8 md:gap-10">
          <h2 id="related-title" className="font-head text-[26px] leading-tight font-semibold text-navy md:text-[40px]">
            {campaign ? `Đọc thêm về ${displayTitle(campaign)}` : `Thêm về “${post.tag}”`}
          </h2>
          <ul className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-7">
            {related.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  )
}
