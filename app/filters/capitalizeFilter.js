(function(){

	// Returns the string with an uppercase first character and all other characters lowercase
	angular.module('sytacApp').filter('capitalize', function() {
		return function(s) {
			return (angular.isString(s) && s.length > 0) ? s[0].toUpperCase() + s.substr(1).toLowerCase() : s;
		};
	});

})();