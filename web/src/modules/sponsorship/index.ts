// Public API of the Sponsorship module (composition root: wires the default repository).
import { makeSponsorshipQueries } from "./application/sponsorship-queries"
import { seedSponsorshipRepository } from "./infrastructure/seed-sponsorship-repository"

export const sponsorshipQueries = makeSponsorshipQueries(seedSponsorshipRepository)

export type { Partner, TierPackage } from "./domain/sponsorship"
export { GoldenBoard } from "./presentation/golden-board"
export { SponsorContact } from "./presentation/sponsor-contact"
export { SponsorsHero } from "./presentation/sponsors-hero"
export { TierSection } from "./presentation/tier-section"
export { WhySponsor } from "./presentation/why-sponsor"
export { CampaignPartners } from "./presentation/campaign-partners"
export { PartnerStrip } from "./presentation/partner-strip"
