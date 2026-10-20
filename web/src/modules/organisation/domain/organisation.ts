// Organisation bounded context: the project itself, its history, terms and departments.

export type Image = { src: string; alt: string }

export type Department = {
  slug: string
  name: string
  /** The department's own “planet” artwork from the 2026–27 recruitment (it carries the department's motto). */
  art?: Image
  summary?: string
  /** The department's motto from the 2026–27 recruitment artwork. */
  motto?: string
}

export type Term = {
  name: string
  label: string
  theme: string
  slogan: string
  memberCount: number
  departments: Department[]
  /** Artwork announcing the term's board (“Giới thiệu Ban tổ chức”). */
  introBanner: Image
}

/** A date from the history; early events are only known to the month. */
export type Milestone = {
  on: string
  precision: "day" | "month"
  title: string
  description: string
  /** Marks the event the page should draw the eye to (the VNV membership). */
  emphasis?: boolean
}

/** One of Ngòi's three founding words: Viết – Đọc – Ghi nhớ (Văn – Sách – Sử). */
export type Pillar = { word: string; subject: string; description: string }

export type BeneficiaryGroup = { title: string; place: string; photo: Image }

/** Membership of a parent organisation, with the document that proves it. */
export type Membership = {
  organisation: string
  /** Official decision (quyết định) on file. */
  decision: { number: string; validFrom: string; validTo: string; representative: string }
  document: Image
  role: string
}

/** How sponsors and the public reach the organisation. The phone belongs to the role, not the person. */
export type Contact = { email: string; phone: string; phoneHolder: string; fanpage: { label: string; href: string } }

export type OrganisationProfile = {
  /** Year Ngòi Bút Nhỏ – Trà Thư Quán was founded. */
  foundedYear: number
  /** Year the project turned to volunteering (Ngòi Tình Nguyện – Viết Cho Em). */
  volunteerSince: number
  /** Fanpage followers as published (proposal p.6). */
  followers: string
  /** Short line used in the home hero. */
  affiliation: string
  origin: string[]
  logo: { publishedOn: string; meaning: string }
  pillars: Pillar[]
  milestones: Milestone[]
  beneficiaries: BeneficiaryGroup[]
  alsoHelps: string[]
  membership: Membership
  contact: Contact
  currentTerm: Term
}

/** Oldest first; ISO dates sort lexicographically. */
export function chronological(milestones: Milestone[]): Milestone[] {
  return [...milestones].sort((a, b) => a.on.localeCompare(b.on))
}
