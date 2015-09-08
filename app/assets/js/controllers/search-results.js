function SearchResultsController ($stateParams, basketService, searchResponse) {
	var vm = this;

	vm.query = $stateParams.query;

	vm.results = searchResponse.results;

	vm.addToBasket = basketService.addToBasket;
}

SearchResultsController.resolve = /* @ngInject */ {
	searchResponse: function($stateParams, searchService, baseSearchParams) {
		var searchParams = angular.copy(baseSearchParams);
		searchParams.query = $stateParams.query;

		return searchService
			.getResults(searchParams)
			.then(function(response) {
				return response;
			});
	}	
};

angular
	.module('app')
	.controller('SearchResultsController', SearchResultsController);