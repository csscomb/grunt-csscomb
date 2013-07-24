# grunt-csscomb [![Build Status](https://secure.travis-ci.org/t32k/grunt-csscomb.png?branch=master)](http://travis-ci.org/t32k/grunt-csscomb) [![NPM version](https://badge.fury.io/js/grunt-csscomb.png)](http://badge.fury.io/js/grunt-csscomb)

> The grunt plugin for sorting CSS properties in specific order. 

## Getting Started

This plugin requires Grunt `~0.4.1` and [requires PHP.](https://github.com/csscomb/CSScomb/wiki/Requirements)

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

A string value that is used to specify file path.


### Usage Examples

```js
grunt.initConfig({
  csscomb: {
    files: {
      'dest/resorted-foo.css': ['src/foo.css'],
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
      sortOrder: 'path-to-your-custom-sort-order.json'
    },
    files: {
      'dest/resorted-foo.css': ['src/foo.css'],
    },
  },
})
```

## Release History

+ v0.2.0: Fix bugs.
+ v0.1.0: Release.
