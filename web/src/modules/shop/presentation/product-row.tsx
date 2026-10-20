import Image from "next/image"

import { formatVnd } from "@/shared/lib/format"
import { cn } from "@/shared/lib/utils"
import { QuantityStepper } from "@/shared/ui/quantity-stepper"

import type { Product } from "../domain/shop"

type ProductRowProps = {
  product: Product
  quantity: number
  max: number
  onQuantityChange: (quantity: number) => void
}

/** One product with a quantity stepper. The row is outlined once something is in the cart. */
function ProductRow({ product, quantity, max, onQuantityChange }: ProductRowProps) {
  return (
    <li className={cn("flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl bg-white p-3 transition-colors md:flex-nowrap md:gap-5 md:p-4", quantity > 0 ? "border-[1.5px] border-navy" : "border border-line")}>
      <div className="relative size-[72px] shrink-0 overflow-hidden rounded-lg border border-line bg-white md:size-[120px]">
        <Image src={product.image.src} alt={product.image.alt} fill sizes="(min-width: 768px) 120px, 72px" quality={90} className="object-contain" />
      </div>
      <div className="flex min-w-[150px] flex-1 flex-col gap-1 md:min-w-0 md:gap-1.5">
        <h3 className="font-head text-[17px] leading-snug font-semibold text-navy md:text-[22px]">{product.name}</h3>
        <p className="text-[13px] text-muted-ink md:text-sm">{product.detail}</p>
        <p className="text-[15px] font-bold text-cta tabular-nums md:text-[17px]">{formatVnd(product.price)}</p>
      </div>
      <QuantityStepper label={product.name} value={quantity} max={max} onValueChange={onQuantityChange} className="max-md:ml-auto" />
    </li>
  )
}

export { ProductRow }
