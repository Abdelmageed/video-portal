import path from 'path';
import gulp from 'gulp';
import gutil from 'gulp-util';
import jasmine from 'gulp-jasmine';
import watch from 'gulp-watch';
import cover from 'gulp-coverage';
import karma from 'karma';
const Server = karma.Server;

require('../configs/jasmine/helpers/setup.js');

function test (done) {
   gulp.src('src/**/*.spec.js')
  .pipe(jasmine({
    conf: require('../configs/jasmine/conf.json'),
    errorOnFail: false
  })
    .on('jasmineDone', ()=> {
      done();
    }));
}

gulp.task('test', (done)=> {
 test(done);
});

gulp.task('tdd', (done)=> {
  test(done);
  gulp.watch('src/**/*.js', gulp.series('test'));
  done();
});

//gulp.task('cover', (done)=> {
//  return gulp.src('src/**/*.js')
//    .pipe(cover.instrument({
//      pattern: ['**/*.spec.js', '!node_modules'],
//      debugDirectory: 'debug'
//    }))
//    .pipe(jasmine({
//      conf: require('../configs/jasmine/conf.json'),
//      errorOnFail: false
//    }))
//    .pipe(cover.gather())
//    .pipe(cover.format())
//    .pipe(gulp.dest('coverage'));
//});

gulp.task('cover', (done)=> {
  new Server({
    configFile: path.join(__dirname, '..', 'configs/karma/config.js'),
    singleRun: true
  }, done)
  .start();
});