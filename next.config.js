/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
env: {
    OPEN_AI_API: process.env.OPEN_AI_API,
  }
}

module.exports = nextConfig
