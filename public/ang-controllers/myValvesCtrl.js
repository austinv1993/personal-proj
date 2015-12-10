angular.module('app')
.controller('myValvesCtrl', function($scope, $state, valveService, userService) {

	$scope.getCurrentUser = function() {
		userService.getCurrentUser().then(function(user) {
			$scope.authenticatedUser = user;
			valveService.getValves(user).then(function(valveArray) {
				$scope.valvesCurrent = [];
				$scope.valvesExpired = [];
				for (var i = 0; i < valveArray.length; i++) {
					if (valveArray[i].status === 'Pending') {
						$scope.valvesCurrent.push(valveArray[i]);
					}
					else {
						$scope.valvesExpired.push(valveArray[i])
					}
				}
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
			$scope.sendValveToHistory(valve);		
		})
	}
	$scope.sendValveToHistory = function(valveObj) {
		valveService.sendValveToHistory(valveObj);
	}
	// $scope.gottaClickIt = function(valveObj, status) {
	// 	$scope.setCompleteOrFail(valveObj, status).then(function(response) {
	// 		$scope.sendValveToHistory(response);
	// 	})
	// }
	
	
	
})