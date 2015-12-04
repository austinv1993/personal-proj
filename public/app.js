angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/login')
	
	$stateProvider
		.state('login', {
				url: '/login',
				// controller: 'loginCtrl',
				templateUrl: './views/login.html'
		})
		.state('setup', {
				url: '/setup',
				controller: 'setupCtrl',
				templateUrl: './views/setup.html'
				// resolve: {user: getAuth}
		})
		.state('myAccnt', {
				url: '/account',
				controller: 'myAccntCtrl',
				templateUrl: './views/accnt.html'
		})
		.state('update', {
				url: '/update/:valveId',
				controller: 'updateValveCtrl',
				templateUrl: './views/updateValve.html'
		})
		.state('history', {
				url: '/history',
				controller: 'historyCtrl',
				templateUrl: './views/history.html'
		})
})


// function getAuth($http, $location) {
// 	return $http.get('/api/user/authenticated')
// 		.success(function(response) {
// 			console.log('test')
// 			console.log(response)
// 			return response
// 		})
// 		.error(function(err) {
// 			$location.path('./')
// 		})
// }