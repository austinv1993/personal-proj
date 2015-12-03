angular.module('app')
.controller('loginCtrl', function($scope, $location, loginService) {
	$scope.test = 'working';
	$scope.login = function() {
			$('#login-form-link').click(function (e) {
				$("#login-form").delay(100).fadeIn(100);
				$("#register-form").fadeOut(100);
				$('#register-form-link').removeClass('active');
				$(this).addClass('active');
				e.preventDefault();
			})
		};
	$scope.register = function() {
			$('#register-form-link').click(function (e) {
				$("#register-form").delay(100).fadeIn(100);
				$("#login-form").fadeOut(100);
				$('#login-form-link').removeClass('active');
				$(this).addClass('active');
				e.preventDefault();
			})
		};
	$scope.createNewUser = function(username, password, email) {
		if ($scope.password === $scope.passwordConfirm) {
			loginService.createNewUser(username, password, email)
		} else {
			alert('Password does not match!')
		}
		
	}
	$scope.loginUser = function() {
		$location.path('/auth/google')
	}
	
})