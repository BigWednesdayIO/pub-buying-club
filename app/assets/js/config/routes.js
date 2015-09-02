function RoutingConfig ($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			controller: 'HomepageController as vm',
			resolve: HomepageController.resolve,
			templateUrl: 'views/home.html'
		});

	$urlRouterProvider.otherwise("/");

	$locationProvider.html5Mode(true);
}

angular
	.module('app')
	.config(RoutingConfig);
