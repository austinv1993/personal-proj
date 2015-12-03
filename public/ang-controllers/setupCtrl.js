angular.module('app')
.controller('setupCtrl', function($scope, $http, setupService) {
	
	
	$scope.createNewValve = function() {
		// console.log(timeOpen);
		// console.log(timeClose);
		$scope.valve.userId = $scope.authedUser.data._id;
		setupService.createNewValve($scope.valve);
		
		// $scope.valve = {};
	}
	$scope.getCurrentUser = function() {
		return $http.get('/api/user/authenticated')
			.then(function(response) {
				console.log(response)
				$scope.authedUser = response;
			})
	}
	$scope.getCurrentUser();
})