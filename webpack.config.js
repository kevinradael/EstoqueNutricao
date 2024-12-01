const path = require('path');

module.exports = {
  entry: './src/index.js',  // ou o caminho para o arquivo de entrada do seu projeto
  output: {
    path: path.resolve(__dirname, 'web-build'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'web-build'),
    port: 9000,
  },
};
