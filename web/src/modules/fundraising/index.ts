// Public API of the Fundraising module (composition root: wires the default repository).
import { makeFundraisingQueries } from "./application/fundraising-queries"
import { seedFundraisingRepository } from "./infrastructure/seed-fundraising-repository"

export const fundraisingQueries = makeFundraisingQueries(seedFundraisingRepository)

export type { Fund } from "./domain/fund"
export type { DonorEntry, FinancialReport, FundProgress as FundProgressData, FundSummary } from "./domain/fundraising"
export { ClosedSummary, SummaryBar } from "./presentation/closed-summary"
export { VietQrCard } from "./presentation/vietqr-card"
export { DonateFlow } from "./presentation/donate-flow"
export { DonorList } from "./presentation/donor-list"
export { FundProgress } from "./presentation/fund-progress"
export { Transparency } from "./presentation/transparency"
