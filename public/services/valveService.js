angular.module('app')
.service('valveService', function($http) {
	
	this.getValves = function(userObject) {
		return $http.get('/api/valves?userId=' + userObject._id)
			.then(function(result) {
				console.log(result.data);
				return result.data
			})
	}
	this.getValve = function(valveId) {
		return $http.get('/api/valve?valveId=' + valveId)
			.then(function(valve) {
				return valve.data
			})
	}
	this.createNewValve = function(valve, user) {
		return $http.post('/api/valve?ip=' + user.ipAddress, valve)
			.then(function(response) {
				return response.data
			})
	}
	this.updateValve = function(valve, user) {
		//console.log('valve ', valve);
		return $http.put('/api/valves?id=' + valve._id +'&ip=' + user.ipAddress, valve).then(function(response) {
			console.log('this is response.data from updateValve()',response.data);
			return response.data;
		})
	}
	// this.updateValveWithNumber = function() {
		
	// }
	this.sendValveToHistory = function(valveObj) { //NOT BEING USED
		// console.log('you hit sendValveToHistory()');
		//**I HARDCODED IN THE ID OF THE HISTORY DOC THAT IM PUSHING VALVES INTO BELOW
		//**I WILL NEED TO GET THE USERS HISTORY OBJ ONTO THIS CTRL $SCOPE!!
		return $http.put('/api/history?historyId=5660f66dba613cff9184d322', valveObj).then(function(response) {
			console.log('this is response.data from sendValveToHistory()', response.data);
			return response.data;
		})
	}
	this.sendValveToHistoryTwo = function(valveObj) { //NOT BEING USED
		return $http.put('/api/history?userId=' + valveObj.userId, valveObj).then(function(response) {
			return response.data;
		})
	}
	
	
});