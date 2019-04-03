// load the default config generator.
const path = require('path');

module.exports = ({ config }) => {
  // Extend it as you need.
  // For example, add typescript loader:
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      require.resolve('awesome-typescript-loader'),
      require.resolve('react-docgen-typescript-loader'),
    ],
  });

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      require.resolve('style-loader'),
      require.resolve('css-loader'),
      require.resolve('sass-loader'),
    ],
  });

  config.resolve.modules.push(path.join(__dirname, '../'));
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
