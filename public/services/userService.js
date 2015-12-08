angular.module('app')
.service('userService', function($http) {
	this.getCurrentUser = function() {
		return $http.get('/api/user/authenticated')
			.then(function(response) {
				console.log('you hit getCurrentUser and this is the response', response.data);
				return response.data;
			})	
	}
	this.getUserHistory = function(userId) {
		return $http.get('/api/history/user?userId=' + userId).then(function(response) {
			console.log('you hit getUserHistory, it ran, this is the response', response.data);
			return response.data
		})
	}
	this.updateUserWithValveId = function(userObj, valveObj) {
		return $http.put('/api/user/update?_id=' + userObj._id, valveObj)
			.then(function(response) {
				return response.data;
		})
	}
	
	
})