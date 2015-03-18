var gulp = require('gulp');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var umd = require('gulp-umd');

gulp.task('test', ['build'], function() {
  return gulp
    .src('test/spec.js', {read: false})
    .pipe(mocha());
});

gulp.task('build', function() {
  return gulp
    .src('src/chaplin.virtual-collection.js')
    .pipe(umd({
      dependencies: function () {
        return [{
          name: 'chaplin',
          global: 'Chaplin',
          param: 'Chaplin'
        }, {
          name: 'underscore',
          global: '_',
          param: '_'
        }];
      },
      exports: function () {
        return 'VirtualCollection';
      },
      namespace: function () {
        return 'VirtualCollection';
      }
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('minify', function() {
  return gulp
    .src('chaplin.virtual-collection.js')
    .pipe(uglify())
    .pipe(rename(function (path) {
        path.extname = '.min' + path.extname;
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', function() {
  return gulp.start(['test', 'build', 'minify']);
});
