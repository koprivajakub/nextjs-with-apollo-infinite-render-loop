const withSass = require("@zeit/next-sass");
const withTypescript = require("@zeit/next-typescript");

const webpack = require("webpack");

module.exports =
  withTypescript(
    withSass({
      webpack: (config) => {
        config.module.rules.push({
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
          use: {
            loader: "url-loader",
            options: {

              limit: 100000,
              name: "[name].[ext]"
            }
          }
        });
        config.plugins.push(new webpack.EnvironmentPlugin(process.env));
        config.resolve.modules.unshift(__dirname + "/src");

        return config;
      },
      distDir: "../.next"
    })
  );
