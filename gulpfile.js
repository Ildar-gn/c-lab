const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const watch = require('gulp-watch');

// Компиляция SCSS в CSS
gulp.task('sass', function() {
  return gulp.src('scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('styles'));
});

// Минификация CSS
gulp.task('minify-css', function() {
  return gulp.src('styles/styles.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/styles'));
});

// Минификация HTML
gulp.task('minify-html', function() {
  return gulp.src('*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

// Наблюдение за изменениями в SCSS файлах
gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', gulp.series('sass'));
});

// Задача по умолчанию
gulp.task('default', gulp.series('sass', 'watch'));

// Задача для сборки проекта
gulp.task('build', gulp.series('sass', 'minify-css', 'minify-html'));
