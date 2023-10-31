const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    filename: 'bundle.js', // Output bundle file
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match JavaScript and JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel for transpilation
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Babel presets for ES6 and JSX
          },
        },
      },
    ],
  },
};
