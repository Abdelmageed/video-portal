const gulp = require('gulp');
import HubRegistry from 'gulp-hub';

const hub = new HubRegistry(['./gulp/**/!(util|server).js']);
gulp.registry(hub);

//gulp.task('default', gulp.series(['backend:run:dev', 'browser-sync:dev', 'tdd']));
//
//gulp.task('run:prod', gulp.series(['browser-sync:prod', 'backend:run:prod']));

gulp.task('default', gulp.series(['browser-sync:dev', 'tdd']));

gulp.task('run:prod', gulp.series(['browser-sync:prod']));