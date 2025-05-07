// eslint-disable-next-line no-undef
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})
/** @type {import('next').NextConfig} */
const nextConfig = {
  // disabled for authorization queries
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  output: 'export',
  transpilePackages: ['@product/ui'],
}

// eslint-disable-next-line no-undef
module.exports = withPWA(nextConfig)
