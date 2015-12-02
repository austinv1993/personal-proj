angular.module('app')
.controller('setupCtrl', function($scope, setupService) {
	$scope.createNewValve = function(valveName, relativeLocation, dateOperate, timeOpen, timeClose) {
		setupService.createNewValve(valveName, relativeLocation, dateOperate, timeOpen, timeClose);
		$scope.valveName = "";
		$scope.relativeLocation = "";
		$scope.dateOperate= "";
		$scope.timeOpen = "";
		$scope.timeClose = "";
	}
	$scope.getCurrentUser = function() {
		
	}
})