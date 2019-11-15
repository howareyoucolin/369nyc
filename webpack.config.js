const path = require('path');

module.exports = {
  entry: {
    'main.js':'./src/index.js',
    'home.js':'./src/templates/home/homeClient.js',
    'blog.js':'./src/templates/blog/blogClient.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]'
  },
  resolve: {
	alias: {
	  src: path.resolve('./src')
	}
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
  	  {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[hash:base64:5]_[name]_[local]'
            }
          }
        ]
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  node: { fs: 'empty' , net: 'empty'},
  target: 'node'
};

