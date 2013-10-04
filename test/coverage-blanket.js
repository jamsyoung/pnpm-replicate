'use strict';

require('blanket')({
    // Only files that match the pattern will be instrumented
    pattern: '/lib/pnpm-replicate.js'
});
