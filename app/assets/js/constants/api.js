function APIConstant () {
	var API = {};

	API.base = 'http://demo6480856.mockable.io/';

	API.authentication = API.base + 'v1/authentication';
	API.baskets = API.base + 'v1/baskets';
	API.delivery_dates = API.base + 'v1/delivery_dates';
	API.outlets = API.base + 'v1/outlets';
	API.search = API.base + 'v1/search';
	API.users = API.base + 'v1/users';

	return API;
}

angular
	.module('app')
	.constant('API', APIConstant());
