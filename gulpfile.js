const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');

/*
*  Default task
*  Watches js files and runs tests on changes
*  */
gulp.task('default', ['test', 'watch']);

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['test']);
  gulp.watch('test/**', ['test']);
});

// Single test run
gulp.task('test', function () {
  return gulp.src(['./test/*.js'])
    .pipe(mocha({ reporter: 'spec' }));
});

// Single test run with code coverage
gulp.task('coverage', function () {
  gulp.src(['./src/*.js', './app.js'])
    .pipe(istanbul({ includeUntested: true }))
    .on('finish', function () {
      gulp.src(['./test/*.js'])
        .pipe(mocha({ reporter: 'spec' }))
        .pipe(istanbul.writeReports({
          dir: './coverage',
          reportOpts: { dir: './coverage' },
        }));
    });
});
