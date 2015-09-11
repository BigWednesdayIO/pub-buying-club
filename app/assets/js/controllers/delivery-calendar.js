function DeliveryCalendarController ($controller, deliveryDatesService, deliveryTypes, deliveryOptions, close) {
	var vm = this,
		numberOfWeeks;

	vm.close = close;
	vm.deliveryOptions = deliveryOptions;
	vm.deliveryTypes = deliveryTypes;

	vm.selectedDelivery;
	vm.selectDeliveryMethod = function(selectedDelivery) {
		vm.selectedDelivery = selectedDelivery;
	};

	vm.startShopping = function() {
		close(vm.selectedDelivery);
	};

	numberOfWeeks = 6;
	vm.weekView = deliveryDatesService.generateWeekView(numberOfWeeks);
	vm.pageSize = 7;
	vm.currentPage = 0;
	vm.numberOfPages = numberOfWeeks - 1;
}

angular
	.module('app')
	.controller('DeliveryCalendarController', DeliveryCalendarController);
