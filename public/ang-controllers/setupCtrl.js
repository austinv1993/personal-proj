angular.module('app')
.controller('setupCtrl', function($scope, $http, valveService) {
	
	
	$scope.createNewValve = function() {
		$scope.updateUserWithValveId();
		$scope.valve.userId = $scope.authenticatedUser._id;
		$scope.valve.valveNumber = valveNum;
		valveService.createNewValve($scope.valve);
	}
	$scope.getCurrentUser = function() {
		valveService.getCurrentUser().then(function(userObject) {
			$scope.authenticatedUser = userObject;	
		})
	}
	var valveNum;
	$scope.getCurrentUser();
	$scope.assignValveNum = function(userObj) {
		valveNum = $scope.authenticatedUser.valves.length + 1;
	}
	$scope.updateUserWithValveId = function(userObj) {
		valveService.updateUserWithValveId(userObj).then(function() {
			
		})
	}
})