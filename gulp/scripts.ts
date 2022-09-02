import { PathItem } from "./paths";
import babel from "gulp-babel";
import { includedFunctions } from "./babel";
import sourcemaps from "gulp-sourcemaps";
import gulp from 'gulp';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import header from 'gulp-header';
import concat from 'gulp-concat';

const escapeRegExp = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const scriptsFx = (opt: PathItem, shouldBuildSourceMaps: boolean) => {
  if (!opt.src) {
    throw 'Source is required';
  }

  if (!opt.dest) {
    throw 'Destination is required';
  }

  let stream = gulp.src(opt.src, { base: opt.base });

  if (shouldBuildSourceMaps) {
    stream = stream.pipe(sourcemaps.init());
  }

  if (opt.copyOnly) {
    return stream.pipe(gulp.dest(opt.dest));
  }

  stream = stream.pipe(babel());

  if (opt.concat) {
    stream = stream.pipe(concat(opt.concat));
  }

  stream = stream.pipe(uglify());


  stream = stream.pipe(rename((path) => {
    if (opt.prefix) {
      path.basename = opt.prefix + path.basename;
    }

    if (opt.suffix) {
      path.basename += opt.suffix;
    }
  }));

  includedFunctions.forEach(f => {
    const escaped = escapeRegExp(f.pattern)
      .split('___')
      .join('\\w+');

    // console.log(escaped);
    const regex = new RegExp(escaped, 'i');
    stream = stream.pipe(replace(regex, ''));
  });

  if (opt.includedBabelFunctions) {
    let babelHeader = '';
    includedFunctions.forEach(f => {
      babelHeader += f.origin;
    });
    stream = stream.pipe(header(babelHeader))
  }

  if (shouldBuildSourceMaps) {
    stream = stream.pipe(sourcemaps.write('.'))
  }

  stream = stream.pipe(gulp.dest(opt.dest));

  return stream;
};

export default scriptsFx;