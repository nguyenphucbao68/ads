require('dotenv').config();

const path = require('path');
const webpack = require('webpack');

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new NodePolyfillPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        HELLO: JSON.stringify(process.env.HELLO),
        ADS_MANAGEMENT_MAP_API_KEY: 'm4PoRqbbe7SM6IzkpPqSstyQqTPKUrj8EHKEJHGL',
      },
    }),
  ],
};
