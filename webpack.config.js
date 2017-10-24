module.exports = {
  entry: './src/main.js',
  output: {
    library: 'deeplearn',
    libraryTarget: 'umd',
    filename: 'dist/deeplearn.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        exclude: '/node_modules/',
        loader: 'babel-loader',
        query: {
          presets: ['env'],
        },
      },
    ],
  },
};
