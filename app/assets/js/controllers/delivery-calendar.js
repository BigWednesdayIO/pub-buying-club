function DeliveryCalendarController ($controller, deliveryOptions, close) {
	var vm = this;

	vm.close = close;
	vm.deliveryOptions = deliveryOptions;
}

angular
	.module('app')
	.controller('DeliveryCalendarController', DeliveryCalendarController);
