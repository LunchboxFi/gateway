/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@lunchboxfi/sdk', '@sqds/multisig'],
}

module.exports = nextConfig
