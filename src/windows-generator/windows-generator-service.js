angular.module('windows-generator').service('WindowGeneratorService', ['$resource', function($resource) {
  this.createResource = function() {
    return $resource('/windows', {}, {
      getWindows: {
        method: 'GET',
        isArray: true,
        cache: false
      }
    });
  };

  this.getWindows = function() {
    return this.createResource().getWindows().$promise;
  };
}]);
