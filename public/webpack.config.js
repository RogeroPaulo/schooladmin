var path = require('path');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    index: './src/index.js',
    portal: './src/portal.js',
    admin: './src/admin.js'
  },
  devtool: 'source-map',
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist\/')
  },
  module: {
    rules: [
      {
        test: /\.svg(\?.*)?$/, 
        use: [
          'url-loader',
          'svg-transform-loader' 
        ]
      },
      {
        test: /\.(scss|sass)$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: [
    //new BundleAnalyzerPlugin()
  ]
}