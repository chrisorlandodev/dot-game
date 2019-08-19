const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './server/src/dot-game.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'expose-loader',
          options: 'DotGame'
        }, {
          loader: 'ts-loader'
        }],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  watch: true,
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: 'dot-game.js',
    path: path.resolve(__dirname, 'dist')
  },
  // optimization: {
  //   minimizer: [new UglifyJsPlugin({
  //     sourceMap: true,
  //   })],
  // },
};
