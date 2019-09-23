module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/app-revolut/' : '/',
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
