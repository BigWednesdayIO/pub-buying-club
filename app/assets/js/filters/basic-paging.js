function BasicPagingFilter () {
	return function(data, limit, page) {
		var offset = limit * (page || 0);
		return data.slice(offset, offset + limit);
	}	
}

angular
	.module('app')
	.filter('basicPaging', BasicPagingFilter);
