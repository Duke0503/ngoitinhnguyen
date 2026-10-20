import type { OrganisationProfile } from "../domain/organisation"

/** Port: implemented by infrastructure (seed data today, the Go API later). */
export interface OrganisationRepository {
  profile(): Promise<OrganisationProfile>
}

export function makeOrganisationQueries(repo: OrganisationRepository) {
  return {
    profile: () => repo.profile(),
  }
}
