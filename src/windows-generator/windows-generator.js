require('./window/window');

angular.module('windows-generator', [
  'ngResource',
  'window'
]);

require('./windows-generator-directive');
require('./windows-generator-service');
