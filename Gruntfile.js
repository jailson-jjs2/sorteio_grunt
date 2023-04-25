module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: { // LOCAL
        files: {
          'dev/styles/main.css': 'src/styles/main.less'
        }
      },
      production: { //PRODUÇÃO
        options: {
          compress: true,
        },
        files: {
          'dist/styles/main.min.css': 'src/styles/main.less'
        }
      }
    },
    watch: {
      less: {
        files: ['src/styles/**/*.less'], //** PARA ACESSAR QUALQUER PASTA/
        tasks: ['less:development']
      },
      html: {
        files: ['src/index.html'],
        tasks: ['replace:dev']
      }
    },
    replace: { // PARA SUBSTITUIR ARQUIVO
      dev: {
        options: {
          patterns:[
            {
              match: 'ENDERECO_DO_CSS',
              replacement: './styles/main.css' 
            },
            {
              match: 'ENDERECO_DO_JS',
              replacement: '../src/scripts/main.js' 
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['src/index.html'],
            dest: 'dev/'
          }
        ]
      },
      dist: {
        options: {
          patterns:[
            {
              match: 'ENDERECO_DO_CSS',
              replacement: './styles/main.min.css' 
            },
            {
              match: 'ENDERECO_DO_JS',
              replacement: './scripts/main.min.js' 
            }            
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['prebuild/index.html'],
            dest: 'dist/'
          }
        ]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'prebuild/index.html': 'src/index.html'
        }
      }
    },
    clean: ['prebuild'],
    uglify: {
      target: {
        files: {
          'dist/scripts/main.min.js': 'src/scripts/main.js'
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-less'); //CONFIG DO LESS
  grunt.loadNpmTasks('grunt-contrib-watch'); // PARA ATUALIZAR PAG
  grunt.loadNpmTasks('grunt-replace'); // TROCAR ARQUIVOS
  grunt.loadNpmTasks('grunt-contrib-htmlmin'); // MINIFICAR HTML
  grunt.loadNpmTasks('grunt-contrib-clean'); // APAGANDO OS TEMPS
  grunt.loadNpmTasks('grunt-contrib-uglify'); // COMPRIMI JS

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);
}