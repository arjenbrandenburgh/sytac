(function(){
	angular.module('sytacApp').controller('MainController', ['trafficService', '$scope', '$filter', function(trafficService, $scope, $filter) {
		// Set the default variables
		$scope.loading = true;
		$scope.error = "";
		$scope.vehicleType = "default";
		$scope.vehicleId = "0";

		// will return the vehicle object when a vehicle has been selected in the dropdown
		$scope.getSelectedVehicle = function () {
			var vehicle = $filter('filter')($scope.zugData, {id: parseInt($scope.vehicleId)}, true);
			return vehicle ? vehicle[0] : {};
		};
		// Will return the vehicle image. Needed to use in the ng-src
		$scope.vehicleImage = function () {
			return $scope.getSelectedVehicle() && $scope.getSelectedVehicle().img ? $scope.getSelectedVehicle().img : 'assets/img/unselected.png';
		};

		// calls the trafficService and handles success and failure
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

})();