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

})();