const gulp = require('gulp');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const clean = require('gulp-clean');
const watch = require('gulp-watch');


gulp.task('default', ['build']);
gulp.task('test', ['run-test']);

gulp.task('watch', function() {
  gulp.watch(['src/**/*.js', 'test/**/*.js'], ['test']);
});

gulp.task('clean-build', function() {
  return gulp.src('dist/game/*').pipe(clean({force: true}));
});

gulp.task('clean-test-build', function() {
  return gulp.src('dist/test/*').pipe(clean({force: true}));
});

gulp.task('build', ['clean-build'], function() {
  return gulp.src('src/**/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/game'));
});

gulp.task('build-tests', ['clean-test-build'], function() {
  return gulp.src('test/**/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/test'));
});


gulp.task('run-test', ['build', 'build-tests'], function () {
  return gulp.src('dist/test/suite.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});
