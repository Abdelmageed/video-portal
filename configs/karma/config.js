var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    basePath: '../../src',
     files: [
      'components/**/*.js',
      'reducers/**/*.js',
      'actions/thunkCreators.js' 
    ],
    browserNoActivityTimeout: 60000,
    frameworks: [
      'jasmine',
    ],
    preprocessors: {
      '**/*.js': ['webpack']
    },
    reporters: ['progress', 'coverage-istanbul', 'coverage'],
    webpack: {
      cache: true,
      devtool: 'eval-source-map',
      plugins: [
         new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: true,
          noInfo: true, // set to false to see a list of every file being bundled.
          options: {
            sassLoader: {
              includePaths: [path.join(__dirname, '..', '..' ,'src', 'scss')]
            },
            context: '/',
            postcss: () => [autoprefixer],
          }
        }),
      ],
      externals: {
        'cheerio': 'window',
        'react/addons': 'react',
        'react/lib/ExecutionEnvironment': 'react',
        'react/lib/ReactContext': 'react',
      },
      module: {
        rules: [
          {
            enforce: 'pre',
            test: /.spec\.js$/,
            include: /..src/,
            exclude: /(bower_components|node_modules)/,
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
            },
          },
          {
            enforce: 'pre',
            test: /^((?!spec).)*\.js$/,
            include: /..src/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
              cacheDirectory: true
            },
          },
          {enforce: 'pre', test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader'},
      {enforce: 'pre', test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
      {enforce: 'pre', test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {enforce: 'pre', test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
      {enforce: 'pre', test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]'},
      {enforce: 'pre', test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
      {enforce: 'pre', test: /(\.css|\.scss|\.sass)$/, loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap']},
        ]
      },
  },
    coverageReporter: {
      type : 'html',
      dir : '../coverage/',
      includeAllSources: true
    }
  });
}