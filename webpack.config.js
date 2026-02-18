const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const packageJson = require('./package.json');
const homepage = packageJson.homepage || '';
const basename = homepage ? (() => { try { const p = new URL(homepage).pathname; return p.replace(/\/$/, '') || '/'; } catch { return ''; } })() : '';

module.exports = {
  entry: './src/app/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
    publicPath: basename ? `${basename}/` : '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/app/index.html',
      filename: 'index.html',
    }),
    ...(basename ? [new (require('webpack').DefinePlugin)({
      'process.env.PUBLIC_URL': JSON.stringify(basename),
    })] : []),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: { noEmit: false },
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
};
