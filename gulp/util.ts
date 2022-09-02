import gulp, { TaskFunctionCallback as CallBack } from 'gulp';
import { PathItem } from "./paths";
import DEL from 'del';
import fs from 'fs';
import path from 'path';
import rename from 'gulp-rename';
const hashsum = require('./hashsum');

export const del = (opt: PathItem) => {
  if (!opt.src) {
    throw 'Source is required';
  }

  return DEL(opt.src, { force: true });
};

export const copy = (opt: PathItem) => {
  if (!opt.src) {
    throw 'Source is required';
  }

  if (!opt.dest) {
    throw 'Destination is required';
  }

  let stream = gulp
    .src(opt.src, { base: opt.base });

  stream = stream.pipe(rename((path) => {
    if (opt.flatten) {
      path.dirname = '';
    }

    if (opt.prefix) {
      path.basename = opt.prefix + path.basename;
    }

    if (opt.suffix) {
      path.basename += opt.suffix;
    }
  }))

  stream = stream
    .pipe(gulp.dest(opt.dest));

  return stream;
};

export const writeInteTime = (opt: PathItem, cb: CallBack) => {
  if (!opt.dest) {
    throw 'Destination is required';
  }

  if (!opt.fileName) {
    throw 'File Name is required';
  }

  var currentTimeStamp = (Math.floor(new Date().getTime() / 1000)).toString();

  const filePath = path.join(opt.dest, opt.fileName);
  fs.writeFileSync(filePath, currentTimeStamp);

  cb();
};

export const hashAssets = (opt: PathItem) => {
  if (!opt.src) {
    throw 'Source is required';
  }

  let stream = gulp
    .src(opt.src);

  stream = stream.pipe(hashsum({
    dest: opt.dest,
    filename: 'hashes.json',
    json: true,
    hashLength: 11,
    hash: 'md5',
    force: true,
    baseDirectory: opt.base
  }));

  return stream;
};
