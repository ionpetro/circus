const path = require('path');
const { withSentryConfig } = require('@sentry/nextjs');

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  dryRun: true, // Skip uploading source maps for faster builds
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

const moduleExports = {
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
    disableStaticImages: true,
  },
  env: {
    SECRET_CODE: process.env.SECRET_CODE,
  },
  webpack(config, { isServer }) {
    // Add SVG loader
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|jsx|ts|tsx)$/,
      use: ['@svgr/webpack'],
    });

    // Add image asset loader
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|avif|ico|bmp)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });

    return config;
  },
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
