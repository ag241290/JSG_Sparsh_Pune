/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure we're NOT using static export for Vercel deployment
  // This allows API routes to work properly
  images: {
    unoptimized: true
  },
  
  // Optimize for Vercel deployment
  poweredByHeader: false,
  
  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react'],
    serverComponentsExternalPackages: ['@supabase/supabase-js']
  },

  // Ensure proper routing
  trailingSlash: false,
  
  // Headers for better performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig