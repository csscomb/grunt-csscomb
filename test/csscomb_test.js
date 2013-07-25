'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.csscomb = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_option: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/fixtures/tmp/resort.css');
    var expected = grunt.file.read('test/expected/resort.css');
    test.equal(actual, expected, 'sholud be sorted.');

    test.done();
  },
  sort_option: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/fixtures/tmp/customsort.css');
    var expected = grunt.file.read('test/expected/customsort.css');
    test.equal(actual, expected, 'sholud be custom sorted.');

    test.done();
  }
};
