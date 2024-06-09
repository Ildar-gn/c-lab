import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve } from 'path';

export default {
  entry: './src/scripts/main.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'scripts/main.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'nunjucks-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/about.html',
      filename: 'about.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/contact.html',
      filename: 'contact.html'
    })
  ]
};
