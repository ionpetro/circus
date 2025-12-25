const path = require('path');
const { withSentryConfig } = require('@sentry/nextjs');

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
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
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp)$/i,
      type: 'asset/resource',
    });
    return config;
  },
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
