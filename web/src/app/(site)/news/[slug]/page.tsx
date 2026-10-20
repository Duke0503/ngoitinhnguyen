import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { campaignQueries, displayTitle } from "@/modules/campaigns"
import { postQueries, PostBody, PostCard, PostGallery } from "@/modules/content"
import { routes } from "@/shared/config/routes"
import { Breadcrumb } from "@/shared/layout/breadcrumb"
import { Container, Section } from "@/shared/layout/section"
import { formatDate } from "@/shared/lib/format"
import { Callout } from "@/shared/ui/callout"
import { MetaLine } from "@/shared/ui/meta"
import { SectionHeading } from "@/shared/ui/section-heading"
import { TextLink } from "@/shared/ui/text-link"

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

  const [related, campaign] = await Promise.all([
    postQueries.related(post),
    post.campaignSlug ? campaignQueries.bySlug(post.campaignSlug) : null,
  ])

  return (
    <>
      <Section spacing="none" tone="white" className="pt-7 pb-14 md:pt-12 md:pb-20" containerClassName="flex flex-col gap-8 md:gap-10">
        <Breadcrumb items={[{ label: "Trang chủ", href: routes.home }, { label: "Tin tức", href: routes.news }, { label: post.tag }]} />

        <article className="flex flex-col gap-8 md:gap-10">
          <header className="mx-auto flex w-full max-w-[760px] flex-col gap-4 md:gap-5">
            <MetaLine tag={post.tag} date={formatDate(post.publishedOn)} />
            <h1 className="font-head text-[28px] leading-[1.18] font-semibold text-balance text-navy md:text-[42px] md:leading-[1.15]">{post.title}</h1>
          </header>

          <div className="relative mx-auto aspect-[16/10] w-full max-w-[960px] overflow-hidden rounded-lg bg-navy/5 md:aspect-[16/9]">
            <Image src={post.cover.src} alt={post.cover.alt} fill priority sizes="(min-width: 1000px) 960px, 100vw" className="object-cover" />
          </div>

          <div className="mx-auto flex w-full max-w-[760px] flex-col gap-8 md:gap-10">
            <PostBody blocks={post.blocks} />
            <Callout tone="navy">
              Bài viết được đăng lại từ fanpage của Ngòi ngày {formatDate(post.publishedOn)}. Thông tin liên hệ, số tài khoản và hạn đăng ký có thể đã thay đổi — vui lòng xem trang{" "}
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
              <p className="text-[15px] text-muted-ink">
                Thuộc chương trình{" "}
                <TextLink href={routes.campaign(campaign.slug)}>{displayTitle(campaign)}</TextLink>
              </p>
            )}
          </div>

          {post.gallery.length > 0 && (
            <div className="mx-auto w-full max-w-[960px]">
              <PostGallery photos={post.gallery} />
            </div>
          )}
        </article>

        <Container className="mx-auto w-full max-w-[760px]">
          <TextLink href={routes.news} className="inline-flex items-center gap-2">
            <ArrowLeft aria-hidden className="size-4" />
            Tất cả bài viết
          </TextLink>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section spacing="md" aria-labelledby="related-title" containerClassName="flex flex-col gap-8 md:gap-10">
          <SectionHeading id="related-title" as="h2" size="md" eyebrow="Đọc thêm" title={campaign ? `Cùng chương trình ${displayTitle(campaign)}` : `Thêm về “${post.tag}”`} />
          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
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
