function BasketController ($scope, basketService, deliveryDatesService, universal_variable, debounceOptions) {
	var vm = this;

	vm.debounceOptions = debounceOptions;

	vm.updateLineItem = function(line_item, index) {
		universal_variable.basket.line_items[index].quantity = line_item.quantity;
	};

	vm.removeLineItem = function(line_item, index) {
		universal_variable.basket.line_items.splice(index, 1);
	};
	
	$scope.$watch(function() {
		return universal_variable.basket;
	}, function(basket) {
		vm.basket = basket;
	});

	vm.show = 'summary';
	vm.chooseDeliveryDate = function() {
		deliveryDatesService
			.requestDeliveryMethodFromUser()
			.then(basketService.setDelivery);
	}
}

angular
	.module('app')
	.controller('BasketController', BasketController);
