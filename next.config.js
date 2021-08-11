const path = require('path');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([], {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'scontent.cdninstagram.com',
      'video.cdninstagram.com',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
});
