function DeliveryDatesService ($http, $filter, $q, ModalService, API) {
	var service = {},
		chosenDeliveryMethod;

	service.getDates = function() {
		return $http({
			method: 'GET',
			url: API.delivery_dates,
			cache: true
		});
	};

	service.requestDeliveryMethodFromUser = function() {
		chosenDeliveryMethod = $q.defer;

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
				alert(result);
			});

		return chosenDeliveryMethod.promise;
	};

	return service;
}

angular
	.module('app')
	.factory('deliveryDatesService', DeliveryDatesService);
