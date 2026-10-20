import { routes } from "@/shared/config/routes"
import Link from "next/link"

import { campaignQueries, CurrentCampaign, ImpactBand, ProgrammeCards } from "@/modules/campaigns"
import { NewsSection, postQueries } from "@/modules/content"
import { FundProgress, fundraisingQueries } from "@/modules/fundraising"
import { HomeHero, organisationQueries, WaysToHelp } from "@/modules/organisation"
import { RecruitmentBand, recruitmentQueries } from "@/modules/recruitment"
import { PartnerStrip, sponsorshipQueries } from "@/modules/sponsorship"
import { donateHref } from "@/shared/config/site"
import { CtaBand } from "@/shared/layout/cta-band"
import { Button } from "@/shared/ui/button"
import { TextLink } from "@/shared/ui/text-link"

// Home composes the bounded contexts; each section's data comes from its own module.
// Order: hero → proof → partners → live campaign → programmes → ways to help → stories → recruitment → closing ask (design v3).
export default async function HomePage() {
  const [profile, impact, current, partners, round, posts] = await Promise.all([
    organisationQueries.profile(),
    campaignQueries.impact(),
    campaignQueries.current(),
    sponsorshipQueries.featuredPartners(6),
    recruitmentQueries.highlightedRound(),
    postQueries.featured(3),
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
      <ProgrammeCards />
      <WaysToHelp />
      <NewsSection posts={posts} />
      <RecruitmentBand round={round} departments={term.departments.map((d) => d.name)} theme={term.theme} slogan={term.slogan} />
      <CtaBand
        eyebrow="Viết tiếp cùng Ngòi"
        title="Mỗi đóng góp nhỏ đều viết tiếp một câu chuyện cho các em."
        actions={
          <>
            <Button asChild size="lg">
              <Link href={donateHref}>Ủng hộ chương trình</Link>
            </Button>
            <TextLink href={routes.recruitment} icon="none" underline className="max-md:self-center">
              Trở thành tình nguyện viên
            </TextLink>
          </>
        }
      />
    </>
  )
}
