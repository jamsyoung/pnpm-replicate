/* jshint camelcase: false, quotmark: false */
'use strict';

var argv,
    json,
    result,
    execSync = require('execSync'),
    metadata = require('../package.json'),
    optimist = require('optimist'),
    targetHost,
    curlCommand;

require('colors');

argv = optimist
    .usage('Usage: pnpm-replicate http[s]://[username:password@]your-private-registry[:port] --id package-name[,package-name] [--target dbname] [--dryrun]')
    .alias('help', 'h')
    .alias('version', 'v')
    .describe('help', 'You are looking at it.')
    .describe('version', 'Show the current version installed.')
    .describe('id', 'A comma separated list of packages to replicate. Example: one,two,three')
    .describe('target', 'The target database in your private registry to replicate to.')
    .describe('dryrun', 'Does not replicate.  Displays the curl command that would be used.')
    .argv;

if (argv.v) {
    console.log('pnpm-replicate v' + metadata.version);
    process.exit(0);
}

if (argv.h || typeof argv._[0] === 'undefined' || typeof argv.id !== 'string') {
    console.log(optimist.help());
    // console.log('test');
    process.exit(0);
}

json = {
    source: 'http://isaacs.iriscouch.com/registry/',
    target: argv.target,
    create_target: true,
    doc_ids: argv.id.split(',')
};

targetHost = argv._[0] + '/_replicate';

console.log(targetHost);

process.exit(0);

curlCommand = "curl -sSH 'Content-Type: application/json' -X POST '" + targetHost + "' -d '" + JSON.stringify(json) + "'";

console.log('[INFO] '.green + 'curl command that will be executed');
console.log(curlCommand);

if (argv.dryrun) {
    console.log('[NOTICE] This was a dry run, no packages were replicated.'.red);
    process.exit();
}

result = execSync.exec(curlCommand);

console.log('\n[INFO] '.green + 'Response');
console.log(result.stdout);
