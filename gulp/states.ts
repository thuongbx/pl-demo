import { PathItem } from "./paths";
import gulp from 'gulp';
import replace from 'gulp-replace';
import concat from 'gulp-concat';

const build = (opt: PathItem) => {
  if (!opt.src) {
    throw 'Source is required';
  }

  if (!opt.dest) {
    throw 'Destination is required';
  }

  return gulp
    .src(opt.src)
    .pipe(concat('pl-states.json'))
    .pipe(replace(/\}\s*\{/g, '},\n{'))
    .pipe(replace(/^/g, '[\n'))
    .pipe(replace(/$/g, '\n]'))
    .pipe(gulp.dest(opt.dest));
};

export default build;