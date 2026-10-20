// Public API of the People module (composition root: wires the default repository).
import { makePeopleQueries } from "./application/people-queries"
import { seedPeopleRepository } from "./infrastructure/seed-people-repository"

export const peopleQueries = makePeopleQueries(seedPeopleRepository)

export type { LeadershipMember } from "./domain/people"
export { LeadershipSection } from "./presentation/leadership-section"
