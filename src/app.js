'use strict';

/** Define main module and:
 1. Load the module which handles the templates of all the components
 2. Load any additional dependencies
*/
require('./templates.js');
require('./windows-generator/windows-generator');

// @ifdef FAKE_BACKEND
require('./backend');
// @endif

/**
 * [dependencies List of dependent modules for this app]
 * @type {Array}
 */
var dependencies = [
  'templates',
  'windows-generator'
];

// @ifdef FAKE_BACKEND
dependencies.push('backend');
// @endif

angular.module('app', dependencies);
