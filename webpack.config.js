const historyApiFallback = require('connect-history-api-fallback');
const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'; // Dynamically set based on mode

  return {
    mode: isProduction ? 'production' : 'development', // Set mode dynamically
    entry: {
      bundle: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      clean: true, // Ensures old files are cleaned up in dist folder
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map', // Different source maps for dev/prod
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      port: 3000,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
    },
    optimization: {
    //   minimize: isProduction, // Enable minimization in production mode
    //   splitChunks: {
    //     chunks: 'all', // Split vendor and app code
    //   },
    },
  };
};
