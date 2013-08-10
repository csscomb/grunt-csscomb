/*
 * grunt-csscomb
 * https://github.com/t32k/grunt-csscomb
 *
 * Copyright (c) 2013 Koji Ishimoto
 * Licensed under the MIT license.
 */
'use strict';
module.exports = function (grunt) {

  grunt.registerMultiTask('csscomb', 'Sorting CSS properties in specific order.', function () {

    var async = require('async'),
        fs = require('fs'),
        path = require('path'),
        realPath = path.dirname(fs.realpathSync(__filename)),
        done = this.async();

    async.eachSeries(this.files, function (file, next) {
      var args = [],
          child = {
            cmd: 'php',
            args: args
          },
          options = grunt.task.current.options({
            sortOrder: null
          });

      args.push(realPath + '/lib/csscomb.php');

      if (options.sortOrder !== null) {
        if (grunt.file.exists(options.sortOrder)) {
          args.push('-s', options.sortOrder);
        } else {
          grunt.log.error('Custom sort .json file not found.');
          return false;
        }
      }

      var fileSrc = file.src.filter(function (filepath) {
        // Remove nonexistent files (it's up to you to filter or warn here).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return filepath;
        }
      });
      args.push('-i', fileSrc);

      if (file.dest !== null) {
        args.push('-o', file.dest);
      }

      grunt.util.spawn(child, function (error, result, code) {
        if (error !== null) {
          grunt.log.error(error);
        } else {
          grunt.log.ok(result);
          next();
        }
      });
      grunt.verbose.ok('`php ' + child.args.join(' ') + '` was initiated.');
    }, done);

  });
};