function UniversalVariable (browserStorage) {
	return {
		version: '1.2.0',
		page: {

		},
		user: {
			id: browserStorage.getItem('user_id')
		},
		basket: {
			id: browserStorage.getItem('basket_id'),
			line_items: [],
			subtotal: 0,
			tax: 0
		},
		events: []
	};
}

angular	
	.module('app')
	.factory('universal_variable', UniversalVariable);
