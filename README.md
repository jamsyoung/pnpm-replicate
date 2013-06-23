# pnpm-replicate
[![NPM version](https://badge.fury.io/js/pnpm-replicate.png)](http://badge.fury.io/js/pnpm-replicate)

Replicate one or more packages from npmjs.org to a private npm registry.

This is a comamnd line tool for groups that:

- Want to host a private npm registry on their own.

- Want their private npm registry to only contain the packages they need.

- Don't want to deal with a proxy to talk between their private npm registry
  and the public npmjs.org registry.


## Install
You may need to use `sudo` for this, depending on your environment setup.

    $ npm install -g pnpm-replicate


## Usage

    $ pnpm-replicate
    Usage: pnpm-replicate http[s]://your-private-registry[:port] --id package-name[,package-name] [--target dbname] [--dryrun]

    Options:
      --id      A comma separated list of packages to replicate. Example: one,two,three  [required]
      --target  The target database in your private registry to replicate to.            [default: "registry"]
      --dryrun  Does not replicate.  Displays the curl command that would be used.       [default: false]


## Example
This replicates the three views and one document required to get an empty npm
registry up and going.  You can specify any number of packages in the comma
separated list for `--id`.  If you need to replicate a package that has a space
in the name, just put it in quotes.  Do not add spaces after the commas.

    $ pnpm-replicate https://admin:xxxxxx@jamsyoung.iriscouch.com:6984 --id _design/app,_design/ghost,_design/scratch,"error: forbidden"
    [INFO] curl command that will be executed
    curl -sH 'Content-Type: application/json' -X POST 'https://admin:xxxxxx@jamsyoung.iriscouch.com:6984/_replicate' -d '{"source":"http://isaacs.iriscouch.com/registry/","target":"registry","create_target":true,"doc_ids":["_design/app","_design/ghost","_design/scratch","error: forbidden"]}'

    [INFO] Response
    {"ok":true,"session_id":"7e615b25478b6a2ee480dcf3595c566d","source_last_seq":371593,"replication_id_version":2,"start_time":"Sun, 31 Mar 2013 02:07:42 GMT","end_time":"Sun, 31 Mar 2013 02:07:42 GMT","docs_read":0,"docs_written":0,"doc_write_failures":0,"history":[{"session_id":"7e615b25478b6a2ee480dcf3595c566d","start_time":"Sun, 31 Mar 2013 02:07:42 GMT","end_time":"Sun, 31 Mar 2013 02:07:42 GMT","start_last_seq":0,"end_last_seq":371593,"recorded_seq":371593,"missing_checked":4,"missing_found":0,"docs_read":0,"docs_written":0,"doc_write_failures":0}]}


## License

    Copyright (c) 2013 James Young (jamsyoung.com)

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    The Software shall be used for Good, not Evil.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
