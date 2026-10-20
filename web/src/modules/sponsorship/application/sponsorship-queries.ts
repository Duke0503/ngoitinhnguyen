import type { Partner, TierPackage } from "../domain/sponsorship"

/** Port: implemented by infrastructure (seed data today, the Go API later). */
export interface SponsorshipRepository {
  featuredPartners(): Promise<Partner[]>
  forCampaign(campaignCode: string): Promise<Partner[]>
  tierPackage(): Promise<TierPackage>
}

const withLogoFirst = (all: Partner[]) => [...all.filter((p) => p.logoSrc), ...all.filter((p) => !p.logoSrc)]

export function makeSponsorshipQueries(repo: SponsorshipRepository) {
  return {
    forCampaign: (campaignCode: string) => repo.forCampaign(campaignCode),

    /** Partners with a logo first, so the strip leads with recognisable marks. */
    async featuredPartners(limit = 6): Promise<Partner[]> {
      return withLogoFirst(await repo.featuredPartners()).slice(0, limit)
    },

    /** Every sponsor and partner across all campaigns: the “bảng vàng”. */
    async goldenBoard(): Promise<Partner[]> {
      return withLogoFirst(await repo.featuredPartners())
    },

    tierPackage: () => repo.tierPackage(),
  }
}
