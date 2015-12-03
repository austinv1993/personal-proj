angular.module('app')
.controller('updateValveCtrl', function($scope, $stateParams, $http) {
	
	var getValve = function(valveId) {
					$http.get('/api/valve?valveId=' + valveId)
						.then(function(result) {
							$scope.valve = result.data;
							console.log($scope.valve)
						})
				}
	getValve($stateParams.valveId);
	console.log($stateParams.valveId)
})