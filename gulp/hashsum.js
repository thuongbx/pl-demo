"use strict";

var crypto = require("crypto");
var PluginError = require("plugin-error");
var _ = require("lodash");
var mkdirp = require("mkdirp");
var slash = require("slash");
var through = require("through");
var Vinyl = require("vinyl");

var fs = require("fs");
var path = require("path");

var compareBuffer =
  typeof Buffer.compare !== "undefined"
    ? Buffer.compare
    : function (a, b) {
      // Naive implementation of Buffer comparison for older
      // Node versions. Doesn't follow the same spec as
      // Buffer.compare, but we're only interested in equality.
      if (a.length !== b.length) {
        return -1;
      }
      for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          return -1;
        }
      }
      return 0;
    };

function hashsum(options) {
  options = _.defaults(options || {}, {
    dest: process.cwd(),
    hash: "sha1",
    force: false,
    delimiter: "  ",
    json: false,
    stream: false,
    hashLength: null,
    baseDirectory: null
  });
  options = _.defaults(options, {
    filename: options.hash.toUpperCase() + "SUMS",
    baseDirectory: options.baseDirectory || options.dest
  });

  var hashesFilePath = path.resolve(options.dest, options.filename);
  var hashes = {};

  function processFile(file) {
    if (file.isNull()) {
      return;
    }
    if (file.isStream()) {
      this.emit(
        "error",
        new PluginError("gulp-hashsum", "Streams not supported")
      );
      return;
    }
    var filePath = path.resolve(options.dest, file.path);
    let hash = crypto
      .createHash(options.hash)
      .update(file.contents, "binary")
      .digest("hex");

    if (options.hashLength) {
      hash = hash.substring(0, options.hashLength);
    }

    let fileRelativePath = slash(path.relative(path.resolve(options.baseDirectory), filePath)).toLowerCase();
    if (!fileRelativePath.startsWith('/')) {
      fileRelativePath = '/' + fileRelativePath;
    }

    hashes[fileRelativePath] = hash;

    this.push(file);
  }

  function writeSums() {
    var contents;
    if (options.json) {
      contents = JSON.stringify(hashes, null, options.delimiter);
    } else {
      var lines = _.keys(hashes)
        .sort()
        .map(function (key) {
          return hashes[key] + options.delimiter + key + "\n";
        });
      contents = lines.join("");
    }
    var data = Buffer.from(contents);

    console.log('hashesFilePath:', hashesFilePath);
    console.log('hashesDirPath:', path.dirname(hashesFilePath));

    if (options.stream) {
      this.emit(
        "data",
        new Vinyl({
          path: hashesFilePath,
          contents: data
        })
      );
    } else if (
      options.force ||
      !fs.existsSync(hashesFilePath) ||
      compareBuffer(fs.readFileSync(hashesFilePath), data) !== 0
    ) {
      mkdirp(path.dirname(hashesFilePath));
      fs.writeFileSync(hashesFilePath, data);
    }
    this.emit("end");
  }

  return through(processFile, writeSums);
}

module.exports = hashsum;