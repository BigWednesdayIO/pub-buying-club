function HomepageController (welcomeMessage) {
	var vm = this;

	vm.welcomeMessage = welcomeMessage;
}

HomepageController.resolve = /* @ngInject */ {
	welcomeMessage: function() {
		return "Hello World";
	}
};

angular
	.module('app')
	.controller('HomepageController', HomepageController);
