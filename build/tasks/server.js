const gulp = require('gulp');

gulp.task('server', gulp.series('server:views', 'watch'));
