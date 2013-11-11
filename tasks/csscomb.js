/*
 * grunt-csscomb
 * https://github.com/csscomb/grunt-csscomb
 *
 * Copyright (c) 2013 Koji Ishimoto, contributors
 * Licensed under the MIT license.
 */
'use strict';
module.exports = function (grunt) {

  grunt.registerMultiTask('csscomb', 'Sorting CSS properties in specific order.', function () {

    var async = require('async'),
        Comb = require('csscomb'),
        defaultConfig = require('../node_modules/csscomb/.csscomb.json'),
        done = this.async();

    async.eachSeries(this.files, function (file, next) {
      // Get config file from task's options:
      var config = grunt.task.current.options().sortOrder;

      // Check if config file is set and exists. If not, use default one:
      if (config && grunt.file.exists(config)) {
        grunt.log.ok('Using custom config file "' + config + '"...');
        config = grunt.file.readJSON(config);
      } else {
        config = defaultConfig;
      }

      // Check if source file exists. If not, display a warning:
      if (file.src.length === 0) {
        grunt.log.error('Source file "' + file.orig.src + '" not found.');
        return;
      }

      // Create a new instance of csscomb and configure it:
      var comb = new Comb();
      comb.configure(config);

      // Get CSS from a source file:
      var css = grunt.file.read(file.src);
      // Comb it:
      grunt.log.ok('Sorting file "' + file.src + '"...');
      var combed = comb.processString(css);
      // Write result to a destination file:
      grunt.file.write(file.dest, combed);
      grunt.log.ok('OK.');

      // Repeat:
      next();
    }, done);
  });
};
