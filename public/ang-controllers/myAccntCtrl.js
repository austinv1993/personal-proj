angular.module('app')
.controller('myAccntCtrl', function($scope, $state, valveService) {

	$scope.getCurrentUser = function() {
		valveService.getCurrentUser().then(function(user) {
			$scope.authenticatedUser = user;
			valveService.getValves(user).then(function(valveArray) {
				$scope.valves = valveArray;
			})
		})
	}
	$scope.getCurrentUser();
	$scope.editValve = function(valveId) {
		$state.go('update', ({valveId: valveId }))
	}
})