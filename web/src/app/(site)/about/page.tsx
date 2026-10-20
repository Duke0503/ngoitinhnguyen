import { routes } from "@/shared/config/routes"
import type { Metadata } from "next"
import Link from "next/link"

import { campaignQueries } from "@/modules/campaigns"
import { AboutHero, HistoryTimeline, MembershipSection, Mission, organisationQueries, WhoWeHelp } from "@/modules/organisation"
import { LeadershipSection, peopleQueries } from "@/modules/people"
import { donateHref } from "@/shared/config/site"
import { CtaBand } from "@/shared/layout/cta-band"
import { formatDate } from "@/shared/lib/format"
import { Button } from "@/shared/ui/button"

export const metadata: Metadata = {
  title: "Về chúng mình",
  description: "Từ Ngòi Bút Nhỏ – Trà Thư Quán ở Gia Lai năm 2020 đến Ngòi Tình Nguyện – Viết Cho Em: câu chuyện, sứ mệnh, những người đồng hành và cơ sở pháp lý của dự án.",
}

export default async function AboutPage() {
  const [profile, campaigns] = await Promise.all([organisationQueries.profile(), campaignQueries.all()])
  const term = profile.currentTerm
  const leadership = await peopleQueries.leadership(term.label)

  // The first campaign ever run illustrates the timeline (Campaigns owns that data).
  const first = campaigns[0]
  const place = first?.locations[0]
  const photo = first && place
    ? { ...first.cover, caption: `${first.highlight} · ${place.name}, ${place.province} · ${formatDate(first.onSiteDates[0])}` }
    : undefined

  return (
    <>
      <AboutHero profile={profile} />
      <Mission pillars={profile.pillars} />
      <HistoryTimeline milestones={profile.milestones} photo={photo} />
      <WhoWeHelp groups={profile.beneficiaries} alsoHelps={profile.alsoHelps} />
      <LeadershipSection
        eyebrow={`Nhiệm kỳ ${term.label}`}
        title={term.theme}
        description={`Ban tổ chức nhiệm kỳ ${term.label} cùng ${term.memberCount} thành viên ở ${term.departments.length} ban: ${term.departments.map((d) => d.name).join(", ")}.`}
        banner={term.introBanner}
        members={leadership}
      />
      <MembershipSection membership={profile.membership} />
      <CtaBand
        title="Viết tiếp hành trình cùng Ngòi."
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
