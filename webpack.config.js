const path = require('path')

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  entry: {
    'app': './src/index.jsx',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: 'asset',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/inline'
      },
      {
        test: /\.(glb|gltf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'models/[hash][ext][query]'
        }
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".css", ".jpg"],
    fallback: {
      "fs": false,
      "path": false,
      "os": false
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'SSE Quiz App',
      template: './src/index.html',
      inject: 'body'
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "./assets/models", to: "./assets/models", noErrorOnMissing: true }]
    }),
    new BundleAnalyzerPlugin(),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  devServer: {
    allowedHosts: 'any',
    open: false,
    port: 8080,
    client: {
      webSocketURL: "ws://0.0.0.0/ws",
    },
    static: {
      directory: path.join(__dirname, './')
    },
    proxy: {
      "/ws": {
        target: "http://localhost:443",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
      }),
    ],
  },
};