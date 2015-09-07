function BasketController ($scope, basketService, universal_variable, debounceOptions) {
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
}

angular
	.module('app')
	.controller('BasketController', BasketController);
