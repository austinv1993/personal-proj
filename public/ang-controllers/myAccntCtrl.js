angular.module('app')
.controller('myAccntCtrl', function($scope, $http) {
	$scope.getCurrentUser = function() {
		return $http.get('/api/user/authenticated')
			.then(function(response) {
				console.log(response)
				$scope.authedUser = response;
				getValves($scope.authedUser);
				
			})
	}
	$scope.getCurrentUser();
	var getValves = function(userObject) {
					$http.get('/api/valve' + '?userId=' + userObject.data._id)
						.then(function(result) {
							$scope.valves = result.data;
							console.log($scope.valves)
						})
				}
})