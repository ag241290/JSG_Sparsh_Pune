/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable API routes
  images: {
    unoptimized: true
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
    serverComponentsExternalPackages: ['@supabase/supabase-js']
  }
}

module.exports = nextConfig