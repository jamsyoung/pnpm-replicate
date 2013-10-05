/* global describe, it */
'use strict';

var fs = require('fs'),
    path = require('path'),
    packageData = require('../../package.json'),
    childProcess = require('child_process'),
    cliWrapperPath = path.join(path.dirname(fs.realpathSync(__filename)), '../../pnpm-replicate-cli.js'),
    expectedOutput = 'Usage: pnpm-replicate http[s]://[username:password@]your-private-registry[:port] --id package-name[,package-name] [--target dbname] [--dryrun]\n\nOptions:\n  --help, -h     You are looking at it.                                                 \n  --version, -v  Show the current version installed.                                    \n  --id           A comma separated list of packages to replicate. Example: one,two,three\n  --target       The target database in your private registry to replicate to.            [default: \"registry\"]\n  --dryrun       Does not replicate.  Displays the curl command that would be used.       [default: false]\n\n';


describe('basic command line options', function () {
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

            // techincally this is currently only testing that this notification is output
            stdout.should.contain('[NOTICE] This was a dry run, no packages were replicated.');
            done();
        });
    });
});

describe('curl command', function () {
    it('should contain the specified pnpm server passed in', function (done) {
        childProcess.exec(cliWrapperPath + ' https://user:pass@private.npmrepo.com:5984 --id foo --dryrun', function (error, stdout) {
            if (error) { console.log(error); }

            stdout.should.contain('https://user:pass@private.npmrepo.com:5984/_replicate');
            done();
        });
    });

    it('should contain the proper data to POST for replicating a single id', function (done) {
        childProcess.exec(cliWrapperPath + ' https://user:pass@private.npmrepo.com:5984 --id foo --dryrun', function (error, stdout) {
            if (error) { console.log(error); }

            stdout.should.contain('{"source":"http://isaacs.iriscouch.com/registry/","target":"registry","create_target":true,"doc_ids":["foo"]}');
            done();
        });
    });

    it('should contain the proper data to POST for replicating multiple ids', function (done) {
        childProcess.exec(cliWrapperPath + ' https://user:pass@private.npmrepo.com:5984 --id foo,bar,baz --dryrun', function (error, stdout) {
            if (error) { console.log(error); }

            stdout.should.contain('{"source":"http://isaacs.iriscouch.com/registry/","target":"registry","create_target":true,"doc_ids":["foo","bar","baz"]}');
            done();
        });
    });

    it('should replicate from the main npmjs.org couch db', function (done) {
        childProcess.exec(cliWrapperPath + ' https://user:pass@private.npmrepo.com:5984 --id foo --dryrun', function (error, stdout) {
            if (error) { console.log(error); }

            stdout.should.contain('http://isaacs.iriscouch.com/registry/');
            done();
        });
    });

    it('should replicate to a default target when --target is not specified', function (done) {
        childProcess.exec(cliWrapperPath + ' https://user:pass@private.npmrepo.com:5984 --id foo --dryrun', function (error, stdout) {
            if (error) { console.log(error); }

            stdout.should.contain('"target":"registry"');
            done();
        });
    });

    it('should replicate to a custom target --target is passed in', function (done) {
        childProcess.exec(cliWrapperPath + ' https://user:pass@private.npmrepo.com:5984 --target baz --id foo --dryrun', function (error, stdout) {
            if (error) { console.log(error); }

            stdout.should.contain('"target":"baz"');
            done();
        });
    });
});
