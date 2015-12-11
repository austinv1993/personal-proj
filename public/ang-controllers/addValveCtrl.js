angular.module('app')
.controller('addValveCtrl', function($scope, $http, valveService, userService, $q, toastr) {
	
	$scope.createNewValve = function() {
		$scope.valve.user_id = $scope.authenticatedUser._id;
		$scope.valve.valveNum = valveNum;
		valveService.createNewValve($scope.valve, $scope.authenticatedUser)
			.then(function(response) {
				userService.updateUserWithValveId($scope.authenticatedUser, response);
				toastr.options.positionClass = 'toast-top-right'; 
				toastr.info('Valve created!');
				$scope.valve.valveName = "";
				$scope.valve.relativeLocation = "";
				$scope.valve.timeOpen = "";
				$scope.valve.timeClose = "";
		})
		
		
	}
	$scope.getCurrentUser = function() {
		var deferred = $q.defer();
		userService.getCurrentUser().then(function(userObject) {
			$scope.authenticatedUser = userObject;
			console.log($scope.authenticatedUser);
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