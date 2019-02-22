const path = require(`path`);
const dirname = path.resolve();

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(dirname, `public`)
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(dirname, `public`),
    publicPath: `http://localhost:8080/`,
    hot: true,
    compress: true
  }
};
