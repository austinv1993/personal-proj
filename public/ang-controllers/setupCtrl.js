angular.module('app')
.controller('setupCtrl', function($scope, $http, valveService) {
	
	
	$scope.createNewValve = function() {
		$scope.valve.userId = $scope.authenticatedUser._id;
		// $scope.valve.valveNumber = 
		valveService.createNewValve($scope.valve);
	}
	$scope.getCurrentUser = function() {
		valveService.getCurrentUser().then(function(userObject) {
			$scope.authenticatedUser = userObject;	
		})
	}
	$scope.getCurrentUser();
})