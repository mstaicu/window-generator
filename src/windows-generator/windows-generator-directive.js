angular.module('windows-generator').directive('windowsGenerator', ['WindowGeneratorService', function(WindowGeneratorService) {
  return {
    restrict: 'E',
    scope: {

    },
    controller: ['$scope', function($scope) {
      /**
       * [function Function used to remove a window object from the collection]
       * @param  {[Number]} windowId [The window identifier]
       */
      this.removeWindow = function(windowId) {
        var windowIndex = $scope.retrievedWindows.findIndex(function(retrievedWindow) {
          return retrievedWindow.id === windowId;
        });

        if (windowIndex >= 0) {
          $scope.retrievedWindows.splice(windowIndex, 1);
        }
      }
    }],
    templateUrl: 'windows-generator/windows-generator.html',
    link: function($scope, $element, $attrs) {
      /**
       * Expose the public API
       */
      angular.extend($scope, {
        addNewWindow: addNewWindow,
        getData: getData
      });

      /**
       * [addNewWindow Used to add a new window object to the collection]
       */
      function addNewWindow() {
        var windowId = `${Math.random().toString(36).substr(2, 9)}`;

        $scope.retrievedWindows.push({
          id: windowId
        });
      }

      /**
       * [getData Prints to the console a JSON string representation
       * 					of the data collection]
       */
      function getData() {
        var stringifyWindows = angular.toJson($scope.retrievedWindows);

        /**
         * We can either directly display the $scope.retrievedWindows
         * Or its JSON stringify'd version, take your pick
         */

        console.log(stringifyWindows);
      }

      /**
       * Get the window objects array from the fake backend
       * and expose them to the template
       */
      WindowGeneratorService.getWindows().then(function(response) {
        $scope.retrievedWindows = response;
      });
    }
  };
}]);
