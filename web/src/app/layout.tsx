import type { Metadata } from "next"
import { Be_Vietnam_Pro, Lora } from "next/font/google"
import "./globals.css"

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
})

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: {
    default: "Ngòi Tình Nguyện – Viết Cho Em",
    template: "%s · Ngòi Tình Nguyện",
  },
  description:
    "Vì nụ cười của các em trên con đường tìm con chữ. Dự án thiện nguyện của học sinh, sinh viên, trực thuộc Cộng đồng Tình nguyện Việt Nam.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${lora.variable} ${beVietnamPro.variable} h-full`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
