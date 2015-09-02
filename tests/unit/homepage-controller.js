describe('HomepageController', function() {
	var $controller,
		vm;

	beforeEach(module('app'));

	beforeEach(inject(function(_$controller_) {
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
	}));

	describe('vm.welcomeMessage', function() {
		beforeEach(function() {
			vm = new $controller('HomepageController', {welcomeMessage: 'Hello World'});
		})

		it('is defined', function() {
			expect(vm.welcomeMessage).toBeDefined();
			expect(vm.welcomeMessage).toBe('Hello World');
		});
	});
});
