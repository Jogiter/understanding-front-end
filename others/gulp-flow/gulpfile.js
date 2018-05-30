var gulp = require('gulp'),
  cached = require('gulp-cached'),
  cleanCss = require('gulp-clean-css'),
  pump = require('pump'),
  uglify = require('gulp-uglify'),
  del = require('del'),
  qiniu = require('gulp-qiniu'),
  RevAll = require('gulp-rev-all')

var config = {
  app: './app/',
  src: './src/',
  dist: './static/',
  manifest: './',
  cdn: {
    url: 'http://oasvenh8x.bkt.clouddn.com/static/',
    base: {
      accessKey: "Pv4kMjn_1gXEvP2Efk9zEB-C2gRWAC-LLF_DsZ2Z",
      secretKey: "dEGaG6VgDxFHSNTFjvU6MaSkXRcILKv-Pb-KfvZo",
      bucket: "jogiter",
      private: false
    },
    dist: {
      dir: 'static/',
      versioning: false, // false则后面的值不生效
      versionFile: './cdn.json',
      concurrent: 10 // 时间值
    }
  }
}

gulp.task('min:js', ['rev'], function () {
  pump([gulp.src(config.dist + 'src/js/**/*.js'), uglify(), gulp.dest(config.dist + 'src/js/')], function () {
    console.log('======uglify done======')
  })
})

gulp.task('min:css', ['rev'], function () {
  return gulp.src(config.dist + 'src/css/**/*.css')
    .pipe(cleanCss({
      compatibility: '*' // default: ie9+
    }, function () {
      console.log('======cleanCss done======')
    }))
    .pipe(gulp.dest(config.dist + 'src/css/'))
})

gulp.task('min', ['min:js', 'min:css'])

gulp.task('rev', ['clear'], function () {
  var revAll = new RevAll({
    transformPath: function (rev, source, path) {
      // replace you source with cdn url
      return rev.replace(/(.*src\/)/ig, config.cdn.url)
    },
    dontRenameFile: [/.html$/g],
    dontUpdateReference: [/.html$/g]
  })
  return gulp.src([config.src + '**/*', config.app + '**/*.html'])
    .pipe(revAll.revision())
    .pipe(gulp.dest(config.dist))
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest(config.manifest))
})

gulp.task('clear', function () {
  del.sync([config.dist, './rev-manifest.json', './cdn.json'])
})

gulp.task('cdn', ['min'], function () {
  return gulp.src(config.dist + 'src/**')
    .pipe(qiniu(config.cdn.base, config.cdn.dist))
})

gulp.task('default', ['min', 'cdn'])
