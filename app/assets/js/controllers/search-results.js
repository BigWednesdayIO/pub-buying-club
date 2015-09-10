function SearchResultsController ($rootScope, $state, basketService, productAttributes, searchResponse) {
	var vm = this;

	vm.query = $state.params.query;

	vm.results = searchResponse.results;

	vm.addToBasket = basketService.addToBasket;

	vm.productAttributes = productAttributes;

	$rootScope.$on('deliveryMethodUpdated', function() {
		$state.go($state.current, $state.params, {
			reload: true,
			inherit: false,
			notify: true
		});
	});
}

SearchResultsController.resolve = /* @ngInject */ {
	searchResponse: function($stateParams, searchService, baseSearchParams) {
		var searchParams = angular.copy(baseSearchParams);
		searchParams.query = $stateParams.query;

		return searchService
			.getResults(searchParams);
	}	
};

angular
	.module('app')
	.controller('SearchResultsController', SearchResultsController);
