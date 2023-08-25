/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
/** @type {import('next').NextConfig} */
const nextConfig = {
  // to test authorization
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  output: 'export',
  swcMinify: false,
  transpilePackages: ['@increaser/ui'],
}

module.exports = nextConfig
