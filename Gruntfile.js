const { task } = require("grunt");

//iniciando grunt
module.exports = function(grunt){
    //inicializanddo a config.
    grunt.initConfig({
        //importando arquivo package.json para dentro da função
        pkg: grunt.file.readJSON('package.json'),
        //config plugin less
        less: {
            //config less para produção.
            production: {
                //coloando uma opção 
                options: {
                    //comprimindo less para produção
                    compress: true
                },
                files: {
                    //colocando aonde o arquivo vai ser enviado e depois a origem do arquivo
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }
    })

    //iniciando a tarefa compilação less
    grunt.loadNpmTasks('grunt-contrib-less');
    //tarafa de monitorar
    grunt.loadNpmTasks('grunt-contrib-watch');
    //iniciando a tarefa de comprimir JS
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']);
    //Tarefa de criação
    grunt.registerTask('build', ['less:production','uglify'])
}