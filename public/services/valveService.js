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
	this.getValve = function(valveId) {
		return $http.get('/api/valve?valveId=' + valveId)
			.then(function(valve) {
				return valve.data
			})
	}
	this.createNewValve = function(valve) {
		$http.post('/api/valve', valve)
		//I WANT TO RETURN THE VALVE OBJECT ON SUCCESS//
	}
});