const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseconfig = require('./webpack.config.js')
const path = require('path')

module.exports = merge(baseconfig, {
  entry: '../index.ts',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'DiscordEco',
    libraryTarget: 'umd'
  },
  externals: [ nodeExternals() ]
})
