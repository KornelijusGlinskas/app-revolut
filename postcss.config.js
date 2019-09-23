const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    autoprefixer({
      add: true,
      grid: true
    }),
    process.env.NODE_ENV === 'production'
      ? purgecss({
          content: ['./public/**/*.html', './src/**/*.vue'],
          defaultExtractor: content => {
            const contentWithoutStyleBlocks = content.replace(
              /<style[^]+?<\/style>/gi,
              ''
            );
            return (
              contentWithoutStyleBlocks.match(
                /[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g
              ) || []
            );
          },
          whitelistPatterns: [
            /-(leave|enter|appear)(|-(to|from|active))$/,
            /^(?!cursor-move).+-move$/,
            /^router-link(|-exact)-active$/
          ]
        })
      : ''
  ]
};
