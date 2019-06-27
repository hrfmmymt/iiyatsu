const path = require('path')
const nodeExternals = require('webpack-node-externals')

const config = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname),
    libraryTarget: 'this'
  },
  target: 'node',
  node: {
    __dirname: true
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }
}

module.exports = (env, argv) => {
  if (argv.mode !== 'production') {
    config.devtool = 'source-map'
  }

  return config
}
