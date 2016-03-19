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
       * [getPeriodPercentage Gets a percentage based representation of a given period range]
       *
			 The years are extracted from the dates that are passed as arguments
       and are set as outer margins for the computed range

       The dates represent the inner range, inside the year range
       and are used to compute the percentage based value of the
       elapsed period between the outer margins represented by the two years
       *
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

      function getPeriodPercentageForDates(startDate, endDate) {
        var _startDate = new Date(startDate),
          _endDate = new Date(endDate);

        return (_startDate && _endDate) ? Math.round(getPeriodPercentage(_startDate, _endDate)) : 0;
      }

      function updateVisualProgression() {
        var periodPercentageForDates = getPeriodPercentageForDates($scope.startDate, $scope.endDate);

        angular.extend($scope, {
          elapsedPeriodPercentage: periodPercentageForDates,
          progressColor: `hsl(${(periodPercentageForDates + 10)}, 80%, 50%)`,
          progressHeight: `${periodPercentageForDates}%`
        });
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
          updateVisualProgression();

          /**
           * Save the timestamp in the window object
           */
          $scope.window.startDate = (new Date(newDate)).getTime();
        }
      });

      $scope.$watch('endDate', function(newDate) {
        if (newDate) {
          updateVisualProgression();

          /**
           * Save the timestamp in the window object
           */
          $scope.window.endDate = (new Date(newDate)).getTime();
        }
      });
    }
  };
});
