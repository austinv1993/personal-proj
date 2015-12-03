angular.module('app')
.controller('myAccntCtrl', function($scope, $http, $state, valveService) {
	// $scope.getCurrentUser = function() {
	// 	return $http.get('/api/user/authenticated')
	// 		.then(function(response) {
	// 			console.log(response)
	// 			$scope.authedUser = response;
	// 			getValves($scope.authedUser);
				
	// 		})
	// }
	// $scope.getCurrentUser();
	// var getValves = function(userObject) {
	// 				$http.get('/api/valves?userId=' + userObject.data._id)
	// 					.then(function(result) {
	// 						$scope.valves = result.data;
	// 						console.log($scope.valves)
	// 					})
	// 			}
	$scope.getCurrentUser = function() {
		valveService.getCurrentUser().then(function(user) {
			$scope.authenticatedUser = user;
			valveService.getValves(user).then(function(valveArray) {
				$scope.valves = valveArray;
			})
		})
	}
	$scope.getCurrentUser();
	$scope.editValve = function(valveId) {
		$state.go('update', ({valveId: valveId }))
	}
})