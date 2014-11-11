'use strict';
module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      }
    },
    browserify: {
      dist: {
        files: { 'build/<%= pkg.name %>.js': ['src/main.js'] },
        options: {
          browserifyOptions: {
            debug: true
          }
        }
      }
    },
    less: {
      development: {
        files: {
          'build/css/<%= pkg.name %>.css': [
            'css/**/*.less',
            'css/**/*.css'
          ]
        }
      },
      production: {
        options: { yuicompress: true },
        files: {
          'build/css/<%= pkg.name %>.min.css': [
            'css/*.less',
            'css/*.css'
          ]
        }
      }
    },
    uglify: {
      options: { banner: '<%= banner %>' },
      dist: {
        src: 'build/<%= pkg.name %>.js',
        dest: 'build/reader-beware.min.js'
      }
    },
    shell: {
      mochify: {
        command: 'node_modules/.bin/mochify --reporter spec'
      }
    },
    jshint: {
      gruntfile: {
        options: { jshintrc: '.jshintrc' },
        src: 'Gruntfile.js'
      },
      src: {
        options: { jshintrc: 'src/.jshintrc' },
        src: [
          'src/**/*.js',
          '!src/external-libs/**/*.js'
        ]
      },
      test: {
        options: { jshintrc: 'test/.jshintrc' },
        src: [
          'test/*.js',
          '!test/external-libs/**/*.js'
        ]
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'build/css/',
        src: ['/*.css'],
        dest: 'build/css',
        ext: '.css'
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'build',
          middleware: function (connect, options) {
            var less = require('less-middleware');
            return [
              less({ src: options.base }),
              connect.static(options.base),
              connect.directory(options.base),
              function(req, res, next){
                req.url = '/index.html#' + req.originalUrl;
                req.originalUrl = '/index.html#' + req.originalUrl;
                connect.static(options.base)(req, res, next);
              }
            ];
          }
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['./index.html'], dest: './build/', filter: 'isFile'},
          {expand: true, src: ['./samples/**'], dest: './build/', filter: 'isFile'},
        ],
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: [
          'browserify',
        ]
      },
      css: {
        files: 'css/**/*.less',
        tasks: ['less:development']
      },
      index: {
        files: 'index.html',
        tasks: ['copy']
      },
      samples: {
        files: 'samples/**',
        tasks: ['copy']
      }
    },
    jsdoc : {
      dist : {
        src: ['README.md', 'src/*.js'],
        options: {
          destination: 'doc',
          template : "node_modules/ink-docstrap/template",
          configure : "./jsdoc.conf.json",
          theme: "cyborg"
        }
      }
    }
  });
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Default task.
  grunt.registerTask('default', [
    'browserify',
    'concat',
    'uglify',
    'less',
    'cssmin',
    'copy',
    'connect'
  ]);
  grunt.registerTask('min', [
    'browserify',
    'concat',
    'uglify',
    'cssmin',
    'copy'
  ]);
  grunt.registerTask('test', function () {
    grunt.task.run('shell:mochify');
  });
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('css', [
    'less',
    'cssmin'
  ]);
  grunt.registerTask('fab', [
    'browserify',
    'concat',
    'uglify',
    'less',
    'cssmin',
    'copy'
  ]);
  grunt.registerTask('serve', [
    'browserify',
    'less:development',
    'copy',
    'connect',
    'watch'
  ]);
};
