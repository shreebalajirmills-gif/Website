import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default {
  ...defineCloudflareConfig(),
  buildCommand:
    "npx next build && mkdir -p .next/standalone/.next/static && cp -r .next/static/* .next/standalone/.next/static/",
  // Optimize for smaller bundle size
  experimental: {
    incrementalCacheHandlerPath: undefined,
  },
};
