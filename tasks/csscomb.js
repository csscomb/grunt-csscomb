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

    var Comb = require('csscomb'),
      defaultConfig = require('../node_modules/csscomb/.csscomb.json');

    // Get config file from task's options:
    var config = grunt.task.current.options().sortOrder;

    // Check if config file is set and exists. If not, use default one:
    if (config && grunt.file.exists(config)) {
      grunt.log.ok('Using custom config file "' + config + '"...');
      config = grunt.file.readJSON(config);
    } else {
      config = defaultConfig;
    }

    this.files.forEach(function (f) {

      // Create a new instance of csscomb and configure it:
      var comb = new Comb();
      comb.configure(config);

      f.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).forEach(function (src) {

        // Get CSS from a source file:
        var css = grunt.file.read(src);

        // Comb it:
        grunt.log.ok('Sorting file "' + src + '"...');
        var combed = comb.processString(css);
        grunt.file.write(f.dest, combed);
      });
    });
  });
};