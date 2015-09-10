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


		.state('shop', {
			parent: 'root',
			views: {
				'@': {
					templateUrl: 'views/layouts/main.html'
				},
				'secondary-navigation@': {
					templateUrl: 'views/partials/navigation--shop.html'
				},
				'sidebar@shop': {
					templateUrl: 'views/partials/sidebar--shop.html'
				}
			}
		})
			.state('home', {
				parent: 'shop',
				url: '/',
				views: {
					'main@shop': {
						templateUrl: 'views/home.html'
					}
				}
			})
			.state('search-results', {
				parent: 'shop',
				url: '/shop?query',
				views: {
					'main@shop': {
						controller: 'SearchResultsController as vm',
						resolve: SearchResultsController.resolve,
						templateUrl: 'views/search-results.html'
					}
				}
			})
			.state('category-page', {
				parent: 'shop',
				url: '/shop/{query:.+}',
				views: {
					'main@shop': {
						controller: 'SearchResultsController as vm',
						resolve: SearchResultsController.resolve,
						templateUrl: 'views/search-results.html'
					}
				}
			});

	$urlRouterProvider.otherwise("/login");

	$locationProvider.html5Mode(true);
}

angular
	.module('app')
	.config(RoutingConfig);
