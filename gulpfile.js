const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const watch = require('gulp-watch');
const ghPages = require('gulp-gh-pages');
const path = require('path');

// Компиляция SCSS в CSS
gulp.task('sass', function() {
  return gulp.src('scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles')); // Сохраняем в папку dist/styles
});

// Минификация CSS
gulp.task('minify-css', function() {
  return gulp.src('dist/styles/styles.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/styles'));
});

// Минификация HTML
gulp.task('minify-html', function() {
  return gulp.src('dist/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

// Обработка шаблонов Nunjucks
gulp.task('nunjucks', function() {
  return gulp.src(['src/templates/**/*.html', '!src/templates/layout.html', '!src/templates/header.html', '!src/templates/footer.html']) // Исключаем layout.html, header.html и footer.html
    .pipe(data(function(file) {
      return require('./src/data.json');
    }))
    .pipe(nunjucksRender({
      path: ['src/templates']
    }))
    .pipe(gulp.dest('dist'));
});

// Копирование изображений
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'));
});

// Копирование шрифтов
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

// Копирование скриптов
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*')
    .pipe(gulp.dest('dist/scripts'));
});

// Наблюдение за изменениями в SCSS и Nunjucks файлах
gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/**/*.html', gulp.series('nunjucks')); // Изменено на .html
  gulp.watch('src/images/**/*', gulp.series('images'));
  gulp.watch('src/fonts/**/*', gulp.series('fonts'));
  gulp.watch('src/scripts/**/*', gulp.series('scripts'));
});

// Задача по умолчанию
gulp.task('default', gulp.series('sass', 'nunjucks', 'images', 'fonts', 'scripts', 'watch'));

// Задача для сборки проекта
gulp.task('build', gulp.series('sass', 'minify-css', 'nunjucks', 'minify-html', 'images', 'fonts', 'scripts'));

// Задача для деплоя на gh-pages
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});
