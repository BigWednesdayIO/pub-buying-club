function UserController ($rootScope, $state, authentication, session, userService) {
	var vm = this;

	function refreshUserInfo () {
		vm.isLoggedIn = session.exists();

		if (vm.isLoggedIn) {
			userService
				.getUserInfo()
				.then(function(info) {
					vm.email = info.email;
				});
		}
	}

	vm.logOut = function(e) {
		e.preventDefault();

		authentication
			.destroy()
			.then(function() {
				$state.go('login');
			});
	};

	refreshUserInfo();
	$rootScope.$on('$stateChangeStart', refreshUserInfo);
}

angular
	.module('app')
	.controller('UserController', UserController);
