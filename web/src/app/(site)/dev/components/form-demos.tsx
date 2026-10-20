"use client"

import * as React from "react"
import { CircleCheck } from "lucide-react"

import { BrandTabs, BrandTabsContent, BrandTabsList, BrandTabsTrigger } from "@/shared/ui/brand-tabs"
import { Checkbox } from "@/shared/ui/checkbox"
import { Combobox } from "@/shared/ui/combobox"
import { CopyField } from "@/shared/ui/copy-field"
import { Field } from "@/shared/ui/field"
import { FileDropzone } from "@/shared/ui/file-dropzone"
import { Input } from "@/shared/ui/input"
import { NativeSelect } from "@/shared/ui/native-select"
import { QuantityStepper } from "@/shared/ui/quantity-stepper"
import { SegmentedControl } from "@/shared/ui/segmented-control"
import { Switch } from "@/shared/ui/switch"
import { Textarea } from "@/shared/ui/textarea"

// Demo data only. Real ward lists come from the Shop module's AdminUnit source.
const wardOptions = [
  { value: "an-phu-dong", label: "Phường An Phú Đông", description: "TP. Hồ Chí Minh" },
  { value: "thanh-an", label: "Xã Thạnh An", description: "TP. Hồ Chí Minh" },
  { value: "xom-chieu", label: "Phường Xóm Chiếu", description: "TP. Hồ Chí Minh" },
]

function FormDemos() {
  const [ward, setWard] = React.useState<string | null>("an-phu-dong")
  const [method, setMethod] = React.useState("hand")
  const [qty, setQty] = React.useState(2)
  const [file, setFile] = React.useState<File | null>(null)
  const [publicName, setPublicName] = React.useState(true)

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="flex flex-col gap-5">
        <Field label="Họ và tên" htmlFor="demo-name">
          <Input id="demo-name" defaultValue="Nguyễn Minh Anh" />
        </Field>
        <Field label="Email" htmlFor="demo-email" optional hint="Dùng để gửi giấy chứng nhận.">
          <Input id="demo-email" type="email" placeholder="ban@email.com" aria-describedby="demo-email-desc" />
        </Field>
        <Field label="Số điện thoại" htmlFor="demo-phone" error="Số điện thoại chưa đúng định dạng.">
          <Input id="demo-phone" defaultValue="0912 34" aria-invalid aria-describedby="demo-phone-desc" />
        </Field>
        <Field label="Lời nhắn" htmlFor="demo-msg" optional>
          <Textarea id="demo-msg" placeholder="Gửi các cô, các sơ và các em ở Mái ấm Thiên Phước…" />
        </Field>
        <Field label="Ảnh minh chứng chuyển khoản" htmlFor="demo-proof">
          <FileDropzone id="demo-proof" file={file} onFileChange={setFile} hint="JPG, PNG, HEIC · tối đa 10MB · chỉ ban tổ chức xem được" />
        </Field>
        <div className="flex items-center gap-3">
          <Switch id="demo-public" checked={publicName} onCheckedChange={setPublicName} />
          <label htmlFor="demo-public" className="text-sm">
            Hiển thị tên và lời nhắn trong danh sách ủng hộ
          </label>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox id="demo-consent" defaultChecked className="mt-0.5" />
          <label htmlFor="demo-consent" className="text-[13px] leading-normal text-muted-ink">
            Tôi đồng ý để Ngòi lưu thông tin nhằm xác nhận khoản ủng hộ và cấp giấy chứng nhận.
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <Field label="Cách nhận hàng" htmlFor="demo-method">
          <SegmentedControl
            aria-label="Cách nhận hàng"
            value={method}
            onValueChange={setMethod}
            options={[
              { value: "hand", label: "Giao tận tay", description: "TNV giao · miễn phí" },
              { value: "pickup", label: "Điểm hẹn", description: "Nhận tại sự kiện" },
              { value: "courier", label: "Chuyển phát", description: "Phí theo đơn vị VC" },
            ]}
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Tỉnh / Thành phố" htmlFor="demo-province">
            <NativeSelect id="demo-province" defaultValue="hcm">
              <option value="hcm">TP. Hồ Chí Minh</option>
              <option value="hn">TP. Hà Nội</option>
              <option value="gl">Gia Lai</option>
              <option value="hy">Hưng Yên</option>
            </NativeSelect>
          </Field>
          <Field label="Phường / Xã" htmlFor="demo-ward">
            <Combobox
              id="demo-ward"
              options={wardOptions}
              value={ward}
              onValueChange={setWard}
              placeholder="Tìm phường, xã…"
              searchPlaceholder="Gõ tên phường, xã (không cần dấu)"
              footnote="Theo danh mục đơn vị hành chính mới (từ 01/07/2025)"
            />
          </Field>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-line bg-white p-4">
          <div>
            <p className="font-head text-lg font-semibold text-navy">Thẻ hoa Tulip</p>
            <p className="text-sm font-bold text-cta">35.000đ</p>
          </div>
          <QuantityStepper label="Thẻ hoa Tulip" value={qty} onValueChange={setQty} />
        </div>
        <div className="rounded-xl border border-line bg-white px-5">
          <CopyField label="Ngân hàng" value="BIDV" copyable={false} />
          <CopyField label="Số tài khoản" value="8883309229" emphasis="large" />
          <CopyField label="Nội dung chuyển khoản" value="NguyenMinhAnh-unghoHT102026 HT10-7K3Q" emphasis="highlight" />
        </div>
        <BrandTabs defaultValue="hcm">
          <BrandTabsList aria-label="Địa bàn">
            <BrandTabsTrigger value="hcm">TP. Hồ Chí Minh</BrandTabsTrigger>
            <BrandTabsTrigger value="hn">Hà Nội & Hưng Yên</BrandTabsTrigger>
          </BrandTabsList>
          <BrandTabsContent value="hcm" className="text-sm text-muted-ink">
            Ấp đảo Thiềng Liềng · Mái ấm Vị Hoàng
          </BrandTabsContent>
          <BrandTabsContent value="hn" className="text-sm text-muted-ink">
            Mái ấm Thánh Tâm · Chùa Thiên Hương
          </BrandTabsContent>
        </BrandTabs>
        <BrandTabs defaultValue="hcm">
          <BrandTabsList variant="pill" aria-label="Địa bàn (mobile)">
            <BrandTabsTrigger value="hcm">TP. Hồ Chí Minh</BrandTabsTrigger>
            <BrandTabsTrigger value="hn">Hà Nội & Hưng Yên</BrandTabsTrigger>
          </BrandTabsList>
        </BrandTabs>
        <p className="flex items-center gap-2 text-xs text-muted-ink">
          <CircleCheck aria-hidden className="size-3.5 text-leaf" /> Trạng thái: {method} · {ward ?? "—"} · SL {qty} · {publicName ? "công khai" : "ẩn danh"}
        </p>
      </div>
    </div>
  )
}

export { FormDemos }
