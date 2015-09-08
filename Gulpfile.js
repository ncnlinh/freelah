var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    batch = require('gulp-batch'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat');

gulp.task('clean', function() {
  return gulp.src(['build/*'], {read: false})
    .pipe(clean());
});

gulp.task('scripts', function() {
  return gulp.src([
      'public/javascripts/**/*.js'
    ])
    .pipe(concat('concat.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('css', function() {
  return gulp.src('public/stylesheets/**/*.css')
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('build/css'))
});

gulp.task('default', ['clean'], function() {
  gulp.start(['scripts', 'css', 'watch']);
});

gulp.task('watch', function () {
  console.log("Watching file changes...");

  gulp.watch('public/javascripts/**/*.js', batch(function (events, done) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      gulp.start('scripts', done);
  }));

  gulp.watch('public/stylesheets/**/*.css', batch(function (events, done) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      gulp.start('css', done);
  }));
});