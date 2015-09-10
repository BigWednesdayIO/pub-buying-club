function DeliveryDatesService ($http, $filter, $q, ModalService, API, _) {
	var service = {};

	service.getDates = function() {
		return $http({
			method: 'GET',
			url: API.delivery_dates,
			cache: true
		})
			.then(function(options) {
				return options.reduce(function(output, option) {
					output[option.date] = option.methods;
					return output;
				}, {});
			});
	};

	service.requestDeliveryMethodFromUser = function() {
		var deferred = $q.defer;

		// show overlay
		service.getDates()
			.then(function(deliveryOptions) {
				return ModalService.showModal({
					templateUrl: '/views/delivery-calendar.html',
					controller: 'DeliveryCalendarController',
					controllerAs: 'vm',
					inputs: {deliveryOptions: deliveryOptions}
				});	
			})
			.then(function(modal) {
				// modal.element.show();
				return modal.close;
			})
			.then(function(result) {
				if (result) {
					deferred.resolve(result);
				} else {
					deferred.reject();
				}
			});

		return deferred.promise;
	};

	service.generateWeekView = function(weeks) {
		var today = (new Date()),
			day = today.getDay(),
			diff = today.getDate() - day + (day == 0 ? -6:1),
			monday = new Date(today.setDate(diff));
		monday = monday.getDate();

		return _.range(0, 7*weeks)
			.map(function(index) {
				return (new Date()).setDate(monday + index);
			})
			.map(function(date) {
				return $filter('date')(date, 'yyyy-MM-dd');
			})
	};

	return service;
}

angular
	.module('app')
	.factory('deliveryDatesService', DeliveryDatesService);
