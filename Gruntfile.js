'use strict';

var path = require('path');

module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            files: [
                '*.js',
                'lib/*.js',
                'test/**/*.js'
            ],
            options: {
                ignores: [],
                jshintrc: path.normalize('.jshintrc')
            }
        },
        complexity: {
            build: {
                src: [
                    'Gruntfile.js',
                    'test/**/*.js'
                ],
                options: {
                    errorsOnly: false,
                    cyclomatic: 2,
                    halstead: 6,
                    maintainability: 80
                }
            },
            source: {
                src: ['lib/*.js'],
                options: {
                    errorsOnly: false,
                    cyclomatic: 1,
                    halstead: 1,
                    maintainability: 80
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: 'test/mocha-setup'
                },
                src: ['test/mocha/*.js']
            }
        },
        clean: {
            files: [
                'man/man1/*',
                'node_modules'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-complexity');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('test', ['jshint', 'complexity', 'mochaTest']);

    grunt.registerTask('default', ['test']);
};
