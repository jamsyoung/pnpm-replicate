'use strict';

/*
 * This file is required by the mocha-test grunt task.  This should contain
 * things that need to be done for every test file
 */

var chai = require('chai');

// should must be defined globally to make the linter happy
global.should = chai.should();

// include stack track on test failure
chai.Assertion.includeStack = false;
