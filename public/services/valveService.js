angular.module('app')
.service('valveService', function($http) {
	
	this.getValves = function(userObject) {
		return $http.get('/api/valves?userId=' + userObject._id)
			.then(function(result) {
				return result.data
			})
	}
	this.getValve = function(valveId) {
		return $http.get('/api/valve?valveId=' + valveId)
			.then(function(valve) {
				return valve.data
			})
	}
	this.createNewValve = function(valve) {
		return $http.post('/api/valve', valve)
			.then(function(response) {
				return response.data
			})
		//I WANT TO RETURN THE VALVE OBJECT ON SUCCESS//
	}
	this.updateValve = function(valve) {
		//console.log('valve ', valve);
		return $http.put('/api/valves?id=' + valve._id, valve).then(function(response) {
			console.log('this is response.data from updateValve()',response.data);
			return response.data;
		})
	}
	// this.updateValveWithNumber = function() {
		
	// }
	this.sendValveToHistory = function(valveObj) {
		console.log('you hit sendValveToHistory()');
		//**I HARDCODED IN THE ID OF THE HISTORY DOC THAT IM PUSHING VALVES INTO BELOW
		//**I WILL NEED TO GET THE USERS HISTORY OBJ ONTO THIS CTRL $SCOPE!!
		return $http.put('/api/history?historyId=5660f66dba613cff9184d322', valveObj).then(function(response) {
			console.log('this is response.data from sendValveToHistory()', response.data);
			return response.data;
		})
	}
	this.sendValveToHistoryTwo = function(valveObj) {
		return $http.put('/api/history?userId=' + valveObj.userId, valveObj).then(function(response) {
			return response.data;
		})
	}
	
	
});