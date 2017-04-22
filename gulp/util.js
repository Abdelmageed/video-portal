import gutil from 'gulp-util';

export function onBuild(done) {
  return function(err, stats) {
    if(err) {
      gutil.log(gutil.colors.red('Error', err));
    }
    else {
//      gutil.log(gutil.colors.red(stats.toString('errors-only')));
      gutil.log(stats.toString('default'));

    }

    if(done) {
      done();
    }
  }
}