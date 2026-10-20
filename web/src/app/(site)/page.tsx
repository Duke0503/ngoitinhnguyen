import { campaignQueries, CurrentCampaign, ImpactBand, ProgrammeCards } from "@/modules/campaigns"
import { NewsSection, postQueries } from "@/modules/content"
import { FundProgress, fundraisingQueries } from "@/modules/fundraising"
import { HomeHero, NewsletterBand, organisationQueries, WaysToHelp } from "@/modules/organisation"

// Home composes the bounded contexts; each section's data comes from its own module.
// Order follows design v5: hero → programmes → proof → live campaign → ways to help → stories → newsletter.
export default async function HomePage() {
  const [profile, impact, current, posts] = await Promise.all([
    organisationQueries.profile(),
    campaignQueries.impact(),
    campaignQueries.current(),
    postQueries.featured(3),
  ])
  const progress = current ? await fundraisingQueries.progressFor(current.code) : null
  const term = profile.currentTerm

  return (
    <>
      <HomeHero profile={profile} campaignCount={impact.campaigns} />
      <ProgrammeCards />
      <ImpactBand impact={impact} termMembers={{ count: term.memberCount, label: `thành viên nhiệm kỳ ${term.label}` }} />
      {current && (
        <CurrentCampaign
          campaign={current}
          fundraising={progress && <FundProgress progress={progress} campaignTitle={current.title} />}
        />
      )}
      <WaysToHelp />
      <NewsSection posts={posts} />
      <NewsletterBand email={profile.contact.email} />
    </>
  )
}
