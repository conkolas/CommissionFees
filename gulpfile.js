const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');

gulp.task('default', ['test'], function () {
  gulp.watch(['src/*.js', 'test/**'], ['test']);
});

gulp.task('test', function () {
  return gulp.src('src/*.js')
    .pipe(istanbul({ includeUntested: true }))
    .on('finish', function () {
      gulp.src(['./test/*.js'])
        .pipe(mocha({ reporter: 'spec' }));
    });
});

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
