angular.module('app')
.controller('updateValveCtrl', function($scope, $stateParams, valveService, $state, toastr) {
	
	var getValve = function(valveId) {
		valveService.getValve(valveId).then(function(valve) {
			$scope.valve = valve;
			$scope.valve.timeOpen = new Date($scope.valve.timeOpen)
			$scope.valve.timeClose = new Date($scope.valve.timeClose)
		})				
	}
	getValve($stateParams.valveId);
	$scope.updateValve = function(valve) {
		valveService.updateValve(valve).then(function(valve) {
			$scope.updatedValve = valve;
			toastr.options.positionClass = 'toast-top-right'; 
			toastr.info('Valve updated!');
		})
	}
	$scope.routeToAccnt = function() {
		$state.go('account')
	}
})