function BasketService ($http, $q, $log, API, universal_variable, browserStorage) {
	var service = {},
		basket_id = browserStorage.getItem('basket_id');

	service.createBasket = function() {
		return $http({
			method: 'POST',
			url: API.baskets
		})
			.then(function(basket) {
				basket_id = basket.id;
				browserStorage.setItem('basket_id', basket_id);
				universal_variable.basket = basket;
				return basket;
			});
	};

	service.getBasket = function() {
		if (!basket_id || browserStorage.getItem('basket_id')) {
			return $q.reject({
				message: 'Couldn\'t get basket, no id stored'
			})
		}

		return $http({
			method: 'GET',
			url: API.baskets + '/' + basket_id
		})
			.then(function(basket) {
				universal_variable.basket = basket;
				return basket;
			});
	};

	service.addToBasket = function(product) {
		// TODO proper API call

		universal_variable.basket.line_items.push({
			product: product,
			quantity: 1,
			subtotal: product.unit_price,
			total_discount: 0
		});
	};

	(function initBasket () {
		// No need to check browserStorage  again, it's only just been checked at the top of the file
		if (basket_id) {
			return service.getBasket();
		}
		return service.createBasket();
	})();

	return service;
}

angular
	.module('app')
	.factory('basketService', BasketService);
