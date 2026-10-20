import type { DonorEntry, FinancialReport, FundProgress, FundSummary } from "../domain/fundraising"
import type { Fund } from "../domain/fund"

/** Port: implemented by infrastructure (seed data today, the Go API later). */
export interface FundraisingRepository {
  fundFor(campaignCode: string): Promise<Fund | null>
  progressFor(campaignCode: string): Promise<FundProgress | null>
  summaryFor(campaignCode: string): Promise<FundSummary | null>
  /** Public donor list, newest first. */
  donorsFor(campaignCode: string): Promise<DonorEntry[]>
  /** The report shown on Home as an example of transparency. */
  featuredReport(): Promise<FinancialReport | null>
}

export function makeFundraisingQueries(repo: FundraisingRepository) {
  return {
    fundFor: (campaignCode: string) => repo.fundFor(campaignCode),
    progressFor: (campaignCode: string) => repo.progressFor(campaignCode),
    summaryFor: (campaignCode: string) => repo.summaryFor(campaignCode),
    donorsFor: (campaignCode: string) => repo.donorsFor(campaignCode),
    featuredReport: () => repo.featuredReport(),
  }
}
