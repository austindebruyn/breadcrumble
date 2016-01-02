
var envify    = require('envify/custom');
var gulp      = require('gulp');
var rename    = require('gulp-rename');
var transform = require('vinyl-transform');
var uglify    = require('gulp-uglify');
var umd       = require('gulp-umd');

gulp.task('build:dev', function() {
  return gulp.src('lib/breadcrumble.js')
    .pipe(transform(envify({ NODE_ENV: 'development' })))
    .pipe(umd())
    .pipe(gulp.dest('dist'));
});

gulp.task('build:prod', function() {
  return gulp.src('lib/breadcrumble.js')
    .pipe(transform(envify({ NODE_ENV: 'production' })))
    .pipe(umd())
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build:dev', 'build:prod']);
