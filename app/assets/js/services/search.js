function SearchService ($http, API, universal_variable) {
	var service = this;

	service.getResults = function(searchParams) {
		universal_variable.search = searchParams;

		return $http({
			method: 'POST',
			url: API.search,
			data: universal_variable
		});
	};
}

angular
	.module('app')
	.service('searchService', SearchService);
