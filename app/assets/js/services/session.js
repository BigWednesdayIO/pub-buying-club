function SessionService (browserStorage) {
	var service = {};

	service.getInfo = function() {
		return {
			token: browserStorage.getItem('session_token'),
			user_id: browserStorage.getItem('user_id')
		};
	};

	service.storeInfo = function(info) {
		browserStorage.setItem('session_token', info.token);
		browserStorage.setItem('user_id', info.user.id);
	};

	service.exists = function() {
		var session = service.getInfo();
		return !!(session.token && session.user_id);
	};

	service.destroy = function() {
		browserStorage.clear();
	};

	return service;
}

angular
	.module('app')
	.factory('session', SessionService);
