/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.portecosacademic.ao',
      },
    ],
  },
};

module.exports = nextConfig;
