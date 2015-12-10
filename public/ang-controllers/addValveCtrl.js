angular.module('app')
.controller('addValveCtrl', function($scope, $http, valveService, userService, $q) {
	
	
	$scope.createNewValve = function() {
		$scope.valve.user_id = $scope.authenticatedUser._id;
		$scope.valve.valveNum = valveNum;
		valveService.createNewValve($scope.valve)
			.then(function(response) {
				userService.updateUserWithValveId($scope.authenticatedUser, response);
		})
		$scope.valve.valveName = "";
		$scope.valve.relativeLocation = "";
		$scope.valve.timeOpen = "";
		$scope.valve.timeClose = "";
		$scope.notShow = true;
	}
	// if ($scope.notShow) {
	// 	$scope.notShow = false;
	// }
	$scope.getCurrentUser = function() {
		var deferred = $q.defer();
		userService.getCurrentUser().then(function(userObject) {
			$scope.authenticatedUser = userObject;
			deferred.resolve();	
		})
		return deferred.promise
	}
	
	var valveNum;
	$scope.assignValveNum = function(userObj) {
		valveNum = $scope.authenticatedUser.valves.length + 1;
		console.log(valveNum);
	}
	$scope.updateUserWithValveId = function(userObj) {
		valveService.updateUserWithValveId(userObj);
	}
	$scope.getCurrentUser().then(function() {
		$scope.assignValveNum();
	})
})