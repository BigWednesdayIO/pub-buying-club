describe('LoginController', function() {
	var $controller,
		$event = {
			preventDefault: function() {}
		};

	beforeEach(module('app'));

	beforeEach(inject(function(_$controller_) {
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
	}));

	describe('vm.errorMessage', function() {
		it('is not defined initially', function() {
			var vm = new $controller('LoginController');

			expect(vm.errorMessage).toBeFalsy();
		});

		describe('when form is submitted', function() {
			var vm;

			beforeEach(function() {
				vm = new $controller('LoginController');
			});

			it('flags invalid email', function() {
				vm.loginForm = {
					$invalid: true,
					email: {$invalid: true},
					password: {$invalid: false}
				};

				vm.submitLogin($event);

				expect(vm.errorMessage).toMatch('email');
			});

			it('flags invalid password', function() {
				vm.loginForm = {
					$invalid: true,
					email: {$invalid: false},
					password: {$invalid: true}
				};

				vm.submitLogin($event);

				expect(vm.errorMessage).toMatch('password');
			});

			it('does not exist for valid form', function() {
				vm.loginForm = {$invalid: false};

				vm.submitLogin($event);

				expect(vm.errorMessage).toBeFalsy();
			});
		});
	});
});
