angular.module('app')
.controller('updateValveCtrl', function($scope, $stateParams, valveService) {
	
	var getValve = function(valveId) {
		valveService.getValve(valveId).then(function(valve) {
			$scope.valve = valve;
		})				
	}
	getValve($stateParams.valveId);
	console.log($stateParams.valveId)
})