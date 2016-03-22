describe('App: sytacApp', function() {
    var trafficService, scope, filter, controller;

    beforeEach(module('sytacApp'));

	describe('Controller: MainController', function() {
        beforeEach(inject(function (_trafficService_, $rootScope, $filter, $controller) {
            scope = $rootScope.$new();
            trafficService = _trafficService_;
            filter = $filter;

            controller = $controller('MainController', {
                'trafficService': trafficService,
                '$scope': scope,
                '$filter': filter
            });
        }));

        it('sets the initial values', function () {
        	spyOn(trafficService, 'fetchData').and.callThrough();

            expect(scope.vehicleId).toBe('0');
            expect(scope.vehicleType).toBe('default');
			expect(scope.loading).toBe(true);
			expect(scope.error).toBe('');

			expect(scope.getSelectedVehicle().id).toBe(undefined);
			expect(scope.vehicleImage()).toBe('assets/img/unselected.png');
        });

        it('correctly sets the data when an ID has been chosen', function () {
        	scope.zugData = [{id: 1,type: 'car',brand: 'Bugatti Veyron',colors: ['red', 'black'],img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg/520px-Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg'},{id: 2,type: 'airplane',brand: 'Boeing 787 Dreamliner',colors: ['red', 'white', 'black', 'green'],img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/All_Nippon_Airways_Boeing_787-8_Dreamliner_JA801A_OKJ_in_flight.jpg/600px-All_Nippon_Airways_Boeing_787-8_Dreamliner_JA801A_OKJ_in_flight.jpg'}];

        	scope.vehicleId = 1;

        	expect(scope.getSelectedVehicle().id).toBe(1);
        	expect(scope.getSelectedVehicle().type).toBe('car');
        	expect(scope.getSelectedVehicle().brand).toBe('Bugatti Veyron');
        	expect(scope.vehicleImage()).toBe('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg/520px-Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg');
        });
    });

	describe('Filter: capitalizeFilter', function() {
		it('has a capitalize filter', inject(function($filter) {
			expect($filter('capitalize')).not.toBeNull();
		}));
		it("should return the string with a capital first character", inject(function (capitalizeFilter) {
			expect(capitalizeFilter('test')).toBe('Test');
			expect(capitalizeFilter('Test')).toBe('Test');
			expect(capitalizeFilter('7est')).toBe('7est');
			expect(capitalizeFilter('tEst')).toBe('Test');
		}));
	});

	describe('Filter: uniqueFilter', function() {
		it('has a unique filter', inject(function($filter) {
			expect($filter('unique')).not.toBeNull();
		}));
		it("should return the string with a capital first character", inject(function (uniqueFilter) {
			expect(uniqueFilter([1, 1, 2, 2, 3]).length).toBe(3);
			expect(uniqueFilter([1, 1, 2, 2, 3], true).length).toBe(3);
			expect(uniqueFilter([1, 1, 2, 2, 3], false).length).toBe(5);
		}));
	});

	describe("Service: trafficService", function() {
		it('should contain a trafficService with a fetchData function',	inject(function(trafficService) {
			expect(trafficService).not.toBeNull();
			expect(trafficService.fetchData()).toBeDefined();
		}));
	});


	describe('Directive: spinnerDirective', function () {
		it('should have the class ng-scope', inject(function($compile) {
			var element = $compile('<loading></loading>')(scope);
			scope.$digest();

			expect(element.hasClass('ng-scope')).toBeTruthy();
		}));

		it('should hide the spinner when loading is done', inject(function($compile, $rootScope) {
			var scope = $rootScope.$new();
			scope.loading = true;

			var element = $compile('<loading></loading>')(scope);
			element.scope().$apply();
			expect(element.prop('style').display).toBe('inline');


			scope.loading = false;
			element.scope().$apply();
			expect(element.prop('style').display).toBe('none');
		}));
	});

});