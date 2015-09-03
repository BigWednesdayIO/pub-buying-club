describe('basic authentication interceptor', function() {
	var $rootScope,
		$q,
		BasicValidationInterceptor,
		deferred,
		response;

	function jsonHeaders () {
		return {
			'content-type': 'application/json'
		};
	}

	function responseHandler () {
		this.success = function() {};
	}

	function setupResponsePromise () {
		deferred = $q.defer();
		response = new responseHandler();

		spyOn(response, 'success');

		deferred
			.promise
			.then(response.success);
	}

	beforeEach(module('app'));

	beforeEach(function() {
		inject(function(_$rootScope_, _$q_, _BasicValidationInterceptor_) {
			$rootScope = _$rootScope_;
			$q = _$q_;
			BasicValidationInterceptor = _BasicValidationInterceptor_
		});
	});

	it('is defined', function() {
		expect(BasicValidationInterceptor).toBeDefined();
	});

	describe('a json response response', function() {
		beforeEach(setupResponsePromise);

		it('accepts an array', function() {
			deferred
				.resolve(BasicValidationInterceptor.response({
					headers: jsonHeaders,
					data: [
						'foo',
						'bar'
					]
				}));

			$rootScope.$digest();
				
			expect(response.success).toHaveBeenCalled();
		});

		it('accepts an object', function() {
			deferred
				.resolve(BasicValidationInterceptor.response({
					headers: jsonHeaders,
					data: {
						foo: 'bar'
					}
				}));

			$rootScope.$apply();
				
			expect(response.success).toHaveBeenCalled();
		});

		describe('with an empty response body', function() {
			beforeEach(setupResponsePromise);

			it('accepts a 204', function() {
				deferred
					.resolve(BasicValidationInterceptor.response({
						headers: jsonHeaders,
						status: 204
					}));

				$rootScope.$digest();

				expect(response.success).toHaveBeenCalled();
			});

			it('rejects non-204 responses', function() {
				deferred
					.resolve(BasicValidationInterceptor.response({
						headers: jsonHeaders,
						config: {
							url: 'http://foo.bar'
						},
						status: 200
					}));

				$rootScope.$digest();

				expect(response.success).not.toHaveBeenCalled();
			});
		});
	});
});
