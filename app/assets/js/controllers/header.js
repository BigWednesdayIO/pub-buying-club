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

	vm.activeMenu = null;

	vm.showMenu = function(menu) {
		vm.activeMenu = (vm.activeMenu === menu) ? null : menu;
		$rootScope.showMenu = vm.activeMenu === 'navigation';
	};
}

angular
	.module('app')
	.controller('HeaderController', HeaderController);
