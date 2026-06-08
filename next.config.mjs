/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const isStaticExport = process.env.STATIC_EXPORT === "true";

// Production CSP — strict. Dev needs 'unsafe-eval' for Next.js React Refresh.
// Note: headers() are IGNORED in `output: "export"` builds; the CSP is kept
// for hosted (non-static) deployments. For GitHub Pages, set CSP at a proxy
// in front (Cloudflare, etc.) if you want layered defense.
const scriptSrc = isDev
  ? "'self' 'unsafe-inline' 'unsafe-eval'"
  : "'self' 'unsafe-inline'";

const CSP = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://images.unsplash.com https://api.dicebear.com https://*.tile.openstreetmap.org",
  "connect-src 'self' https://api.open-meteo.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig = {
  ...(isStaticExport && {
    output: "export",
    basePath,
    assetPrefix: basePath || undefined,
    trailingSlash: true,
  }),
  images: {
    // Static export must use unoptimized images (no /_next/image runtime endpoint).
    unoptimized: isStaticExport,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
    ],
  },
  ...(!isStaticExport && {
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: securityHeaders,
        },
      ];
    },
  }),
};

export default nextConfig;
