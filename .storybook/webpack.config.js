// load the default config generator.
const path = require('path');

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend it as you need.
  // For example, add typescript loader:
  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader'),
  });

  defaultConfig.module.rules.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
  });

  defaultConfig.resolve.modules.push(path.join(__dirname, '../'));
  defaultConfig.resolve.extensions.push('.ts', '.tsx');
  return defaultConfig;
};
