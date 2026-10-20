// Single source of truth for public URLs. Paths are English (kebab-case); labels shown to visitors stay Vietnamese.
// Pages live under src/app/(site)/<path>; change a URL here and rename its folder, nothing else.
export const routes = {
  home: "/",
  campaigns: "/campaigns",
  campaign: (slug: string) => `/campaigns/${slug}`,
  news: "/news",
  post: (slug: string) => `/news/${slug}`,
  about: "/about",
  recruitment: "/recruitment",
  sponsors: "/sponsors",
  donate: "/donate",
  shop: "/shop",
  /** Impact numbers and per-campaign financial reports. */
  impact: "/impact",
} as const

/** Anchor of the application form on the recruitment page. */
export const recruitmentApplyId = "apply"
