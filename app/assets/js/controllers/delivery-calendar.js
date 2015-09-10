function DeliveryCalendarController ($controller, deliveryDatesService, deliveryOptions, close) {
	var vm = this;

	vm.close = close;
	vm.deliveryOptions = deliveryOptions;

	vm.selectDeliveryMethod = function(selectedDelivery) {
		close(selectedDelivery);
	};

	var numberOfWeeks = 6;
	vm.weekView = deliveryDatesService.generateWeekView(numberOfWeeks);
	vm.pageSize = 7;
	vm.currentPage = 0;
	vm.numberOfPages = numberOfWeeks - 1;
}

angular
	.module('app')
	.controller('DeliveryCalendarController', DeliveryCalendarController);
