const del = require('delete');
const { series, src, dest } = require('gulp');
var minify = require('gulp-minifier');
const imagemin = require('gulp-imagemin');
const srcFolderPath = 'src';
const destFolderPath = 'dist';

function clean(cb) {
  del(destFolderPath);
  cb();
}

function build(cb) {
  src(`${srcFolderPath}/**/*`)
    .pipe(
      minify({
        minify: true,
        minifyHTML: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          minifyCSS: true,
          minifyJS: true
        },
        minifyJS: {
          sourceMap: true
        },
        minifyCSS: true
      })
    )
    .pipe(imagemin())
    .pipe(dest(destFolderPath));
  cb();
}

exports.build = build;
exports.default = series(clean, build);
