describe('BasicPagingFilter', function() {
	var basicPaging,
		data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		filteredData;

	beforeEach(module('app'));

	beforeEach(inject(function($filter) {
		// The injector unwraps the underscores (_) from around the parameter names when matching
		basicPaging = $filter('basicPaging');
	}));

	describe('filtering an array', function() {
		beforeEach(function() {
			filteredData = null;
		});

		it('limits the length', function() {
			filteredData = basicPaging(data, 3);
			expect(filteredData.length).toBe(3);
			expect(filteredData).toEqual([1,2,3]);
		})

		it('offsets to the first page', function() {
			filteredData = basicPaging(data, 3, 1);
			expect(filteredData.length).toBe(3);
			expect(filteredData).toEqual([4,5,6]);
		});

		it('offsets to the second page', function() {
			filteredData = basicPaging(data, 3, 2);
			expect(filteredData.length).toBe(3);
			expect(filteredData).toEqual([7,8,9]);
		});

		it('last page can be smaller', function() {
			filteredData = basicPaging(data, 3, 3);
			expect(filteredData.length).toBe(1);
			expect(filteredData).toEqual([10]);
		});
	});
});
