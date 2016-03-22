(function(){

	angular.module('sytacApp').directive('loading', function () {
		return {
			restrict: 'E',
			replace: true,
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


})();