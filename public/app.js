angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/login')
	
	$stateProvider
		.state('login', {
				url: '/login',
				// controller: 'loginCtrl',
				templateUrl: './views/login.html'
		})
		.state('add', {
				url: '/addValve',
				controller: 'addValveCtrl',
				templateUrl: './views/addValve.html'
				// resolve: {user: getAuth}
		})
		.state('myValves', {
				url: '/valves',
				controller: 'myValvesCtrl',
				templateUrl: './views/myValves.html'
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