angular.module('app')
.controller('historyCtrl', function($scope, valveService, userService) {
	
	$scope.getCurrentUserHistory = function() {
		userService.getCurrentUser().then(function(userObj) {
			userService.getUserHistory(userObj._id).then(function(userHistory) {
				$scope.userHistory = userHistory;
			})
		})
	}
	$scope.getCurrentUserHistory();
	
	
	
	
	
	
});