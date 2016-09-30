var gulp = require('gulp'),
    fs = require('fs'),
    del = require('del'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    markdown = require('gulp-markdown'),
    header = require('gulp-header'),
    replace = require('gulp-replace'),
    connect = require('gulp-connect');


const CONFIG = {
    src: 'doc/',
    dist: 'pages/',
    header: 'pages/util/header.txt',
    layout: 'pages/util/layout.html'
};

const pkg = require('./package.json');

gulp.task('header-js', () => {
    return gulp.src(CONFIG.src + '**/*.js')
        .pipe(header(fs.readFileSync(CONFIG.header, 'utf-8'), {
            pkg: pkg
        }))
        .pipe(gulp.dest(CONFIG.src));
});


gulp.task('md2html', () => {
    return gulp.src(CONFIG.src + '**/*.md')
        .pipe(concat('index.md'))
        .pipe(markdown())
        .pipe(gulp.dest(CONFIG.dist));
});

gulp.task('pages', ['md2html'], () => {
    fs.readFile(CONFIG.dist + 'index.html', 'utf-8', (err, file) => {
        if (err) {
            throw err;
        }
        gulp.src(CONFIG.layout)
            .pipe(replace('<!-- main -->', file))
            .pipe(rename({
                basename: 'index'
            }))
            .pipe(gulp.dest('./'))
            .pipe(connect.reload());
    });
});

gulp.task('watch', () => {
    gulp.watch(CONFIG.src + '**/*', ['pages']);
});

gulp.task('server', () => {
    connect.server({
        name: 'blog',
        root: ['./'],
        port: 8000,
        livereload: true
    });
});

gulp.task('default', ['pages', 'watch', 'server']);
