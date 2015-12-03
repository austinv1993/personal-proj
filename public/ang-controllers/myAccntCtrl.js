angular.module('app')
.controller('myAccntCtrl', function($scope, $state, valveService) {

	$scope.getCurrentUser = function() {
		valveService.getCurrentUser().then(function(user) {
			$scope.authenticatedUser = user;
			valveService.getValves(user).then(function(valveArray) {
				// for (var i = 0; i < valveArray.length; i++) {
				// 	valveArray[i].timeOpen = new Date(valveArray[i].timeOpen)
				// 	valveArray[i].timeClose = new Date(valveArray[i].timeClose)
				// }
				$scope.valves = valveArray;
			})
		})
	}
	$scope.getCurrentUser();
	$scope.editValve = function(valveId) {
		$state.go('update', ({valveId: valveId }))
	}
	$scope.setCompleteOrFail = function(valve, status) {
		valve.status = status;
		valveService.updateValve(valve).then(function() {
			$scope.getCurrentUser();
		})
	}
	
})