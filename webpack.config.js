var path = require('path');
var webpack = require('webpack');

module.exports = {

  output: {
    path: "./GitIssueParser/static/js",
    filename: "all.min.js"
  },
  entry: {
        javascript:'./GitIssueParser/static/jsx/App.jsx'
      },
  devtool:'source-map',
  module: {
  loaders: [
    {
      test: /\.jsx$/,
      exclude: /node_modules/,
      loaders: ["jsx-loader"],
    },
    {
	  test: /\.html$/,
	  loader: "file?name=[name].[ext]",
	 },
   {
	  test: /\.jsx$/,
	  exclude: /node_modules/,
	  loaders: ["jsx-loader"],
	 },
  { test: /\.css$/, loader: "style-loader!css-loader" },
  { test: /\.png$/, loader: "url-loader?limit=100000" },
  { test: /\.jpg$/, loader: "file-loader" },
  {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url?limit=10000&minetype=application/font-woff"
  }, {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url?limit=10000&minetype=application/font-woff"
  }, {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url?limit=10000&minetype=application/octet-stream"
  }, {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: "file"
  }, {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url?limit=10000&minetype=image/svg+xml"
  }
  ],
},
}
