import type { LeadershipMember } from "../domain/people"

/** Port: implemented by infrastructure (seed data today, the Go API later). */
export interface PeopleRepository {
  /** The term's board, head first. */
  leadership(termLabel: string): Promise<LeadershipMember[]>
}

export function makePeopleQueries(repo: PeopleRepository) {
  return {
    leadership: (termLabel: string) => repo.leadership(termLabel),
  }
}
