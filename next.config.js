/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.betternfaster.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SERVER: process.env.NEXT_PUBLIC_SERVER,
    NEXT_PUBLIC_ENTITY: process.env.NEXT_PUBLIC_ENTITY,
    NEXT_PUBLIC_FOOTER: process.env.NEXT_PUBLIC_FOOTER,
  }
}

module.exports = nextConfig