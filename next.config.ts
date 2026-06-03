import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ─── Static Export for GitHub Pages ───────────────────────────────────────
  output: 'export',       // Generates /out folder for static hosting
  trailingSlash: true,    // Required for GitHub Pages routing
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',

  // ─── Images ───────────────────────────────────────────────────────────────
  // Must be unoptimized for static export (no server-side image optimization)
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // ─── TypeScript ───────────────────────────────────────────────────────────
  typescript: {
    ignoreBuildErrors: false,
  },

  // ─── Transpile ────────────────────────────────────────────────────────────
  transpilePackages: ['motion'],
};

export default nextConfig;
