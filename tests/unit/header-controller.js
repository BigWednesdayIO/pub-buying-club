describe('HeaderController', function() {
	var $controller,
		vm;

	beforeEach(module('app'));

	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
	}));

	beforeEach(function() {
		vm = new $controller('HeaderController');
	});

	describe('vm.activeMenu', function() {
		it('is not set initially', function() {
			expect(vm.activeMenu).toBeFalsy();
		});
	});

	describe('vm.showMenu', function() {
		it('sets vm.activeMenu', function() {
			vm.showMenu('foo');
			expect(vm.activeMenu).toBe('foo');
		});

		it('toggles if the same value is set twice', function() {
			vm.showMenu('foo');
			vm.showMenu('foo');
			expect(vm.activeMenu).toBeFalsy();
		});

		it('does not toggle if something else is set inbetween', function() {
			vm.showMenu('foo');
			vm.showMenu('bar')
			vm.showMenu('foo');
			expect(vm.activeMenu).toBe('foo');
		});
	});
});
