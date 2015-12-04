angular.module('app')
.controller('historyCtrl', function($scope, valveService) {
	
	$scope.getCurrentUser = function() {
		valveService.getCurrentUser().then(function(userObj) {
			valveService.getUserHistory(userObj._id).then(function(userHistory) {
				$scope.userHistory = userHistory;
			})
		})
	}
	$scope.getCurrentUser();
	
	
	
	
	
	
});