angular.module('app')
.service('setupService', function($http) {
	this.createNewValve = function(valveName, relativeLocation, dateOperate, timeOpen, timeClose) {
		$http.post('/someUrl', {
			valveName: valveName
		,	relativeLocation: relativeLocation
		,	dateOperate: dateOperate
		,	timeOpen: timeOpen
		,	timeClose: timeClose
		}).then()
	}
	
})