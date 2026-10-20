import type { ShopConfig } from "../domain/shop"

/** Port: implemented by infrastructure (seed data today, the Go API later). */
export interface ShopRepository {
  configFor(campaignCode: string): Promise<ShopConfig | null>
}

export function makeShopQueries(repo: ShopRepository) {
  return {
    configFor: (campaignCode: string) => repo.configFor(campaignCode),
  }
}
