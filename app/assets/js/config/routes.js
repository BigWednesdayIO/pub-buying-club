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
			})

		.state('checkout', {
			views: {
				'header@': {
					templateUrl: 'views/partials/header--checkout.html',
					controller: 'HeaderController as vm'
				},
				'@': {
					templateUrl: 'views/layouts/narrow.html'
				},
				'footer@': {
					templateUrl: 'views/partials/footer--checkout.html'
				}
			}
		})
			.state('basket-confirmation', {
				parent: 'checkout',
				url: '/checkout/',
				views: {
					'main@checkout': {
						templateUrl: 'views/checkout-basket.html',
						controller: 'BasketController as vm',
						resolve: BasketController.resolve
					}
				}
			})
			.state('order-confirmation', {
				parent: 'checkout',
				url: '/checkout/order-confirmation',
				views: {
					'main@checkout': {
						templateUrl: 'views/order-confirmation.html',
						controller: 'OrderConfirmationController as vm',
						resolve: OrderConfirmationController.resolve
					}
				}
			});

	$urlRouterProvider.otherwise("/login");

	$locationProvider.html5Mode(true);
}

angular
	.module('app')
	.config(RoutingConfig);
