'use strict';

module.exports = function (grunt) {
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time at the end.
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
    // Task configuration.
    browserify: {
      dist: {
        src: 'src/bootlint.js',
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    usebanner: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: ['dist/*.js']
      }
    },
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['src/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    jscs: {
      gruntfile: {
        src: '<%= jshint.gruntfile.src %>',
        options: {
          validateIndentation: 2
        }
      },
      lib: {
        src: '<%= jshint.lib.src %>'
      },
      test: {
        src: '<%= jshint.test.src %>'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'nodeunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      },
    },
  });

  // Default task.
  grunt.registerTask('test', ['jshint', 'jscs', 'nodeunit']);
  grunt.registerTask('dist', ['browserify', 'usebanner']);
  grunt.registerTask('default', ['test', 'dist']);
};
