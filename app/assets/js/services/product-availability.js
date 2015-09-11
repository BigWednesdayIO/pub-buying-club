function ProductAvailabilityService ($q) {
	var service = this;

	service.isAvailable = function(product) {
		// TODO proper API call
		return $q.when(product);
	};
}

angular
	.module('app')
	.service('productAvailabilityService', ProductAvailabilityService);
