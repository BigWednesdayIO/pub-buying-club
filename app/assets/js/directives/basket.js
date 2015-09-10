function BasketDirective () {
	return {
		restrict: 'EA',
		scope: {},
		controller: 'BasketController',
		controllerAs: 'vm',
		templateUrl: '/views/partials/basket.html',
		replace: true
	};
}

angular
	.module('app')
	.directive('basket', BasketDirective);
