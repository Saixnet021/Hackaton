/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // <--- desactiva en dev
});

const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
  // Allow importing JSON files
  webpack: (config: any) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = withPWA(nextConfig);
