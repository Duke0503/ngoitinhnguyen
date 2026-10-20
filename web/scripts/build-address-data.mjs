// Generates src/shared/data/address/* from the `vietnam-address-database` package (MIT),
// which follows Nghị quyết 202/2025/QH15: 34 provincial units, 3,321 commune-level units
// (2,621 xã, 687 phường, 13 đặc khu), in force since 01/07/2025.
//
// Cross-checked once against provinces.open-api.vn/api/v2: identical province codes and ward codes
// (differences: 15 ward names written with the older tone-mark spelling, e.g. “Hoà” vs “Hòa”; this
// package uses the modern spelling). Re-run with `npm run build:address`; the output is committed.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs"

const source = JSON.parse(readFileSync("node_modules/vietnam-address-database/address.json", "utf8"))
const table = (name) => source.find((e) => e.type === "table" && e.name === name).data
const provinces = table("provinces")
const wards = table("wards")

const nfc = (s) => s.normalize("NFC").trim()
const isCity = (p) => p.place_type.startsWith("Thành phố")
const bareName = (p) => nfc(p.name).replace(/^Thành phố /, "")

const out = "src/shared/data/address"
rmSync(`${out}/wards`, { recursive: true, force: true })
mkdirSync(`${out}/wards`, { recursive: true })

const outProvinces = provinces
  .map((p) => ({ code: p.province_code, name: bareName(p), kind: isCity(p) ? "city" : "province" }))
  .sort((a, b) => a.name.localeCompare(b.name, "vi"))

let total = 0
for (const p of outProvinces) {
  const list = wards
    .filter((w) => w.province_code === p.code)
    .map((w) => ({ code: w.ward_code, name: nfc(w.name) }))
    .sort((a, b) => a.name.localeCompare(b.name, "vi", { numeric: true }))
  if (list.length === 0) throw new Error(`province ${p.code} has no wards`)
  if (new Set(list.map((w) => w.name)).size !== list.length) throw new Error(`duplicate ward names in ${p.code}`)
  total += list.length
  writeFileSync(`${out}/wards/${p.code}.json`, JSON.stringify(list))
}

if (outProvinces.length !== 34 || total !== 3321) throw new Error(`unexpected counts: ${outProvinces.length} provinces, ${total} wards`)
writeFileSync(`${out}/provinces.json`, JSON.stringify(outProvinces, null, 1))
console.log(`wrote ${outProvinces.length} provinces and ${total} wards`)
