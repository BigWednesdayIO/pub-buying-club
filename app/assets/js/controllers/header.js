function HeaderController ($rootScope, $state, authentication) {
	var vm = this;

	vm.logout = function() {
		authentication
			.destroy()
			.then(function() {
				$state.go('login');
			});
	};

	vm.changeOutlet = function() {
		$state.go('select-outlet');
	};

	vm.toggleSearch = function() {
		$rootScope.showSearch = !$rootScope.showSearch;
	};
}

angular
	.module('app')
	.controller('HeaderController', HeaderController);
