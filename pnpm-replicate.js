#!/usr/bin/env node
/*jslint node: true, nomen: true */

var curlCommand,
    targetHost,
    execSync = require('exec-sync'),
    colors = require('colors'),
    result,
    argv = require('optimist')
        .usage('Usage: pnpm-replicate http[s]://your-private-registry[:port] --id package-name[,package-name] [--target dbname] [--dryrun]')
        .demand([1, 'id'])
        ['default']('target', 'registry')
        ['default']('dryrun', false)
        .describe('id', 'A comma separated list of packages to replicate. Example: one,two,three')
        .describe('target', 'The target database in your private registry to replicate to.')
        .describe('dryrun', 'Does not replicate.  Displays the curl command that would be used.')
        .argv,
    json = {
        source: "http://isaacs.iriscouch.com/registry/",
        target: argv.target,
        create_target: true
    };

json.doc_ids = argv.id.split(',');

targetHost = argv._ + '/_replicate';

curlCommand = "curl -sSH 'Content-Type: application/json' -X POST '" + targetHost + "' -d '" + JSON.stringify(json) + "'";

console.log('[INFO] '.green + 'curl command that will be executed');
console.log(curlCommand);

if (argv.dryrun) {
    console.log('[NOTICE] This was a dry run, no packages were replicated.'.red);
    process.exit();
}

result = execSync(curlCommand, true);

console.log('\n[INFO] '.green + 'Response');
console.log(result.stdout);
