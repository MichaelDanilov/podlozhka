module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> | (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <<%= pkg.repository.url %>> */\n'
      },
      development: {
        files: {
          '_podlozhka/podlozhka.min.js': ['_podlozhka/podlozhka.js']
        }
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      development: {
        src: ['_podlozhka/podlozhka.js']
      }
    },
    less: {
      development: {
        options: {
          paths: ['_podlozhka/source']
        },
        files: {
          '_podlozhka/source/styles.css': '_podlozhka/source/styles.less'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9', '> 1%', 'Opera 12.1'],
        cascade: true
      },
      files: {
        src: '_podlozhka/source/styles.css',
        dest: '_podlozhka/podlozhka.css'
      }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name %> v<%= pkg.version %> | (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <<%= pkg.repository.url %>> */\n'
        },
        files: {
          '_podlozhka/podlozhka.min.css': ['_podlozhka/podlozhka.css']
        }
      }
    },
    watch: {
      css: {
        files: ['_podlozhka/source/*.less'],
        tasks: ['less', 'autoprefixer','cssmin']
      },
      js: {
        files: ['_podlozhka/podlozhka.js'],
        tasks: ['uglify']
      }
    }
  });

grunt.loadNpmTasks('grunt-contrib-watch');

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');

grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-autoprefixer');
grunt.loadNpmTasks('grunt-contrib-cssmin');

grunt.registerTask('default', ['less','autoprefixer','cssmin','uglify','jshint','watch']);

};