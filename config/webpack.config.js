'use strict'

const config = {
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: require.resolve('./package.json'),
        type: 'javascript/auto',
        use: {
          loader: 'json-filter-loader',
          options: {
            used: ['version'],
          },
        },
      }
    ]
  },
  optimization: {
    minimize: false
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  }
}

module.exports = config
