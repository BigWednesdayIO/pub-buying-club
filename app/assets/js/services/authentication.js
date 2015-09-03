function AuthenticationService ($http, $q, API, session) {
	var service = this;

	service.create = function(credentials) {
		return $http({
			url: API.authentication,
			method: 'POST',
			data: credentials
		})
			.then(function(response) {
				session.storeInfo(response);
				return response;
			});
	};

	service.destroy = function() {
		return $http({
			url: API.authentication + '/' + session.getInfo().token,
			method: 'DELETE'
		})
			.then(function(response) {
				session.destroy();
				return response;
			});
	};

	service.selectOutlet = function(outlet) {
		return $http({
			method: 'POST',
			url: API.authentication + '/' + session.getInfo().token + '/outlet',
			data: outlet
		});
	};
}

angular
	.module('app')
	.service('authentication', AuthenticationService);
