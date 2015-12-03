angular.module('app')
.service('valveService', function($http) {
	this.getCurrentUser = function() {
		return $http.get('/api/user/authenticated')
			.then(function(response) {
				return response.data;
			})
			
	}
	this.getValves = function(userObject) {
		return $http.get('/api/valves?userId=' + userObject._id)
			.then(function(result) {
				return result.data
			})
		}
});