/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["i1.hdslb.com"]
  }
}

module.exports = nextConfig
