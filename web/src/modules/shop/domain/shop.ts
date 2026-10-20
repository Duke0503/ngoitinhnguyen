// Shop bounded context: fundraising products sold per campaign. Money from paid orders flows into the
// campaign's fund (Fundraising context), but this context owns products, pricing and delivery rules.
// Amounts are integer VND.

export type Product = {
  slug: string
  name: string
  /** Size / short description, e.g. “Kích thước 30cm”. */
  detail: string
  price: number
  image: { src: string; alt: string }
}

export type DeliveryMethod = "hand" | "pickup"

/** Order-level discount: `discount` off the whole order once it holds `minItems` items or more. */
export type Promotion = { minItems: number; discount: number; label: string }

export type ShopConfig = {
  campaignCode: string
  products: Product[]
  promotion?: Promotion
  /** Most units of one product in a single order. */
  maxPerProduct: number
  /** Volunteers hand-deliver for free, but only inside these provinces (codes from the address kernel). */
  hand: { provinceCodes: string[] }
  /** Collected in person at the programme's event. */
  pickup: { label: string }
  opensOn?: string
  closesOn?: string
}

export type OrderLine = { slug: string; quantity: number }

export type PricedLine = { slug: string; name: string; quantity: number; unitPrice: number; total: number }

export type PricedOrder = {
  lines: PricedLine[]
  itemCount: number
  subtotal: number
  discount: number
  shipping: number
  total: number
}

export type PricingError =
  | { code: "empty" }
  | { code: "unknown_product"; slug: string }
  | { code: "bad_quantity"; slug: string }
  | { code: "too_many"; slug: string; max: number }

export type PricingResult = { ok: true; order: PricedOrder } | { ok: false; error: PricingError }

/**
 * Prices an order from product slugs and quantities only. The browser shows the same numbers, but the
 * server always recomputes them, so a tampered request cannot change the price.
 */
export function priceOrder(config: ShopConfig, lines: OrderLine[]): PricingResult {
  const wanted = lines.filter((l) => l.quantity !== 0)
  if (wanted.length === 0) return { ok: false, error: { code: "empty" } }

  const priced: PricedLine[] = []
  for (const l of wanted) {
    const product = config.products.find((p) => p.slug === l.slug)
    if (!product) return { ok: false, error: { code: "unknown_product", slug: l.slug } }
    if (!Number.isInteger(l.quantity) || l.quantity < 0) return { ok: false, error: { code: "bad_quantity", slug: l.slug } }
    if (l.quantity > config.maxPerProduct) return { ok: false, error: { code: "too_many", slug: l.slug, max: config.maxPerProduct } }
    priced.push({ slug: product.slug, name: product.name, quantity: l.quantity, unitPrice: product.price, total: product.price * l.quantity })
  }

  const itemCount = priced.reduce((n, l) => n + l.quantity, 0)
  const subtotal = priced.reduce((n, l) => n + l.total, 0)
  const promo = config.promotion
  const discount = promo && itemCount >= promo.minItems ? Math.min(promo.discount, subtotal) : 0
  // Hand delivery and pickup are both free; a courier fee would be added here once decided (BUSINESS.md D9).
  const shipping = 0
  return { ok: true, order: { lines: priced, itemCount, subtotal, discount, shipping, total: subtotal - discount + shipping } }
}

/** Whether the shop takes orders on `today` (ISO date). */
export function acceptsOrders(config: ShopConfig, today: string): boolean {
  if (config.opensOn && today < config.opensOn) return false
  if (config.closesOn && today > config.closesOn) return false
  return true
}

export const handDeliveryAvailable = (config: ShopConfig, provinceCode: string) => config.hand.provinceCodes.includes(provinceCode)

/** Units still needed to earn the promotion, or 0 when there is none or it is already earned. */
export function itemsToPromotion(config: ShopConfig, itemCount: number): number {
  const promo = config.promotion
  return promo && itemCount < promo.minItems ? promo.minItems - itemCount : 0
}
