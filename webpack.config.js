const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/app.tsx",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },

  // Enable sourcemaps for debugging webpack's output.
  //devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader"
      }

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      //, { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin(
      { template: './public/index.html' }
    )
  ],

  devServer: {
    port: 3000,
    open: true,
    //proxy: {
      //"/api": "http://localhost:9090"
    //}
  },
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    //"react": "React",
    //"react-dom": "ReactDOM"
  }
};
