const gulp = require('gulp');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const clean = require('gulp-clean');
const watch = require('gulp-watch');
const ts = require('gulp-typescript');

var tsOptions = {
    declarationFiles: false,
    noExternalResolve: true,
    noLib: false,
    target: 'ES6',
    typescript: require('typescript')
};

gulp.task('default', ['test', 'watch']);
gulp.task('test', ['run-test']);

gulp.task('watch', function() {
  gulp.watch(['src/**/*.ts', 'test/**/*.js'], ['test']);
});

gulp.task('clean-build', function() {
  return gulp.src('dist/game/*').pipe(clean({force: true}));
});

gulp.task('clean-test-build', function() {
  return gulp.src('dist/test/*').pipe(clean({force: true}));
});

gulp.task('build', ['clean-build'], function() {
  return gulp.src('src/**/*.ts')
    .pipe(ts(tsOptions))
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
