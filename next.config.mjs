/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Handle audio files
    config.module.rules.push({
      test: /\.(mp3|wav|ogg|flac)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/audio/',
          outputPath: 'static/audio/',
        },
      },
    });

    // Handle WebAssembly
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
};

export default nextConfig;
