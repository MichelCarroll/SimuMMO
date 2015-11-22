const gulp = require('gulp');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');


gulp.task('default', ['build']);
gulp.task('test', ['run-test']);

gulp.task('build', function() {
  return gulp.src('src/**/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
});


gulp.task('run-test', ['build'], function () {
  return gulp.src('test/tests.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});
