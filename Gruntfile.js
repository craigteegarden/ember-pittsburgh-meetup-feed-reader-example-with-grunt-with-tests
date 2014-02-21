module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      build: {
        src: ['js/app.js', 'js/helpers.js', 'build/compiled/templates.js'],
        dest: 'build/application.js'
      }
    },

    uglify: {
      build: {
        src: ['build/application.js'],
        dest: 'build/application.min.js'
      }
    },

    emberTemplates: {
      all: {
        options: {
          templateName: function(sourceFile) {
            return sourceFile.replace(/templates\//, '');
          }
        },
        files: {
          'build/compiled/templates.js': ["templates/**/*.hbs"]
        }
      }
    }


  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ember-templates');

  // Default task(s).
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['emberTemplates', 'concat']);
  grunt.registerTask('production', ['build', 'uglify']);

};


