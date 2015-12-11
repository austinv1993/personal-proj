angular.module('app')
.controller('ipAddressCtrl', function($scope, userService, toastr) {
	
	$scope.getCurrentUser = function() {
		userService.getCurrentUser().then(function(response) {
			$scope.user = response;
		})
	}
	$scope.getCurrentUser();
	
	$scope.updateUserWithIp = function(user) {
		$scope.user.ipAddress = $scope.ipAddress;
		userService.updateUserWithIp($scope.user).then(function(response) {
			$scope.ipAddress = "";
			toastr.info('Valve created!');
		})
	}
	
})