angular.module('app')
.controller('setupCtrl', function($scope, $http, valveService) {
	
	
	$scope.createNewValve = function() {
		$scope.valve.userId = $scope.authenticatedUser._id;
		valveService.createNewValve($scope.valve)
			.then(function(response) {
				$scope.updateUserWithValveId($scope.authenticatedUser, response)
					.then(function() {
						$scope.getCurrentUser()
							.then(function() {
								$scope.getCurrentUser()
									.then(function() {
										$scope.assignValveNum()
											.then(function() {
												response.valveNumber = valveNum;
												valveService.updateValve(response);
											})
									})
							})
			})
		})
	}
	$scope.getCurrentUser = function() {
		valveService.getCurrentUser().then(function(userObject) {
			$scope.authenticatedUser = userObject;	
		})
	}
	$scope.getCurrentUser();
	
	var valveNum;
	$scope.assignValveNum = function(userObj) {
		valveNum = $scope.authenticatedUser.valves.length + 1;
	}
	$scope.updateUserWithValveId = function(userObj) {
		valveService.updateUserWithValveId(userObj);
	}
})