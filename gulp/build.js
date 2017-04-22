import path from'path';
import gulp from'gulp';
import gutil from'gulp-util';
import rimraf from'rimraf';
import fs from'fs';
import webpack from'webpack';

import webpackProdConfig from'../configs/webpack/prod';
//import webpackBackendConfig from '../configs/webpack/backend';
import {onBuild} from './util';

gulp.task('build:front', function (done) {
  process.env.NODE_ENV = 'production';
  
  gutil.log('Generating front-end minified bundle. This will take a moment...');
  // this assures React is built in prod mode and that the Babel dev config doesn't apply.
  webpack(webpackProdConfig).run(onBuild(done));
});

//gulp.task('build:back', function(done) {
//  gutil.log('Generating back-end bundle...');
//  webpack(webpackBackendConfig).run(onBuild(done));
//});

gulp.task('build:clean', function(done) {
    gutil.log(gutil.colors.yellow('cleaning client directory'));
  
  rimraf(path.join(__dirname, '/client'), function (err) {
    if (err)
        throw new gutil.PluginError('build:clean', err);
    fs.mkdir(path.join(__dirname, '/client'), function () {
      gutil.log(gutil.colors.green('client directory cleaned'));
      done();
    });
  })
});

gulp.task('build', gulp.series('build:clean', 'build:front'));