/*
 * grunt-csscomb
 * https://github.com/t32k/grunt-csscomb
 *
 * Copyright (c) 2013 Koji Ishimoto
 * Licensed under the MIT license.
 */
'use strict';
module.exports = function(grunt) {

  grunt.registerMultiTask('csscomb', 'Sorting CSS properties in specific order.', function() {
    var fs = require('fs'),
        path = require('path'),
        exec = require('child_process').exec;
    var command,
        done = this.async(),
        realPath = path.dirname(fs.realpathSync(__filename)),
        cssComb = 'php ' + realPath + '/lib/csscomb.php',
        fileSrc = '',
        fileDest = '',
        fileSort = '',
        options = this.options({
          sortOrder: null
        });

    if (options.sortOrder !== null) {
      if (grunt.file.exists(options.sortOrder)) {
        fileSort = ' -s ' + options.sortOrder;
      } else {
        grunt.log.error('Custom sort .json file not found.');
        return false;
      }
    }

    function puts(error, stdout, stderr) {
      if (error !== null) {
        grunt.log.error(error);

      } else {
        grunt.log.ok(stdout);
      }
    }

    this.files.forEach(function(file) {
      fileSrc = file.src.filter(function(filepath) {
        // Remove nonexistent files (it's up to you to filter or warn here).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return filepath;
      });
      fileSrc = ' -i ' + fileSrc;
      if (file.dest !== null) {
        fileDest = ' -o ' + file.dest;
      }
      command = cssComb + fileSort + fileSrc + fileDest;
      exec(command, puts);
      grunt.verbose.writeln('`' + command + '` was initiated.');
    });
                
  });
};