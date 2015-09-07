angular
	.module('app')
	.constant('debounceOptions', {
		updateOn: 'default blur',
		debounce: {
			default: 500,
			blur: 0
		}
	});
