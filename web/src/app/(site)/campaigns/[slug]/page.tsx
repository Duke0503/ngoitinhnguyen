import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  ActiveCampaignPromo,
  campaignQueries,
  CampaignContact,
  CampaignGallery,
  CampaignHero,
  CampaignStory,
  displayTitle,
  isActive,
  isFinished,
  LocationsSection,
  PhaseTimeline,
} from "@/modules/campaigns"
import { ClosedSummary, DonorList, FundProgress, fundraisingQueries, SummaryBar } from "@/modules/fundraising"
import { CampaignPartners, sponsorshipQueries } from "@/modules/sponsorship"
import { Section } from "@/shared/layout/section"
import { formatVnd } from "@/shared/lib/format"
import { Card } from "@/shared/ui/card"

type Params = { slug: string }

export async function generateStaticParams(): Promise<Params[]> {
  return (await campaignQueries.all()).filter((c) => c.status !== "draft").map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const campaign = await campaignQueries.bySlug((await params).slug)
  if (!campaign) return {}
  const description = campaign.slogan ?? campaign.summary ?? campaign.highlight
  const image = campaign.hero ?? campaign.cover
  return {
    title: displayTitle(campaign),
    description,
    openGraph: { title: campaign.title, description, images: [{ url: image.src, alt: image.alt }] },
  }
}

// Composes five contexts around one campaign. Money, sponsors and the “what's running now”
// promo come from their own modules; Campaigns only supplies the campaign itself.
export default async function CampaignPage({ params }: { params: Promise<Params> }) {
  const campaign = await campaignQueries.bySlug((await params).slug)
  if (!campaign || campaign.status === "draft") notFound()

  const [current, progress, summary, donors, partners] = await Promise.all([
    campaignQueries.current(),
    fundraisingQueries.progressFor(campaign.code),
    fundraisingQueries.summaryFor(campaign.code),
    fundraisingQueries.donorsFor(campaign.code),
    sponsorshipQueries.forCampaign(campaign.code),
  ])
  const promoted = current && current.slug !== campaign.slug ? current : null
  const promoOffer = promoted ? await offerFor(promoted.code) : undefined

  const open = isActive(campaign) && progress
  const fundingCard = open ? (
    <Card padding="none" className="p-5 md:p-6">
      <FundProgress progress={progress} campaignTitle={campaign.title} />
    </Card>
  ) : null

  return (
    <>
      <CampaignHero campaign={campaign} />

      {/* Mobile: funding state sits right under the hero (desktop shows it in the sidebar). */}
      <div className="md:hidden">
        {summary && isFinished(campaign) && <SummaryBar summary={summary} />}
        {fundingCard && <div className="bg-paper px-5 pt-6">{fundingCard}</div>}
      </div>

      <Section spacing="none" className="py-10 md:py-[72px]" containerClassName="grid gap-12 md:grid-cols-[1fr_360px] md:gap-16">
        <div className="flex min-w-0 flex-col gap-12 md:gap-16">
          {campaign.story && <CampaignStory title={campaign.storyTitle ?? "Về chương trình"} paragraphs={campaign.story} />}
          {campaign.phases && <PhaseTimeline phases={campaign.phases} />}
          <LocationsSection campaign={campaign} />
          {campaign.gallery && <CampaignGallery images={campaign.gallery} />}
          <DonorList donors={donors} illustrative={summary?.illustrative} />
          <CampaignPartners partners={partners} title={`Đơn vị đồng hành cùng ${displayTitle(campaign)}`} />
        </div>

        <aside className="flex flex-col gap-5 max-md:hidden md:sticky md:top-28 md:self-start" aria-label="Thông tin chương trình">
          {fundingCard}
          {summary && isFinished(campaign) && <ClosedSummary summary={summary} />}
          {promoted && <ActiveCampaignPromo campaign={promoted} offer={promoOffer} />}
          {campaign.lead && <CampaignContact lead={campaign.lead} />}
        </aside>
      </Section>

      {/* Mobile: the same promo and contact, after the content. */}
      <div className="flex flex-col md:hidden">
        {promoted && (
          <div className="bg-night px-5 py-7">
            <ActiveCampaignPromo campaign={promoted} offer={promoOffer} className="p-0" />
          </div>
        )}
        {campaign.lead && (
          <div className="bg-paper px-5 py-6">
            <CampaignContact lead={campaign.lead} />
          </div>
        )}
      </div>
    </>
  )
}

async function offerFor(code: string): Promise<string | undefined> {
  const progress = await fundraisingQueries.progressFor(code)
  return progress?.certificateFrom ? `góp ${formatVnd(progress.certificateFrom)}, nhận giấy chứng nhận` : undefined
}
