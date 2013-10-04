# pnpm-replicate(1) -- Private NPM Replicate


## SYNOPSIS
pnpm-replicate http[s]://[username:password@]your-private-registry[:port] --id package-name[,package-name] [--target dbname] [--dryrun]



## DESCRIPTION
`pnpm-replicate` is a command line tool that will replicate one or more packages
from npmjs.org to a private npm registry.

The following options are available:

--id        A comma separated list of packages to replicate.
            Example: one,two,three

--target    The target database in your private registry to replicate to.  
            Defaults to "registry"

--dryrun    Does not replicate.  Displays the curl command that would be used.



## SEE ALSO
<https://github.com/jamsyoung/pnpm-replicate>

<https://npmjs.org/package/pnpm-replicate>


## AUTHOR
James Young jmeyoung@gmail.com <http://jamsyoung.com>
