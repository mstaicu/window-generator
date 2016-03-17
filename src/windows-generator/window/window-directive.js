angular.module('window').directive('window', function() {
  return {
    restrict: 'E',
    scope: {
      window: '='
    },
    templateUrl: 'windows-generator/window/window.html',
    require: '^windowsGenerator',
    link: function($scope, $element, $attrs, windowsGeneratorCtrl) {
      /**
       * Expose the public API
       */
      angular.extend($scope, {
        flipWindow: flipWindow,
        removeWindow: removeWindow
      });

      /**
       * [flipWindow Flips the window to expose its control panel]
       */
      function flipWindow() {
        $scope.isFlipped = !$scope.isFlipped;
      }

      /**
       * [removeWindow Removes a window from the collection]
       */
      function removeWindow() {
        return windowsGeneratorCtrl.removeWindow($scope.window.id);
      }

      /**
       * [getPeriodPercentage Gets a percentage based representation of a given period range
       * 											The years are extracted from the dates that are passed as arguments
       * 											and are set as outer margins for the computed range
       *
       * 											The dates represent the inner range, inside the year range
       * 											and are used to compute the percentage based value of the
       * 											elapsed period between the outer margins represented by the
       * 											two years
       * ]
       * @param  {[Date|Timestamp]} startDate [The start period]
       * @param  {[Date|Timestamp]} endDate   [The end period]
       * @return {[Number]}           				[Percent value of the elapsed time]
       */
      function getPeriodPercentage(startDate, endDate) {
        var startYear = new Date(startDate).getFullYear(),
          endYear = new Date(endDate).getFullYear(),
          beginningOfRange = (new Date(startYear, 0, 1)).getTime(),
          endOfRange = (new Date(endYear, 11, 31)).getTime(),
          startPeriod = (new Date(startDate)).getTime(),
          endPeriod = (new Date(endDate).getTime());

        return ((endPeriod - startPeriod) * 100) / (endOfRange - beginningOfRange);
      }

      $scope.$watch('window', function(updatedWindow) {
        /**
         * Compute the percentage based value from the start and end dates
         *
         * Create date objects from timestamps and bind them to the inputs
         * in the template
         */
        if (updatedWindow) {
          var elapsedPeriodPercentage = Math.round(getPeriodPercentage(updatedWindow.startDate, updatedWindow.endDate)),
            windowStartDate = new Date(updatedWindow.startDate),
            windowEndDate = new Date(updatedWindow.endDate);

          angular.extend($scope, {
            startDate: windowStartDate,
            endDate: windowEndDate,
            elapsedPeriodPercentage: elapsedPeriodPercentage,
            progressColor: `hsl(${(elapsedPeriodPercentage + 10)}, 80%, 50%)`,
            progressHeight: `${elapsedPeriodPercentage}%`
          });
        }
      });

      $scope.$watch('startDate', function(newDate) {
        if (newDate) {
          /**
           * Recompute the progress based on the new date values
           */
          var windowStartDate = new Date($scope.startDate),
            windowEndDate = new Date($scope.endDate);

          if (windowStartDate && windowEndDate) {
            var elapsedPeriodPercentage = Math.round(getPeriodPercentage(windowStartDate, windowEndDate));

            angular.extend($scope, {
              elapsedPeriodPercentage: elapsedPeriodPercentage,
              progressColor: `hsl(${(elapsedPeriodPercentage + 10)}, 80%, 50%)`,
              progressHeight: `${elapsedPeriodPercentage}%`
            });
          }
        }
      });

      $scope.$watch('endDate', function(newDate) {
        if (newDate) {
          /**
           * Recompute the progress based on the new date values
           */
          var windowStartDate = new Date($scope.startDate),
            windowEndDate = new Date($scope.endDate);

          if (windowStartDate && windowEndDate) {
            var elapsedPeriodPercentage = Math.round(getPeriodPercentage(windowStartDate, windowEndDate));

            angular.extend($scope, {
              elapsedPeriodPercentage: elapsedPeriodPercentage,
              progressColor: `hsl(${(elapsedPeriodPercentage + 10)}, 80%, 50%)`,
              progressHeight: `${elapsedPeriodPercentage}%`
            });
          }
        }
      });
    }
  };
});
