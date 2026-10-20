// Public API of the Shop module (composition root: wires the default repository).
import { makeShopQueries } from "./application/shop-queries"
import { seedShopRepository } from "./infrastructure/seed-shop-repository"

export const shopQueries = makeShopQueries(seedShopRepository)

export type { ShopConfig } from "./domain/shop"
export { ShopFlow } from "./presentation/shop-flow"
