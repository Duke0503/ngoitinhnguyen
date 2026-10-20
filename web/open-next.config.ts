import { defineCloudflareConfig } from "@opennextjs/cloudflare"
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache"

// Pages are prerendered at build time; the cache is read from the static assets bundle (no R2/KV needed).
export default defineCloudflareConfig({ incrementalCache: staticAssetsIncrementalCache })
