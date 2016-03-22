(function(){
	angular.module('sytacApp', []);
})();;(function(){
	angular.module('sytacApp').controller('MainController', ['trafficService', '$scope', '$filter', function(trafficService, $scope, $filter) {
		$scope.loading = true;
		$scope.error = "";

		$scope.vehicleType = "default";
		$scope.vehicleId = "0";

		$scope.getSelectedVehicle = function () {
			var vehicle = $filter('filter')($scope.zugData, {id: parseInt($scope.vehicleId)}, true);
			return vehicle ? vehicle[0] : {};
		};
		$scope.vehicleImage = function () {
			return $scope.getSelectedVehicle() && $scope.getSelectedVehicle().img ? $scope.getSelectedVehicle().img : 'assets/img/unselected.png';
		};

		trafficService.fetchData()
			.then(function(data){
				$scope.zugData = data;
				$scope.loading = false;
			},
			function (err) {
				$scope.error = err;
				$scope.loading = false;
			});
	}]);

})();;(function(){

	angular.module('sytacApp').directive('loading', function () {
		return {
			restrict: 'E',
			replace:true,
			template: '<div id="overlay"><div class="loader"></div></div>',
			link: function (scope, element, attr) {
				scope.$watch('loading', function (val) {
					if (val && element.length) {
						element[0].style.display = 'inline';
					}
					else {
						element[0].style.display = 'none';
					}
				});
			}
		};
	});


})();;(function(){

  angular.module('sytacApp').filter('capitalize', function() {
		return function(s) {
			return (angular.isString(s) && s.length > 0) ? s[0].toUpperCase() + s.substr(1).toLowerCase() : s;
		};
	});

})();;(function(){

	angular.module('sytacApp').filter('unique', function () {
		return function (items, filterOn) {

			if (filterOn === false) {
				return items;
			}

			if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
				var hashCheck = {}, newItems = [];

				var extractValueToCompare = function (item) {
				if (angular.isObject(item) && angular.isString(filterOn)) {
					return item[filterOn];
				} else {
					return item;
				}
			};

			angular.forEach(items, function (item) {
				var valueToCheck, isDuplicate = false;

				for (var i = 0; i < newItems.length; i++) {
					if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					newItems.push(item);
				}

			});
			items = newItems;
		}
		return items;
		};
	});

})();;// var trafficMeister = require('zugmeister');

(function(){
	// This should be done with ngResource to actually request a JSON from a server.
	// For "service-dummy" purposes, we just mimic the trafficMeister fetchdata function
	angular.module('sytacApp').factory('trafficService', [ '$q', function($q) {
		return {
			fetchData: function() {
				var defer = $q.defer();

				trafficMeister.fetchData(function (err, data) {
					if (err) {
						defer.reject(err);
					} else {
						defer.resolve(data);
					}
				});

				return defer.promise;
			}
		};
	}]);

})();;angular.module('templates-dist', []);

