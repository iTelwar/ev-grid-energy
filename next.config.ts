import type { NextConfig } from "next";

/**
 * No-nonce CSP (see Next.js "Content Security Policy" guide). Nonces would
 * force every page to render dynamically; this site has no third-party
 * scripts and self-hosts fonts via next/font, so 'self' plus the inline
 * scripts Next.js emits (and the JSON-LD block) is sufficient.
 */
const isDev = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  /** Minimal server bundle for the production container (see Dockerfile). */
  output: "standalone",
  poweredByHeader: false,
  images: {
    // WebP only: AVIF encoding took 8-40s per image on the 0.25 vCPU task
    // (WebP ~1s), and optimized images are cached per task, so every deploy
    // would re-pay that cost on first views.
    formats: ["image/webp"],
    qualities: [75, 85],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
