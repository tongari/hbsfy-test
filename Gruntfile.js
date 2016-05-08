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
    },
    handlebars: {
      compile: {
        options: {
          namespace: 'TON_HBS',
          processName: function(filepath) {
            var pieces = filepath.split("/");
            return pieces[pieces.length - 1].replace(/.hbs$/ , '');
          }
        },
        files: {
          '<%= path.dist %>js/hbs-compile.js': '<%= path.hbs_src%>**/*.hbs'
        }
      }
    }
  });

  grunt.registerTask('build', ['copy', 'handlebars', 'browserify']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};
