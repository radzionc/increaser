/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
})
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  output: 'export',
  swcMinify: false,
  // trailingSlash: true,
  transpilePackages: ['@increaser/ui'],
}

// eslint-disable-next-line no-undef
module.exports = withPWA(nextConfig)

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,

    org: 'geekrodion',
    project: 'pomodoro',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: false,
    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
)
