/**
 * Fake HTTP backend implementation suitable for end-to-end testing
 * or backend-less development of applications that use the $http service.
 */
angular.module('backend', ['ngMockE2E'])
  .run(function($httpBackend) {
    $httpBackend.whenGET('/windows').respond(function(method, url, data, headers) {
      return [200, [{
        id: 1,
        name: 'Window 1',
        startDate: 1420322400000,
        endDate: 1443906000000
      }, {
        id: 2,
        name: 'Window 2',
        startDate: 1425420000000,
        endDate: 1446588000000
      }, {
        id: 3,
        name: 'Window 3',
        startDate: 1443906000000,
        endDate: 1449180000000
      }]];
    });
  });
