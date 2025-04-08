var iconfont = require('gulp-iconfont');
var gulp = require('gulp');
var runTimestamp = Math.round(Date.now() / 1000);
var iconfontCss = require('gulp-iconfont-css');

gulp.task('default', function () {
  gulp.src(['src/assets/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: 'icon',
      path: 'src/less/templates/icons.less',
      targetPath: '../../less/icons.less',
      fontPath: '/assets/fonts/'
    }))
    .pipe(iconfont({
      normalize: true,
      centerHorizontally: true,
      fontHeight: 150,
      descent: 0,
      fontName: 'icon',
      prependUnicode: true,
      formats: ['ttf', 'eot', 'woff'],
      timestamp: runTimestamp
    }))
    .pipe(gulp.dest('src/assets/fonts/'));
});
