/*
 * grunt-csscomb
 * https://github.com/csscomb/grunt-csscomb
 *
 * Copyright (c) 2013 Koji Ishimoto, contributors
 * Licensed under the MIT license.
 */
'use strict';

var path = require('path');

module.exports = function (grunt) {

  grunt.registerMultiTask('csscomb', 'Sorting CSS properties in specific order.', function () {

    var Comb = require('csscomb'),
        comb = new Comb();

    function getConfigPath(configPath) {
      var HOME = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

      configPath = configPath || process.cwd() + '/.csscomb.json';

      // If we've finally found a config, return its path:
      if (grunt.file.exists(configPath)) {
          return configPath;
      }
      // If we are in HOME dir already and yet no config file, quit:
      if (path.dirname(configPath) === HOME) {
          return;
      }

      // If there is no config in this directory, go one level up and look for
      // a config there:
      configPath = path.dirname(path.dirname(configPath)) + '/.csscomb.json';
      return getConfigPath(configPath);
    }

    // Get config file from task's options:
    var config = grunt.task.current.options().config || getConfigPath();

    // Check if config file is set and exists. If not, use default one:
    if (config && grunt.file.exists(config)) {
      grunt.log.ok('Using custom config file "' + config + '"...');
      config = grunt.file.readJSON(config);
    } else {
      grunt.log.ok('Using default config file...');
      config = comb.getConfig('csscomb');
    }

    // Configure csscomb:
    comb.configure(config);

    this.files.forEach(function (f) {

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