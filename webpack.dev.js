const { merge } = require('webpack-merge');
const common = require('./webpack.common');
 
module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/',
            },
          },
        ],
      },
    ],
  }
  
})