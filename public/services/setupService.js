angular.module('app')
.service('setupService', function($http) {
	this.createNewValve = function(valve) {
		$http.post('/api/valve', valve)
		// $http.post('/someUrl', {})
	}
	
})