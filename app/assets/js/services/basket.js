function BasketService ($rootScope, $http, $q, API, universal_variable, browserStorage, deliveryDatesService, productAvailabilityService) {
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
		if (!(basket_id || browserStorage.getItem('basket_id'))) {
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

	service.deliveryIsSet = function() {
		return universal_variable.basket.delivery_date && universal_variable.basket.delivery_method && true;
	};

	service.setDelivery = function(chosenDelivery) {
		// TODO proper API call

		universal_variable.basket.delivery_date = chosenDelivery.date;
		universal_variable.basket.delivery_method = chosenDelivery.method;

		$rootScope.$emit('deliveryMethodUpdated');

		return $q.when();
	}

	function addToBasket (product) {
		// TODO proper API call
		var line_item = {
			product: product,
			quantity: 1,
			subtotal: product.unit_price,
			total_discount: 0
		};

		universal_variable.basket.line_items.push(line_item)

		return $q.when(line_item);
	}

	function checkAndAddProduct (product) {
		// Check availability
		return productAvailabilityService
			.isAvailable(product)
			.then(function() {
				// Product is available
				return addToBasket(product);
			}, function() {
				// Product is not available
				return deliveryDatesService
					.chooseAnotherDate()
					.then(service.setDelivery)
					.then(function() {
						// If user choose another date, we go round again
						return checkAndAddProduct(product);
					});
					// If user chooses not to, promise rejection bubbles up, product is not added
			});
	}

	service.addToBasket = function(product) {
		if (service.deliveryIsSet()) {
			return addToBasket(product);
		}

		return deliveryDatesService
			.getDeliveryMethodFromUser()
			.then(service.setDelivery)
			.then(function() {
				checkAndAddProduct(product);
			});
	};

	(function initBasket () {
		// No need to check browserStorage  again, it's only just been checked at the top of the file
		if (basket_id) {
			return service.getBasket();
		}
		return service.createBasket();
	})();

	// TESTING ONLY
	$rootScope.$watch(function() {
		return universal_variable.basket;
	}, function(basket) {
		var subtotal = basket.line_items.map(function(line_item) {
				// subtotal in pence
				return line_item.subtotal * 100;
			}).reduce(function(subtotal, line_item) {
				return subtotal + line_item;
			}, 0),
			tax = Math.ceil(subtotal * 0.2),
			total = subtotal + tax;

		universal_variable.basket.total_item_count = basket.line_items.length;
		universal_variable.basket.subtotal = subtotal / 100;
		universal_variable.basket.tax = tax / 100;
		universal_variable.basket.total = total / 100
	}, true);

	return service;
}

angular
	.module('app')
	.factory('basketService', BasketService);
