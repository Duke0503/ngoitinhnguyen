import { isActive, isFinished, summarizeImpact, type Campaign, type ImpactSummary } from "../domain/campaign"

/** Port: implemented by infrastructure (seed data today, the Go API later). */
export interface CampaignRepository {
  list(): Promise<Campaign[]>
}

const byStart = (a: Campaign, b: Campaign) => a.startsOn.localeCompare(b.startsOn)

export function makeCampaignQueries(repo: CampaignRepository) {
  return {
    /** The most recent campaign that is announced, fundraising or on site. */
    async current(): Promise<Campaign | null> {
      const active = (await repo.list()).filter(isActive).sort(byStart)
      return active.at(-1) ?? null
    },

    /** Finished campaigns for the home timeline, oldest first. */
    async journey(limit = 4): Promise<Campaign[]> {
      return (await repo.list()).filter(isFinished).sort(byStart).slice(-limit)
    },

    async all(): Promise<Campaign[]> {
      return [...(await repo.list())].sort(byStart)
    },

    async bySlug(slug: string): Promise<Campaign | null> {
      return (await repo.list()).find((c) => c.slug === slug) ?? null
    },

    async impact(): Promise<ImpactSummary> {
      return summarizeImpact(await repo.list())
    },
  }
}

export type CampaignQueries = ReturnType<typeof makeCampaignQueries>
