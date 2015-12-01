angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/login')
	
	$stateProvider
		.state('login', {
				url: '/login',
				controller: 'loginCtrl',
				templateUrl: './views/login.html'
			})
		.state('setup', {
				url: '/setup',
				controller: 'setupCtrl',
				templateUrl: './views/setup.html'
		})
})