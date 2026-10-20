// Public API of the Recruitment module (composition root: wires the default repository).
import { makeRecruitmentQueries } from "./application/recruitment-queries"
import { seedRecruitmentRepository } from "./infrastructure/seed-recruitment-repository"

export const recruitmentQueries = makeRecruitmentQueries(seedRecruitmentRepository)

export type { RecruitmentRound } from "./domain/recruitment"
export { ApplySection } from "./presentation/apply-section"
export { BenefitsAndProcess } from "./presentation/benefits-process"
export { RecruitmentHero } from "./presentation/recruitment-hero"
export { WaysToJoin } from "./presentation/ways-to-join"
export { RecruitmentBand } from "./presentation/recruitment-band"
