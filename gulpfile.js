const gulp = require('gulp');
const fs = require('fs');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const clean = require('gulp-clean');
const watch = require('gulp-watch');
const argv = require('yargs').argv;
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

gulp.task('clean-build-client', function() {
  return gulp.src('dist/client/*').pipe(clean({force: true}));
});

gulp.task('clean-build-server', function() {
  return gulp.src('dist/server/*').pipe(clean({force: true}));
});

gulp.task('clean-test-build', function() {
  return gulp.src('dist/test/*').pipe(clean({force: true}));
});

gulp.task('build-client', ['clean-build-client'], function() {
  return gulp.src('src/Client/**/*.ts')
    .pipe(ts(tsOptions))
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/client'));
});

gulp.task('build-server', ['clean-build-server'], function() {
  return gulp.src('src/Server/**/*.ts')
    .pipe(ts(tsOptions))
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/server'));
});

gulp.task('build-tests', ['clean-test-build'], function() {
  return gulp.src('test/**/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/test'));
});

gulp.task('build', ['build-server', 'build-client'], function() {});

gulp.task('run-test', ['build', 'build-tests'], function () {
  return gulp.src('dist/test/suite.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('run-trainer', ['build'], function() {
  var agentName = argv.output || 'debugging/agent_'+Math.floor(Date.now() / 1000);
  var agentFile = './agents/'+agentName;
  var trainingProgram = argv.trainingProgram || 'default';
  var iterations = argv.iterations || 10000;
  var Game = require('./dist/server/Game.js').default;

  var game = new Game({training: trainingProgram});
  game.run(iterations);
  var exportData = game.exportPlayerAgentBrain();
  fs.writeFileSync(agentFile, JSON.stringify(exportData));
});
