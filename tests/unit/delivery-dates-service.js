describe('deliveryDatesService', function() {
	var deliveryDatesService,
		thisWeek;

	beforeEach(module('app'));

	beforeEach(inject(function(_deliveryDatesService_) {
		deliveryDatesService = _deliveryDatesService_;
	}));

	describe('deliveryDatesService.generateWeekView', function() {
		beforeEach(function() {
			thisWeek = deliveryDatesService.generateWeekView(1);
		});

		it('returns an array', function() {
			expect(Array.isArray(thisWeek)).toBe(true);
		});

		it('has 7 days in a week', function() {
			expect(thisWeek.length).toBe(7);
			expect(deliveryDatesService.generateWeekView(2).length).toBe(14);
			expect(deliveryDatesService.generateWeekView(3).length).toBe(21);
		});

		it('contains date strings', function() {
			var asDate = new Date(thisWeek[0]);

			expect(typeof thisWeek[0]).toBe('string');
			expect(thisWeek[0]).toMatch(/[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/);
			expect(isNaN(asDate.getDate())).toBeFalsy();
		});

		it('starts on Monday', function() {
			var asDate = new Date(thisWeek[0]);

			expect(asDate.toDateString()).toMatch('Mon');
		});
	});

	describe('deliveryDatesService.getDates', function() {
		var $httpBackend,
			$rootScope,
			getDatesHandler,
			deliveryDates = [
				{
					date: '2015-09-11',
					methods: [
						{
							name: 'next_day',
							type: 'unscheduled',
							display_name: 'Next day',
							charge: 100
						}
					]
				}, {
					date: '2015-09-14',
					methods: [
						{
							name: 'scheduled',
							type: 'scheduled',
							display_name: 'Scheduled',
							charge: 0
						}, {
							name: 'collect_from_depot',
							type: 'collection',
							display_name: 'Collect from depot',
							charge: 0
						}
					]
				}, {
					date: '2015-09-15',
					methods: [
						{
							name: 'unscheduled',
							type: 'unscheduled',
							display_name: 'Unscheduled',
							charge: 45.0
						}, {
							name: 'collect_from_depot',
							type: 'collection',
							display_name: 'Collect from depot',
							charge: 0
						}
					]
				}
			];

		beforeEach(inject(function(_$rootScope_, _$httpBackend_, API) {
			$rootScope = _$rootScope_;
			$httpBackend = _$httpBackend_;

			getDatesHandler = $httpBackend
				.when('GET', API.delivery_dates)
				.respond(deliveryDates, {
					'content-type': 'application/json'
				});
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('formats the response into a hash map', function() {
			var deliveryDatesResponse;

			deliveryDatesService
				.getDates()
				.then(function(_deliveryDatesResponse_) {
					deliveryDatesResponse = _deliveryDatesResponse_;
				});

			$httpBackend.flush();
			$rootScope.$apply();

			expect(deliveryDatesResponse).toBeDefined();
			expect(Object.keys(deliveryDatesResponse).sort()).toEqual(['2015-09-11', '2015-09-14', '2015-09-15'])
			expect(deliveryDatesResponse['2015-09-11']).toEqual(deliveryDates[0].methods);
		});
	})
});
