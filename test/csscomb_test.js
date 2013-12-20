'use strict';

var grunt = require('grunt');

exports.csscomb = {
    main: function (test) {
        test.expect(1);

        var actual = grunt.file.read('test/fixtures/tmp_resort.css');
        var expected = grunt.file.read('test/expected/resort.css');
        test.equal(actual, expected, 'sholud be sorted.');

        test.done();
    },
    custom: function (test) {
        test.expect(1);

        var actual = grunt.file.read('test/fixtures/tmp_customsort.css');
        var expected = grunt.file.read('test/expected/customsort.css');
        test.equal(actual, expected, 'sholud be custom sorted.');

        test.done();
    },
    mutiple: function (test) {
        test.expect(2);

        var actual = grunt.file.read('test/fixtures/tmp_multi1.css');
        var expected = grunt.file.read('test/expected/multi1.css');
        test.equal(actual, expected, 'sholud be sorted.');

        var actual2 = grunt.file.read('test/fixtures/tmp_multi2.css');
        var expected2 = grunt.file.read('test/expected/multi2.css');
        test.equal(actual2, expected2, 'sholud be sorted.');

        test.done();
    },
    dynamic_mappings: function (test) {
        test.expect(2);

        var actual = grunt.file.read('test/fixtures/dest/multi1.resorted.css');
        var expected = grunt.file.read('test/expected/multi1.css');
        test.equal(actual, expected, 'sholud be sorted.');

        var actual2 = grunt.file.read('test/fixtures/dest/multi2.resorted.css');
        var expected2 = grunt.file.read('test/expected/multi2.css');
        test.equal(actual2, expected2, 'sholud be sorted.');

        test.done();
    }
};