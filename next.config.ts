import type { NextConfig } from 'next'
import type { WebpackConfigContext } from 'next/dist/server/config-shared'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  // ─── Standalone output for Cloudflare / OpenNext ──────────────────
  output: 'standalone',

  // ─── Turbopack (dev only — production still uses SWC/webpack) ───
  turbopack: {
    // Resolve aliases matching tsconfig paths
    resolveAlias: {
      '@': './src',
    },
  },

  // ─── SWC Compiler transforms ───────────────────────────────────
  compiler: {
    // Remove console.log in production (keep console.error/warn)
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  // ─── Image optimization ────────────────────────────────────────
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days = 2592000 seconds
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ─── Headers ───────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
        ],
      },
    ];
  },

  // ─── Bundle splitting (webpack — production builds) ────────────
  webpack(config, { isServer, dev }: WebpackConfigContext) {
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            // Isolate Three.js into its own chunk (~580 KB raw → ~90 KB gzip)
            three: {
              test: /[\\/]node_modules[\\/](three|@types\/three)[\\/]/,
              name: 'vendor-three',
              chunks: 'async',
              priority: 30,
            },
            // Isolate Framer Motion into its own chunk
            framer: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'vendor-framer',
              chunks: 'async',
              priority: 25,
            },
            // All other node_modules
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
          },
        },
      }
    }
    return config
  },

  experimental: {
    // Faster module resolution
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
    ],
  },
}

export default withBundleAnalyzer(nextConfig)
