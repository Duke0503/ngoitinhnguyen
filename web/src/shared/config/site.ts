// Organisation-wide constants. Campaign-specific contacts and bank accounts
// come from the Campaigns/Fundraising modules, never from here.
import { routes } from "./routes"

export const siteNav = [
  { label: "Chương trình", href: routes.campaigns },
  { label: "Tin tức", href: routes.news },
  { label: "Về chúng mình", href: routes.about },
  { label: "Tuyển thành viên", href: routes.recruitment },
  { label: "Đồng hành", href: routes.sponsors },
] as const

export const donateHref = routes.donate

export const org = {
  name: "Ngòi Tình Nguyện – Viết Cho Em",
  tagline: "Vì nụ cười của các em trên con đường tìm con chữ.",
  about:
    "Dự án thiện nguyện phi lợi nhuận của học sinh, sinh viên — thuộc Ngòi Bút Nhỏ – Trà Thư Quán, trực thuộc Cộng đồng Tình nguyện Việt Nam.",
  email: "ngoibutnhotrathuquan@gmail.com",
  fanpage: { label: "Fanpage Ngòi Tình Nguyện", href: "https://www.facebook.com/ngoitinhnguyenvolunteer" },
  parentPage: { label: "Ngòi Bút Nhỏ – Trà Thư Quán" },
} as const

export const footerColumns = [
  {
    title: "Khám phá",
    links: [
      { label: "Chương trình", href: routes.campaigns },
      { label: "Tin tức", href: routes.news },
      { label: "Về chúng mình", href: routes.about },
      { label: "Báo cáo minh bạch", href: routes.impact },
    ],
  },
  {
    title: "Tham gia",
    links: [
      { label: "Ủng hộ", href: routes.donate },
      { label: "Cửa hàng gây quỹ", href: routes.shop },
      { label: "Tuyển thành viên", href: routes.recruitment },
      { label: "Đồng hành cùng Ngòi", href: routes.sponsors },
    ],
  },
] as const
