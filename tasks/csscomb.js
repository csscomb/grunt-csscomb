/*
 * grunt-csscomb
 * https://github.com/t32k/grunt-csscomb
 *
 * Copyright (c) 2013 Koji Ishimoto
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('csscomb', 'Sorting CSS properties in specific order.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      sortOrder: null
    });

    if (options.sortOrder !== null) {
      var optCmd = '-s ' + options.sortOrder;
    }

    // Tell grunt this task is asynchronous.
    var done    = this.async(),
        exec    = require('child_process').exec,
        command = '';

    // Output Command Line
    // grunt.log.writeln('`titanium ' + command.args.join(' ') + '` was initiated.');

    function puts( error, stdout, stderr ) {
        grunt.log.write( stdout );
        if ( error !== null ) {
            grunt.log.error( error );
            done(false);
        }
        else {
            done(true);
        }
    }

    this.files.forEach(function(file) {
      var fileSrc = file.src.filter(function(filepath) {
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

      command = "php tasks/lib/csscomb.php -i " + fileSrc + " -o " + file.dest;

      exec( command, puts );
      grunt.log.write( '`' + command + '` was initiated.' );

    });
  });
};