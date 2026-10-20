// Public API of the Organisation module (composition root: wires the default repository).
import { makeOrganisationQueries } from "./application/organisation-queries"
import { seedOrganisationRepository } from "./infrastructure/seed-organisation-repository"

export const organisationQueries = makeOrganisationQueries(seedOrganisationRepository)

export type { Contact, Department, OrganisationProfile, Term } from "./domain/organisation"
export { AboutHero } from "./presentation/about-hero"
export { DepartmentCards } from "./presentation/department-cards"
export { HistoryTimeline } from "./presentation/history-timeline"
export { MembershipSection } from "./presentation/membership"
export { Mission } from "./presentation/mission"
export { WhoWeHelp } from "./presentation/who-we-help"
export { HomeHero } from "./presentation/home-hero"
export { WaysToHelp } from "./presentation/ways-to-help"
export { NewsletterBand } from "./presentation/newsletter-band"
