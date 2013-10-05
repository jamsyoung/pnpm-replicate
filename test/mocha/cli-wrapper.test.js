/* global describe, it */
'use strict';

var fs = require('fs'),
    path = require('path'),
    childProcess = require('child_process'),
    packageData = require('../../package.json'),
    cliWrapperPath = path.join(path.dirname(fs.realpathSync(__filename)), '../../pnpm-replicate-cli.js'),
    expectedOutput = 'Usage: pnpm-replicate http[s]://[username:password@]your-private-registry[:port] --id package-name[,package-name] [--target dbname] [--dryrun]\n\nOptions:\n  --help, -h     You are looking at it.                                                 \n  --version, -v  Show the current version installed.                                    \n  --id           A comma separated list of packages to replicate. Example: one,two,three\n  --target       The target database in your private registry to replicate to.            [default: \"registry\"]\n  --dryrun       Does not replicate.  Displays the curl command that would be used.       [default: false]\n\n';


describe('pnpm-replicate', function () {
    it('should return the current version when called with -v', function (done) {
        childProcess.exec(cliWrapperPath + ' -v', function (error, stdout) {
            if (error) { console.dir(error); }

            stdout.should.equal('pnpm-replicate v' + packageData.version + '\n');
            done();
        });
    });

    it('should return the current version when called with --version', function (done) {
        childProcess.exec(cliWrapperPath + ' --version', function (error, stdout) {
            if (error) { console.dir(error); }

            stdout.should.equal('pnpm-replicate v' + packageData.version + '\n');
            done();
        });
    });

    it('should return help information when called with -h', function (done) {
        childProcess.exec(cliWrapperPath + ' -h', function (error, stdout) {
            if (error) { console.dir(error); }

            stdout.should.equal(expectedOutput);
            done();
        });
    });

    it('should return help information when called with --help', function (done) {
        childProcess.exec(cliWrapperPath + ' --help', function (error, stdout) {
            if (error) { console.dir(error); }

            stdout.should.equal(expectedOutput);
            done();
        });
    });

    it('should return help information when called with no arguments', function (done) {
        childProcess.exec(cliWrapperPath, function (error, stdout) {
            if (error) { console.dir(error); }

            stdout.should.equal(expectedOutput);
            done();
        });
    });

    it('should return help information when called with --id with no arguments', function (done) {
        childProcess.exec(cliWrapperPath + ' --id', function (error, stdout) {
            if (error) { console.dir(error); }

            stdout.should.equal(expectedOutput);
            done();
        });
    });

    it('should not do a POST when called with --dryrun', function (done) {
        childProcess.exec(cliWrapperPath + ' foo --id foo --dryrun', function (error, stdout) {
            if (error) { console.log(error); }

            stdout.should.contain('[NOTICE] This was a dry run, no packages were replicated.');
            done();
        });
    });
});
