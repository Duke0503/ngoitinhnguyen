import { routes } from "@/shared/config/routes"
import Link from "next/link"

import { campaignQueries, CurrentCampaign, ImpactBand, Journey } from "@/modules/campaigns"
import { NewsSection, postQueries } from "@/modules/content"
import { FundProgress, fundraisingQueries, Transparency } from "@/modules/fundraising"
import { HomeHero, organisationQueries, WaysToHelp } from "@/modules/organisation"
import { RecruitmentBand, recruitmentQueries } from "@/modules/recruitment"
import { PartnerStrip, sponsorshipQueries } from "@/modules/sponsorship"
import { donateHref } from "@/shared/config/site"
import { CtaBand } from "@/shared/layout/cta-band"
import { Button } from "@/shared/ui/button"

// Home composes the bounded contexts; each section's data comes from its own module.
// Section order follows the trust pattern: hero → proof → overview → action (design v2).
export default async function HomePage() {
  const [profile, impact, current, journey, partners, report, round, posts] = await Promise.all([
    organisationQueries.profile(),
    campaignQueries.impact(),
    campaignQueries.current(),
    campaignQueries.journey(4),
    sponsorshipQueries.featuredPartners(6),
    fundraisingQueries.featuredReport(),
    recruitmentQueries.highlightedRound(),
    postQueries.latest(4),
  ])
  const progress = current ? await fundraisingQueries.progressFor(current.code) : null
  const term = profile.currentTerm

  return (
    <>
      <HomeHero profile={profile} campaignCount={impact.campaigns} />
      <ImpactBand impact={impact} termMembers={{ count: term.memberCount, label: `thành viên nhiệm kỳ ${term.label}` }} />
      <PartnerStrip partners={partners} />
      {current && (
        <CurrentCampaign
          campaign={current}
          fundraising={progress && <FundProgress progress={progress} campaignTitle={current.title} />}
        />
      )}
      <Journey campaigns={journey} />
      <WaysToHelp />
      {report && <Transparency report={report} />}
      <RecruitmentBand round={round} departments={term.departments.map((d) => d.name)} theme={term.theme} slogan={term.slogan} />
      <NewsSection posts={posts} />
      <CtaBand
        eyebrow="Viết tiếp cùng Ngòi"
        title="Mỗi đóng góp nhỏ đều viết tiếp một câu chuyện cho các em."
        actions={
          <>
            <Button asChild size="lg">
              <Link href={donateHref}>Ủng hộ chương trình</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={routes.recruitment}>Trở thành tình nguyện viên</Link>
            </Button>
          </>
        }
      />
    </>
  )
}
