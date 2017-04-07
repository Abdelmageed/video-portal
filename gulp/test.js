import path from 'path';
import gulp from 'gulp';
import gutil from 'gulp-util';
import jasmine from 'gulp-jasmine';
import watch from 'gulp-watch';

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

