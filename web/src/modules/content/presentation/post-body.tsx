import * as React from "react"

import type { PostBlock } from "../domain/post"

const BULLET = /^\s*[-•–]\s+/
const upperShare = (t: string) => {
  const letters = [...t].filter((c) => c.toLowerCase() !== c.toUpperCase())
  return letters.length ? letters.filter((c) => c === c.toUpperCase()).length / letters.length : 0
}
/** A short all-caps line in the source is a section heading. */
const isHeading = (t: string) => t.length <= 90 && !/[.:;]$/.test(t) && !BULLET.test(t) && upperShare(t) > 0.8

type Node = { kind: "hr" } | { kind: "h"; text: string } | { kind: "p"; text: string } | { kind: "ul"; items: string[] }

function toNodes(blocks: PostBlock[]): Node[] {
  const nodes: Node[] = []
  for (const b of blocks) {
    if (b.type === "hr") nodes.push({ kind: "hr" })
    else if (BULLET.test(b.text)) {
      const item = b.text.replace(BULLET, "")
      const last = nodes.at(-1)
      if (last?.kind === "ul") last.items.push(item)
      else nodes.push({ kind: "ul", items: [item] })
    } else if (isHeading(b.text)) nodes.push({ kind: "h", text: b.text })
    else nodes.push({ kind: "p", text: b.text })
  }
  return nodes
}

/** Post text as the page wrote it: paragraphs, bullet lists, all-caps section headings and section breaks. */
function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="flex flex-col gap-4 text-[17px] leading-[1.75] text-ink md:text-lg md:leading-[1.8]">
      {toNodes(blocks).map((n, i) => {
        switch (n.kind) {
          case "hr":
            return <hr key={i} className="my-3 w-16 border-t-2 border-flame-orange/60" />
          case "h":
            return (
              <h2 key={i} className="mt-4 font-head text-[22px] leading-snug font-semibold text-navy md:text-2xl">
                {n.text}
              </h2>
            )
          case "ul":
            return (
              <ul key={i} className="flex list-disc flex-col gap-1.5 pl-6 marker:text-flame-orange">
                {n.items.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ul>
            )
          default:
            return <p key={i}>{n.text}</p>
        }
      })}
    </div>
  )
}

export { PostBody }
