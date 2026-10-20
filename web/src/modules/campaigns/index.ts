// Public API of the Campaigns module (composition root: wires the default repository).
import { makeCampaignQueries } from "./application/campaign-queries"
import { seedCampaignRepository } from "./infrastructure/seed-campaign-repository"

export const campaignQueries = makeCampaignQueries(seedCampaignRepository)

export { displayTitle, isActive, isFinished } from "./domain/campaign"
export type { Campaign, ImpactSummary } from "./domain/campaign"
export { ProgrammeCards } from "./presentation/programme-cards"
export { ResultsTable } from "./presentation/results-table"
export { CampaignList } from "./presentation/campaign-list"
export { LiveCampaignCard } from "./presentation/live-campaign-card"
export { ActiveCampaignPromo } from "./presentation/active-campaign-promo"
export { CampaignContact } from "./presentation/campaign-contact"
export { CampaignGallery } from "./presentation/campaign-gallery"
export { CampaignHero } from "./presentation/campaign-hero"
export { CampaignStory, PhaseTimeline } from "./presentation/campaign-story"
export { LocationsSection } from "./presentation/locations-section"
export { CurrentCampaign } from "./presentation/current-campaign"
export { ImpactBand } from "./presentation/impact-band"
export { Journey } from "./presentation/journey"
