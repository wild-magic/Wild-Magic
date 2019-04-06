const withTypescript = require('@zeit/next-typescript');
const withLess = require('@zeit/next-less');
const withImages = require('next-images');
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css');

// Composable Pyramid of Death!
module.exports = withTypescript(
  withImages(
    withFonts(
      withCSS(
        withLess({
          webpack(config, options) {
            config.module.rules.push({
              test: /\.md$/,
              use: 'raw-loader',
            });
            return config;
          },
          target: 'serverless',
          // cssModules: true,
        })
      )
    )
  )
);
