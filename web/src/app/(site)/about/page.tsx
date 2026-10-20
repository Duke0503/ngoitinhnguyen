import type { Metadata } from "next"

import { campaignQueries } from "@/modules/campaigns"
import { AboutClosing, AboutHero, AboutVision, HistoryTimeline, MembershipSection, organisationQueries, PhotoStrip, WhoWeHelp } from "@/modules/organisation"
import { LeadershipSection, peopleQueries } from "@/modules/people"

export const metadata: Metadata = {
  title: "Về chúng mình",
  description: "Từ Ngòi Bút Nhỏ – Trà Thư Quán ở Gia Lai năm 2020 đến Ngòi Tình Nguyện – Viết Cho Em: câu chuyện, sứ mệnh, những người đồng hành và cơ sở pháp lý của dự án.",
}

export default async function AboutPage() {
  const [profile, campaigns] = await Promise.all([organisationQueries.profile(), campaignQueries.all()])
  const term = profile.currentTerm
  const leadership = await peopleQueries.leadership(term.label)

  // Provinces and sites come from the campaigns' own locations (Campaigns owns that data).
  const byProvince = new Map<string, Set<string>>()
  for (const c of campaigns) for (const l of c.locations) byProvince.set(l.province, (byProvince.get(l.province) ?? new Set()).add(l.name))
  const places = [...byProvince].map(([province, names]) => ({ province, places: [...names].slice(0, 2).join(", ") }))

  return (
    <>
      <AboutHero profile={profile} />
      <AboutVision pillars={profile.pillars} places={places} />
      <HistoryTimeline />
      <PhotoStrip />
      <WhoWeHelp />
      <LeadershipSection
        eyebrow={`Nhiệm kỳ ${term.label}`}
        title={term.theme}
        description={`Ban tổ chức ${leadership.length} người, cùng ${term.memberCount} thành viên ở ${term.departments.length} ban: ${term.departments.map((d) => d.name).join(", ")}.`}
        banner={term.introBanner}
        members={leadership}
        memberCount={term.memberCount}
      />
      <MembershipSection membership={profile.membership} />
      <AboutClosing />
    </>
  )
}
