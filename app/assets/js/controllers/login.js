function LoginController ($state, authentication) {
	var vm = this;

	vm.submitLogin = function(e) {
		var fields = [];

		e.preventDefault();

		vm.errorMessage = null;

		if (vm.loginForm.$invalid) {
			vm.errorMessage = 'Please enter a valid ';
			if (vm.loginForm.email.$invalid) {
				fields.push('email address');
			}
			if (vm.loginForm.password.$invalid) {
				fields.push('password');
			}
			vm.errorMessage += fields.join(' and ');
			return;
		}

		authentication
			.create({
				email: vm.email,
				password: vm.password
			})
			.then(function(response) {
				// if (outlets.length === 1) $state.go('home');
				// else $state.go('select-outlet', {outlets: outlets});
				$state.go('select-outlet');
			})
			.catch(function(error) {
				vm.errorMessage = error.message;
			});
	};
}

LoginController.resolve = /* @ngInject */ {
	sessionExists: function($location, $state, session) {
		if (session.exists()) {
			$location.url($location.search().return_url || '/');
		}
	}
};

angular
	.module('app')
	.controller('LoginController', LoginController);
