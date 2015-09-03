function HeaderController ($state, authentication) {
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
	}
}

angular
	.module('app')
	.controller('HeaderController', HeaderController);
