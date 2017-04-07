import gulp from 'gulp';
const browserSync = require('browser-sync').create();
import HubRegistry from 'gulp-hub';

const hub = new HubRegistry(['./gulp/build.js']);

gulp.registry(hub);


//instanstiating a webpack compiler runs it!
//That runs outside of gulp tasks, and blocks nodemon
//instead import the config with the webpack compiler on task run
gulp.task('browser-sync:dev', function(done) {
  browserSync.init(require('../configs/browserSync/dev.js'), done);
});

gulp.task('browser-sync:prod', function(done) {
  browserSync.init(require('../configs/browserSync/prod.js'), done);
});