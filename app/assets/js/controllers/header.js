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

	vm.activeMenu = '';

	vm.showMenu = function(menu) {
		vm.activeMenu = (vm.activeMenu === menu) ? '' : menu;
	};
}

angular
	.module('app')
	.controller('HeaderController', HeaderController);
