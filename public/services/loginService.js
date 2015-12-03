angular.module('app')
.service('loginService', function($http) {
	this.createNewUser = function(username, password, email) {
		$http.post('/api/user', {name: username, password: password, email: email})
			.then(function() {
				alert('User created successfully!')
			})
	};
	this.login = function(username) {
		$http.get('/auth/google')
			.then(function(response) {
				console.log(response.data);
				// $parent.user = response.data;
			})
			
	};
})