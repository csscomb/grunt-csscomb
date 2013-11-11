# grunt-csscomb [![Build Status](https://secure.travis-ci.org/csscomb/grunt-csscomb.png?branch=master)](http://travis-ci.org/csscomb/grunt-csscomb) [![NPM version](https://badge.fury.io/js/grunt-csscomb.png)](http://badge.fury.io/js/grunt-csscomb)

> The grunt plugin for sorting CSS properties in specific order.

## Getting Started

This plugin requires Grunt `~0.4.1`.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-csscomb --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-csscomb');
```

## The "csscomb" task

### Overview
In your project's Gruntfile, add a section named `csscomb` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  csscomb: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.sortOrder
Type: `String`
Default value: `null`

A string value that is used to specify custom-sort-order.json file path.


### Usage Examples

```js
grunt.initConfig({
  foo : {
    files: {
      'dest/resorted-foo.css': ['src/foo.css'],
    },
  },
  bar : {
    files: {
      'dest/resorted-foo.css': ['src/foo.css'],
      'dest/resorted-bar.css': ['src/bar.css'],
    },
  },
})
```

#### Custom Options

You can set the `sortOrder` option if you want to use the order to which you are accustomed to.

```js
grunt.initConfig({
  csscomb: {
    options: {
      sortOrder: '/path/to/custom-sort-order.json'
    },
    files: {
      'dest/resorted-foo.css': ['src/foo.css'],
    },
  },
})
```

## Release History

+ v1.1.0: Improve process.
+ v1.0.0: Support [csscomb.js](http://github.com/csscomb/csscomb.js).
+ v0.5.0: Enable multiple files.
+ v0.4.0: Move to csscomb's repository.
+ v0.3.0: Fix sort option bug.
+ v0.2.0: Fix bugs.
+ v0.1.0: Release.
