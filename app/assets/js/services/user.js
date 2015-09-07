function UserService ($http, $q, API, session) {
	var service = this;

	service.getUserInfo = function() {
		var user_id = session.getInfo().user_id;

		if (!user_id) {
			return $q.reject({
				message: 'No user id stored'
			});
		}

		return $http({
			method: 'GET',
			url: API.users + '/' + user_id
		});
	};
}

angular
	.module('app')
	.service('userService', UserService);
