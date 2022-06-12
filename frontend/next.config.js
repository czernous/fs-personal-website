/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ['page.tsx', 'page.jsx'],
  webpack(config) {
    // temporary hack to disable css modules
    config.module.rules[3].oneOf.forEach((one) => {
      if (!`${one.issuer?.and}`.includes('_app')) return;
      one.issuer.and = [path.resolve(__dirname)];
    });
    return config;
  },
};

module.exports = nextConfig;
