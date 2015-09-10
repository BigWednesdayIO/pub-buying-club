function APIConstant () {
	var API = {};

	API.base = 'http://demo6480856.mockable.io/';

	API.authentication = API.base + 'v1/authentication';
	API.baskets = API.base + 'v1/baskets';
	API.users = API.base + 'v1/users';
	API.outlets = API.base + 'v1/outlets';
	return API;
}

angular
	.module('app')
	.constant('API', APIConstant());
