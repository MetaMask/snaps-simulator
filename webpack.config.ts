import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration, ProvidePlugin } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import WebpackBarPlugin from 'webpackbar';

const config: Configuration & Record<'devServer', DevServerConfiguration> = {
  entry: './src/index.tsx',
  stats: 'errors-warnings',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/u,
        use: 'swc-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: {
      process: require.resolve('process/browser'),
      util: false,
    },
  },
  plugins: [
    new ProvidePlugin({
      // These Node.js modules are used in some of the stream libs used
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new WebpackBarPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
    }),
  ],
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  devServer: {
    historyApiFallback: true,
  },
};

export default config;
