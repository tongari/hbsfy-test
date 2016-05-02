module.exports = function(grunt) {

  // manage
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {});

  // process
  grunt.initConfig({

    // path
    path: {
      src: 'src/',
      dist: 'dist/',
      tmp: 'tmp/',
      js_src: 'src/js/',
      html_src: 'src/html/',
      hbs_src: 'src/hbs/'
    },

    pkg: grunt.file.readJSON('package.json'),

    // clean
    clean: ['<%= path.tmp %>', '<%= path.dist %>'],

    // watch
    watch: {

      js: {
        files : ['<%= path.js_src %>**/*.js',],
        tasks : ['browserify']
      }
    },

    // copy
    copy: {

      html: {
        files: [
          {
            expand: true,
            cwd: '<%= path.html_src %>',
            src: ['**/*.html'],
            dest: '<%= path.dist %>'
          }
        ]
      }
    },

    connect: {
      server: {
        options: {
          base: '<%= path.dist %>',
          livereload: true
        }
      }
    },

    browserify: {
      js: {
          files: [
            {
              expand: true,
              cwd: '<%= path.js_src %>',
              src: ['**/*'],
              dest: '<%= path.dist %>js/'
            }
          ]
      },
      options: {
          transform: ['hbsfy']
      }
    }
  });

  grunt.registerTask('build', ['copy', 'browserify']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};
