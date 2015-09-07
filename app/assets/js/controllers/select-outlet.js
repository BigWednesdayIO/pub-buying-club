function SelectOutletController ($location, authentication, outlets) {
	var vm = this;

	vm.outlets = outlets;

	vm.selectOutlet = function(selectedOutlet) {
		authentication
			.selectOutlet(selectedOutlet)
			.then(function() {
				$location.url($location.search().return_url || '/');
			});
	};

	vm.filterOptions = {};
}

SelectOutletController.resolve = /* @ngInject */ {
	outlets: function($stateParams, outletsService) {
		if ($stateParams.outlets) {
			return $stateParams.outlets;
		}

		return outletsService
			.getOutlets();
	}
}

angular
	.module('app')
	.controller('SelectOutletController', SelectOutletController);
