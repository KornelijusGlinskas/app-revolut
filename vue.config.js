module.exports = {
  publicPath: '/app-revolut',
  outputDir: 'docs',
  css: {
    loaderOptions: {
      sass: {
        data: `
        @import "~@/assets/styles/style.scss";
        `
      }
    }
  }
};
