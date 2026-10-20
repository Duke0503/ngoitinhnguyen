import type { RecruitmentRound } from "../domain/recruitment"

/** Port: implemented by infrastructure (seed data today, the Go API later). */
export interface RecruitmentRepository {
  rounds(): Promise<RecruitmentRound[]>
}

export function makeRecruitmentQueries(repo: RecruitmentRepository) {
  return {
    /** An open round wins over an upcoming one; closed rounds are not promoted. */
    async highlightedRound(): Promise<RecruitmentRound | null> {
      const rounds = await repo.rounds()
      return rounds.find((r) => r.state === "open") ?? rounds.find((r) => r.state === "upcoming") ?? null
    },
    async roundById(id: string): Promise<RecruitmentRound | null> {
      return (await repo.rounds()).find((r) => r.id === id) ?? null
    },
  }
}
