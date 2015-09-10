function SearchBarDirective ($state) {
	return {
		restrict: 'EA',
		scope: {},
		controller: function() {
			var vm = this;

			vm.query = "";

			vm.performSearch = function() {
				if (vm.query === "") {
					return false;
				}

				$state.go('search-results', {
					query: vm.query
				});
			};
		},
		controllerAs: 'vm',
		templateUrl: '/views/partials/search-bar.html',
		replace: true,
	};
}

angular
	.module('app')
	.directive('searchBar', SearchBarDirective);
