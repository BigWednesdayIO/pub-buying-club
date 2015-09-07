function RoutingConfig ($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider
		.state('root', {
			views: {
				header: {
					controller: 'HeaderController as vm',
					templateUrl: 'views/partials/header.html'
				},
				footer: {
					templateUrl: 'views/partials/footer.html'
				}
			}
		})

		.state('login', {
			url: '/login',
			controller: 'LoginController as vm',
			resolve: LoginController.resolve,
			templateUrl: 'views/login.html'
		})
		.state('select-outlet', {
			url: '/select-outlet',
			controller: 'SelectOutletController as vm',
			resolve: SelectOutletController.resolve,
			params: {
				outlets: null
			},
			templateUrl: 'views/select-outlet.html'
		})

		.state('home', {
			parent: 'root',
			url: '/',
			views: {
				'@': {
					templateUrl: 'views/home.html'
				}
			}
		});

	$urlRouterProvider.otherwise("/login");

	$locationProvider.html5Mode(true);
}

angular
	.module('app')
	.config(RoutingConfig);
