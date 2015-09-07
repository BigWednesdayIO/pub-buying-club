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
			return service.createBasket();
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

	service
		.getBasket();

	return service;
}

angular
	.module('app')
	.factory('basketService', BasketService);
