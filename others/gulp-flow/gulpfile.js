var gulp = require('gulp'),
	cached = require('gulp-cached'),
	cleanCss = require('gulp-clean-css'),
	pump = require('pump'),
	uglify = require('gulp-uglify'),
	del = require('del'),
	RevAll = require('gulp-rev-all');

var config = {
	app: './app/',
	src: './src/',
	dist: './static/',
	manifest: './',
	cdn: {
		ak: '',
		sk: ''
	}
};

gulp.task('min:js', ['rev'], function() {
	var revAll = new RevAll();
	pump([gulp.src(config.dist + 'src/js/**/*.js'), uglify(), gulp.dest(config.dist + 'src/js/')], function() {
		console.log('======uglify done======');
	});
});

gulp.task('min:css', ['rev'], function() {
	return gulp.src(config.dist + 'src/css/**/*.css')
		.pipe(cleanCss({
			compatibility: '*'
		}, function() {
			console.log('======cleanCss done======');
		}))
		.pipe(gulp.dest(config.dist + 'src/css/'));
});

gulp.task('min', ['min:js', 'min:css']);

gulp.task('rev', ['clear'], function() {
	var revAll = new RevAll({
		dontRenameFile: [/.html$/g],
		dontUpdateReference: [/.html$/g],
	});
	return gulp.src([config.src + '**/*', config.app + '**/*.html'])
		// .pipe(gulp.dest(config.dist))
		.pipe(revAll.revision())
		.pipe(gulp.dest(config.dist))
		.pipe(revAll.manifestFile())
		.pipe(gulp.dest(config.manifest));
});

gulp.task('clear', function() {
	del.sync([config.dist, './rev-manifest.json']);
});

gulp.task('default', ['min']);