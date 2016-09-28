var gulp = require('gulp');

var CONFIG = {
    src: './src/css/',
    dist: './assets/css/'
};

gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');

    return gulp.src(CONFIG.src + '**/*')
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer({
            // browsers: ['last 2 versions', '> 5%']
            browsers: ['> 1%', 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
        })]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(CONFIG.dist));
});

gulp.task('watch', function() {
    gulp.watch(CONFIG.src + '**/*', ['autoprefixer']);
});

gulp.task('default', ['autoprefixer', 'watch']);