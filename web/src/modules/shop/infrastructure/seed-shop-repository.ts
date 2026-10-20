import type { ShopRepository } from "../application/shop-queries"
import type { ShopConfig } from "../domain/shop"

// Source: the HT10 “Mặt hàng gây quỹ” menu image and post BFZJxoCl (15.10.2026). Prices, sizes and the combo
// rule are read from the menu image, which the post names as the source of exact prices (the post text
// says 37.000đ for the Ly flower; the image says 35.000đ).
//
// Assumptions to confirm with the BTC (docs/BUSINESS.md D9): hand delivery is limited to TP. Hồ Chí Minh
// (the programme ran in HCM), there is no courier option, and the shop closes on 20.10.2026.
const configs: ShopConfig[] = [
  {
    campaignCode: "HT10",
    maxPerProduct: 10,
    promotion: { minItems: 3, discount: 5_000, label: "Mua combo 3 món — giảm 5.000đ/hoá đơn" },
    hand: { provinceCodes: ["79"] },
    pickup: { label: "Nhận tại sự kiện Hoa Tháng 10" },
    opensOn: "2026-10-15",
    closesOn: "2026-10-20",
    products: [
      { slug: "the-hoa-tulip", name: "Thẻ hoa Tulip", detail: "Kích thước 30cm", price: 35_000, image: { src: "/images/products/the-hoa-tulip.jpg", alt: "Thẻ hoa Tulip kẽm nhung màu hồng" } },
      { slug: "the-hoa-ly", name: "Thẻ hoa Ly", detail: "Kích thước 30cm", price: 35_000, image: { src: "/images/products/the-hoa-ly.jpg", alt: "Thẻ hoa Ly kẽm nhung màu xanh nhạt" } },
      { slug: "moc-khoa-hoa", name: "Móc khoá hoa", detail: "Kích thước 14cm", price: 25_000, image: { src: "/images/products/moc-khoa-hoa.jpg", alt: "Móc khoá hoa kẽm nhung màu xanh và hồng" } },
      { slug: "moc-khoa-ngoi-sao", name: "Móc khoá Ngôi sao", detail: "Kích thước 14cm", price: 25_000, image: { src: "/images/products/moc-khoa-ngoi-sao.jpg", alt: "Móc khoá hình ngôi sao kẽm nhung màu xanh" } },
    ],
  },
]

export const seedShopRepository: ShopRepository = {
  async configFor(code) {
    return configs.find((c) => c.campaignCode === code) ?? null
  },
}
