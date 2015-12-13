angular.module('app')
.controller('updateValveCtrl', function($scope, $stateParams, valveService, $state, toastr, userService) {
	
	var getValve = function(valveId) {
		valveService.getValve(valveId).then(function(valve) {
			$scope.valve = valve;
			$scope.valve.timeOpen = new Date($scope.valve.timeOpen)
			$scope.valve.timeClose = new Date($scope.valve.timeClose)
		})				
	}
	getValve($stateParams.valveId);
	$scope.updateValve = function(valve) {
		$scope.valve.status = 'Pending';
		valveService.updateValve(valve, $scope.currentUser).then(function(valve) {
			$scope.updatedValve = valve;
			toastr.options.positionClass = 'toast-top-right'; 
			toastr.info('Valve updated!');
		})
	}
	$scope.getCurrentUser = function() {
		userService.getCurrentUser().then(function(response) {
			$scope.currentUser = response;
		})
	}
	$scope.routeToAccnt = function() {
		$state.go('account')
	}
})