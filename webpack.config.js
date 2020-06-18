const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const threadLoader = require("thread-loader");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// const env = require("./env.json");

// NODE_ENV : development | production
process.env.NODE_ENV = process.env.NODE_ENV === "production" ? "production" : "development";

// CONFIG_ENV : dev | alpha | qa | uat | prod
const configEnv = ["dev", "alpha", "qa", "uat", "prod"].includes(process.env.CONFIG_ENV)
  ? process.env.CONFIG_ENV
  : "dev";

console.log("======== CONFIG ENV ========");
console.log(configEnv);
console.log("");

threadLoader.warmup(
  {
    maxConcurrentWorkers: require("os").cpus().length - 1,
  },
  ["babel-loader", "ts-loader", "sass-loader"],
);

const threadPoolOptions = {
  workers: require("os").cpus().length - 1,
};

const config = {
  mode: process.env.NODE_ENV,
  target: "web",
  context: __dirname,
  entry: {
    main: ["./src/Root.tsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    filename: process.env.NODE_ENV === "production" ? "[name]-[hash].js" : "[name].js",
    chunkFilename: process.env.NODE_ENV === "production" ? "[name]-[chunkhash].js" : "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "thread-loader",
            options: threadPoolOptions,
          },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: "ts-loader",
            options: {
              happyPackMode: true,
              transpileOnly: true,
            },
          },
        ],
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "src/i18n")],
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "thread-loader",
            options: threadPoolOptions,
          },
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.less$/,
        loaders: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css", ".scss"],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      templateParameters: {
        CONFIG_ENV: configEnv,
      },
    }),
    new CopyWebpackPlugin([
      {
        from: "src/templates",
        to: "templates",
      },
    ]),
  ],
  optimization: {
    runtimeChunk: true,
  },
  devServer: {
    contentBase: path.resolve(__dirname, "src"),
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
    before: function(app, server) {
      app.get(`/api/login`, function(req, res) {
        setTimeout(() => {
          res.json({
            code: 200,
            data: {
              id: 1,
              name: "wjw",
              token: "sdfsdfstoke",
            },
            success: true,
          });
        }, 1000);
      });
      app.get(`/api/logout`, function(req, res) {
        // console.log(`${env[process.env.BUILD_ENV].apiUrl}/api/logout`);
        setTimeout(() => {
          res.json({
            code: 200,
            data: null,
            success: true,
            token: null,
          });
        }, 1000);
      });
    },
    host: "0.0.0.0",
    port: 8000,
    hot: true,
  },
};

// webpack dev server
if (process.env.NODE_ENV === "development") {
  config.entry.main.unshift("webpack-dev-server/client?http://localhost:9000/");
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

// webpack analyzer
if (process.env.analyze) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
