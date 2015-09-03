function OutletsService ($http, $q, $log, API) {
	var service = this;

	service.getOutlets = function() {
		return $http({
			method: 'GET',
			url: API.outlets
		});
	};
}

angular
	.module('app')
	.service('outletsService', OutletsService);
