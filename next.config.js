/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos','localhost','api-nickscorp-app.herokuapp.com']
  },
  experimental: { images: { layoutRaw: true } }
}

module.exports = nextConfig
