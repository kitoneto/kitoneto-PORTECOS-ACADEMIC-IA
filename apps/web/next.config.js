/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['storage.portecosacademic.ao'],
  },
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
