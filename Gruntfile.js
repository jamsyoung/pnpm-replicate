'use strict';

var path = require('path');

module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            files: [
                'Gruntfile.js',
                'pnpm-replicate.js',
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
                    cyclomatic: 1,
                    halstead: 1,
                    maintainability: 100
                }
            },
            source: {
                src: ['pnpm-replicate.js'],
                options: {
                    errorsOnly: false,
                    cyclomatic: 1,
                    halstead: 1,
                    maintainability: 100
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: 'test/coverage-blanket'
                },
                src: ['test/*.js']
            },
            'html-cov': {
                options: {
                    reporter: 'html-cov',
                    quiet: true,
                    captureFile: 'code-coverage.html'
                },
                src: ['test/**/*.js']
            }//,
            // 'travis-cov': {
            //     options: {
            //         reporter: 'travis-cov'
            //     },
            //     src: ['test/**/*.js']
            // }
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

    grunt.registerTask('coverage', ['mochaTest']);

    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('default', ['test']);
};
