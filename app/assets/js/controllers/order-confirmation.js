function OrderConfirmationController ($window, orderData) {
	var vm = this;

	vm.order = orderData;

	vm.printOrder = function() {
		$window.print();
	};
}

OrderConfirmationController.resolve = /* @ngInject */ {
	title: function($rootScope) {
		return $rootScope.title = 'Order confirmation';
	},
	checkoutBasket: function(basketService) {
		return basketService
			.getBasket();
	},
	orderData: function(checkoutBasket) {
		var order = checkoutBasket;

		order.date_placed = new Date();
		order.id = 377176;
		order.delivery_window = '12:00 - 17:30'

		return order;
	}	
};

angular
	.module('app')
	.controller('OrderConfirmationController', OrderConfirmationController);
