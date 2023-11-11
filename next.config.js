// TODO: Related to https://github.com/shadcn-ui/taxonomy/issues/100#issuecomment-1605867844

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createContentlayerPlugin } = require('next-contentlayer');

import('./env.mjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
};

const withContentlayer = createContentlayerPlugin({});

module.exports = withContentlayer(nextConfig);
