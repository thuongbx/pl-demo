import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import header from 'gulp-header';
import rename from 'gulp-rename';
import { PathItem } from './paths';
import postcssGapProperties from 'postcss-gap-properties';
const sassGlob = require('gulp-sass-glob');

const sass = gulpSass(dartSass);
const gulpSassOptions = {
  includePaths: ['node_modules']
}

const stylesFx = (opt: PathItem, shouldBuildSourceMaps: boolean) => {
  if (!opt.src) {
    throw 'Source is required';
  }

  if (!opt.dest) {
    throw 'Destination is required';
  }

  let stream = gulp
    .src(opt.src, { allowEmpty: true });

  stream = stream.pipe(plumber());

  if (opt.includePaths) {
    opt.includePaths.forEach(f => {
      if (f) {
        // console.log(f);
        stream = stream.pipe(header(`@import "${f}";`));
      }
    });
  }

  if (shouldBuildSourceMaps) {
    stream = stream.pipe(sourcemaps.init());
  }

  stream = stream.pipe(sassGlob());
  stream = stream.pipe(sass(gulpSassOptions))
    .on('error', sass.logError);

  stream = stream
    .pipe(postcss([
      postcssGapProperties(),
      autoprefixer({
        remove: false
      })
    ]));

  stream = stream.pipe(cleanCSS());

  stream = stream.pipe(rename((path) => {
    path.dirname = '';

    if (opt.prefix) {
      path.basename = opt.prefix + path.basename;
    }

    if (opt.suffix) {
      path.basename += opt.suffix;
    }
  }))

  if (shouldBuildSourceMaps) {
    stream = stream.pipe(sourcemaps.write('.'));
  }

  stream = stream.pipe(gulp.dest(opt.dest));

  return stream;
};

export default stylesFx;