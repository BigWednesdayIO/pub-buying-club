function SearchBarDirective () {
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

				// TODO actually perform the search here
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
