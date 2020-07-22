const CopyWebpackPlugin = require('copy-webpack-plugin')
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin')

module.exports = {
  entry: {
    background: './src/background.ts'
  },
  plugins: [
    new TsConfigWebpackPlugin(),
    new CopyWebpackPlugin({
        patterns: [
          {
            from: '**/*',
            context: 'public',
          },
          {
            from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js'
          }
        ]
      },
    ),
  ],
}
