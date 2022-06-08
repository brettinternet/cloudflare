const path = require('path')

const workerDir = process.env.WORKER_DIR

if (!workerDir) {
  throw Error('Missing WORKER_DIR env var')
}

const workerPath = path.join(__dirname, 'workers', workerDir)
const mode = process.env.NODE_ENV || 'production'

module.exports = {
  entry: path.join(workerPath, 'index.ts'),
  output: {
    filename: 'worker.js',
    path: path.join(workerPath, 'dist'),
  },
  devtool: 'cheap-module-source-map',
  mode,
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
}
