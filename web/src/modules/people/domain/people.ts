// People bounded context: the people behind Ngòi and the roles they hold.
// Roles are scoped (term, campaign, team) and change every season; this slice only
// covers the term-level board needed by the About page.

export type LeadershipMember = {
  name: string
  /** Title as the organisation writes it, e.g. “Phó ban · Nhân sự”. */
  role: string
}
