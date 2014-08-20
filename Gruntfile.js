module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        express: {
            dev: {            
                options: {
                    script: './app.js',
                }
            },
        },
        watch: {
			express: {
				files: ['**/*.js'],
				tasks: ['express:dev'],
				options: {
					spawn: false,			// Must have for reload
					livereload: 9090		
				}
			}            
        },
        parallel: {
            web: {
                options: {
                    stream: true
                },
                tasks: [{
                    grunt: true,
                    args: ['watch:frontend']
                }, {
                    grunt: true,
                    args: ['watch:stylesSass']
                }, {
                    grunt: true,
                    args: ['watch:web']
                }]
            },
        }
    });


    grunt.registerTask('web', 'launch webserver and watch tasks', [
        'parallel:web',        
    ]);

    grunt.registerTask('default', ['express:dev', 'express-keepalive', 'watch']);
};