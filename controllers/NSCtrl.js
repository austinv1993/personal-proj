var schedule = require('node-schedule');

module.exports = {
	
	 newNodeJob: function() {
		var date = new Date();
		schedule.scheduleJob(date, function() {
			console.log(date);
		});
	 }
	
	
	
	
	
	
}