import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Custom type scale from globals.css (@theme --text-*), so twMerge treats
// `text-h1` as a font size rather than a colour.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["hero", "h1", "h2", "h3", "h4", "lede", "eyebrow"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
